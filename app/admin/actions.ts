"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_S,
  adminConfigured,
  createSessionToken,
  credentialsMatch,
  verifySessionToken,
} from "@/lib/admin/session";
import { ConflictError, readPortfolio, storageMode, writePortfolio, type Upload } from "@/lib/admin/storage";
import { validateProjects } from "@/lib/admin/validate";

/* ----------------------------------- Auth ----------------------------------- */

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

// Per-instance brute-force brake: 5 failed logins / 15 min per IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;
const fails = new Map<string, number[]>();

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** username is echoed back so the field survives React's automatic form reset after a failed attempt. */
export type LoginState = { error?: string; username?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "Admin is not configured. See the setup notes in README.md." };

  const ip = await clientIp();
  const now = Date.now();
  const recent = (fails.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const username = String(formData.get("username") ?? "").slice(0, 200);
  const password = String(formData.get("password") ?? "").slice(0, 200);

  if (recent.length >= MAX_FAILS) return { error: "Too many attempts. Try again in 15 minutes.", username };

  if (!(await credentialsMatch(username, password))) {
    recent.push(now);
    fails.set(ip, recent);
    if (fails.size > 5000) fails.clear();
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "Wrong username or password.", username };
  }

  fails.delete(ip);
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_S,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ----------------------------------- Save ----------------------------------- */

export interface SaveInput {
  projects: unknown;
  /** Version of portfolio.json the editor was loaded from (git blob sha). */
  version: string;
  /** New screenshots, already converted to webp/jpeg in the browser. */
  uploads: { path: string; base64: string }[];
}

export type SaveResult =
  | { ok: true; version: string; commitUrl?: string; mode: "github" | "local" }
  | { ok: false; error: string; conflict?: boolean };

const UPLOAD_PATH_RE = /^\/projects\/[a-z0-9-]+\.(webp|jpg)$/;
const MAX_UPLOAD_BYTES = 1.5 * 1024 * 1024;
const MAX_TOTAL_UPLOAD_BYTES = 3 * 1024 * 1024;

const isWebp = (b: Buffer) => b.length > 12 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP";
const isJpeg = (b: Buffer) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;

export async function saveProjects(input: SaveInput): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, error: "Your session expired. Log in again." };

  const mode = storageMode();
  if (!mode) return { ok: false, error: "Saving is not configured (GITHUB_TOKEN / GITHUB_REPO missing)." };

  const { projects, issues } = validateProjects(input?.projects);
  if (issues.length) {
    const first = issues[0];
    const name = projects[first.index]?.title || `Project ${first.index + 1}`;
    return { ok: false, error: first.index >= 0 ? `${name}: ${first.message}` : first.message };
  }
  if (typeof input.version !== "string" || !input.version) return { ok: false, error: "Missing file version. Reload the page." };

  // Only keep uploads that a project actually points at.
  const referenced = new Set(projects.map((p) => p.image));
  const uploads: Upload[] = [];
  let total = 0;
  for (const u of Array.isArray(input.uploads) ? input.uploads : []) {
    if (typeof u?.path !== "string" || typeof u.base64 !== "string") continue;
    if (!UPLOAD_PATH_RE.test(u.path) || !referenced.has(u.path)) continue;
    const bytes = Buffer.from(u.base64, "base64");
    const okType = u.path.endsWith(".webp") ? isWebp(bytes) : isJpeg(bytes);
    if (!okType) return { ok: false, error: `${u.path} is not a valid image.` };
    if (bytes.length > MAX_UPLOAD_BYTES) return { ok: false, error: `${u.path} is larger than 1.5 MB.` };
    total += bytes.length;
    uploads.push({ path: u.path, bytes });
  }
  if (total > MAX_TOTAL_UPLOAD_BYTES) return { ok: false, error: "Too many new images in one save. Save after each one." };

  try {
    // Re-read so every other section of portfolio.json is kept exactly as it is in the repo.
    const { data } = await readPortfolio();
    const result = await writePortfolio(
      { ...data, projects },
      input.version,
      uploads,
      `Update projects via admin panel${uploads.length ? ` (+${uploads.length} image${uploads.length > 1 ? "s" : ""})` : ""}`
    );
    return { ok: true, mode, ...result };
  } catch (err) {
    if (err instanceof ConflictError) {
      return {
        ok: false,
        conflict: true,
        error: "portfolio.json was changed somewhere else since you opened the editor. Reload to get the latest version.",
      };
    }
    console.error("[admin] save failed", err);
    return { ok: false, error: "Saving failed. Check the GitHub token and repo settings, then try again." };
  }
}

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { PortfolioData } from "@/lib/portfolio";

/**
 * Where the admin panel reads and writes data/portfolio.json.
 *
 * - "github": reads the file from the repo and saves by committing to it (Netlify/Vercel redeploy on push).
 *   Needs GITHUB_TOKEN (fine-grained, Contents: read & write on this repo) and GITHUB_REPO ("owner/name").
 *   Optional GITHUB_BRANCH (default "main").
 * - "local": reads/writes the files on disk. Used automatically in `npm run dev` when no token is set,
 *   or on your own server with ADMIN_STORAGE=local. Does NOT work on Netlify/Vercel (files reset on every deploy).
 */

const JSON_PATH = "data/portfolio.json";

export type StorageMode = "github" | "local";

export interface Upload {
  /** Public path, e.g. "/projects/my-app-lx2k.webp" (stored at public/projects/...). */
  path: string;
  bytes: Buffer;
}

export interface SaveResult {
  version: string;
  commitUrl?: string;
}

export class ConflictError extends Error {}

export function storageMode(): StorageMode | null {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return "github";
  if (process.env.NODE_ENV !== "production" || process.env.ADMIN_STORAGE === "local") return "local";
  return null;
}

export const serialize = (data: PortfolioData) => JSON.stringify(data, null, 2) + "\n";

/** Same id git uses for a file's contents, so local and GitHub versions compare the same way. */
const gitBlobSha = (content: string | Buffer) => {
  const buf = typeof content === "string" ? Buffer.from(content, "utf8") : content;
  return createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");
};

/* ---------------------------------- GitHub ---------------------------------- */

const branch = () => process.env.GITHUB_BRANCH || "main";

async function gh<T>(endpoint: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}${endpoint}`, {
    method: init?.method ?? "GET",
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": "portfolio-admin",
    },
  });
  if (!res.ok) {
    // Only the final ref update can fail because someone else pushed first.
    if (init?.method === "PATCH" && (res.status === 409 || res.status === 422)) {
      throw new ConflictError("The branch changed while saving.");
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub ${res.status} on ${endpoint}: ${detail.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

async function githubRead(ref = branch()) {
  const file = await gh<{ sha: string; content: string }>(`/contents/${JSON_PATH}?ref=${encodeURIComponent(ref)}`);
  return { text: Buffer.from(file.content, "base64").toString("utf8"), version: file.sha };
}

/** One commit containing the JSON and any new images (one deploy per save). */
async function githubWrite(json: string, baseVersion: string, uploads: Upload[], message: string): Promise<SaveResult> {
  const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${branch()}`);
  const headSha = ref.object.sha;

  const current = await githubRead(headSha);
  if (current.version !== baseVersion) throw new ConflictError("portfolio.json changed since you opened the editor.");

  const head = await gh<{ tree: { sha: string } }>(`/git/commits/${headSha}`);

  const imageEntries = await Promise.all(
    uploads.map(async (u) => {
      const blob = await gh<{ sha: string }>("/git/blobs", {
        method: "POST",
        body: { content: u.bytes.toString("base64"), encoding: "base64" },
      });
      return { path: `public${u.path}`, mode: "100644", type: "blob", sha: blob.sha };
    })
  );

  const tree = await gh<{ sha: string }>("/git/trees", {
    method: "POST",
    body: {
      base_tree: head.tree.sha,
      tree: [{ path: JSON_PATH, mode: "100644", type: "blob", content: json }, ...imageEntries],
    },
  });

  const commit = await gh<{ sha: string; html_url: string }>("/git/commits", {
    method: "POST",
    body: { message, tree: tree.sha, parents: [headSha] },
  });

  // Non-force update: fails (-> ConflictError) if someone pushed in the meantime.
  await gh(`/git/refs/heads/${branch()}`, { method: "PATCH", body: { sha: commit.sha, force: false } });

  return { version: gitBlobSha(json), commitUrl: commit.html_url };
}

/* ----------------------------------- Local ---------------------------------- */

const root = () => process.cwd();

async function localRead() {
  const text = await fs.readFile(path.join(root(), JSON_PATH), "utf8");
  return { text, version: gitBlobSha(text) };
}

async function localWrite(json: string, baseVersion: string, uploads: Upload[]): Promise<SaveResult> {
  const current = await localRead();
  if (current.version !== baseVersion) throw new ConflictError("portfolio.json changed since you opened the editor.");

  for (const u of uploads) {
    const dest = path.join(root(), "public", u.path);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, u.bytes);
  }
  await fs.writeFile(path.join(root(), JSON_PATH), json, "utf8");
  return { version: gitBlobSha(json) };
}

/* ---------------------------------- Public ---------------------------------- */

export async function readPortfolio(): Promise<{ data: PortfolioData; version: string }> {
  const mode = storageMode();
  if (!mode) throw new Error("Admin storage is not configured.");
  const { text, version } = mode === "github" ? await githubRead() : await localRead();
  return { data: JSON.parse(text) as PortfolioData, version };
}

export async function writePortfolio(data: PortfolioData, baseVersion: string, uploads: Upload[], message: string) {
  const mode = storageMode();
  if (!mode) throw new Error("Admin storage is not configured.");
  const json = serialize(data);
  return mode === "github" ? githubWrite(json, baseVersion, uploads, message) : localWrite(json, baseVersion, uploads);
}

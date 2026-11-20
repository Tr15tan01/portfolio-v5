import { ICONS } from "@/lib/icons";
import type { Project } from "@/lib/portfolio";

/** Shared by the admin editor (inline errors) and the save action (final check). */

export interface Issue {
  index: number;
  field: keyof Project | "project";
  message: string;
}

export const LIMITS = {
  projects: 100,
  id: 60,
  title: 80,
  tagline: 120,
  description: 1000,
  category: 40,
  technologies: 20,
  technology: 40,
  url: 500,
} as const;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Local file under /public, e.g. "/projects/my-app.webp". No "..", no query strings. */
const IMAGE_RE = /^\/(?:[\w-]+\/)*[\w-]+(?:\.[\w-]+)*\.(?:webp|png|jpe?g|avif|gif)$/i;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.id) || "project";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const isHttpUrl = (v: string) => {
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

/** Normalises untrusted input into clean Project objects and lists anything that is wrong. */
export function validateProjects(input: unknown): { projects: Project[]; issues: Issue[] } {
  const issues: Issue[] = [];
  if (!Array.isArray(input)) return { projects: [], issues: [{ index: -1, field: "project", message: "Invalid data." }] };
  if (input.length > LIMITS.projects) {
    issues.push({ index: -1, field: "project", message: `At most ${LIMITS.projects} projects.` });
  }

  const seen = new Set<string>();
  const projects = input.slice(0, LIMITS.projects).map((raw, index): Project => {
    const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const add = (field: Issue["field"], message: string) => issues.push({ index, field, message });

    const p: Project = {
      id: str(r.id, LIMITS.id),
      title: str(r.title, LIMITS.title),
      tagline: str(r.tagline, LIMITS.tagline),
      description: str(r.description, LIMITS.description),
      technologies: Array.isArray(r.technologies)
        ? [...new Set(r.technologies.map((t) => str(t, LIMITS.technology)).filter(Boolean))].slice(0, LIMITS.technologies)
        : [],
      image: str(r.image, LIMITS.url),
      icon: str(r.icon, 40),
      category: str(r.category, LIMITS.category),
      live: str(r.live, LIMITS.url),
      featured: r.featured === true,
    };

    if (!p.title) add("title", "Title is required.");
    if (!p.id) add("id", "ID is required.");
    else if (!SLUG_RE.test(p.id)) add("id", "ID may only use lowercase letters, numbers and dashes.");
    else if (seen.has(p.id)) add("id", `ID "${p.id}" is used by another project.`);
    seen.add(p.id);
    if (!p.description) add("description", "Description is required.");
    if (!p.category) add("category", "Category is required.");
    if (!ICONS[p.icon]) add("icon", "Pick an icon from the list.");
    if (p.live && !isHttpUrl(p.live)) add("live", "Live link must start with https:// (or leave it empty).");
    if (p.image && !IMAGE_RE.test(p.image)) add("image", "Image must be a file under /public, e.g. /projects/my-app.webp.");

    return p;
  });

  return { projects, issues };
}

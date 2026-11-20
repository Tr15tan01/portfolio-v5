"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Copy,
  ExternalLink,
  ImagePlus,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { COVER_TINT, ProjectCard } from "@/components/sections/project-card";
import { LIMITS, slugify, validateProjects, type Issue } from "@/lib/admin/validate";
import { ICON_NAMES, getIcon } from "@/lib/icons";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { logout, saveProjects } from "./actions";

type Mode = "github" | "local";

/** Screenshot picked in this session. base64 is dropped once it has been saved. */
type PendingImage = { url: string; base64?: string };

type Status =
  | { type: "success"; message: string; commitUrl?: string }
  | { type: "error"; message: string; conflict?: boolean }
  | null;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-purple-400/60 focus:bg-white/[0.06] aria-[invalid=true]:border-red-400/60";

const iconButton =
  "inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-30";

const MAX_UPLOAD_BYTES = 1.5 * 1024 * 1024;

/* --------------------------------- Images --------------------------------- */

/** Resizes and re-encodes a screenshot in the browser so uploads stay small. WebP, or JPEG where WebP encoding is missing. */
async function compressImage(file: File): Promise<{ blob: Blob; ext: "webp" | "jpg" }> {
  const src = URL.createObjectURL(file);
  try {
    const img = document.createElement("img");
    img.src = src;
    await img.decode();

    for (const [maxWidth, quality] of [
      [1600, 0.82],
      [1280, 0.75],
      [1024, 0.7],
    ] as const) {
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);

      const toBlob = (type: string) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, quality));
      let blob = await toBlob("image/webp");
      let ext: "webp" | "jpg" = "webp";
      if (blob?.type !== "image/webp") {
        blob = await toBlob("image/jpeg");
        ext = "jpg";
      }
      if (blob && blob.size <= MAX_UPLOAD_BYTES) return { blob, ext };
    }
    throw new Error("Image is too large even after compressing.");
  } finally {
    URL.revokeObjectURL(src);
  }
}

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

/* ------------------------------ Small pieces ------------------------------ */

const Field = ({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {error}
      </p>
    ) : (
      hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
    )}
  </div>
);

const TagInput = ({
  id,
  value,
  onChange,
  suggestions,
}: {
  id: string;
  value: string[];
  onChange: (v: string[]) => void;
  suggestions: string[];
}) => {
  const [draft, setDraft] = useState("");

  const commit = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim().slice(0, LIMITS.technology))
      .filter(Boolean);
    if (parts.length) onChange([...new Set([...value, ...parts])].slice(0, LIMITS.technologies));
    setDraft("");
  };

  const move = (i: number, dir: -1 | 1) => {
    const next = [...value];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-purple-400/60">
      {value.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-1.5">
          {value.map((t, i) => (
            <li
              key={t}
              className="group/tag flex items-center gap-0.5 rounded-lg bg-purple-500/15 py-1 pr-1 pl-2.5 text-xs font-medium text-purple-200"
            >
              {t}
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className={cn(iconButton, "ml-1 h-5 w-5 disabled:hidden")}
                aria-label={`Move ${t} left`}
              >
                <ArrowUp className="h-3 w-3 -rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== t))}
                className={cn(iconButton, "h-5 w-5")}
                aria-label={`Remove ${t}`}
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        id={id}
        list={`${id}-list`}
        value={draft}
        onChange={(e) => (e.target.value.includes(",") ? commit(e.target.value) : setDraft(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => commit(draft)}
        placeholder={value.length >= LIMITS.technologies ? "Limit reached" : "Type and press Enter, e.g. Next.js"}
        disabled={value.length >= LIMITS.technologies}
        className="w-full bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-muted-foreground/50"
      />
      <datalist id={`${id}-list`}>
        {suggestions
          .filter((s) => !value.includes(s))
          .map((s) => (
            <option key={s} value={s} />
          ))}
      </datalist>
    </div>
  );
};

const IconPicker = ({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) => {
  const [query, setQuery] = useState("");
  const names = ICON_NAMES.filter((n) => n.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
      <div className="relative mb-2">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${ICON_NAMES.length} icons`}
          className="w-full rounded-lg bg-white/[0.04] py-2 pr-3 pl-8 text-sm outline-none placeholder:text-muted-foreground/50"
        />
      </div>
      <div role="radiogroup" aria-label="Icon" className="grid max-h-44 grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-1 overflow-y-auto pr-1">
        {names.map((name) => {
          const Icon = getIcon(name);
          const active = name === value;
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={active}
              title={name}
              aria-label={name}
              onClick={() => onChange(name)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg border transition-colors",
                active
                  ? "border-purple-400/70 bg-purple-500/25 text-purple-100"
                  : "border-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </button>
          );
        })}
        {names.length === 0 && <p className="col-span-full py-4 text-center text-sm text-muted-foreground">No icons match.</p>}
      </div>
    </div>
  );
};

/* --------------------------------- Editor --------------------------------- */

const blankProject = (id: string): Project => ({
  id,
  title: "New project",
  tagline: "",
  description: "",
  technologies: [],
  image: "",
  icon: "Sparkles",
  category: "",
  live: "",
  featured: false,
});

export const ProjectsEditor = ({
  initialProjects,
  initialVersion,
  mode,
}: {
  initialProjects: Project[];
  initialVersion: string;
  mode: Mode;
}) => {
  const [projects, setProjects] = useState(initialProjects);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initialProjects));
  const [version, setVersion] = useState(initialVersion);
  const [selected, setSelected] = useState(0);
  const [images, setImages] = useState<Record<string, PendingImage>>({});
  const [imageBusy, setImageBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [saving, startSaving] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const dirty = JSON.stringify(projects) !== savedJson;
  const current = projects[selected] as Project | undefined;

  const { issues } = useMemo(() => validateProjects(projects), [projects]);
  const issuesByIndex = useMemo(() => {
    const m = new Map<number, Issue[]>();
    for (const i of issues) m.set(i.index, [...(m.get(i.index) ?? []), i]);
    return m;
  }, [issues]);
  const fieldError = (field: Issue["field"]) => issuesByIndex.get(selected)?.find((i) => i.field === field)?.message;

  const allTech = useMemo(() => [...new Set(projects.flatMap((p) => p.technologies))].sort(), [projects]);
  const allCategories = useMemo(
    () => [...new Set([...Object.keys(COVER_TINT), ...projects.map((p) => p.category).filter(Boolean)])].sort(),
    [projects]
  );
  const featuredCount = projects.filter((p) => p.featured).length;

  /* ------------------------------ Mutations ------------------------------ */

  const update = (patch: Partial<Project>) =>
    setProjects((ps) => ps.map((p, i) => (i === selected ? { ...p, ...patch } : p)));

  const addProject = () => {
    const ids = new Set(projects.map((p) => p.id));
    let id = "new-project";
    for (let n = 2; ids.has(id); n++) id = `new-project-${n}`;
    setProjects((ps) => [blankProject(id), ...ps]);
    setSelected(0);
  };

  const moveProject = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    setProjects((ps) => {
      const next = [...ps];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    if (selected === i) setSelected(j);
    else if (selected === j) setSelected(i);
  };

  const deleteProject = (i: number) => {
    if (!window.confirm(`Delete "${projects[i].title || "Untitled"}"? It disappears from the site when you save.`)) return;
    setProjects((ps) => ps.filter((_, k) => k !== i));
    setSelected((s) => Math.max(0, s > i ? s - 1 : Math.min(s, projects.length - 2)));
  };

  const pickImage = async (file: File | undefined) => {
    if (!file || !current) return;
    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Please pick an image file." });
      return;
    }
    setImageBusy(true);
    try {
      const { blob, ext } = await compressImage(file);
      const path = `/projects/${slugify(current.id)}-${Date.now().toString(36)}.${ext}`;
      const base64 = await blobToBase64(blob);
      setImages((m) => ({ ...m, [path]: { url: URL.createObjectURL(blob), base64 } }));
      update({ image: path });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Could not read that image." });
    } finally {
      setImageBusy(false);
    }
  };

  /* --------------------------------- Save -------------------------------- */

  const save = () => {
    if (saving || !dirty) return;
    if (issues.length) {
      const first = issues[0];
      if (first.index >= 0) setSelected(first.index);
      setStatus({ type: "error", message: "Fix the highlighted fields before saving." });
      return;
    }

    const snapshot = projects;
    const referenced = new Set(snapshot.map((p) => p.image));
    const uploads = Object.entries(images)
      .filter(([path, img]) => img.base64 && referenced.has(path))
      .map(([path, img]) => ({ path, base64: img.base64! }));

    setStatus(null);
    startSaving(async () => {
      try {
        const res = await saveProjects({ projects: snapshot, version, uploads });
        if (!res.ok) {
          setStatus({ type: "error", message: res.error, conflict: res.conflict });
          return;
        }
        setVersion(res.version);
        setSavedJson(JSON.stringify(snapshot));
        setImages((m) =>
          Object.fromEntries(Object.entries(m).map(([k, v]) => [k, uploads.some((u) => u.path === k) ? { url: v.url } : v]))
        );
        setStatus({
          type: "success",
          message:
            res.mode === "github"
              ? "Saved to GitHub. The live site updates in about a minute, once Netlify finishes deploying."
              : "Saved to data/portfolio.json.",
          commitUrl: res.commitUrl,
        });
      } catch {
        setStatus({ type: "error", message: "Could not reach the server. Check your connection and try again." });
      }
    });
  };

  // Ctrl/Cmd+S saves; warn before leaving with unsaved changes.
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const imageSrc = (p: Project) => images[p.image]?.url ?? p.image;

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
          <div className="mr-auto min-w-0">
            <h1 className="text-lg font-black purple-gradient-text">Projects admin</h1>
            <p className="truncate text-xs text-muted-foreground">
              {mode === "github" ? "Saving commits to GitHub, then the site redeploys" : "Local mode: saves to data/portfolio.json"}
            </p>
          </div>

          {dirty && (
            <span className="hidden items-center gap-1.5 text-xs text-amber-300 sm:flex">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              Unsaved changes
            </span>
          )}

          <Link
            href="/projects"
            target="_blank"
            className={cn(iconButton, "h-10 gap-2 px-3 text-sm")}
            aria-label="View site (opens in new tab)"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">View site</span>
          </Link>
          <form action={logout}>
            <button type="submit" className={cn(iconButton, "h-10 gap-2 px-3 text-sm")} aria-label="Log out">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Log out</span>
            </button>
          </form>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            title="Save (Ctrl+S)"
            className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4">
        {status && (
          <div
            role={status.type === "error" ? "alert" : "status"}
            className={cn(
              "mt-4 flex flex-wrap items-start gap-3 rounded-xl border px-4 py-3 text-sm",
              status.type === "success"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                : "border-red-400/30 bg-red-500/10 text-red-100"
            )}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <p className="min-w-0 flex-1">
              {status.message}{" "}
              {status.type === "success" && status.commitUrl && (
                <a href={status.commitUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                  View commit
                </a>
              )}
            </p>
            {status.type === "error" && status.conflict && (
              <div className="order-last flex w-full gap-2 pl-7 sm:order-none sm:w-auto sm:pl-0">
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(JSON.stringify(projects, null, 2))}
                  className="flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-xs hover:bg-white/10"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy my edits
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-xs hover:bg-white/10"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Reload
                </button>
              </div>
            )}
            <button type="button" onClick={() => setStatus(null)} className={cn(iconButton, "h-6 w-6")} aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          {/* ------------------------------ List ------------------------------ */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                {projects.length} project{projects.length === 1 ? "" : "s"}
                <span className="ml-2 font-normal text-muted-foreground">· {featuredCount} on home page</span>
              </h2>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-1 rounded-lg bg-purple-500/15 px-2.5 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-500/25"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            <ol className="max-h-[50vh] space-y-1.5 overflow-y-auto pr-1 lg:max-h-[calc(100vh-10rem)]">
              {projects.map((p, i) => {
                const Icon = getIcon(p.icon);
                const active = i === selected;
                const hasIssues = issuesByIndex.has(i);
                return (
                  <li
                    key={i}
                    className={cn(
                      "flex items-center gap-1 rounded-xl border p-1.5 transition-colors",
                      active ? "border-purple-400/50 bg-purple-500/10" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-current={active}
                      className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg p-1 text-left"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                        <Icon className="h-4 w-4 text-purple-200" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{p.title || "Untitled"}</span>
                        <span className="block truncate text-xs text-muted-foreground">{p.category || "No category"}</span>
                      </span>
                      {hasIssues && <AlertCircle className="h-4 w-4 shrink-0 text-red-300" aria-label="Has errors" />}
                      {p.featured && <Star className="h-4 w-4 shrink-0 fill-amber-300 text-amber-300" aria-label="Featured" />}
                    </button>
                    <div className="flex flex-col">
                      <button type="button" onClick={() => moveProject(i, -1)} disabled={i === 0} className={cn(iconButton, "h-5 w-6")} aria-label={`Move ${p.title} up`}>
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProject(i, 1)}
                        disabled={i === projects.length - 1}
                        className={cn(iconButton, "h-5 w-6")}
                        aria-label={`Move ${p.title} down`}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Order here is the order on the site.</p>
          </aside>

          {/* ------------------------------ Form ------------------------------ */}
          {current ? (
            <section key={selected} aria-label={`Edit ${current.title}`} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="f-title" label="Title" error={fieldError("title")}>
                  <input
                    id="f-title"
                    value={current.title}
                    maxLength={LIMITS.title}
                    onChange={(e) => update({ title: e.target.value })}
                    aria-invalid={!!fieldError("title")}
                    className={inputClass}
                  />
                </Field>
                <Field id="f-id" label="ID" error={fieldError("id")} hint="Unique, lowercase-with-dashes. Used internally.">
                  <div className="flex gap-2">
                    <input
                      id="f-id"
                      value={current.id}
                      maxLength={LIMITS.id}
                      onChange={(e) => update({ id: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                      aria-invalid={!!fieldError("id")}
                      className={cn(inputClass, "font-mono")}
                    />
                    <button
                      type="button"
                      onClick={() => update({ id: slugify(current.title) })}
                      className={cn(iconButton, "h-[42px] w-[42px] shrink-0 border border-white/10")}
                      title="Generate from title"
                      aria-label="Generate ID from title"
                    >
                      <Wand2 className="h-4 w-4" />
                    </button>
                  </div>
                </Field>
              </div>

              <Field id="f-tagline" label="Tagline" hint="Short one-liner under the title, e.g. “AI interview coach”.">
                <input
                  id="f-tagline"
                  value={current.tagline}
                  maxLength={LIMITS.tagline}
                  onChange={(e) => update({ tagline: e.target.value })}
                  className={inputClass}
                />
              </Field>

              <Field
                id="f-description"
                label="Description"
                error={fieldError("description")}
                hint={`${current.description.length} / ${LIMITS.description} characters. 2–3 sentences work best.`}
              >
                <textarea
                  id="f-description"
                  rows={4}
                  value={current.description}
                  maxLength={LIMITS.description}
                  onChange={(e) => update({ description: e.target.value })}
                  aria-invalid={!!fieldError("description")}
                  className={cn(inputClass, "resize-y leading-relaxed")}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="f-category"
                  label="Category"
                  error={fieldError("category")}
                  hint={`Cover colour is set for: ${Object.keys(COVER_TINT).join(", ")}.`}
                >
                  <input
                    id="f-category"
                    list="f-category-list"
                    value={current.category}
                    maxLength={LIMITS.category}
                    onChange={(e) => update({ category: e.target.value })}
                    aria-invalid={!!fieldError("category")}
                    className={inputClass}
                  />
                  <datalist id="f-category-list">
                    {allCategories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field id="f-live" label="Live link" error={fieldError("live")} hint="Leave empty to hide the “Live demo” button.">
                  <input
                    id="f-live"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={current.live}
                    maxLength={LIMITS.url}
                    onChange={(e) => update({ live: e.target.value })}
                    aria-invalid={!!fieldError("live")}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field id="f-tech" label="Technologies" hint={`Shown as badges, in this order. Up to ${LIMITS.technologies}.`}>
                <TagInput id="f-tech" value={current.technologies} onChange={(technologies) => update({ technologies })} suggestions={allTech} />
              </Field>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span>
                  <span className="block text-sm font-medium">Featured on home page</span>
                  <span className="block text-xs text-muted-foreground">All projects are listed on /projects either way.</span>
                </span>
                <input
                  type="checkbox"
                  checked={current.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="relative h-6 w-11 shrink-0 rounded-full bg-white/15 transition-colors peer-checked:bg-purple-500 peer-focus-visible:ring-2 peer-focus-visible:ring-purple-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="f-icon" label="Icon" error={fieldError("icon")} hint={`Selected: ${current.icon}. Shown on the cover when there is no screenshot.`}>
                  <IconPicker id="f-icon" value={current.icon} onChange={(icon) => update({ icon })} />
                </Field>

                <Field id="f-image" label="Screenshot" error={fieldError("image")} hint="Optional. Resized to 1600px and converted to WebP automatically.">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                    <div className="relative mb-2 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/15 bg-black/20">
                      {current.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageSrc(current)} alt="" className="h-full w-full object-cover object-top" />
                      ) : (
                        <span className="text-xs text-muted-foreground">No screenshot, the icon cover is shown</span>
                      )}
                      {imageBusy && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </span>
                      )}
                    </div>
                    <input
                      ref={fileInput}
                      id="f-image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        void pickImage(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInput.current?.click()}
                        disabled={imageBusy}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-sm font-medium hover:bg-white/10 disabled:opacity-50"
                      >
                        <ImagePlus className="h-4 w-4" />
                        {current.image ? "Replace" : "Upload"}
                      </button>
                      {current.image && (
                        <button
                          type="button"
                          onClick={() => update({ image: "" })}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground"
                        >
                          <X className="h-4 w-4" /> Remove
                        </button>
                      )}
                    </div>
                    {current.image && <p className="mt-2 truncate font-mono text-[11px] text-muted-foreground">{current.image}</p>}
                  </div>
                </Field>
              </div>

              <div className="flex justify-end border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => deleteProject(selected)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" /> Delete project
                </button>
              </div>
            </section>
          ) : (
            <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-12 text-center">
              <p className="mb-4 text-muted-foreground">No projects yet.</p>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-2 rounded-xl bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-200 hover:bg-purple-500/25"
              >
                <Plus className="h-4 w-4" /> Add your first project
              </button>
            </section>
          )}

          {/* ----------------------------- Preview ---------------------------- */}
          {current && (
            <aside className="lg:col-start-2 xl:col-start-auto xl:sticky xl:top-24 xl:self-start">
              <h2 className="mb-3 text-sm font-semibold">Preview</h2>
              <div inert className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <ProjectCard project={{ ...current, image: current.image ? imageSrc(current) : "" }} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

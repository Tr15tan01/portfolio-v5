import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";
import { isPlaceholderUrl, type Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/** Cover tint per category. Literal class strings so Tailwind picks them up. */
const COVER_TINT: Record<string, string> = {
  AI: "from-violet-600/35 via-fuchsia-500/10 to-indigo-600/35",
  "E-commerce": "from-pink-600/30 via-rose-500/10 to-purple-600/35",
  EdTech: "from-sky-500/25 via-indigo-500/10 to-purple-600/35",
  Productivity: "from-emerald-500/20 via-teal-500/10 to-purple-600/35",
};
const DEFAULT_TINT = "from-purple-600/30 via-fuchsia-500/10 to-pink-600/30";

/** Shown until a screenshot is added: project icon on a tinted, dotted cover. */
const IconCover = ({ project }: { project: Project }) => {
  const Icon = getIcon(project.icon);

  return (
    <div
      className={cn(
        "project-cover absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br",
        COVER_TINT[project.category] ?? DEFAULT_TINT
      )}
      aria-hidden="true"
    >
      <div className="project-cover__dots" />
      <div className="project-cover__glow" />
      <div className="project-cover__icon relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-lg shadow-purple-950/40">
        <Icon className="h-10 w-10 text-purple-100" strokeWidth={1.6} />
      </div>
      <span className="relative text-sm font-semibold tracking-wide text-white/70">{project.title}</span>
    </div>
  );
};

export const ProjectCard = ({ project, priority = false }: { project: Project; priority?: boolean }) => {
  const hasLive = !isPlaceholderUrl(project.live);
  const inquiry = `Something like your "${project.title}" project`;

  return (
    <article className="group flex h-full flex-col p-5">
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-white/5">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <IconCover project={project} />
        )}
      </div>

      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold transition-colors group-hover:text-purple-300">{project.title}</h3>
        <Badge variant="outline" className="shrink-0 border-purple-400/25 bg-purple-500/10 text-purple-300">
          {project.category}
        </Badge>
      </div>

      {project.tagline && <p className="mb-3 text-sm font-medium text-purple-300/80">{project.tagline}</p>}

      <p className="mb-4 leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <Badge
              variant="secondary"
              className="bg-purple-500/10 text-purple-300 transition-colors hover:bg-purple-500/20"
            >
              {tech}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-3">
        {/* Turns interest in a project into a lead */}
        <Link
          href={`/?inquiry=${encodeURIComponent(inquiry)}#contact`}
          data-inquiry={inquiry}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-400/25 bg-purple-500/10 p-3 text-sm font-semibold text-purple-300 transition-colors hover:bg-purple-500/20"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Build one like this
        </Link>

        {hasLive && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ExternalLink
              className="h-4 w-4 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
              aria-hidden="true"
            />
            Live demo
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
};

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isPlaceholderUrl, type Project } from "@/lib/portfolio";

export const ProjectCard = ({ project, priority = false }: { project: Project; priority?: boolean }) => {
  const hasLive = !isPlaceholderUrl(project.live);
  const inquiry = `Something like your "${project.title}" project`;

  return (
    <article className="group flex h-full flex-col p-5">
      <div className="relative mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-pink-500/20">
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
          <span className="text-6xl transition-transform duration-500 group-hover:scale-110" role="img" aria-label={project.title}>
            {project.emoji}
          </span>
        )}
      </div>

      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
          {project.title}
        </h3>
        <Badge variant="outline" className="shrink-0 border-purple-400/25 bg-purple-500/10 text-purple-700 dark:text-purple-300">
          {project.category}
        </Badge>
      </div>

      <p className="mb-4 leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-3">
        {/* Replaces the old GitHub button: turns interest in a project into a lead */}
        <Link
          href={`/?inquiry=${encodeURIComponent(inquiry)}#contact`}
          data-inquiry={inquiry}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-400/25 bg-purple-500/10 p-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-500/20 dark:text-purple-300"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Build one like this
        </Link>

        {hasLive && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live demo
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
};

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagicCard } from "@/components/animations/magic-card";
import { ProjectCard } from "@/components/sections/project-card";
import { getFeaturedProjects } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export const ProjectsSection = () => {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          id="projects-title"
          title="Featured projects"
          subtitle="Recent work. Like one? Ask me to build something similar for your business."
        />

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <MagicCard key={project.id} className="reveal h-full">
              <ProjectCard project={project} />
            </MagicCard>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-400/30 px-7 py-3 font-semibold transition-colors hover:border-purple-400/60 hover:bg-purple-500/10"
          >
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

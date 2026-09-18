import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Layers, Palette } from "lucide-react";
import { MagicCard } from "@/components/animations/magic-card";
import { ProjectCard } from "@/components/sections/project-card";
import { getAllProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Websites, web apps and e-commerce projects built with Next.js, React and TypeScript.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const techCount = new Set(projects.flatMap((p) => p.technologies)).size;
  const categoryCount = new Set(projects.map((p) => p.category)).size;

  const stats = [
    { number: projects.length, label: "Projects", icon: Layers },
    { number: techCount, label: "Technologies", icon: Code },
    { number: categoryCount, label: "Categories", icon: Palette },
  ];

  return (
    <div className="container mx-auto px-4 pt-32 pb-12">
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="text-[clamp(3rem,10vw,6rem)] leading-none font-black tracking-tight purple-gradient-text">
          Projects
        </h1>
        <p className="enter mt-6 text-xl leading-relaxed text-muted-foreground">
          A selection of websites and apps I&apos;ve built. See something close to what you need? Hit{" "}
          <span className="font-semibold text-foreground">Build one like this</span> and I&apos;ll tell you how
          I&apos;d approach it for you.
        </p>

        <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <s.icon className="mb-2 h-5 w-5 text-purple-500" aria-hidden="true" />
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="order-1 text-3xl font-black purple-gradient-text">{s.number}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <MagicCard key={project.id} className="h-full">
            <ProjectCard project={project} priority={i < 3} />
          </MagicCard>
        ))}
      </div>

      <section className="reveal mx-auto mt-24 max-w-3xl rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-10 text-center">
        <h2 className="section-heading purple-gradient-text">Your project could be next</h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Tell me what you have in mind. I&apos;ll reply within 24 hours with questions or a fixed quote.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-purple-500/25 transition-transform hover:scale-[1.03]"
          >
            Get a free quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-purple-400/30 px-8 py-4 font-bold transition-colors hover:bg-purple-500/10"
          >
            See services
          </Link>
        </div>
      </section>
    </div>
  );
}

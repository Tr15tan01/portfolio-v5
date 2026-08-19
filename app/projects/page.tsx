import Link from "next/link";
import { Sparkles, Star, Zap, Layers, Code, Palette } from "lucide-react";
import { MagicCard } from "@/components/animations/magic-card";
import { ProjectCard } from "@/components/sections/project-card";
import { getAllProjects } from "@/lib/portfolio";

export const metadata = {
  title: "Projects - Portfolio",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const techCount = new Set(projects.flatMap((p) => p.technologies)).size;
  const categoryCount = new Set(projects.map((p) => p.category)).size;

  const stats = [
    { number: String(projects.length), label: "Total Projects", icon: Layers },
    { number: String(techCount), label: "Technologies", icon: Code },
    { number: String(categoryCount), label: "Categories", icon: Palette },
    { number: "100%", label: "Project Success Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Static geometry background - no JS animation, cheap to render */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px),
              linear-gradient(transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px)
            `,
            backgroundSize: "261.8px 261.8px",
          }}
        />
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-300/20 rounded-lg animate-float" />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-300/20 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 shadow-lg mb-8">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio Collection
            </span>
            <Star className="h-5 w-5 text-pink-400" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              PROJECTS
            </span>
            <span className="block text-3xl md:text-4xl font-bold text-muted-foreground mt-4">
              Digital Creations & Innovations
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A curated collection of{" "}
            <span className="text-purple-400 font-medium">
              {projects.length} projects
            </span>{" "}
            showcasing expertise in{" "}
            <span className="text-pink-400 font-medium">
              modern web technologies
            </span>{" "}
            and{" "}
            <span className="text-violet-400 font-medium">
              innovative solutions
            </span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <MagicCard key={project.id} className="h-full">
              <ProjectCard project={project} />
            </MagicCard>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-400/20">
              <Zap className="h-5 w-5 text-purple-400" />
              <span className="text-lg font-semibold text-foreground">
                Want to see more?
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let&apos;s build something amazing
              </span>
              <br />
              <span className="text-muted-foreground text-xl">together</span>
            </h3>

            <p className="text-muted-foreground max-w-lg">
              Have a project in mind? Let&apos;s discuss how we can bring your
              ideas to life with cutting-edge technology and creative solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                href="/"
                className="px-8 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-purple-400/30 text-foreground font-semibold hover:bg-purple-500/10 transition-transform duration-300 hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/portfolio";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="border-0 bg-background/50 backdrop-blur-sm h-full transition-colors duration-300 hover:bg-background/70 group">
      <CardContent className="p-6">
        <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-48 relative flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Falls back to the emoji tile if the image file isn't there yet
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-5xl opacity-60">{project.emoji}</span>
          )}
        </div>

        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 text-xs bg-purple-500/10 text-purple-400 border-purple-400/20"
          >
            {project.category}
          </Badge>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            className="flex-1 p-3 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-400/20 transition-colors duration-300 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium">Code</span>
            </div>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-colors duration-300 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">Live Demo</span>
            </div>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

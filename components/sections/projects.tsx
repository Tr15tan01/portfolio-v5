"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/animations/magic-card";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with real-time inventory and payment processing.",
    technologies: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: "/project1.jpg",
    github: "#",
    live: "#",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content creation tool with advanced NLP capabilities.",
    technologies: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "/project2.jpg",
    github: "#",
    live: "#",
  },
  {
    title: "Health & Fitness App",
    description:
      "Comprehensive fitness tracking application with workout plans and progress analytics.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    image: "/project3.jpg",
    github: "#",
    live: "#",
  },
];

export const ProjectsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion
            for development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <MagicCard className="h-full">
                <Card className="border-0 bg-background/50 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center"
                    >
                      <div className="text-4xl">🚀</div>
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

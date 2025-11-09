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
    live: "https://next-store-pi-nine.vercel.app/",
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
    title: "Task Manager Percentage",
    description:
      "Comprehensive Task Manager app with completed percentage and progress analytics.",
    technologies: ["Nextjs", "TailwindCss", "ShadcnUi", "TypeScript"],
    image: "/project3.jpg",
    github: "#",
    live: "https://tasksreminderapp.netlify.app/",
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
        ease: "easeOut" as const,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
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
                <Card className="border-0 bg-background/50 backdrop-blur-sm h-full hover:bg-background/70 transition-all duration-500">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-48 flex items-center justify-center group"
                    >
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-500">
                        🚀
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20 hover:bg-purple-500/20 transition-colors"
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
                        className="p-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-400/20 transition-all duration-300"
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Interested in seeing more?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Portfolio
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

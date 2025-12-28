"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/animations/magic-card";
import {
  ExternalLink,
  Github,
  Star,
  Zap,
  Sparkles,
  Layers,
  Code,
  Palette,
  Store,
  Brain,
  CheckCircle,
  BarChart3,
  Activity,
  Link2,
  Users,
  Box,
  Compass,
  Heart,
  Music,
  Home,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with real-time inventory and payment processing.",
    technologies: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: "/project1.jpg",
    github: "#",
    live: "#",
    icon: <Store className="h-8 w-8" />,
    category: "Full Stack",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content creation tool with advanced NLP capabilities.",
    technologies: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "/project2.jpg",
    github: "#",
    live: "#",
    icon: <Brain className="h-8 w-8" />,
    category: "AI/ML",
  },
  {
    title: "Task Manager App",
    description:
      "Comprehensive Task Manager app with completed percentage and progress analytics.",
    technologies: ["Next.js", "TypeScript", "ShadcnUI", "Prisma"],
    image: "/project3.jpg",
    github: "#",
    live: "#",
    icon: <CheckCircle className="h-8 w-8" />,
    category: "Web App",
  },
  {
    title: "Real-Time Dashboard",
    description:
      "Interactive dashboard with real-time data visualization and analytics.",
    technologies: ["React", "D3.js", "Socket.io", "Express"],
    image: "/project4.jpg",
    github: "#",
    live: "#",
    icon: <BarChart3 className="h-8 w-8" />,
    category: "Data Viz",
  },
  {
    title: "Mobile Fitness App",
    description:
      "Cross-platform fitness tracking application with workout plans.",
    technologies: ["React Native", "Firebase", "Redux", "GraphQL"],
    image: "/project5.jpg",
    github: "#",
    live: "#",
    icon: <Activity className="h-8 w-8" />,
    category: "Mobile",
  },
  {
    title: "Blockchain Explorer",
    description:
      "Cryptocurrency explorer with wallet integration and transaction tracking.",
    technologies: ["Web3.js", "Solidity", "Ethers.js", "IPFS"],
    image: "/project6.jpg",
    github: "#",
    live: "#",
    icon: <Link2 className="h-8 w-8" />,
    category: "Web3",
  },
  {
    title: "Social Media Platform",
    description:
      "Feature-rich social platform with real-time chat and media sharing.",
    technologies: ["Next.js", "PostgreSQL", "Redis", "WebRTC"],
    image: "/project7.jpg",
    github: "#",
    live: "#",
    icon: <Users className="h-8 w-8" />,
    category: "Social",
  },
  {
    title: "AR Shopping Experience",
    description:
      "Augmented Reality shopping app with 3D product visualization.",
    technologies: ["Three.js", "AR.js", "React", "Node.js"],
    image: "/project8.jpg",
    github: "#",
    live: "#",
    icon: <Box className="h-8 w-8" />,
    category: "AR/VR",
  },
  {
    title: "Travel Planner",
    description:
      "Intelligent travel planning platform with itinerary generation.",
    technologies: ["Vue.js", "Python", "MongoDB", "Mapbox"],
    image: "/project9.jpg",
    github: "#",
    live: "#",
    icon: <Compass className="h-8 w-8" />,
    category: "Travel",
  },
  {
    title: "Medical Records System",
    description: "Secure medical records management with HIPAA compliance.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    image: "/project10.jpg",
    github: "#",
    live: "#",
    icon: <Heart className="h-8 w-8" />,
    category: "Healthcare",
  },
  {
    title: "Music Streaming Service",
    description:
      "High-quality music streaming with personalized recommendations.",
    technologies: ["React", "Node.js", "Redis", "AWS S3"],
    image: "/project11.jpg",
    github: "#",
    live: "#",
    icon: <Music className="h-8 w-8" />,
    category: "Media",
  },
  {
    title: "IoT Home Automation",
    description: "Smart home automation system with device integration.",
    technologies: ["Python", "MQTT", "React Native", "Raspberry Pi"],
    image: "/project12.jpg",
    github: "#",
    live: "#",
    icon: <Home className="h-8 w-8" />,
    category: "IoT",
  },
];

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Add CSS animations to globals.css or in a style tag */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px) translateX(15px);
            opacity: 0.9;
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(35px) translateX(-20px) rotate(180deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes scale-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes scale-pulse-delayed {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInStagger {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse 25s linear infinite;
          animation-delay: 5s;
        }

        .animate-scale-pulse {
          animation: scale-pulse 20s ease-in-out infinite;
        }

        .animate-scale-pulse-delayed {
          animation: scale-pulse-delayed 25s ease-in-out infinite;
          animation-delay: 5s;
        }

        .animate-text-shimmer {
          background-size: 200% 100%;
          animation: shimmer 8s linear infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in-stagger {
          opacity: 0;
          animation: fadeInStagger 0.6s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        .stagger-delay-1 {
          animation-delay: 0.1s;
        }
        .stagger-delay-2 {
          animation-delay: 0.2s;
        }
        .stagger-delay-3 {
          animation-delay: 0.3s;
        }
        .stagger-delay-4 {
          animation-delay: 0.4s;
        }
        .stagger-delay-5 {
          animation-delay: 0.5s;
        }
        .stagger-delay-6 {
          animation-delay: 0.6s;
        }
      `}</style>

      {/* Sacred Geometry Background Elements */}
      <div className="absolute inset-0">
        {/* Golden Ratio Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px),
                linear-gradient(transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px)
              `,
              backgroundSize: "261.8px 261.8px",
            }}
          />
        </div>

        {/* Floating Sacred Geometry Shapes - CSS Animations */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-300/20 rounded-lg animate-spin-slow animate-scale-pulse" />

        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-300/20 rounded-full animate-spin-reverse-slow animate-scale-pulse-delayed" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 shadow-lg mb-8 hover:scale-105 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 active:scale-95">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio Collection
            </span>
            <Star className="h-5 w-5 text-pink-400" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-text-shimmer">
              PROJECTS
            </span>
            <span className="block text-3xl md:text-4xl font-bold text-muted-foreground mt-4">
              Digital Creations & Innovations
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed hover:scale-101 transition-transform">
            A curated collection of{" "}
            <span className="text-purple-400 font-medium">
              12 digital projects
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
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            {[
              {
                number: "12",
                label: "Total Projects",
                icon: <Layers className="h-5 w-5" />,
              },
              {
                number: "8",
                label: "Technologies",
                icon: <Code className="h-5 w-5" />,
              },
              {
                number: "6",
                label: "Categories",
                icon: <Palette className="h-5 w-5" />,
              },
              {
                number: "100%",
                label: "Code Quality",
                icon: <Star className="h-5 w-5" />,
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase mt-1">
                  {stat.label}
                </div>
                <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-3 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`animate-fade-in-stagger stagger-delay-${
                (index % 6) + 1
              }`}
            >
              <MagicCard className="h-full">
                <Card className="border-0 bg-background/50 backdrop-blur-sm h-full hover:bg-background/70 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    {/* Project Icon & Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:rotate-180 transition-all duration-600">
                        {project.icon}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Project Image Placeholder */}
                    <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-48 flex items-center justify-center group/image">
                      <div className="text-6xl group-hover/image:scale-110 transition-transform duration-500 opacity-50">
                        {index % 3 === 0 ? "🚀" : index % 3 === 1 ? "✨" : "💫"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>

                    {/* Project Title & Description */}
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="flex-1 p-3 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-400/20 transition-all duration-300 text-center group/link hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Github className="h-4 w-4 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-medium">Code</span>
                        </div>
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-center group/link hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-4 w-4 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-medium">Live Demo</span>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </MagicCard>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="text-center mt-20 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
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
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
              >
                Get In Touch
              </a>
              <Link
                href="/"
                className="px-8 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-purple-400/30 text-foreground font-semibold hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - CSS Animations */}
      <div className="absolute top-1/4 right-16 w-3 h-3 bg-purple-400 rounded-full shadow-lg animate-float" />
      <div className="absolute bottom-1/4 left-16 w-4 h-4 bg-pink-400 rounded-lg shadow-lg animate-float-delayed" />

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-slow">
        <div className="w-8 h-14 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 shadow-lg">
          <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3 animate-bounce-slow" />
        </div>
      </div>

      {/* Background Protection Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}

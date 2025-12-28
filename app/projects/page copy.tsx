// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MagicCard } from "@/components/animations/magic-card";
// import {
//   ExternalLink,
//   Github,
//   Star,
//   Zap,
//   Sparkles,
//   Layers,
//   Code,
//   Palette,
//   Store,
//   Brain,
//   CheckCircle,
//   BarChart3,
//   Activity,
//   Link2,
//   Users,
//   Box,
//   Compass,
//   Heart,
//   Music,
//   Home,
// } from "lucide-react";

// const projects = [
//   {
//     title: "E-Commerce Platform",
//     description:
//       "A modern e-commerce solution with real-time inventory and payment processing.",
//     technologies: ["Next.js", "Stripe", "Prisma", "Tailwind"],
//     image: "/project1.jpg",
//     github: "#",
//     live: "#",
//     icon: <Store className="h-8 w-8" />,
//     category: "Full Stack",
//   },
//   {
//     title: "AI Content Generator",
//     description:
//       "AI-powered content creation tool with advanced NLP capabilities.",
//     technologies: ["React", "OpenAI", "Node.js", "MongoDB"],
//     image: "/project2.jpg",
//     github: "#",
//     live: "#",
//     icon: <Brain className="h-8 w-8" />,
//     category: "AI/ML",
//   },
//   {
//     title: "Task Manager App",
//     description:
//       "Comprehensive Task Manager app with completed percentage and progress analytics.",
//     technologies: ["Next.js", "TypeScript", "ShadcnUI", "Prisma"],
//     image: "/project3.jpg",
//     github: "#",
//     live: "#",
//     icon: <CheckCircle className="h-8 w-8" />,
//     category: "Web App",
//   },
//   {
//     title: "Real-Time Dashboard",
//     description:
//       "Interactive dashboard with real-time data visualization and analytics.",
//     technologies: ["React", "D3.js", "Socket.io", "Express"],
//     image: "/project4.jpg",
//     github: "#",
//     live: "#",
//     icon: <BarChart3 className="h-8 w-8" />,
//     category: "Data Viz",
//   },
//   {
//     title: "Mobile Fitness App",
//     description:
//       "Cross-platform fitness tracking application with workout plans.",
//     technologies: ["React Native", "Firebase", "Redux", "GraphQL"],
//     image: "/project5.jpg",
//     github: "#",
//     live: "#",
//     icon: <Activity className="h-8 w-8" />,
//     category: "Mobile",
//   },
//   {
//     title: "Blockchain Explorer",
//     description:
//       "Cryptocurrency explorer with wallet integration and transaction tracking.",
//     technologies: ["Web3.js", "Solidity", "Ethers.js", "IPFS"],
//     image: "/project6.jpg",
//     github: "#",
//     live: "#",
//     icon: <Link2 className="h-8 w-8" />,
//     category: "Web3",
//   },
//   {
//     title: "Social Media Platform",
//     description:
//       "Feature-rich social platform with real-time chat and media sharing.",
//     technologies: ["Next.js", "PostgreSQL", "Redis", "WebRTC"],
//     image: "/project7.jpg",
//     github: "#",
//     live: "#",
//     icon: <Users className="h-8 w-8" />,
//     category: "Social",
//   },
//   {
//     title: "AR Shopping Experience",
//     description:
//       "Augmented Reality shopping app with 3D product visualization.",
//     technologies: ["Three.js", "AR.js", "React", "Node.js"],
//     image: "/project8.jpg",
//     github: "#",
//     live: "#",
//     icon: <Box className="h-8 w-8" />,
//     category: "AR/VR",
//   },
//   {
//     title: "Travel Planner",
//     description:
//       "Intelligent travel planning platform with itinerary generation.",
//     technologies: ["Vue.js", "Python", "MongoDB", "Mapbox"],
//     image: "/project9.jpg",
//     github: "#",
//     live: "#",
//     icon: <Compass className="h-8 w-8" />,
//     category: "Travel",
//   },
//   {
//     title: "Medical Records System",
//     description: "Secure medical records management with HIPAA compliance.",
//     technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
//     image: "/project10.jpg",
//     github: "#",
//     live: "#",
//     icon: <Heart className="h-8 w-8" />,
//     category: "Healthcare",
//   },
//   {
//     title: "Music Streaming Service",
//     description:
//       "High-quality music streaming with personalized recommendations.",
//     technologies: ["React", "Node.js", "Redis", "AWS S3"],
//     image: "/project11.jpg",
//     github: "#",
//     live: "#",
//     icon: <Music className="h-8 w-8" />,
//     category: "Media",
//   },
//   {
//     title: "IoT Home Automation",
//     description: "Smart home automation system with device integration.",
//     technologies: ["Python", "MQTT", "React Native", "Raspberry Pi"],
//     image: "/project12.jpg",
//     github: "#",
//     live: "#",
//     icon: <Home className="h-8 w-8" />,
//     category: "IoT",
//   },
// ];

// export default function ProjectsPage() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut" as const,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Sacred Geometry Background Elements */}
//       <div className="absolute inset-0">
//         {/* Golden Ratio Grid Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div
//             className="w-full h-full"
//             style={{
//               backgroundImage: `
//                 linear-gradient(90deg, transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px),
//                 linear-gradient(transparent 161px, rgba(139, 92, 246, 0.1) 161px, transparent 162px)
//               `,
//               backgroundSize: "261.8px 261.8px",
//             }}
//           />
//         </div>

//         {/* Floating Sacred Geometry Shapes */}
//         <motion.div
//           className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-300/20 rounded-lg"
//           animate={{
//             rotate: 360,
//             scale: [1, 1.1, 1],
//             opacity: [0.1, 0.3, 0.1],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />

//         <motion.div
//           className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-300/20 rounded-full"
//           animate={{
//             rotate: -360,
//             scale: [1, 1.2, 1],
//             opacity: [0.1, 0.4, 0.1],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear",
//             delay: 5,
//           }}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 py-20">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           {/* Animated Badge */}
//           <motion.div
//             className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 shadow-lg mb-8"
//             whileHover={{
//               scale: 1.05,
//               y: -2,
//               boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Sparkles className="h-5 w-5 text-purple-400" />
//             <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Portfolio Collection
//             </span>
//             <Star className="h-5 w-5 text-pink-400" />
//           </motion.div>

//           <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
//             <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-text-shimmer">
//               PROJECTS
//             </span>
//             <span className="block text-3xl md:text-4xl font-bold text-muted-foreground mt-4">
//               Digital Creations & Innovations
//             </span>
//           </h1>

//           <motion.p
//             className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
//             whileHover={{ scale: 1.01 }}
//           >
//             A curated collection of{" "}
//             <span className="text-purple-400 font-medium">
//               12 digital projects
//             </span>{" "}
//             showcasing expertise in{" "}
//             <span className="text-pink-400 font-medium">
//               modern web technologies
//             </span>{" "}
//             and{" "}
//             <span className="text-violet-400 font-medium">
//               innovative solutions
//             </span>
//           </motion.p>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12"
//           >
//             {[
//               {
//                 number: "12",
//                 label: "Total Projects",
//                 icon: <Layers className="h-5 w-5" />,
//               },
//               {
//                 number: "8",
//                 label: "Technologies",
//                 icon: <Code className="h-5 w-5" />,
//               },
//               {
//                 number: "6",
//                 label: "Categories",
//                 icon: <Palette className="h-5 w-5" />,
//               },
//               {
//                 number: "100%",
//                 label: "Code Quality",
//                 icon: <Star className="h-5 w-5" />,
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 className="text-center group"
//                 whileHover={{ y: -5, scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 group-hover:scale-110 transition-transform duration-300">
//                   {stat.icon}
//                 </div>
//                 <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase mt-1">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Projects Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {projects.map((project, index) => (
//             <motion.div key={index} variants={cardVariants}>
//               <MagicCard className="h-full">
//                 <Card className="border-0 bg-background/50 backdrop-blur-sm h-full hover:bg-background/70 transition-all duration-500 group">
//                   <CardContent className="p-6">
//                     {/* Project Icon & Category */}
//                     <div className="flex items-start justify-between mb-4">
//                       <motion.div
//                         whileHover={{ rotate: 360 }}
//                         transition={{ duration: 0.6 }}
//                         className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20"
//                       >
//                         {project.icon}
//                       </motion.div>
//                       <Badge
//                         variant="outline"
//                         className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20"
//                       >
//                         {project.category}
//                       </Badge>
//                     </div>

//                     {/* Project Image Placeholder */}
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-48 flex items-center justify-center group/image"
//                     >
//                       <div className="text-6xl group-hover/image:scale-110 transition-transform duration-500 opacity-50">
//                         {index % 3 === 0 ? "🚀" : index % 3 === 1 ? "✨" : "💫"}
//                       </div>
//                       <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
//                     </motion.div>

//                     {/* Project Title & Description */}
//                     <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-purple-400 transition-colors">
//                       {project.title}
//                     </h3>
//                     <p className="text-muted-foreground mb-4 leading-relaxed">
//                       {project.description}
//                     </p>

//                     {/* Technologies */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {project.technologies.map((tech, techIndex) => (
//                         <Badge
//                           key={techIndex}
//                           variant="secondary"
//                           className="text-xs bg-purple-500/10 text-purple-400 border-purple-400/20 hover:bg-purple-500/20 transition-colors"
//                         >
//                           {tech}
//                         </Badge>
//                       ))}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3">
//                       <motion.a
//                         href={project.github}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="flex-1 p-3 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-400/20 transition-all duration-300 text-center group/link"
//                       >
//                         <div className="flex items-center justify-center gap-2">
//                           <Github className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
//                           <span className="text-sm font-medium">Code</span>
//                         </div>
//                       </motion.a>
//                       <motion.a
//                         href={project.live}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex-1 p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-center group/link"
//                       >
//                         <div className="flex items-center justify-center gap-2">
//                           <ExternalLink className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
//                           <span className="text-sm font-medium">Live Demo</span>
//                         </div>
//                       </motion.a>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </MagicCard>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Footer CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="text-center mt-20"
//         >
//           <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 max-w-2xl mx-auto">
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-400/20">
//               <Zap className="h-5 w-5 text-purple-400" />
//               <span className="text-lg font-semibold text-foreground">
//                 Want to see more?
//               </span>
//             </div>

//             <h3 className="text-2xl md:text-3xl font-bold">
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Let&apos;s build something amazing
//               </span>
//               <br />
//               <span className="text-muted-foreground text-xl">together</span>
//             </h3>

//             <p className="text-muted-foreground max-w-lg">
//               Have a project in mind? Let&apos;s discuss how we can bring your
//               ideas to life with cutting-edge technology and creative solutions.
//             </p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4"
//               whileHover={{ scale: 1.02 }}
//             >
//               <motion.a
//                 href="#contact"
//                 className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get In Touch
//               </motion.a>
//               <motion.a
//                 href="/"
//                 className="px-8 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-purple-400/30 text-foreground font-semibold hover:bg-purple-500/10 transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Back to Home
//               </motion.a>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Floating Elements */}
//       <motion.div
//         className="absolute top-1/4 right-16 w-3 h-3 bg-purple-400 rounded-full shadow-lg"
//         animate={{
//           y: [0, -40, 0],
//           x: [0, 15, 0],
//           scale: [1, 1.8, 1],
//           opacity: [0.4, 0.9, 0.4],
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-1/4 left-16 w-4 h-4 bg-pink-400 rounded-lg shadow-lg"
//         animate={{
//           y: [0, 35, 0],
//           x: [0, -20, 0],
//           rotate: [0, 180, 360],
//           scale: [1, 1.6, 1],
//         }}
//         transition={{
//           duration: 7,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       {/* Background Protection Layer */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
//     </div>
//   );
// }

// this is page wirh framer motion, i changed it because it is very cpu-heavy

// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Download, ArrowRight, Sparkles, Star } from "lucide-react";

// export const HeroSection = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   return (
//     <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
//       {/* Animated Background */}
//       <div className="absolute inset-0 particle-bg" />

//       {/* Floating Shapes */}
//       <div className="absolute inset-0 floating-shapes">
//         <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-purple-400 rounded-full animate-cosmic-float opacity-60" />
//         <div
//           className="absolute top-3/4 right-1/4 w-4 h-4 bg-pink-400 rounded-full animate-cosmic-float opacity-40"
//           style={{ animationDelay: "-2s" }}
//         />
//         <div
//           className="absolute top-1/2 left-1/3 w-8 h-8 bg-purple-300 rounded-lg animate-cosmic-float opacity-50"
//           style={{ animationDelay: "-1s" }}
//         />
//       </div>

//       {/* Gradient Orbs */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />
//       <div
//         className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-600/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-glow"
//         style={{ animationDelay: "-1.5s" }}
//       />

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="text-center space-y-8 max-w-6xl mx-auto px-4 relative z-10"
//       >
//         {/* Animated Badge */}
//         <motion.div
//           variants={itemVariants}
//           className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-morphism border border-white/10"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
//           <span className="text-sm font-medium purple-gradient-text">
//             Welcome to My Creative Universe
//           </span>
//           <Star className="h-4 w-4 text-pink-400 animate-pulse" />
//         </motion.div>

//         {/* Main Heading */}
//         <motion.div variants={itemVariants} className="space-y-4">
//           <motion.h1
//             className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <span className="block purple-gradient-text animate-text-shimmer">
//               CREATIVE
//             </span>
//             <span
//               className="block purple-gradient-text animate-text-shimmer"
//               style={{ animationDelay: "0.5s" }}
//             >
//               DEVELOPER
//             </span>
//           </motion.h1>
//         </motion.div>

//         {/* Description */}
//         <motion.div variants={itemVariants}>
//           <motion.p
//             className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
//             whileHover={{ scale: 1.01 }}
//           >
//             Crafting{" "}
//             <span className="text-purple-400 font-semibold">
//               digital experiences
//             </span>{" "}
//             with modern technologies and{" "}
//             <span className="text-pink-400 font-semibold">
//               sophisticated animations
//             </span>
//           </motion.p>
//         </motion.div>

//         {/* Animated Buttons */}
//         <motion.div
//           variants={itemVariants}
//           className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//         >
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               size="lg"
//               className="shimmer-button group relative text-lg px-8 py-6 rounded-2xl border-0 text-white font-semibold"
//             >
//               <span className="relative z-10 flex items-center">
//                 Explore My Work
//                 <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </span>
//             </Button>
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               size="lg"
//               variant="outline"
//               className="group text-lg px-8 py-6 rounded-2xl border-2 border-purple-300/30 bg-background/50 backdrop-blur-sm hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300"
//             >
//               <Download className="mr-3 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
//               Download CV
//             </Button>
//           </motion.div>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           variants={itemVariants}
//           className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
//         >
//           {[
//             { number: "50+", label: "Projects" },
//             { number: "3+", label: "Years Exp" },
//             { number: "100%", label: "Satisfaction" },
//           ].map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               className="text-center"
//               whileHover={{ y: -5 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className="text-2xl md:text-3xl font-bold purple-gradient-text">
//                 {stat.number}
//               </div>
//               <div className="text-sm text-muted-foreground font-medium">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           variants={itemVariants}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-sm glass-morphism">
//             <motion.div
//               className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Additional Floating Elements */}
//       <motion.div
//         className="absolute top-1/3 right-20 w-4 h-4 bg-purple-300 rounded-full"
//         animate={{
//           y: [0, -30, 0],
//           x: [0, 20, 0],
//           scale: [1, 1.5, 1],
//           opacity: [0.3, 0.8, 0.3],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <motion.div
//         className="absolute bottom-1/3 left-20 w-6 h-6 bg-pink-300 rounded-lg"
//         animate={{
//           y: [0, 40, 0],
//           x: [0, -30, 0],
//           rotate: [0, 180, 360],
//           scale: [1, 0.8, 1],
//         }}
//         transition={{
//           duration: 5,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />
//     </section>
//   );
// };

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Sparkles, Star } from "lucide-react";

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
      {" "}
      {/* Added padding top */}
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

        {/* Floating Sacred Geometry Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-300/20 rounded-lg"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-300/20 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />

        {/* Phi Ratio Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "38.2%",
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            left: "61.8%",
          }}
        />
      </div>
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-purple border border-white/10 shadow-lg"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-lg font-semibold purple-gradient-text">
              Enter the Realm of Digital Artistry
            </span>
            <Star className="h-5 w-5 text-pink-400" />
          </motion.div>

          {/* Main Heading with Sacred Geometry Inspiration */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="block purple-gradient-text animate-text-shimmer bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
                CREATIVE
              </span>
              <span
                className="block purple-gradient-text animate-text-shimmer bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500"
                style={{ animationDelay: "0.3s" }}
              >
                ARCHITECT
              </span>
            </motion.h1>
          </motion.div>

          {/* Sacred Geometry Inspired Description */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light"
              whileHover={{ scale: 1.01 }}
            >
              Where{" "}
              <span className="text-purple-400 font-medium">
                mathematical precision
              </span>{" "}
              meets{" "}
              <span className="text-pink-400 font-medium">
                creative expression
              </span>{" "}
              in the{" "}
              <span className="text-violet-400 font-medium">digital realm</span>
            </motion.p>
          </motion.div>

          {/* Golden Ratio Button Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                size="lg"
                className="shimmer-button group relative text-xl px-12 py-8 rounded-3xl border-0 text-white font-bold shadow-2xl"
              >
                <span className="relative z-10 flex items-center">
                  Explore My Universe
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="group text-xl px-12 py-8 rounded-3xl border-3 border-purple-400/30 bg-background/60 backdrop-blur-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <Download className="mr-4 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
                Download Portfolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Sacred Geometry Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-12 max-w-2xl mx-auto pt-16"
          >
            {[
              { number: "61.8", label: "Golden Ratio", symbol: "φ" },
              { number: "50+", label: "Sacred Projects", symbol: "✦" },
              { number: "100%", label: "Divine Satisfaction", symbol: "♾️" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-4xl font-black purple-gradient-text mb-2">
                  {stat.number}
                  <span className="text-lg ml-1 opacity-70">{stat.symbol}</span>
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-3 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      {/* Sacred Geometry Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-16 w-3 h-3 bg-purple-400 rounded-full shadow-lg"
        animate={{
          y: [0, -40, 0],
          x: [0, 15, 0],
          scale: [1, 1.8, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-16 w-4 h-4 bg-pink-400 rounded-lg shadow-lg"
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      {/* Background Protection Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
      {/* Fixed Scroll Indicator - Always Visible */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-14 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-xl glass-purple shadow-lg">
          <motion.div
            className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

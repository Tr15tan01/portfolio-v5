"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/animations/magic-card";
import { Download, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8 max-w-4xl mx-auto px-4"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MagicCard className="p-1">
              <div className="px-4 py-2 text-sm bg-background rounded-lg">
                👋 Welcome to my portfolio
              </div>
            </MagicCard>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          Creative Developer
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          I craft digital experiences with modern technologies and beautiful
          animations
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button size="lg" className="group">
            View My Work
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="group">
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            Download CV
          </Button>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-foreground rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

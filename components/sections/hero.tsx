"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Sparkles, Star } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const HeroSection = () => {
  const { hero } = portfolio;

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20"
    >
      {/* Static grid pattern - no JS animation cost */}
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

      {/* Two subtle CSS-only floating shapes (cheap, GPU-only, respects reduced motion via globals.css) */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-300/20 rounded-lg animate-float" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-300/20 rounded-full animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Main content - single entrance animation, plays once, no infinite loops */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-purple border border-white/10 shadow-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-lg font-semibold purple-gradient-text">
              {hero.badgeText}
            </span>
            <Star className="h-5 w-5 text-pink-400" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <span className="block purple-gradient-text">
                {hero.headlineTop}
              </span>
              <span className="block purple-gradient-text">
                {hero.headlineBottom}
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              {hero.description}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button
              asChild
              size="lg"
              className="group relative text-xl px-12 py-8 rounded-3xl border-0 text-white font-bold shadow-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Link href={hero.primaryButton.href}>
                {hero.primaryButton.label}
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group text-xl px-12 py-8 rounded-3xl border-2 border-purple-400/30 bg-background/60 backdrop-blur-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <a href={hero.secondaryButton.href} download>
                <Download className="mr-4 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
                {hero.secondaryButton.label}
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-12 max-w-2xl mx-auto pt-16"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl md:text-4xl font-black purple-gradient-text mb-2">
                  {stat.number}
                  <span className="text-lg ml-1 opacity-70">
                    {stat.symbol}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-3 transition-all duration-500" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-80% to-background pointer-events-none" />
    </section>
  );
};

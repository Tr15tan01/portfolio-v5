"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Award,
  Clock,
  Users,
  Sparkles,
  Rocket,
  Heart,
  Zap,
} from "lucide-react";

export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const stats = [
    {
      icon: Clock,
      value: "3+",
      label: "Years Excellence",
      description: "Mastering digital craftsmanship",
    },
    {
      icon: Users,
      value: "50+",
      label: "Happy Clients",
      description: "Worldwide satisfaction",
    },
    {
      icon: Award,
      value: "100%",
      label: "Success Rate",
      description: "Projects delivered on time",
    },
    {
      icon: Rocket,
      value: "24/7",
      label: "Creative Fuel",
      description: "Passion never sleeps",
    },
  ];

  const principles = [
    {
      icon: Heart,
      title: "Driven by Passion",
      description:
        "I don't just write code—I breathe life into digital experiences. Every project is a masterpiece waiting to happen.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Staying ahead of the curve with cutting-edge technologies and forward-thinking solutions that set new standards.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Sparkles,
      title: "Pixel Perfection",
      description:
        "Obsessive attention to detail. Every animation, every interaction, every pixel matters in creating magic.",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section id="about" className="min-h-screen relative py-20 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        {/* Animated Nebula */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Code Elements */}
        {["</>", "{ }", "=>", "⚡"].map((symbol, index) => (
          <motion.div
            key={symbol}
            className="absolute text-purple-400/20 font-mono text-2xl font-bold"
            style={{
              top: `${20 + index * 15}%`,
              left: `${80 + index * 5}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Introduction */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/20 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-lg font-semibold purple-gradient-text">
                The Architect Behind the Magic
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-size-200 animate-gradient-shift">
                Crafting
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent bg-size-200 animate-gradient-shift"
                style={{ animationDelay: "0.3s" }}
              >
                Digital
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-size-200 animate-gradient-shift"
                style={{ animationDelay: "0.6s" }}
              >
                Legends
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              I don&apos;t build websites—I create{" "}
              <span className="text-purple-400 font-semibold">
                digital experiences
              </span>{" "}
              that captivate, innovate, and{" "}
              <span className="text-pink-400 font-semibold">
                transform businesses
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={itemVariants}
              >
                <Card className="glass-purple border-purple-200/20 hover:border-purple-400/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                  <CardContent className="p-6">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <h3 className="text-3xl font-black purple-gradient-text mb-2">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Passion Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h2
                className="text-4xl md:text-5xl font-black purple-gradient-text mb-6"
                whileHover={{ x: 10 }}
              >
                Why Work With Me?
              </motion.h2>

              <motion.div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <motion.p whileHover={{ scale: 1.01 }}>
                  When you choose to work with me, you&apos;re not just hiring a
                  developer—you&apos;re gaining a{" "}
                  <span className="text-purple-400 font-semibold">
                    strategic partner
                  </span>{" "}
                  who&apos;s as invested in your success as you are.
                </motion.p>

                <motion.p whileHover={{ scale: 1.01 }}>
                  I bridge the gap between{" "}
                  <span className="text-pink-400 font-semibold">
                    vision and reality
                  </span>
                  , transforming complex ideas into elegant, user-loving digital
                  solutions that don&apos;t just meet expectations—they shatter
                  them.
                </motion.p>

                <motion.p whileHover={{ scale: 1.01 }}>
                  My approach is simple: understand your{" "}
                  <span className="text-violet-400 font-semibold">
                    deepest goals
                  </span>
                  , anticipate your needs before you do, and deliver solutions
                  that not only work flawlessly but tell your unique story in
                  ways that resonate and convert.
                </motion.p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-6"
              >
                <Button
                  size="lg"
                  className="shimmer-button group text-lg px-8 py-6 rounded-2xl border-0 text-white font-bold shadow-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    Let&apos;s Build Your Legacy
                    <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Core Principles */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h3
                className="text-3xl font-black purple-gradient-text mb-8"
                whileHover={{ x: -10 }}
              >
                My Creative Philosophy
              </motion.h3>

              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-gradient-to-br from-background/50 to-background/30 border-l-4 border-purple-400/50 hover:border-purple-400 transition-all duration-500">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-br ${principle.color} shadow-lg flex-shrink-0`}
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <principle.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-xl text-foreground group-hover:text-purple-400 transition-colors mb-2">
                              {principle.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl p-12 border border-purple-200/20"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="purple-gradient-text">Ready to Create</span>
              <br />
              <span
                className="purple-gradient-text"
                style={{ animationDelay: "0.3s" }}
              >
                Something Epic?
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Your next groundbreaking project is waiting. Let&apos;s combine
              your vision with my expertise to build something that not only
              succeeds but dominates.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="shimmer-button group text-lg px-8 py-6 rounded-2xl border-0 text-white font-bold shadow-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <Sparkles className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group text-lg px-8 py-6 rounded-2xl border-2 border-purple-400/30 bg-background/50 backdrop-blur-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-500"
                >
                  <Download className="mr-3 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  Download Portfolio
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Inspirational Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20 pt-12 border-t border-purple-200/10"
          >
            <motion.p
              className="text-2xl text-muted-foreground italic max-w-3xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              &quot;I don&apos;t just write code—I architect experiences that
              users fall in love with and competitors wish they&apos;d thought
              of first.&quot;
            </motion.p>
            <motion.div
              className="flex justify-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

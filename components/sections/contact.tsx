"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";

export const ContactSection = () => {
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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@creative.dev",
      description: "Direct line to my inbox",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco",
      description: "Available worldwide",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com",
      color: "hover:bg-purple-500/20",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "hover:bg-blue-500/20",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:bg-sky-500/20",
    },
  ];

  return (
    <section id="contact" className="min-h-screen relative py-20">
      {/* Background Elements - More Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 79px, #8b5cf6 79px, transparent 80px),
                linear-gradient(transparent 79px, #8b5cf6 79px, transparent 80px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-6 h-6 border border-purple-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-pink-400/30 rounded-lg"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Header - New Design */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/20 mb-8"
              whileHover={{
                scale: 1.05,
                background:
                  "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))",
              }}
            >
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span className="text-lg font-semibold purple-gradient-text">
                Ready to Create Magic?
              </span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-7xl font-black mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-size-200 animate-gradient-shift">
                Let&apos;s Talk
              </span>
            </motion.h2>

            <motion.p
              className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              Your vision, my expertise. Let&apos;s build something{" "}
              <span className="text-purple-400 font-semibold">
                extraordinary
              </span>{" "}
              together.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Contact Information - Sidebar Style */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Cards - Vertical Stack */}
              <div className="space-y-6">
                {/* {contactInfo.map((item, index) => ( */}
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-gradient-to-br from-background/50 to-background/30 border-l-4 border-purple-400/50 hover:border-purple-400 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className="h-5 w-5 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-foreground text-lg group-hover:text-purple-400 transition-colors mb-1">
                              {item.title}
                            </h4>
                            <p className="text-foreground/80 font-medium text-sm">
                              {item.value}
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links - Compact Grid */}
              <motion.div variants={itemVariants} className="pt-6">
                <h4 className="font-bold text-foreground text-lg mb-4">
                  Follow the Journey
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className={`p-4 rounded-xl bg-background/50 border border-purple-200/20 text-muted-foreground ${social.color} hover:text-foreground transition-all duration-300 flex flex-col items-center gap-2 group`}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={itemVariants}
                      custom={index}
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Main Focus */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <Card className="bg-gradient-to-br from-background/60 to-background/40 border border-purple-200/30 shadow-2xl backdrop-blur-xl">
                <CardContent className="p-8">
                  <motion.form
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-foreground"
                        >
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="bg-background/70 border-2 border-purple-200/30 focus:border-purple-400 focus:bg-background transition-all duration-300 placeholder:text-muted-foreground/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-foreground"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-background/70 border-2 border-purple-200/30 focus:border-purple-400 focus:bg-background transition-all duration-300 placeholder:text-muted-foreground/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-foreground"
                      >
                        Project Type
                      </label>
                      <Input
                        id="subject"
                        placeholder="Web App, Mobile, Design, etc."
                        className="bg-background/70 border-2 border-purple-200/30 focus:border-purple-400 focus:bg-background transition-all duration-300 placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-foreground"
                      >
                        Your Vision *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your project, timeline, and what you're looking to achieve..."
                        rows={6}
                        className="bg-background/70 border-2 border-purple-200/30 focus:border-purple-400 focus:bg-background resize-none transition-all duration-300 placeholder:text-muted-foreground/60 leading-relaxed"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-500 group"
                      >
                        <span className="flex items-center justify-center text-lg">
                          Launch Project
                          <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>

                    <motion.p
                      className="text-center text-sm text-muted-foreground pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Typically reply within{" "}
                      <span className="text-purple-400 font-semibold">
                        24 hours
                      </span>
                    </motion.p>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer Quote */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20 pt-12 border-t border-purple-200/10"
          >
            <motion.p
              className="text-lg text-muted-foreground italic max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              &quot;Every great design begins with an even better story.&quot;
              <span className="block text-sm text-purple-400 mt-2 not-italic">
                - Let&apos;s write yours together
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

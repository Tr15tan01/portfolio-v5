"use client";

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
  const stats = [
    {
      icon: Clock,
      value: "8+",
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
      {/* CSS Animations */}
      <style jsx>{`
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scalePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scale-pulse {
          animation: scalePulse 8s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 10s linear infinite;
        }

        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradientShift 3s linear infinite;
        }

        .animate-bounce-delayed {
          animation: bounce 2s ease-in-out infinite;
        }

        .shimmer-button {
          background: linear-gradient(
            90deg,
            #8b5cf6 0%,
            #d946ef 50%,
            #8b5cf6 100%
          );
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animate-stagger > *:nth-child(1) {
          transition-delay: 0.1s;
        }
        .animate-stagger > *:nth-child(2) {
          transition-delay: 0.2s;
        }
        .animate-stagger > *:nth-child(3) {
          transition-delay: 0.3s;
        }
        .animate-stagger > *:nth-child(4) {
          transition-delay: 0.4s;
        }
        .animate-stagger > *:nth-child(5) {
          transition-delay: 0.5s;
        }
        .animate-stagger > *:nth-child(6) {
          transition-delay: 0.6s;
        }

        .hover-scale:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease-out;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
          transition: all 0.3s ease-out;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
          transition: box-shadow 0.3s ease-out;
        }

        /* Performance optimizations */
        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Cosmic Background */}
      <div className="absolute inset-0">
        {/* Animated Nebula */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-scale-pulse opacity-40" />

        {/* Floating Code Elements */}
        {["</>", "{ }", "=>", "⚡"].map((symbol, index) => (
          <div
            key={symbol}
            className="absolute text-purple-400/20 font-mono text-2xl font-bold animate-float"
            style={{
              top: `${20 + index * 15}%`,
              left: `${80 + index * 5}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: `${10 + index * 2}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-6xl mx-auto animate-on-scroll"
          id="scroll-container"
        >
          {/* Hero Introduction */}
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/20 mb-8 hover-scale">
              <Sparkles className="h-5 w-5 text-purple-400 animate-bounce-delayed" />
              <span className="text-lg font-semibold purple-gradient-text">
                The Architect Behind the Magic
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight hover-scale">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                Crafting
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-shift"
                style={{ animationDelay: "0.3s" }}
              >
                Digital
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift"
                style={{ animationDelay: "0.6s" }}
              >
                Legends
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed hover-scale">
              I don&apos;t build websites—I create{" "}
              <span className="text-purple-400 font-semibold">
                digital experiences
              </span>{" "}
              that captivate, innovate, and{" "}
              <span className="text-pink-400 font-semibold">
                transform businesses
              </span>
              .
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-stagger">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-on-scroll"
              >
                <Card className="glass-purple border-purple-200/20 hover:border-purple-400/40 transition-all duration-500 hover-lift">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500 group-hover:animate-rotate">
                      <stat.icon className="h-6 w-6 text-purple-400" />
                    </div>
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
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Passion Story */}
            <div className="space-y-6 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-black purple-gradient-text mb-6 hover-scale">
                Why Work With Me?
              </h2>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p className="hover-scale">
                  When you choose to work with me, you&apos;re not just hiring a
                  developer—you&apos;re gaining a{" "}
                  <span className="text-purple-400 font-semibold">
                    strategic partner
                  </span>{" "}
                  who&apos;s as invested in your success as you are.
                </p>

                <p className="hover-scale">
                  I bridge the gap between{" "}
                  <span className="text-pink-400 font-semibold">
                    vision and reality
                  </span>
                  , transforming complex ideas into elegant, user-loving digital
                  solutions that don&apos;t just meet expectations—they shatter
                  them.
                </p>

                <p className="hover-scale">
                  My approach is simple: understand your{" "}
                  <span className="text-violet-400 font-semibold">
                    deepest goals
                  </span>
                  , anticipate your needs before you do, and deliver solutions
                  that not only work flawlessly but tell your unique story in
                  ways that resonate and convert.
                </p>
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  className="shimmer-button group text-lg px-8 py-6 rounded-2xl border-0 text-white font-bold shadow-2xl hover-glow hover-scale"
                >
                  <span className="relative z-10 flex items-center">
                    Let&apos;s Build Your Legacy
                    <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Core Principles */}
            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-3xl font-black purple-gradient-text mb-8 hover-scale">
                My Creative Philosophy
              </h3>

              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <div
                    key={principle.title}
                    className="group cursor-pointer animate-on-scroll"
                    style={{ transitionDelay: `${index * 0.2}s` }}
                  >
                    <Card className="bg-gradient-to-br from-background/50 to-background/30 border-l-4 border-purple-400/50 hover:border-purple-400 transition-all duration-500 hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${principle.color} shadow-lg flex-shrink-0 group-hover:animate-rotate`}
                          >
                            <principle.icon className="h-6 w-6 text-white" />
                          </div>
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl p-12 border border-purple-200/20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-black mb-6 hover-scale">
              <span className="purple-gradient-text">Ready to Create</span>
              <br />
              <span
                className="purple-gradient-text"
                style={{ animationDelay: "0.3s" }}
              >
                Something Epic?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto hover-scale">
              Your next groundbreaking project is waiting. Let&apos;s combine
              your vision with my expertise to build something that not only
              succeeds but dominates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div>
                <Button
                  size="lg"
                  className="shimmer-button group text-lg px-8 py-6 rounded-2xl border-0 text-white font-bold shadow-2xl hover-glow hover-scale"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <Sparkles className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </Button>
              </div>

              <div>
                <Button
                  size="lg"
                  variant="outline"
                  className="group text-lg px-8 py-6 rounded-2xl border-2 border-purple-400/30 bg-background/50 backdrop-blur-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-500 hover-glow hover-scale"
                >
                  <Download className="mr-3 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  Download Portfolio
                </Button>
              </div>
            </div>
          </div>

          {/* Inspirational Footer */}
          <div className="text-center mt-20 pt-12 border-t border-purple-200/10 animate-on-scroll">
            <p className="text-2xl text-muted-foreground italic max-w-3xl mx-auto hover-scale">
              &quot;I don&apos;t just write code—I architect experiences that
              users fall in love with and competitors wish they&apos;d thought
              of first.&quot;
            </p>
            <div className="flex justify-center gap-6 mt-8 animate-fade-in">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-scale-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Observer Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('in-view');
                    }
                  });
                },
                { threshold: 0.1, rootMargin: '-100px' }
              );

              document.querySelectorAll('.animate-on-scroll').forEach((el) => {
                observer.observe(el);
              });
            })();
          `,
        }}
      />
    </section>
  );
};

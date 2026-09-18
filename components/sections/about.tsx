import Link from "next/link";
import { Heart, Zap, Sparkles, ArrowRight, FolderOpen } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";

const principles = [
  {
    icon: Heart,
    title: "Driven by passion",
    description:
      "I don't just write code, I care how it feels to use. Every project gets the attention I'd give my own product.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Modern, proven tech",
    description:
      "I use current, well-supported tools so your site is fast today and easy to maintain and extend tomorrow.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Sparkles,
    title: "Pixel perfection",
    description:
      "Details matter: spacing, loading states, mobile layouts, accessibility. That polish is what makes visitors trust you.",
    color: "from-blue-500 to-cyan-500",
  },
];

export const AboutSection = () => {
  const { about, site } = portfolio;

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(168_85_247/0.12),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Intro */}
          <div className="reveal mb-16 text-center">
            <p className="glass-purple mb-8 inline-flex items-center gap-3 rounded-2xl px-6 py-3">
              <Sparkles className="h-5 w-5 text-purple-500" aria-hidden="true" />
              <span className="font-semibold purple-gradient-text">The developer behind the work</span>
            </p>

            <h2 id="about-title" className="text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-black tracking-tight purple-gradient-text">
              Crafting digital
              <br />
              experiences
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              I&apos;m {site.name.split(" ")[0]}, a {site.role.toLowerCase()} in {site.location}. I don&apos;t
              just build websites, I build{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">digital experiences</span> that
              help{" "}
              <span className="font-semibold text-pink-600 dark:text-pink-400">businesses grow</span>.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-20 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {about.stats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div key={stat.label} className="reveal lift glass-purple rounded-2xl p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Icon className="h-6 w-6 text-purple-500" aria-hidden="true" />
                  </div>
                  <p className="text-3xl font-black purple-gradient-text">{stat.value}</p>
                  <p className="mt-1 font-semibold">{stat.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
                </div>
              );
            })}
          </div>

          {/* Story + principles */}
          <div className="mb-20 grid items-start gap-12 lg:grid-cols-2">
            <div className="reveal space-y-6">
              <h3 className="section-heading purple-gradient-text">Why work with me?</h3>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  You&apos;re not just hiring a developer, you&apos;re getting a{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">partner</span> who&apos;s as
                  invested in the result as you are.
                </p>
                <p>
                  I bridge the gap between{" "}
                  <span className="font-semibold text-pink-600 dark:text-pink-400">vision and reality</span>, turning
                  complex ideas into clear, easy-to-use products.
                </p>
                <p>
                  My approach is simple: understand your goals, communicate clearly, and ship work that performs,
                  on time and within budget.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Tools I work with</h4>
                <ul className="flex flex-wrap gap-2">
                  {about.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/25 transition-transform hover:scale-[1.03]"
              >
                Let&apos;s talk about your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-6">
              <h3 className="reveal text-3xl font-black purple-gradient-text">My approach</h3>
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="reveal lift glass-purple rounded-2xl border-l-4 border-l-purple-400/60 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 rounded-xl bg-gradient-to-br ${p.color} p-3 shadow-lg`}>
                      <p.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-bold">{p.title}</h4>
                      <p className="leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="reveal rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 p-8 text-center md:p-12">
            <h3 className="section-heading purple-gradient-text">Ready to create something great?</h3>
            <p className="mx-auto mt-6 mb-8 max-w-2xl text-xl text-muted-foreground">
              Tell me about your idea. You&apos;ll get an honest opinion, a plan and a fixed quote, free and with no
              obligation.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/25 transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Start your project
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </Link>
              {/* Replaces the old "Download Portfolio" button (there was no file behind it) */}
              <Link
                href="/projects"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-purple-400/30 bg-background/50 px-8 py-4 text-lg font-bold transition-colors hover:border-purple-400/60 hover:bg-purple-500/10 sm:w-auto"
              >
                <FolderOpen className="h-5 w-5 text-purple-500" aria-hidden="true" />
                Browse all projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

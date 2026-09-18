import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export const HeroSection = () => {
  const { hero, site } = portfolio;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Two quiet floating shapes, CSS only */}
      <div className="absolute top-28 left-[8%] hidden h-28 w-28 rounded-lg border-2 border-purple-300/20 animate-float md:block" aria-hidden="true" />
      <div
        className="absolute right-[8%] bottom-24 hidden h-20 w-20 rounded-full border-2 border-pink-300/20 animate-float md:block"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        {site.availability.available && (
          <Link
            href="/#contact"
            className="enter glass-purple inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:border-purple-400/40"
            style={delay(0)}
          >
            <span className="status-dot h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden="true" />
            <span>{site.availability.text}</span>
            <ArrowRight className="h-4 w-4 opacity-60" aria-hidden="true" />
          </Link>
        )}

        {/* h1 is the LCP element: rendered visible immediately, no entrance animation */}
        <h1 className="mt-10 text-[clamp(3.25rem,13vw,9rem)] leading-[0.9] font-black tracking-tight">
          <span className="block purple-gradient-text">{hero.headlineTop}</span>
          <span className="block purple-gradient-text">{hero.headlineBottom}</span>
          <span className="sr-only"> | {site.name}, {site.role}</span>
        </h1>

        <p
          className="enter mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
          style={delay(120)}
        >
          {hero.description}
        </p>

        <div
          className="enter mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={delay(220)}
        >
          <Link
            href={hero.primaryButton.href}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-9 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/25 transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            {hero.primaryButton.label}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href={hero.secondaryButton.href}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-purple-400/30 bg-background/60 px-9 py-4 text-lg font-bold transition-colors duration-300 hover:border-purple-400/60 hover:bg-purple-500/10 sm:w-auto"
          >
            <FolderOpen className="h-5 w-5 text-purple-500" aria-hidden="true" />
            {hero.secondaryButton.label}
          </Link>
        </div>

        <dl
          className="enter mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 md:gap-12"
          style={delay(320)}
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-xs font-medium text-muted-foreground md:text-sm">{stat.label}</dt>
              <dd className="text-3xl font-black purple-gradient-text md:text-4xl">{stat.number}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
    </section>
  );
};

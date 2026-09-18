import { portfolio } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export const ProcessSection = () => (
  <section id="process" aria-labelledby="process-title" className="py-24">
    <div className="container mx-auto px-4">
      <SectionHeader
        id="process-title"
        title="How we'll work together"
        subtitle="A simple, transparent process. You always know what's happening and what it costs."
      />

      <ol className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {portfolio.process.map((step, i) => (
          <li key={step.title} className="reveal glass-purple relative rounded-2xl p-6">
            <span
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-black text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

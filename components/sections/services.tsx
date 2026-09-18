import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "./section-header";

export const ServicesSection = () => (
  <section id="services" aria-labelledby="services-title" className="py-24">
    <div className="container mx-auto px-4">
      <SectionHeader
        id="services-title"
        title="How I can help"
        subtitle="Pick what you need, or tell me the problem and I'll suggest the simplest thing that solves it."
      />

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {portfolio.services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <article
              key={service.title}
              className="reveal lift glass-purple group flex flex-col rounded-2xl p-7 hover:border-purple-400/40"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-3 shadow-lg shadow-purple-500/20">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>

              <Link
                href={`/?inquiry=${encodeURIComponent(service.title)}#contact`}
                data-inquiry={service.title}
                className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400"
              >
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

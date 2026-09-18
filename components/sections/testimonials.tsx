import { Quote } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

/** Renders only when testimonials exist in data/portfolio.json. */
export const TestimonialsSection = () => {
  const items = portfolio.testimonials;
  if (!items.length) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader id="testimonials-title" title="What clients say" />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="reveal glass-purple flex flex-col rounded-2xl p-7">
              <Quote className="mb-4 h-8 w-8 text-purple-500/60" aria-hidden="true" />
              <blockquote className="flex-1 text-lg leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-6">
                {t.url ? (
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                    {t.name}
                  </a>
                ) : (
                  <span className="font-bold">{t.name}</span>
                )}
                <span className="block text-sm text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

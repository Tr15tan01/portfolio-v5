import { ChevronDown } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export const FaqSection = () => {
  const faq = portfolio.faq;
  if (!faq.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4">
        <SectionHeader id="faq-title" title="Questions clients ask" />

        {/* Native <details>: accessible, works without JavaScript */}
        <div className="mx-auto max-w-3xl space-y-3">
          {faq.map((item) => (
            <details key={item.question} className="reveal glass-purple group rounded-2xl">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-lg font-semibold">
                {item.question}
                <ChevronDown
                  className="faq-chevron h-5 w-5 shrink-0 text-purple-500 transition-transform duration-300"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

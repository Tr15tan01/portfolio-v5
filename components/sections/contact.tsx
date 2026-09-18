import { CalendarCheck, MessageCircle, Send } from "lucide-react";
import {
  getSocialLinks,
  getTelegramUrl,
  getWhatsappUrl,
  isPlaceholderUrl,
  portfolio,
} from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { ContactForm } from "./contact-form";
import { CopyButton } from "./copy-button";
import { SectionHeader } from "./section-header";

export const ContactSection = () => {
  const { contact, site } = portfolio;
  const socials = getSocialLinks();
  const whatsapp = getWhatsappUrl();
  const telegram = getTelegramUrl();
  const booking = isPlaceholderUrl(contact.bookingUrl) ? "" : contact.bookingUrl;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          id="contact-title"
          title="Let's talk"
          subtitle={
            <>
              Tell me what you need. I reply within{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">{site.responseTime}</span> with
              questions or a quote.
            </>
          }
        />

        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-5">
          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-2">
            {contact.info.map((item) => {
              const Icon = getIcon(item.icon);
              const isEmail = item.icon === "Mail";
              return (
                <div key={item.title} className="glass-purple rounded-2xl border-l-4 border-l-purple-400/60 p-5">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">{item.title}</h3>
                      {isEmail ? (
                        <a href={`mailto:${item.value}`} className="block truncate text-sm font-medium hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    {isEmail && <CopyButton value={item.value} label="Copy email address" />}
                  </div>
                </div>
              );
            })}

            {(booking || whatsapp || telegram) && (
              <div className="glass-purple space-y-3 rounded-2xl p-5">
                <h3 className="font-bold">Prefer to chat?</h3>
                {booking && (
                  <a
                    href={booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Book a free 20-min call
                  </a>
                )}
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 font-semibold transition-colors hover:bg-green-500/20"
                  >
                    <MessageCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                    Message on WhatsApp
                  </a>
                )}
                {telegram && (
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 font-semibold transition-colors hover:bg-sky-500/20"
                  >
                    <Send className="h-5 w-5 text-sky-500" aria-hidden="true" />
                    Message on Telegram
                  </a>
                )}
              </div>
            )}

            {socials.length > 0 && (
              <div>
                <h3 className="mb-3 font-bold">Find me online</h3>
                <ul className="flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <li key={s.name}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="glass-purple flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:border-purple-400/50"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {s.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

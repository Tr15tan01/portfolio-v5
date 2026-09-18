import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSocialLinks, portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";

export const Footer = () => {
  const { site, nav } = portfolio;
  const socials = getSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-purple-400/15 bg-background/60">
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="text-2xl font-black purple-gradient-text">
              {nav.brand}
            </Link>
            <p className="mt-3 max-w-xs text-muted-foreground">
              {site.role} in {site.location}. Websites and web apps that bring you customers.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-3 font-bold">Pages</h2>
            <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
              {nav.items.map((i) => (
                <li key={i.name}>
                  <Link href={i.href} className="hover:text-foreground">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-bold">Have a project in mind?</h2>
            <a href={`mailto:${site.email}`} className="block text-muted-foreground hover:text-foreground">
              {site.email}
            </a>
            <Link
              href="/#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 font-semibold text-white"
            >
              Get a free quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={s.name}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 text-muted-foreground transition-colors hover:border-purple-400/50 hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-6xl border-t border-purple-400/10 pt-6 text-sm text-muted-foreground">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

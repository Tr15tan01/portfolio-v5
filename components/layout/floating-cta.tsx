"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsappUrl, portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/**
 * Sticky "Hire me" pill that appears once the visitor scrolls past the hero,
 * and hides while the contact section is on screen (no point showing it there).
 */
export const FloatingCta = () => {
  const [scrolled, setScrolled] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const whatsapp = getWhatsappUrl();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setContactVisible(visible.size > 0);
    });
    if (contact) io.observe(contact);
    if (footer) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = scrolled && !contactVisible;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-40 flex items-center gap-2 transition-all duration-300 md:right-6 md:bottom-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
      aria-hidden={!show}
    >
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          aria-label="Message on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
      <Link
        href={portfolio.nav.ctaHref}
        tabIndex={show ? 0 : -1}
        className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 font-semibold text-white shadow-xl shadow-purple-500/30 transition-transform hover:scale-105"
      >
        <span className="status-dot h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
        {portfolio.nav.ctaLabel}
      </Link>
    </div>
  );
};

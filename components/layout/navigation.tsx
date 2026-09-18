"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { brand, items, ctaLabel, ctaHref } = portfolio.nav;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isScrolled || open ? "border-b bg-background/85 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 py-4" aria-label="Main">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black purple-gradient-text" onClick={close}>
            {brand}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform hover:scale-105"
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 rounded-lg p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="space-y-1 pt-4 pb-2 md:hidden">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={close}
                className="block rounded-lg px-3 py-3 text-lg font-medium text-foreground/85 hover:bg-purple-500/10"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={close}
              className="mt-3 block rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 text-center font-semibold text-white"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

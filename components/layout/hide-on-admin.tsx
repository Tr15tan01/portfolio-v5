"use client";

import { usePathname } from "next/navigation";

/** Hides the public site chrome (nav, footer, floating CTA) on /admin pages. */
export const HideOnAdmin = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return <>{children}</>;
};

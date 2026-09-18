import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card shell with a CSS-only hover lift (no framer-motion needed). */
export const MagicCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      "lift relative overflow-hidden rounded-2xl border border-purple-400/15 bg-card hover:border-purple-400/40",
      className
    )}
  >
    {children}
  </div>
);

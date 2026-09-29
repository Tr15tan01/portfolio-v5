import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card shell with a CSS-only hover lift and light sweep (no framer-motion needed). */
export const MagicCard = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => (
  <div
    className={cn(
      "lift card-shine relative overflow-hidden rounded-2xl border border-purple-400/15 bg-card hover:border-purple-400/40",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

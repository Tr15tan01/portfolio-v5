import type { ReactNode } from "react";

export const SectionHeader = ({
  title,
  subtitle,
  id,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  id?: string;
}) => (
  <div className="reveal mx-auto mb-14 max-w-3xl text-center">
    <h2 id={id} className="section-heading purple-gradient-text">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{subtitle}</p>
    )}
  </div>
);

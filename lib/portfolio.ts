import data from "@/data/portfolio.json";

export interface NavItem {
  name: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  /** Path under /public, e.g. "/projects/my-app.webp". Leave "" to show the emoji tile. */
  image: string;
  emoji: string;
  category: string;
  /** Live URL. Leave "" if there is no public demo. */
  live: string;
  featured: boolean;
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  value: string;
  description: string;
}

export interface SocialLink {
  icon: string;
  name: string;
  url: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Optional link to the client's site/LinkedIn for credibility */
  url?: string;
}

export interface PortfolioData {
  site: {
    name: string;
    role: string;
    title: string;
    description: string;
    keywords: string[];
    email: string;
    location: string;
    availability: { available: boolean; text: string };
    responseTime: string;
  };
  nav: { brand: string; items: NavItem[]; ctaLabel: string; ctaHref: string };
  hero: {
    headlineTop: string;
    headlineBottom: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
    stats: { number: string; label: string }[];
  };
  services: Service[];
  process: { title: string; description: string }[];
  testimonials: Testimonial[];
  faq: { question: string; answer: string }[];
  about: {
    stats: { icon: string; value: string; label: string; description: string }[];
    skills: string[];
  };
  contact: {
    info: ContactInfoItem[];
    whatsapp: string;
    telegram: string;
    bookingUrl: string;
    projectTypes: string[];
    budgets: string[];
    timelines: string[];
    socialLinks: SocialLink[];
  };
  projects: Project[];
}

export const portfolio = data as PortfolioData;

export const getFeaturedProjects = () => portfolio.projects.filter((p) => p.featured);
export const getAllProjects = () => portfolio.projects;

/** True for an empty link or "#". */
export const isPlaceholderUrl = (url: string | undefined) => !url || url.trim() === "" || url.trim() === "#";

/** True for a bare social domain like "https://linkedin.com" (not an actual profile). */
const isBareDomain = (url: string) => {
  try {
    const u = new URL(url);
    return u.pathname === "/" || u.pathname === "";
  } catch {
    return true;
  }
};

/** Social links that point to a real profile. Placeholders are hidden automatically. */
export const getSocialLinks = () =>
  portfolio.contact.socialLinks.filter((l) => !isPlaceholderUrl(l.url) && !isBareDomain(l.url));

export const getWhatsappUrl = () => {
  const digits = portfolio.contact.whatsapp.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
};

export const getTelegramUrl = () => {
  const handle = portfolio.contact.telegram.replace(/^@/, "").trim();
  return handle ? `https://t.me/${handle}` : "";
};

/** Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
})();

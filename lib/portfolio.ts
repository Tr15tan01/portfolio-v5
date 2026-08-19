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
  image: string;
  emoji: string;
  category: string;
  github: string;
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

export interface PortfolioData {
  site: { name: string; title: string; description: string };
  nav: {
    brand: string;
    items: NavItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    badgeText: string;
    headlineTop: string;
    headlineBottom: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
    stats: { number: string; label: string; symbol: string }[];
  };
  contact: {
    info: ContactInfoItem[];
    socialLinks: SocialLink[];
  };
  projects: Project[];
}

export const portfolio = data as PortfolioData;

export const getFeaturedProjects = () =>
  portfolio.projects.filter((p) => p.featured);

export const getAllProjects = () => portfolio.projects;

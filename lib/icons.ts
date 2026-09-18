import {
  Award,
  Clock,
  Gauge,
  Github,
  Globe,
  LayoutDashboard,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  ShoppingBag,
  Sparkles,
  Twitter,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Explicit map so only the icons referenced in portfolio.json end up in the bundle. */
const ICONS: Record<string, LucideIcon> = {
  Award,
  Clock,
  Gauge,
  Github,
  Globe,
  LayoutDashboard,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  ShoppingBag,
  Sparkles,
  Twitter,
  Users,
};

export const getIcon = (name: string): LucideIcon => ICONS[name] ?? Sparkles;

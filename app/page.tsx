import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsSection } from "@/components/sections/projects";
import { AboutSection } from "@/components/sections/about";
import { ProcessSection } from "@/components/sections/process";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

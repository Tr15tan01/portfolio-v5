import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";

export default function Home() {
  return (
    <div id="home">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      {/* Add more sections here */}
    </div>
  );
}

import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";

export default function Home() {
  return (
    <div id="home">
      <HeroSection />
      <ProjectsSection />
      {/* Add more sections here */}
    </div>
  );
}

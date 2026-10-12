import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { OpenSourceImpact } from "@/components/home/OpenSourceImpact";
import { CapabilityMap } from "@/components/home/CapabilityMap";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { EducationSection } from "@/components/home/EducationSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <OpenSourceImpact />
      <CapabilityMap />
      <ExperienceTimeline />
      <EducationSection />
      <ContactSection />
    </div>
  );
}

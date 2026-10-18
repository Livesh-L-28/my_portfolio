import { Hero } from "@/components/home/Hero";
import { PublishedPackagesCredibilityStrip } from "@/components/home/PublishedPackagesCredibilityStrip";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { PublishedPackagesSection } from "@/components/home/PublishedPackagesSection";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { SecurityPlayground } from "@/components/home/SecurityPlayground";
import { CapabilityMap } from "@/components/home/CapabilityMap";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { EducationSection } from "@/components/home/EducationSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero section with professional identity */}
      <Hero />

      {/* 2. Compact credibility strip: Published Python Packages */}
      <PublishedPackagesCredibilityStrip />

      {/* 3. Featured engineering projects */}
      <FeaturedProjects />

      {/* 4. Prominent Open Source & Published Packages section */}
      <PublishedPackagesSection />

      {/* 5. Engineering capabilities and existing portfolio sections */}
      <ArchitectureSection />
      <SecurityPlayground />
      <CapabilityMap />
      <ExperienceTimeline />
      <EducationSection />

      {/* 6. About and contact */}
      <AboutPreview />
      <ContactSection />
    </div>
  );
}

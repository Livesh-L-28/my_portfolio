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

import { SectionWithGutters } from "@/components/layout/SectionWithGutters";
import { NeuralNetworkIllustration } from "@/components/edge-illustrations/NeuralNetworkIllustration";
import { LLMAttentionIllustration } from "@/components/edge-illustrations/LLMAttentionIllustration";
import { YoloDetectionIllustration } from "@/components/edge-illustrations/YoloDetectionIllustration";
import { RAGRetrievalIllustration } from "@/components/edge-illustrations/RAGRetrievalIllustration";
import { DockerCICDIllustration } from "@/components/edge-illustrations/DockerCICDIllustration";
import { PyPIPackageIllustration } from "@/components/edge-illustrations/PyPIPackageIllustration";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">
      {/* 1. Hero section framed by Feed-Forward MLP (Left) and Transformer Self-Attention (Right) */}
      <SectionWithGutters
        leftIllustration={<NeuralNetworkIllustration />}
        rightIllustration={<LLMAttentionIllustration />}
        stickyTopClass="top-24"
      >
        <Hero />
      </SectionWithGutters>

      {/* 2. Engineering Philosophy & About Section (Section 00) */}
      <AboutPreview />

      {/* 3. Compact credibility strip: Published Python Packages */}
      <PublishedPackagesCredibilityStrip />

      {/* 4. Featured Flagship Projects (Section 01) framed by Computer Vision/YOLO (Left) and NexaRAG Hybrid Retrieval (Right) */}
      <SectionWithGutters
        leftIllustration={<YoloDetectionIllustration />}
        rightIllustration={<RAGRetrievalIllustration />}
        stickyTopClass="top-28"
      >
        <FeaturedProjects />
      </SectionWithGutters>

      {/* 5. Published Packages & Open Source (Section 02) framed by Docker CI/CD (Left) and PyPI Wheel Artifact (Right) */}
      <SectionWithGutters
        leftIllustration={<DockerCICDIllustration />}
        rightIllustration={<PyPIPackageIllustration />}
        stickyTopClass="top-28"
      >
        <PublishedPackagesSection />
      </SectionWithGutters>

      {/* 6. Deep Engineering Architecture, Security Playground & Capabilities */}
      <ArchitectureSection />
      <SecurityPlayground />
      <CapabilityMap />
      <ExperienceTimeline />
      <EducationSection />

      {/* 7. Contact Section */}
      <ContactSection />
    </div>
  );
}

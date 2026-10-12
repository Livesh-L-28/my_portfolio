import { Metadata } from "next";
import { AboutPreview } from "@/components/home/AboutPreview";
import { EducationSection } from "@/components/home/EducationSection";

export const metadata: Metadata = {
  title: "About — Livesh L. | AI Developer & Systems Engineer",
  description:
    "Final-year B.Tech Artificial Intelligence and Data Science student at Prathyusha Engineering College, CGPA 8.53/10. AI Developer specializing in LLM systems, AI security, and reliability engineering.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <AboutPreview />
        <EducationSection />
      </div>
    </div>
  );
}

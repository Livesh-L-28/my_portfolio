import { Metadata } from "next";
import { AboutPreview } from "@/components/home/AboutPreview";
import { EducationSection } from "@/components/home/EducationSection";
import { GraduationCap, ShieldCheck, Terminal, Award } from "lucide-react";
import { PROFILE_LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "About — Livesh L. | AI Developer & Systems Engineer",
  description:
    "Final-year B.Tech Artificial Intelligence and Data Science student at Prathyusha Engineering College, CGPA 8.53/10. AI Developer specializing in LLM systems, AI security, and reliability engineering.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-mono text-violet-300 mb-3">
            <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
            <span>BACKGROUND & ENGINEERING PHILOSOPHY</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About Livesh L.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            AI Developer focused on production-oriented LLM applications, retrieval-augmented generation, AI security, reliability engineering, and intelligent software systems.
          </p>
        </div>

        <AboutPreview />
        <EducationSection />
      </div>
    </div>
  );
}

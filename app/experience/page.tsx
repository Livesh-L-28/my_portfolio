import { Metadata } from "next";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Briefcase, Building2, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Experience — Livesh L.",
  description:
    "Engineering internships and industry contributions at Chargebee, XARC, Femtosoft Technologies, and Cognifyz Technologies.",
};

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-mono text-violet-300 mb-3">
            <Building2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>INDUSTRY TRACK RECORD</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Hands-on machine learning engineering, XR desktop architecture, and business intelligence delivered across 4 technical internships.
          </p>
        </div>

        <ExperienceTimeline />
      </div>
    </div>
  );
}

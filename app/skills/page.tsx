import { Metadata } from "next";
import { CapabilityMap } from "@/components/home/CapabilityMap";
import { SKILL_CATEGORIES } from "@/data/skills";
import Link from "next/link";
import { Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Skills & Capability Rubric — Livesh L.",
  description:
    "Comprehensive technical skills matrix spanning LLM systems, AI security, reliability engineering, computer vision, and backend infrastructure.",
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-mono text-violet-300 mb-3">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>SYSTEM COMPETENCIES</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Capabilities
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            A comprehensive mapping of verified proficiencies across 6 engineering domains. Every skill is grounded in active repository code, reproducible benchmarks, or published packages.
          </p>
        </div>

        <CapabilityMap />

        {/* Detailed Competency Breakdown */}
        <div className="mt-16 space-y-12">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-white/[0.08] bg-[#0C1022] p-6 sm:p-8"
            >
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white mb-2">
                {category.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 font-sans">
                {category.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.04] bg-[#080C1A] px-4 py-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-sans">{skill.name}</span>
                    </div>

                    {skill.linkedProject && (
                      <Link
                        href={`/projects/${skill.linkedProject}`}
                        className="text-[10px] font-mono text-violet-400 hover:text-violet-300 shrink-0 border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 rounded"
                      >
                        Ref
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

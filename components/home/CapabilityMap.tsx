"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SKILL_CATEGORIES } from "@/data/skills";
import {
  Cpu,
  ShieldCheck,
  Activity,
  Eye,
  Server,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const CapabilityMap: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-5 w-5 text-violet-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 text-cyan-400" />;
      case "Activity":
        return <Activity className="h-5 w-5 text-amber-400" />;
      case "Eye":
        return <Eye className="h-5 w-5 text-emerald-400" />;
      case "Server":
        return <Server className="h-5 w-5 text-indigo-400" />;
      case "Layers":
        return <Layers className="h-5 w-5 text-pink-400" />;
      default:
        return <Cpu className="h-5 w-5 text-violet-400" />;
    }
  };

  const selectedCategory = SKILL_CATEGORIES[activeDomain];

  return (
    <section id="engineering" className="relative py-20 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300 mb-2">
            <span>ENGINEERING CAPABILITY MATRIX</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Expertise & Stack
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
            Structured competency across 6 specialized engineering domains, mapped directly to production repositories and verified benchmark suites.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeDomain === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveDomain(idx)}
                className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isActive
                    ? "border-violet-400 bg-violet-950/40 shadow-lg shadow-violet-500/20 ring-1 ring-violet-400/40"
                    : "border-white/[0.08] bg-[#0C1022] hover:border-violet-500/30 hover:bg-[#0E1428]"
                }`}
              >
                <div className="mb-2">{getCategoryIcon(cat.iconName)}</div>
                <span className="text-xs font-bold text-white font-sans leading-tight">
                  {cat.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {cat.skills.length} competencies
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Showcase Panel */}
        <div className="rounded-2xl border border-violet-500/20 bg-[#0B0F1E] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30">
                {getCategoryIcon(selectedCategory.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  {selectedCategory.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  {selectedCategory.description}
                </p>
              </div>
            </div>

            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>View full competency rubric</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grid of Specific Competencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {selectedCategory.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#0E1326] px-4 py-3 text-xs transition-colors hover:border-violet-500/30"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-medium text-slate-200 font-sans">
                    {skill.name}
                  </span>
                </div>

                {skill.linkedProject && (
                  <Link
                    href={`/projects/${skill.linkedProject}`}
                    className="shrink-0 text-[10px] font-mono text-violet-400 hover:text-violet-300 border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 rounded"
                  >
                    Project Ref
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

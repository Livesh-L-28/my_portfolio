"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const FeaturedProjects: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"
    >
      {/* Subtle ambient spotlight */}
      <div className="absolute top-0 left-1/3 -z-10 h-96 w-full max-w-4xl aura-indigo pointer-events-none blur-[140px] opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono text-indigo-800 dark:text-indigo-300 mb-3 shadow-xs font-semibold">
              <span>01</span>
              <span className="text-indigo-400 dark:text-indigo-600">{"//"}</span>
              <span>Flagship AI Systems &amp; Applied Architectures</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Selected Systems &amp; Case Studies
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans max-w-xl leading-relaxed">
              Production AI platforms, autonomous reliability frameworks, and in-process LLM security engines backed by documented benchmarks and automated test suites.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs transition-all hover:translate-x-0.5 self-start sm:self-auto"
          >
            <span>Browse All 10 Projects</span>
            <ArrowRight className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
          </Link>
        </div>

        {/* Flagship Featured Systems: NexaRAG, AEGIS Framework, and LLMFirewall Core */}
        <ProjectGrid
          showFilters={false}
          limit={3}
          featuredIds={["nexarag", "aegis-framework", "llmfirewall-core"]}
        />

        {/* View All Projects Directory CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-xs font-mono font-bold text-slate-900 dark:text-white hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>Browse All 10 Engineering Projects in Directory</span>
            <ArrowRight className="h-4 w-4 text-indigo-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

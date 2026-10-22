import { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Terminal, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & System Architectures — Livesh L",
  description:
    "Explore 11 production AI engineering repositories spanning RAG architectures, industrial safety intelligence, in-process LLM firewalls, deterministic agent reliability engines, and computer vision systems.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-20 overflow-hidden">
      {/* Ambient background auroras & tech dots */}
      <div className="absolute top-16 left-1/4 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-35" />
      <div className="absolute top-48 right-1/4 -z-10 h-96 w-96 aura-cyan pointer-events-none blur-3xl opacity-30" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/90 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono text-indigo-800 dark:text-indigo-300 mb-3 shadow-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>Projects &amp; System Architectures Directory</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
            AI Engineering <span className="text-gradient-hero">Projects</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
            Explore 11 production-oriented repositories, open-source packages, and systems. Every project features verified code, documented test suites, or live deployments.
          </p>

          {/* Quick Metrics Bar - High-Craft Frosted Chips */}
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium hover:border-indigo-300 transition-colors">
              <div className="h-5 w-5 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                <Terminal className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">11 Verified Repositories</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium hover:border-emerald-300 transition-colors">
              <div className="h-5 w-5 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">3 Published PyPI Packages</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium hover:border-sky-300 transition-colors">
              <div className="h-5 w-5 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 flex items-center justify-center">
                <Database className="h-3 w-3 text-sky-600 dark:text-sky-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">1,400+ Passing Tests</span>
            </span>
          </div>
        </div>

        {/* Search, Filters, and Grid */}
        <ProjectGrid showFilters={true} />
      </div>
    </div>
  );
}

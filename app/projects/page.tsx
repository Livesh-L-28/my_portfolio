import { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Sparkles, Terminal, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & System Architectures — Livesh L.",
  description:
    "Explore 10 AI engineering projects spanning RAG architectures, in-process LLM firewalls, deterministic agent reliability engines, and computer vision systems.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 radial-glow-hero opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-mono text-violet-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>PORTFOLIO DIRECTORY & CASE STUDIES</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            AI Engineering Projects
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Explore 10 production-oriented repositories, open-source packages, and systems. Every project features verified code, documented test suites, or live deployments.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0C1022] px-3 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-violet-400" />
              <span>10 Verified Repositories</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0C1022] px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>3 Published PyPI Packages</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0C1022] px-3 py-1.5">
              <Database className="h-3.5 w-3.5 text-emerald-400" />
              <span>1,290+ Passing Test Cases</span>
            </span>
          </div>
        </div>

        {/* Search, Filters, and Grid */}
        <ProjectGrid showFilters={true} />
      </div>
    </div>
  );
}

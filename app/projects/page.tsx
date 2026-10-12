import { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Terminal, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & System Architectures — Livesh L.",
  description:
    "Explore 10 AI engineering projects spanning RAG architectures, in-process LLM firewalls, deterministic agent reliability engines, and computer vision systems.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Projects & Case Studies Directory
          </span>

          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI Engineering Projects
          </h1>

          <p className="mt-2 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            Explore 10 production-oriented repositories, open-source packages, and systems. Every project features verified code, documented test suites, or live deployments.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-zinc-400" />
              <span>10 Verified Repositories</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>3 Published PyPI Packages</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5">
              <Database className="h-3.5 w-3.5 text-sky-400" />
              <span>1,290+ Passing Tests</span>
            </span>
          </div>
        </div>

        {/* Search, Filters, and Grid */}
        <ProjectGrid showFilters={true} />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="relative py-16 sm:py-20 border-b border-zinc-800/80 overflow-hidden">
      {/* Subtle ambient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-4xl aura-indigo pointer-events-none blur-3xl opacity-35" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-mono text-indigo-400 mb-2">
              <span className="font-bold">01</span>
              <span className="text-indigo-400/60">//</span>
              <span>Flagship AI Architectures</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Selected Projects & Case Studies
            </h2>
            <p className="mt-1 text-sm text-zinc-400 font-sans max-w-xl">
              Real AI architectures backed by documented test suites, published PyPI packages, or live deployments.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>All 10 projects directory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Project Grid with full interactive filtering */}
        <ProjectGrid showFilters={true} />
      </div>
    </section>
  );
};

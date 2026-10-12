"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>CORE SYSTEMS & REPOSITORIES</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured AI Engineering Projects
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
              Every system is backed by verified test suites, published packages, local demonstration recordings, or reproducible open-source repositories.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-600/10 px-4 py-2.5 text-xs font-mono font-medium text-violet-200 hover:bg-violet-600/20 hover:text-white transition-all self-start md:self-auto shrink-0"
          >
            <span>Explore All 10 Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Project Grid with full interactive filtering */}
        <ProjectGrid showFilters={true} />
      </div>
    </section>
  );
};

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Package,
  Play,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Terminal,
  FileText,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectData } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: ProjectData;
  onOpenVideo?: (videoUrl: string, title: string, triggerRef: React.RefObject<HTMLElement | null>) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenVideo,
}) => {
  const videoButtonRef = useRef<HTMLButtonElement>(null);

  // Category Icon helper
  const getCategoryIcon = () => {
    switch (project.category) {
      case "LLM & RAG":
        return <Cpu className="w-3.5 h-3.5 text-violet-400" />;
      case "AI Security":
        return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
      case "Reliability Engineering":
        return <Layers className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-violet-500/15 bg-[#0C1020]/90 p-5 sm:p-6 transition-all duration-300 hover:border-violet-500/40 hover:bg-[#0E1428] hover:shadow-xl hover:shadow-violet-500/10 backdrop-blur-sm">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            {getCategoryIcon()}
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          {project.featured && (
            <Badge variant="violet" size="sm">
              Featured Case Study
            </Badge>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
          <Link
            href={`/projects/${project.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {project.tagline}
        </p>

        {/* Key Engineering Achievement Banner */}
        <div className="mt-3.5 rounded-lg border border-violet-500/20 bg-violet-950/20 px-3 py-2 text-[11px] font-mono text-violet-200 flex items-start gap-2">
          <span className="text-violet-400 font-bold shrink-0">⚡</span>
          <span>{project.keyAchievement}</span>
        </div>

        {/* Stats Row if available */}
        {project.stats && project.stats.length > 0 && (
          <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-b border-white/[0.06] py-2.5 my-2">
            {project.stats.slice(0, 2).map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Technology Badges */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded bg-transparent px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
        {/* Primary Case Study Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-violet-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded py-1"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Case Study</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* External & Interactive Buttons (Strictly Verified Only) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* GitHub Repo Button */}
          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1 rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <GithubIcon className="h-3 w-3" />
              <span>GitHub</span>
            </a>
          )}

          {/* PyPI Button */}
          {project.links.pypiUrl && (
            <a
              href={project.links.pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on PyPI`}
              className="flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Package className="h-3 w-3" />
              <span>PyPI</span>
            </a>
          )}

          {/* Live Application Button */}
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Launch ${project.title} live application`}
              className="flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-300 hover:bg-emerald-500/20 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Live App</span>
            </a>
          )}

          {/* Watch Demo Video Modal Trigger */}
          {project.links.demoVideoUrl && onOpenVideo && (
            <button
              ref={videoButtonRef}
              onClick={() =>
                onOpenVideo(
                  project.links.demoVideoUrl!,
                  project.title,
                  videoButtonRef
                )
              }
              aria-label={`Watch ${project.title} demonstration video in modal`}
              className="flex items-center gap-1 rounded-md border border-violet-500/40 bg-violet-600/20 px-2.5 py-1 text-[11px] font-mono text-violet-200 hover:bg-violet-600/30 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Play className="h-3 w-3 fill-violet-300" />
              <span>Watch Demo</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

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
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectData } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectData;
  onOpenVideo?: (videoUrl: string, title: string, triggerRef: React.RefObject<HTMLElement | null>) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenVideo,
}) => {
  const videoButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <article className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">
      <div>
        {/* Category & Featured Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
              Featured System
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
          >
            {project.title}
          </Link>
        </h3>

        {/* Tagline / Description */}
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          {project.tagline}
        </p>

        {/* Key Achievement Banner */}
        <div className="mt-3.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300 flex items-start gap-2">
          <span className="text-emerald-400 font-bold shrink-0">✓</span>
          <span className="leading-snug">{project.keyAchievement}</span>
        </div>

        {/* Technologies List */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-300 border border-zinc-700/60"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="rounded bg-transparent px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
        {/* Case study link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <FileText className="h-3.5 w-3.5 text-zinc-400" />
          <span>Case Study</span>
          <ArrowRight className="h-3 w-3" />
        </Link>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* GitHub Repo */}
          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {/* Live App */}
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Launch ${project.title} Live Application`}
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-600/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live App</span>
            </a>
          )}

          {/* PyPI */}
          {project.links.pypiUrl && (
            <a
              href={project.links.pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on PyPI`}
              className="inline-flex items-center gap-1.5 rounded-md border border-indigo-600/40 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors"
            >
              <Package className="h-3.5 w-3.5" />
              <span>PyPI</span>
            </a>
          )}

          {/* Watch Demo Modal Trigger */}
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
              aria-label={`Watch ${project.title} Demo Video`}
              className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-300 hover:bg-sky-500/20 transition-colors font-medium cursor-pointer"
            >
              <Play className="h-3 w-3 fill-sky-300" />
              <span>Watch Demo</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

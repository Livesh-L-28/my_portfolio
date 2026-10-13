"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Package,
  Play,
  ArrowRight,
  FileText,
  Eye,
  Box,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectData } from "@/lib/types";
import {
  Project3DCanvas,
  Project3DType,
  getProject3DType,
} from "@/components/3d/Project3DCanvas";

interface ProjectCardProps {
  project: ProjectData;
  onOpenVideo?: (
    videoUrl: string,
    title: string,
    triggerRef: React.RefObject<HTMLElement | null>
  ) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenVideo,
}) => {
  const videoButtonRef = useRef<HTMLButtonElement>(null);
  const threeDType = getProject3DType(project.slug);
  const hasBoth = Boolean(threeDType && project.thumbnail);
  const [activeTab, setActiveTab] = useState<"preview" | "3d">("preview");

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "RAG & Retrieval":
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/30";
      case "AI Security & Safety":
        return "text-violet-400 bg-violet-500/10 border-violet-500/30";
      case "Deterministic Evaluation":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "Computer Vision":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "Autonomous Resilience":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-zinc-300 bg-zinc-800 border-zinc-700/60";
    }
  };

  return (
    <article className="group flex flex-col justify-between h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/95 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <div className="flex flex-col flex-1">
        {/* Category & Featured Badge Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeClass(project.category)}`}>
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Flagship</span>
            </span>
          )}
        </div>

        {/* Visual Showcase (UI Screenshot or Interactive 3D Model) */}
        {(project.thumbnail || threeDType) && (
          <div className="mb-4 relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/9] w-full">
            {/* Tab switch if both available */}
            {hasBoth && (
              <div className="absolute top-2 right-2 z-10 flex items-center rounded-md bg-zinc-900/90 p-0.5 border border-zinc-800 backdrop-blur-sm shadow-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeTab === "preview"
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  aria-label="View UI Preview"
                >
                  <Eye className="h-3 w-3" />
                  <span>UI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("3d")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeTab === "3d"
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  aria-label="View 3D Model"
                >
                  <Box className="h-3 w-3" />
                  <span>3D</span>
                </button>
              </div>
            )}

            {/* Display either UI Preview or 3D */}
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-zinc-950">
              <AnimatePresence mode="wait">
                {activeTab === "preview" && project.thumbnail ? (
                  <Link
                    key="ui-preview"
                    href={`/projects/${project.slug}`}
                    className="block w-full h-full cursor-pointer relative overflow-hidden"
                    tabIndex={-1}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} Interface Preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      priority={project.featured}
                    />
                  </Link>
                ) : threeDType ? (
                  <div key="3d-model" className="w-full h-full relative">
                    <Project3DCanvas
                      type={threeDType}
                      height="h-full"
                      interactive={true}
                    />
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors min-h-[1.75rem] flex items-center">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded line-clamp-1"
          >
            {project.title}
          </Link>
        </h3>

        {/* Tagline / Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-2 min-h-[2.5rem]">
          {project.tagline}
        </p>

        {/* Key Achievement Banner - Uniform Height */}
        <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-xs font-mono text-zinc-300 flex items-start gap-2 min-h-[3.25rem]">
          <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
          <span className="leading-snug line-clamp-2">{project.keyAchievement}</span>
        </div>

        {/* Technologies List - Strictly 1 Row */}
        <div className="mt-3.5 flex items-center gap-1.5 mb-4 h-6 overflow-hidden">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-300 border border-zinc-700/60 truncate max-w-[120px]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded bg-zinc-800/40 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 border border-zinc-800 shrink-0">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Bar - Strictly Pinned to Bottom with Crisp Heights */}
      <div className="mt-auto pt-3.5 border-t border-zinc-800 flex items-center justify-between gap-2">
        {/* Case study link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors shrink-0"
        >
          <FileText className="h-3.5 w-3.5 text-zinc-400" />
          <span>Case Study</span>
          <ArrowRight className="h-3 w-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* GitHub Repo */}
          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
            >
              <GithubIcon className="h-3 w-3" />
              <span>Code</span>
            </a>
          )}

          {/* Live App */}
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Launch ${project.title} Live Application`}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-500/10 px-2 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Live</span>
            </a>
          )}

          {/* PyPI */}
          {project.links.pypiUrl && (
            <a
              href={project.links.pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on PyPI`}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-indigo-600/40 bg-indigo-500/10 px-2 text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors"
            >
              <Package className="h-3 w-3" />
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
              className="inline-flex h-7 items-center gap-1 rounded-md border border-sky-500/40 bg-sky-500/10 px-2 text-xs text-sky-300 hover:bg-sky-500/20 transition-colors font-medium cursor-pointer"
            >
              <Play className="h-3 w-3 fill-sky-300" />
              <span>Demo</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Package,
  Play,
  ArrowRight,
  FileText,
  Eye,
  Box,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { GithubIcon, PythonIcon } from "@/components/ui/Icons";
import { ProjectData } from "@/lib/types";
import {
  Project3DCanvas,
  getProject3DType,
} from "@/components/3d/Project3DCanvas";
import { playClickSound } from "@/lib/sound";

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
  compact?: boolean;
  onOpenVideo?: (
    videoUrl: string,
    title: string,
    triggerRef: React.RefObject<HTMLElement | null>
  ) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  compact = false,
  onOpenVideo,
}) => {
  const videoButtonRef = useRef<HTMLButtonElement>(null);
  const threeDType = getProject3DType(project.slug);
  const hasBoth = Boolean(threeDType && project.thumbnail);
  const [activeTab, setActiveTab] = useState<"preview" | "3d">("preview");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "RAG & Retrieval":
        return "text-indigo-800 bg-indigo-50/90 border-indigo-300 dark:bg-indigo-950/70 dark:border-indigo-800 dark:text-indigo-300 font-bold";
      case "AI Security & Safety":
        return "text-violet-800 bg-violet-50/90 border-violet-300 dark:bg-violet-950/70 dark:border-violet-800 dark:text-violet-300 font-bold";
      case "Deterministic Evaluation":
        return "text-emerald-800 bg-emerald-50/90 border-emerald-300 dark:bg-emerald-950/70 dark:border-emerald-800 dark:text-emerald-300 font-bold";
      case "Computer Vision":
        return "text-cyan-800 bg-cyan-50/90 border-cyan-300 dark:bg-cyan-950/70 dark:border-cyan-800 dark:text-cyan-300 font-bold";
      case "Autonomous Resilience":
        return "text-amber-900 bg-amber-50/90 border-amber-300 dark:bg-amber-950/70 dark:border-amber-800 dark:text-amber-300 font-bold";
      default:
        return "text-slate-800 bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 font-bold";
    }
  };

  if (compact) {
    return (
      <article
        onMouseMove={handleMouseMove}
        className="group glass-card bento-hairline spotlight-card flex flex-col justify-between h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-xl"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 blur-md transition duration-500 pointer-events-none -z-10" />

        <div className="flex flex-col flex-1">
          {/* Category & Featured Badge Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border font-semibold ${getCategoryBadgeClass(project.category)}`}>
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Flagship</span>
              </span>
            )}
          </div>

          {/* Visual Showcase (UI Screenshot or Interactive 3D Model) */}
          {(project.thumbnail || threeDType) && (
            <div
              className="mb-4 relative rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 aspect-[16/9] w-full"
              style={{ position: "relative", aspectRatio: "16 / 9" }}
            >
              {hasBoth && (
                <div className="absolute top-2 right-2 z-10 flex items-center rounded-md bg-slate-900/90 p-0.5 border border-slate-700 backdrop-blur-sm shadow-md">
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      activeTab === "preview"
                        ? "bg-slate-800 text-white font-medium"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                    aria-label={project.pypiOnly ? "View Architecture Spec" : "View UI Preview"}
                  >
                    <Eye className="h-3 w-3" />
                    <span>{project.pypiOnly ? "Spec" : "UI"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("3d")}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      activeTab === "3d"
                        ? "bg-slate-800 text-white font-medium"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                    aria-label="View 3D Model"
                  >
                    <Box className="h-3 w-3" />
                    <span>3D</span>
                  </button>
                </div>
              )}

              <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-slate-950">
                <AnimatePresence mode="wait">
                  {activeTab === "preview" && project.thumbnail ? (
                    <Link
                      key="ui-preview"
                      href={`/projects/${project.slug}`}
                      className="block w-full h-full cursor-pointer relative overflow-hidden"
                      style={{ position: "relative" }}
                      tabIndex={-1}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} Interface Preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
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

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded line-clamp-1"
            >
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans line-clamp-2">
            {project.tagline}
          </p>

          {/* Key Achievement */}
          <div className="mt-3 rounded-xl border border-emerald-300/90 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-200 flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-snug line-clamp-2 font-medium">{project.keyAchievement}</span>
          </div>

          {/* Tech tags */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white dark:bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-800 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 shadow-2xs truncate"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0 font-medium">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action row */}
        <div className="mt-auto pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors shrink-0"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Case Study</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-1.5 shrink-0">
            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <GithubIcon className="h-3 w-3" />
                <span>Code</span>
              </a>
            )}

            {project.links.liveUrl && !project.links.liveUrl.includes("drive.google.com") && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Launch ${project.title}`}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Live</span>
              </a>
            )}

            {project.links.pypiUrl && (
              <a
                href={project.links.pypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on PyPI`}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-2 text-xs font-medium text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Package className="h-3 w-3" />
                <span>PyPI</span>
              </a>
            )}

            {project.slug === "venipuncture-vr" ? (
              <Link
                href={`/projects/${project.slug}#demos-gallery`}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-2 text-xs font-medium text-sky-800 dark:text-sky-300 hover:bg-sky-100 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <Play className="h-3 w-3 fill-sky-700 text-sky-700" />
                <span>Demo</span>
              </Link>
            ) : (
              project.links.demoVideoUrl && onOpenVideo && (
                <button
                  ref={videoButtonRef}
                  onClick={() => {
                    playClickSound();
                    onOpenVideo(
                      project.links.demoVideoUrl!,
                      project.title,
                      videoButtonRef
                    );
                  }}
                  className="inline-flex h-7 items-center gap-1 rounded-md border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-2 text-xs font-medium text-sky-800 dark:text-sky-300 hover:bg-sky-100 transition-all active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <Play className="h-3 w-3 fill-sky-700 text-sky-700" />
                  <span>Demo</span>
                </button>
              )
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onMouseMove={handleMouseMove}
      className="group glass-card bento-hairline spotlight-card rounded-3xl p-6 sm:p-8 lg:p-9 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Ambient hover glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 items-center">
        {/* Visual Showcase: Left Column on Desktop (lg:col-span-5 or 6) with Developer Window Chrome */}
        {(project.thumbnail || threeDType) && (
          <div
            className="lg:col-span-5 xl:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 aspect-[16/11] w-full shadow-md group-hover:border-indigo-400/60 dark:group-hover:border-indigo-500/60 transition-all flex flex-col"
            style={{ position: "relative", aspectRatio: "16 / 11" }}
          >
            {/* macOS Developer Terminal Chrome Header */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[10px] font-mono text-slate-700 dark:text-slate-400 font-semibold truncate max-w-[140px] sm:max-w-none">
                  git:(main) • {project.slug}
                </span>
              </div>

              {/* Tab switch if both available */}
              {hasBoth && (
                <div className="flex items-center rounded-lg bg-slate-200/80 dark:bg-slate-800/80 p-0.5 border border-slate-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setActiveTab("preview");
                    }}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-xs"
                        : "text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white font-medium"
                    }`}
                    aria-label={project.pypiOnly ? "View Architecture Spec" : "View UI Preview"}
                  >
                    <Eye className="h-3 w-3" />
                    <span>{project.pypiOnly ? "Architecture" : "UI"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setActiveTab("3d");
                    }}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      activeTab === "3d"
                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-xs"
                        : "text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white font-medium"
                    }`}
                    aria-label="View 3D Model"
                  >
                    <Box className="h-3 w-3" />
                    <span>3D</span>
                  </button>
                </div>
              )}
            </div>

            {/* Display either UI Preview or 3D */}
            <div className="w-full flex-1 relative overflow-hidden flex items-center justify-center bg-slate-950">
              <AnimatePresence mode="wait">
                {activeTab === "preview" && project.thumbnail ? (
                  <Link
                    key="ui-preview"
                    href={`/projects/${project.slug}`}
                    className="block w-full h-full cursor-pointer relative overflow-hidden"
                    style={{ position: "relative" }}
                    tabIndex={-1}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} Interface Preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
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

        {/* Content: Right Column on Desktop (lg:col-span-7) */}
        <div className={`flex flex-col justify-between ${project.thumbnail || threeDType ? "lg:col-span-7 xl:col-span-7" : "lg:col-span-12"}`}>
          <div>
            {/* Header Tags: Category + PyPI + Flagship */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-semibold shadow-2xs ${getCategoryBadgeClass(project.category)}`}>
                {project.category}
              </span>

              {project.pypiOnly && (
                <span className="text-xs font-mono text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/90 dark:border-indigo-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold shadow-2xs">
                  <PythonIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Published PyPI Package</span>
                </span>
              )}

              {project.featured && !project.pypiOnly && (
                <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Flagship</span>
                </span>
              )}
            </div>

            {/* Project Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
              >
                {project.fullName || project.title}
              </Link>
            </h3>

            {/* Tagline / Description */}
            <p className="mt-2.5 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-normal">
              {project.tagline}
            </p>

            {/* Telemetry Stats Row */}
            {project.stats && project.stats.length > 0 && (
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {project.stats.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-200 shadow-2xs font-semibold"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{s.label}:</span>
                    <strong className="text-slate-950 dark:text-white font-extrabold">{s.value}</strong>
                  </span>
                ))}
              </div>
            )}

            {/* Key Achievement Banner - Spacious & Impactful */}
            <div className="mt-4 rounded-2xl border border-emerald-300/80 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/40 p-3.5 sm:p-4 text-xs sm:text-sm font-mono text-slate-950 dark:text-slate-200 flex items-start gap-3 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                <span className="text-emerald-950 dark:text-emerald-300 font-bold mr-1.5">Verified Milestone:</span>
                <span>{project.keyAchievement}</span>
              </div>
            </div>

            {/* PyPI Quick Install Pill for PyPI-Only Packages */}
            {project.pypiOnly && project.links.installCommand && (
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  PyPI Release:
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(project.links.installCommand!);
                      setCopiedCmd(true);
                      setTimeout(() => setCopiedCmd(false), 2000);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-slate-200 px-3 py-1.5 font-mono text-xs border border-slate-700/80 hover:border-indigo-400 transition-all cursor-pointer group/cmd shadow-2xs"
                  title="Click to copy install command"
                >
                  <span className="text-indigo-400 font-bold">$</span>
                  <span>{project.links.installCommand}</span>
                  {copiedCmd ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="h-3 w-3 text-slate-400 group-hover/cmd:text-indigo-300 shrink-0" />
                  )}
                </button>
              </div>
            )}

            {/* Technologies List - Clean Un-truncated Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-bold mr-1">Stack:</span>
              {project.technologies.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-mono text-slate-950 dark:text-slate-200 font-bold shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 8 && (
                <span className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  +{project.technologies.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons Bar - Clean, High-Impact & Spacious */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            {/* Case study link */}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>Explore Case Study</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 px-3.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                  <span>Code</span>
                </a>
              )}

              {/* Live App */}
              {project.links.liveUrl && !project.links.liveUrl.includes("drive.google.com") && (
                <a
                  href={project.links.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Launch ${project.title} Live Application`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 text-xs font-sans font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 text-xs font-sans font-semibold text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <PythonIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>PyPI Package</span>
                </a>
              )}

              {/* Venipuncture VR: Navigate directly to the 5-demo gallery */}
              {project.slug === "venipuncture-vr" ? (
                <Link
                  href={`/projects/${project.slug}#demos-gallery`}
                  aria-label={`Watch all 5 ${project.title} demonstrations`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-3.5 text-xs font-sans font-semibold text-sky-800 hover:bg-sky-100 transition-all cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <Play className="h-3.5 w-3.5 fill-sky-700 text-sky-700" />
                  <span>5 VR Demos</span>
                </Link>
              ) : (
                /* Watch Demo Modal Trigger for other projects */
                project.links.demoVideoUrl && onOpenVideo && (
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
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-3.5 text-xs font-sans font-semibold text-sky-800 hover:bg-sky-100 transition-all cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <Play className="h-3.5 w-3.5 fill-sky-700 text-sky-700" />
                    <span>Watch Demo</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

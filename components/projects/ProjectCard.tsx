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
  Sparkles,
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
  // Default to 'preview' (image thumbnail) to show real software interface, switchable to 3D
  const [activeTab, setActiveTab] = useState<"preview" | "3d">("preview");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0d121f]/70 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#111728]/90 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.28)]"
    >
      <div>
        {/* Category & Featured Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400/90 font-medium bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-full">
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-2.5 w-2.5 text-indigo-400" />
              <span>Featured System</span>
            </span>
          )}
        </div>

        {/* Visual Showcase (UI Preview Screenshot or Interactive 3D Model) */}
        {(project.thumbnail || threeDType) && (
          <div className="mb-4 relative rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950/80 shadow-inner group/preview">
            {/* Tab switch if both available */}
            {hasBoth && (
              <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 rounded-lg bg-slate-950/85 p-1 border border-slate-800/80 backdrop-blur-md shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    activeTab === "preview"
                      ? "bg-indigo-600 text-white font-medium shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  aria-label="View UI Preview"
                >
                  <Eye className="h-3 w-3" />
                  <span>UI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("3d")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    activeTab === "3d"
                      ? "bg-indigo-600 text-white font-medium shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  aria-label="View 3D WebGL Model"
                >
                  <Box className="h-3 w-3" />
                  <span>3D</span>
                </button>
              </div>
            )}

            {/* Display either UI Preview or 3D */}
            <div className="h-40 sm:h-44 w-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "preview" && project.thumbnail ? (
                  <motion.div
                    key="ui-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block w-full h-full cursor-pointer relative overflow-hidden"
                      tabIndex={-1}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} Interface Preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority={project.featured}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 rounded bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-slate-800/80 pointer-events-none flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Production Interface</span>
                      </div>
                    </Link>
                  </motion.div>
                ) : threeDType ? (
                  <motion.div
                    key="3d-model"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Project3DCanvas
                      type={threeDType}
                      height="h-40 sm:h-44"
                      interactive={true}
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono text-indigo-300 border border-slate-800/80 pointer-events-none flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      <span>3D WebGL 60FPS</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >
            {project.title}
          </Link>
        </h3>

        {/* Tagline / Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-2">
          {project.tagline}
        </p>

        {/* Key Achievement Banner */}
        <div className="mt-3.5 rounded-lg border border-emerald-900/40 bg-emerald-950/20 px-3 py-2 text-xs font-mono text-slate-200 flex items-start gap-2">
          <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
          <span className="leading-snug">{project.keyAchievement}</span>
        </div>

        {/* Technologies List */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-800/70 px-2 py-0.5 text-[11px] font-mono text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-md bg-transparent px-1.5 py-0.5 text-[11px] font-mono text-slate-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        {/* Case study link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors group/link"
        >
          <FileText className="h-3.5 w-3.5 text-indigo-400" />
          <span>Case Study</span>
          <ArrowRight className="h-3 w-3 text-slate-400 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* GitHub Repo */}
          {project.links.githubUrl && (
            <a
              href={project.links.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
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
              className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors"
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
              className="inline-flex items-center gap-1 rounded-md border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors"
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
              className="inline-flex items-center gap-1 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors font-medium cursor-pointer"
            >
              <Play className="h-3 w-3 fill-cyan-300" />
              <span>Watch Demo</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

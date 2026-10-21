"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ODYSSEY_CHAPTERS } from "@/lib/scene/odysseyConfig";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import {
  ArrowRight,
  Cpu,
  Database,
  Box,
  CheckCircle2,
  Terminal,
  Activity,
  Compass,
  FileCode,
  Zap,
} from "lucide-react";

export const AIEngineeringOdyssey: React.FC = () => {
  const { smoothProgress } = useScrollProgress();
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(0);

  // Compute active chapter from scroll progress or manual selection
  const computedChapterIndex = Math.min(
    Math.max(
      ODYSSEY_CHAPTERS.findIndex(
        (c) => smoothProgress >= c.startProgress && smoothProgress <= c.endProgress
      ),
      0
    ),
    ODYSSEY_CHAPTERS.length - 1
  );

  const displayIndex = activeChapterIndex >= 0 ? activeChapterIndex : computedChapterIndex;
  const currentChapter = ODYSSEY_CHAPTERS[displayIndex] || ODYSSEY_CHAPTERS[0];

  const getChapterIcon = (id: string) => {
    switch (id) {
      case "chapter-01-input":
        return <Terminal className="h-4 w-4" />;
      case "chapter-02-neural":
        return <Activity className="h-4 w-4" />;
      case "chapter-03-transformer":
        return <Zap className="h-4 w-4" />;
      case "chapter-04-rag":
        return <Database className="h-4 w-4" />;
      case "chapter-05-ai-engineering":
        return <FileCode className="h-4 w-4" />;
      case "chapter-06-docker":
        return <Box className="h-4 w-4" />;
      case "chapter-07-cicd":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <section
      id="odyssey"
      aria-label="AI Engineering Odyssey — Technical Narrative"
      className="relative z-10 py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header: The Creative Concept */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1 text-xs font-mono text-sky-800 dark:text-sky-300 shadow-2xs font-semibold">
            <Compass className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span>AI ENGINEERING ODYSSEY · SCROLL-DRIVEN 3D EXPERIENCE</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
            A journey through the{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 dark:from-sky-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
              lifecycle of intelligence.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed font-medium">
            Follow the 3D visual guide through 7 computational milestones—from raw token boundaries to neural signal propagation, transformer attention, production RAG pipelines, code intelligence, containerization, and automated CI/CD delivery.
          </p>
        </div>

        {/* Sticky Chapter HUD Navigation Bar */}
        <div className="sticky top-16 z-30 mb-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-2.5 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {/* Chapter Step Pills */}
            <div className="flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Odyssey Chapters">
              {ODYSSEY_CHAPTERS.map((chap, idx) => {
                const isActive = displayIndex === idx;
                return (
                  <button
                    key={chap.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      setSelectedSubTab(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs scale-[1.02]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium"
                    }`}
                  >
                    <span className="opacity-70">{chap.number}</span>
                    <span className="hidden sm:inline truncate max-w-[110px] md:max-w-none">
                      {chap.title.split("&")[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Progress Telemetry Tag */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono shrink-0 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Scroll:</span>
              <span className="font-bold text-slate-950 dark:text-white">
                {Math.round(smoothProgress * 100)}%
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Chapter Presentation Stage: Editorial Content + High-Contrast Technical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Chapter Meta & Technical Inspector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Chapter Card */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-mono text-slate-800 dark:text-slate-200 font-bold">
                  {getChapterIcon(currentChapter.id)}
                  <span>STAGE {currentChapter.number} / 07</span>
                </div>

                <div className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-bold">
                  {currentChapter.concept.split(",")[0]}
                </div>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
                {currentChapter.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium font-sans mb-6 leading-relaxed">
                {currentChapter.tagline}
              </p>

              {/* Technical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {currentChapter.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-3 font-mono"
                  >
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white mt-0.5 truncate">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Technical Sub-Tabs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {currentChapter.technicalDetails.map((td, idx) => (
                    <button
                      key={td.title}
                      type="button"
                      onClick={() => setSelectedSubTab(idx)}
                      className={`text-xs font-mono pb-1 border-b-2 transition-all cursor-pointer font-bold ${
                        selectedSubTab === idx
                          ? "border-indigo-600 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      <span>{td.title.split("(")[0].trim()}</span>
                    </button>
                  ))}
                </div>

                {currentChapter.technicalDetails[selectedSubTab] && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm">
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {currentChapter.technicalDetails[selectedSubTab].description}
                    </p>
                    <ul className="space-y-2 pt-1">
                      {currentChapter.technicalDetails[selectedSubTab].subpoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Verified Project Link Anchor */}
              <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-sans">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] block">
                    Real-World Implementation:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {currentChapter.projectTie}
                  </span>
                </div>

                {currentChapter.projectSlug && (
                  <Link
                    href={`/projects/${currentChapter.projectSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 dark:bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all font-mono shrink-0 shadow-xs hover:translate-x-0.5"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Deep-Dive & Real-Time Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live 3D Viewport Anchor Indicator */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-5 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                  <span>3D Horizon Perspective</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Chapter {currentChapter.number} Coordinates
                </span>
              </div>

              <div className="font-mono text-xs text-slate-300 space-y-1 bg-black/40 rounded-xl p-3 border border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-500">Camera X/Y/Z:</span>
                  <span className="text-sky-300">
                    [{currentChapter.cameraPos.join(", ")}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Vector:</span>
                  <span className="text-emerald-300">
                    [{currentChapter.cameraTarget.join(", ")}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Character Path:</span>
                  <span className="text-violet-300">
                    z = {currentChapter.characterPos[2]}m
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans mt-3 leading-relaxed">
                As you scroll through this narrative, the stylized 3D engineer strides forward along the computational highway. Every scene transforms dynamically without page reloads.
              </p>
            </div>

            {/* Quick Milestone Trajectory Checklist */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Narrative Roadmap
              </span>

              <div className="space-y-1.5 font-mono text-xs">
                {ODYSSEY_CHAPTERS.map((ch, idx) => {
                  const isCurrent = displayIndex === idx;
                  const isPast = displayIndex > idx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setActiveChapterIndex(idx);
                        setSelectedSubTab(0);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left cursor-pointer ${
                        isCurrent
                          ? "bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-bold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isPast ? "bg-emerald-500" : isCurrent ? "bg-indigo-500 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                        <span className="opacity-70">{ch.number}</span>
                        <span className="truncate">{ch.title}</span>
                      </div>
                      <ArrowRight className={`h-3 w-3 shrink-0 ${isCurrent ? "text-indigo-600 dark:text-cyan-400" : "opacity-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

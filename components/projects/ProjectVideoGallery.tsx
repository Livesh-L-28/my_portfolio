"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Film,
  HardDrive,
  CheckCircle2,
  Cpu,
  Glasses,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import {
  VENIPUNCTURE_DEMOS,
  VenipunctureDemo,
} from "@/data/venipuncture-demos";
import { VideoPlayerModal } from "@/components/projects/VideoPlayerModal";

interface ProjectVideoGalleryProps {
  demos?: VenipunctureDemo[];
  className?: string;
}

export const ProjectVideoGallery: React.FC<ProjectVideoGalleryProps> = ({
  demos = VENIPUNCTURE_DEMOS,
  className = "",
}) => {
  const [selectedDemo, setSelectedDemo] = useState<VenipunctureDemo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenDemo = (demo: VenipunctureDemo, triggerElement: HTMLButtonElement) => {
    activeTriggerRef.current = triggerElement;
    setSelectedDemo(demo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getCategoryIcon = (category: VenipunctureDemo["category"]) => {
    switch (category) {
      case "Medical AI":
        return <Cpu className="h-3 w-3" />;
      case "VR Experience":
        return <Glasses className="h-3 w-3" />;
      case "Test Mode":
        return <Terminal className="h-3 w-3" />;
      case "Training Mode":
        return <Activity className="h-3 w-3" />;
      default:
        return <Layers className="h-3 w-3" />;
    }
  };

  const getGradientForCard = (id: string) => {
    switch (id) {
      case "demo-01-medical-ai":
        return "border-t-2 border-t-emerald-600 bg-white border-slate-200/90 hover:border-slate-300";
      case "demo-02-vr-web-walkthrough":
        return "border-t-2 border-t-violet-600 bg-white border-slate-200/90 hover:border-slate-300";
      case "demo-03-test-scene-console":
        return "border-t-2 border-t-amber-600 bg-white border-slate-200/90 hover:border-slate-300";
      case "demo-04-test-scene":
        return "border-t-2 border-t-rose-600 bg-white border-slate-200/90 hover:border-slate-300";
      case "demo-05-training-scene":
        return "border-t-2 border-t-sky-600 bg-white border-slate-200/90 hover:border-slate-300";
      default:
        return "border-t-2 border-t-indigo-600 bg-white border-slate-200/90 hover:border-slate-300";
    }
  };

  return (
    <section id="demos-gallery" className={`mb-16 scroll-mt-24 ${className}`}>
      {/* Section Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 bg-indigo-50 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 bg-sky-50 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-mono text-sky-800 mb-3">
              <Film className="h-3.5 w-3.5 text-sky-600" />
              <span>Multi-Stream Clinical Demonstrations</span>
              <span className="text-sky-500 font-bold">•</span>
              <span>5 Verified Recordings</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Inside the Simulation
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore the VR procedure, assessment scenarios, and integrated medical AI assistant through five project demonstrations.
            </p>
          </div>

          {/* Demonstration Suite Info Card */}
          <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-1.5 min-w-[260px]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Film className="h-3.5 w-3.5 text-sky-600" />
                <span>Simulation Demonstrations</span>
              </span>
              <span className="text-emerald-700 font-bold">5 Recordings</span>
            </div>

            <p className="text-[11px] text-slate-500 font-sans leading-tight">
              High-resolution recordings ranging from 46 MB to 407 MB. Click &quot;Watch Demo&quot; on any card to stream directly in-page.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {demos.map((demo, idx) => {
          const isLargeFeatured = idx === 1; // 407 MB full walkthrough
          return (
            <div
              key={demo.id}
              className={`group flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${getGradientForCard(
                demo.id
              )} ${isLargeFeatured ? "lg:col-span-2" : ""}`}
            >
              <div>
                {/* Header Row: Number + Badge + File Size */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                      {demo.demoNumber}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600 font-mono text-xs">/</span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded border ${demo.badgeStyle.bg} ${demo.badgeStyle.text} ${demo.badgeStyle.border} font-bold`}
                    >
                      {getCategoryIcon(demo.category)}
                      <span>{demo.category}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold">
                    <HardDrive className="h-2.5 w-2.5 text-slate-600 dark:text-slate-400" />
                    <span>{demo.fileSize}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                  {demo.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
                  {demo.description}
                </p>

                {/* Key Highlights */}
                <ul className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  {demo.keyHighlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-1.5 text-[11px] text-slate-800 dark:text-slate-200 font-sans leading-snug font-medium"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => handleOpenDemo(demo, e.currentTarget)}
                  aria-label={`Watch ${demo.title} demonstration video`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 dark:bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                  <span>Watch Demo</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-medium">
                  <span className="truncate max-w-[170px] hidden sm:inline" title={demo.filename}>
                    {demo.filename}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reusable Video Player Modal */}
      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        demo={selectedDemo}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
};

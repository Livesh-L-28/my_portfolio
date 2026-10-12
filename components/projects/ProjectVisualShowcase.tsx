"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Box, Maximize2, ShieldCheck, Sparkles } from "lucide-react";
import { Project3DCanvas, Project3DType } from "@/components/3d/Project3DCanvas";

interface ProjectVisualShowcaseProps {
  slug: string;
  title: string;
  thumbnail?: string;
  threeDType: Project3DType | null;
}

export const ProjectVisualShowcase: React.FC<ProjectVisualShowcaseProps> = ({
  slug,
  title,
  thumbnail,
  threeDType,
}) => {
  const [activeTab, setActiveTab] = useState<"ui" | "3d">(
    thumbnail ? "ui" : "3d"
  );
  const [isZoomed, setIsZoomed] = useState(false);

  if (!thumbnail && !threeDType) return null;

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f]/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="font-sans text-sm sm:text-base font-bold text-white">
              {activeTab === "ui"
                ? "Production Interface & Architecture Telemetry"
                : "Interactive 3D WebGL System Model"}
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-950/80 p-1 border border-slate-800/80">
            {thumbnail && (
              <button
                type="button"
                onClick={() => setActiveTab("ui")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTab === "ui"
                    ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>UI Architecture</span>
              </button>
            )}

            {threeDType && (
              <button
                type="button"
                onClick={() => setActiveTab("3d")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTab === "3d"
                    ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Box className="h-3.5 w-3.5" />
                <span>3D WebGL (60FPS)</span>
              </button>
            )}
          </div>
        </div>

        {/* Display Area */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
          {activeTab === "ui" && thumbnail && (
            <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[440px] max-h-[600px] overflow-hidden group">
              <Image
                src={thumbnail}
                alt={`${title} System Interface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300 pointer-events-none">
                <span className="rounded-md bg-slate-950/85 backdrop-blur-md px-2.5 py-1 text-cyan-300 border border-slate-800/80 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Production-Grade UI Telemetry</span>
                </span>
                <span className="hidden sm:inline-block rounded-md bg-slate-950/85 backdrop-blur-md px-2.5 py-1 text-slate-400 border border-slate-800/80">
                  {title}
                </span>
              </div>
            </div>
          )}

          {activeTab === "3d" && threeDType && (
            <div className="relative p-2 sm:p-4">
              <Project3DCanvas
                type={threeDType}
                height="h-80 sm:h-96"
                interactive={true}
                showControlsHelp={true}
              />
              <div className="mt-2.5 px-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Interactive 3D WebGL System Model</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Click and drag to orbit 360° · Hardware accelerated 60FPS
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

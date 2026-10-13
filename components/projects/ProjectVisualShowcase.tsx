"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Box } from "lucide-react";
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

  if (!thumbnail && !threeDType) return null;

  return (
    <section className="mb-12">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
        {/* Clean Window Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 bg-zinc-900/70">
          <div className="flex items-center gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="text-xs font-mono text-zinc-300 font-medium">
              {title}
            </span>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-zinc-950 p-1 border border-zinc-800">
            {thumbnail && (
              <button
                type="button"
                onClick={() => setActiveTab("ui")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                  activeTab === "ui"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
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
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                  activeTab === "3d"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Box className="h-3.5 w-3.5" />
                <span>3D WebGL (60FPS)</span>
              </button>
            )}
          </div>
        </div>

        {/* Display Area - Pure, clean, unobstructed */}
        <div className="relative bg-zinc-950">
          {activeTab === "ui" && thumbnail && (
            <div className="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-[460px] max-h-[640px] overflow-hidden">
              <Image
                src={thumbnail}
                alt={`${title} System Interface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-cover object-top"
              />
            </div>
          )}

          {activeTab === "3d" && threeDType && (
            <div className="p-4 sm:p-6">
              <Project3DCanvas
                type={threeDType}
                height="h-80 sm:h-96"
                interactive={true}
                showControlsHelp={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

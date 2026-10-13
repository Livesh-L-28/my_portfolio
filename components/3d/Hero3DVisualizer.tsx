"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project3DCanvas, Project3DType } from "@/components/3d/Project3DCanvas";
import { Sparkles, ArrowRight, Eye, RotateCw } from "lucide-react";

interface ModeItem {
  id: Project3DType;
  title: string;
  projectSlug: string;
  subtitle: string;
  metric: string;
  desc: string;
}

const MODES: ModeItem[] = [
  {
    id: "nexarag",
    title: "NexaRAG",
    projectSlug: "nexarag",
    subtitle: "3D Dense Vector Space & Hybrid Retrieval",
    metric: "~24.5 ms avg latency · 321 tests",
    desc: "120-point embedding cloud with nearest-neighbor search rays, sparse BM25 fusion, and query vector beacon.",
  },
  {
    id: "llmfirewall",
    title: "LLMFirewall",
    projectSlug: "llmfirewall-core",
    subtitle: "3D Geodesic Defense Shield & Sandbox",
    metric: "608 security tests · sub-millisecond",
    desc: "Multi-layered icosahedron barrier intercepting prompt injections, token leaks, and unsafe tool execution.",
  },
  {
    id: "visualmemory",
    title: "Visual Memory",
    projectSlug: "ai-visual-memory",
    subtitle: "3D Spatial Camera Tracking & Frustum",
    metric: "30–50 ms/frame · ByteTrack + CLIP",
    desc: "Perspective camera frustum, homography plane, and 3D bounding cubes for real-time appearance Re-ID.",
  },
  {
    id: "aireliability",
    title: "AI Reliability",
    projectSlug: "aireliability-testing",
    subtitle: "3D Chaos Stress Matrix & Perturbation Vectors",
    metric: "362 resilience assertions",
    desc: "Adversarial stress probe beams targeting core neural polytope with energetic damping shield and perturbation telemetry.",
  },
  {
    id: "medical",
    title: "Venipuncture VR",
    projectSlug: "venipuncture-vr",
    subtitle: "3D Medical Instruments & 16-Step Guided Workflow",
    metric: "16-Step Workflow · Unity & C#",
    desc: "Virtual reality clinical training environment simulating phlebotomy with interactive medical equipment and FastAPI session management.",
  },
  {
    id: "aegis",
    title: "AEGIS Mesh",
    projectSlug: "aegis-framework",
    subtitle: "3D Distributed Cluster Telemetry Mesh",
    metric: "O-Tel + Prometheus + Loki",
    desc: "Distributed Kubernetes pod rings with real-time multi-modal telemetry pulses and approval gates.",
  },
];

export const Hero3DVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ModeItem>(MODES[0]);

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Top Header with Interactive Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
            Interactive 3D Project Systems
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded self-start sm:self-auto">
          WebGL 60FPS · Drag to Rotate
        </span>
      </div>

      {/* Switcher Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-3" role="tablist">
        {MODES.map((mode) => {
          const isSelected = activeMode.id === mode.id;
          return (
            <button
              key={mode.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveMode(mode)}
              className={`rounded-lg px-2 py-1.5 text-[11px] sm:text-xs font-mono text-center transition-all cursor-pointer truncate ${
                isSelected
                  ? "bg-zinc-100 text-zinc-950 font-bold shadow-sm"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {mode.title}
            </button>
          );
        })}
      </div>

      {/* 3D Canvas Box */}
      <div className="relative">
        <Project3DCanvas
          type={activeMode.id}
          height="h-56 sm:h-64"
          interactive={true}
          showControlsHelp={true}
        />
      </div>

      {/* Technical Spec & Case Study Trigger */}
      <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800/80 pb-2 mb-2">
          <span className="font-sans font-bold text-xs text-white">
            {activeMode.subtitle}
          </span>
          <span className="font-mono text-[11px] text-emerald-400 font-semibold">
            {activeMode.metric}
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
          {activeMode.desc}
        </p>

        <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Real system architecture in WebGL
          </span>
          <Link
            href={`/projects/${activeMode.projectSlug}`}
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white font-medium transition-colors"
          >
            <span>Inspect {activeMode.title} Case Study</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

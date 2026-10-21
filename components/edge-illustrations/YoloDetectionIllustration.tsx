"use client";

import React, { useEffect, useState, useRef } from "react";
import { Crosshair, RefreshCw } from "lucide-react";

interface BoundingBox {
  id: string;
  label: string;
  confidence: number;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const YoloDetectionIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simulated frames representing real medical VR cannula approach tracking
  const frameDetections: BoundingBox[][] = [
    [
      { id: "b1", label: "Needle Cannula", confidence: 0.94, color: "#38bdf8", x: 60, y: 35, w: 75, h: 42 },
      { id: "b2", label: "Venous Target", confidence: 0.91, color: "#10b981", x: 110, y: 65, w: 60, h: 25 },
      { id: "b3", label: "Tourniquet Band", confidence: 0.98, color: "#f59e0b", x: 20, y: 15, w: 45, h: 22 },
    ],
    [
      { id: "b1", label: "Needle Cannula", confidence: 0.96, color: "#38bdf8", x: 75, y: 45, w: 72, h: 38 },
      { id: "b2", label: "Venous Flashback", confidence: 0.95, color: "#10b981", x: 105, y: 62, w: 64, h: 28 },
      { id: "b3", label: "Tourniquet Band", confidence: 0.98, color: "#f59e0b", x: 20, y: 15, w: 45, h: 22 },
    ],
    [
      { id: "b1", label: "Needle Cannula", confidence: 0.98, color: "#38bdf8", x: 88, y: 52, w: 68, h: 32 },
      { id: "b2", label: "Venous Flashback", confidence: 0.97, color: "#10b981", x: 100, y: 60, w: 68, h: 30 },
      { id: "b3", label: "Sterile Field", confidence: 0.99, color: "#a855f7", x: 10, y: 8, w: 190, h: 100 },
    ],
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frameDetections.length);
    }, 1600);

    return () => clearInterval(timer);
  }, [isPlaying, frameDetections.length]);

  // Pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentBoxes = frameDetections[frameIdx];

  return (
    <aside
      ref={containerRef}
      aria-label="Computer Vision & YOLO Object Detection Edge Illustration"
      className="w-full max-w-[275px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 shadow-sm space-y-3 overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-200/70 dark:border-slate-800/70 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
          <Crosshair className="h-3.5 w-3.5 text-emerald-500" />
          <span>YOLO Spatial Tracking</span>
        </div>

        <button
          type="button"
          onClick={() => setFrameIdx((prev) => (prev + 1) % frameDetections.length)}
          aria-label="Cycle detection frame"
          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>

      {/* Camera Viewport Canvas */}
      <div className="relative aspect-[16/10] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Subtle procedural grid & crosshair */}
        <div className="absolute inset-0 bg-tech-dots opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800/60" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-slate-800/60" />

        {/* Dynamic Bounding Boxes */}
        <svg
          viewBox="0 0 220 120"
          width="220"
          height="120"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          className="w-full h-full select-none"
          role="img"
          aria-label="Computer vision frame with annotated object detection bounding boxes."
        >
          {currentBoxes.map((box) => (
            <g key={box.id} className="transition-all duration-500 ease-out">
              {/* Bounding Rectangle */}
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                fill={box.color}
                fillOpacity="0.08"
                stroke={box.color}
                strokeWidth="1.4"
                strokeDasharray="4,2"
              />

              {/* Corner brackets */}
              <path
                d={`M${box.x},${box.y + 6} L${box.x},${box.y} L${box.x + 6},${box.y}`}
                fill="none"
                stroke={box.color}
                strokeWidth="2.2"
              />
              <path
                d={`M${box.x + box.w - 6},${box.y} L${box.x + box.w},${box.y} L${box.x + box.w},${box.y + 6}`}
                fill="none"
                stroke={box.color}
                strokeWidth="2.2"
              />

              {/* Tag Label Ribbon */}
              <rect
                x={box.x}
                y={Math.max(box.y - 12, 2)}
                width={box.label.length * 4.6 + 22}
                height="11"
                rx="2"
                fill={box.color}
              />
              <text
                x={box.x + 3}
                y={Math.max(box.y - 3.5, 10.5)}
                className="font-mono text-[6.5px] fill-slate-950 font-bold"
              >
                {box.label} {(box.confidence * 100).toFixed(0)}%
              </text>
            </g>
          ))}
        </svg>

        {/* Live FPS & Inference Telemetry overlay */}
        <div className="absolute bottom-1.5 left-2 font-mono text-[8px] text-slate-400 bg-black/60 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>IoU: 0.85 · Latency: 11.2ms · Frame #{frameIdx + 104}</span>
        </div>
      </div>

      {/* Detection Class Telemetry list */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/60 p-2.5 font-mono text-[10px] space-y-1.5">
        <div className="text-slate-500 dark:text-slate-400 flex items-center justify-between text-[9px]">
          <span>Tracked Entity</span>
          <span>Confidence</span>
        </div>

        {currentBoxes.map((b) => (
          <div key={b.id} className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.color }} />
              <span>{b.label}</span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {(b.confidence * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="text-[9px] font-mono text-slate-400 text-center">
        Simulation Telemetry · Authentic Venipuncture VR Classes
      </div>
    </aside>
  );
};

"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Play, Pause, RotateCw, Activity } from "lucide-react";

interface NodeCoord {
  id: string;
  x: number;
  y: number;
  layer: number;
  label: string;
  isBias?: boolean;
}

interface SynapseConnection {
  from: NodeCoord;
  to: NodeCoord;
  weight: number; // positive = emerald, negative = rose
  isBiasConn?: boolean;
}

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const NeuralNetworkIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSignalStep, setActiveSignalStep] = useState(0);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Neural Network Architecture: 3 Input Nodes + 1 Bias -> 4 Hidden Nodes + 1 Bias -> 2 Output Nodes
  const width = 240;
  const height = 300;

  const nodes: NodeCoord[] = [
    // Layer 0: Input Nodes
    { id: "x1", x: 35, y: 55, layer: 0, label: "x₁" },
    { id: "x2", x: 35, y: 115, layer: 0, label: "x₂" },
    { id: "x3", x: 35, y: 175, layer: 0, label: "x₃" },
    { id: "b1", x: 35, y: 235, layer: 0, label: "+b₁", isBias: true },

    // Layer 1: Hidden Layer Nodes
    { id: "h1", x: 120, y: 45, layer: 1, label: "h₁" },
    { id: "h2", x: 120, y: 100, layer: 1, label: "h₂" },
    { id: "h3", x: 120, y: 155, layer: 1, label: "h₃" },
    { id: "h4", x: 120, y: 210, layer: 1, label: "h₄" },
    { id: "b2", x: 120, y: 265, layer: 1, label: "+b₂", isBias: true },

    // Layer 2: Output Layer Nodes
    { id: "y1", x: 205, y: 100, layer: 2, label: "a₁" },
    { id: "y2", x: 205, y: 180, layer: 2, label: "a₂" },
  ];

  const NODE_METADATA: Record<string, { title: string; subtitle: string; formula: string }> = {
    x1: { title: "Input Node x₁", subtitle: "Dense semantic query embedding", formula: "x₁ ∈ ℝᵈ" },
    x2: { title: "Input Node x₂", subtitle: "BM25 sparse token frequency", formula: "x₂ ∈ ℝᵈ" },
    x3: { title: "Input Node x₃", subtitle: "Citation & recency prior signal", formula: "x₃ ∈ ℝᵈ" },
    b1: { title: "Input Bias b₁", subtitle: "Layer 1 affine translation term", formula: "z₁ = W₁x + b₁" },
    h1: { title: "Hidden Unit h₁", subtitle: "Dense latent manifold detector", formula: "h₁ = GELU(z₁)" },
    h2: { title: "Hidden Unit h₂", subtitle: "Cross-encoder joint attention unit", formula: "h₂ = GELU(z₂)" },
    h3: { title: "Hidden Unit h₃", subtitle: "Context budget compression unit", formula: "h₃ = GELU(z₃)" },
    h4: { title: "Hidden Unit h₄", subtitle: "Safety & prompt guard rail unit", formula: "h₄ = GELU(z₄)" },
    b2: { title: "Hidden Bias b₂", subtitle: "Layer 2 affine translation term", formula: "z₂ = W₂h + b₂" },
    y1: { title: "Output Logit a₁", subtitle: "Grounded retrieval score logit", formula: "a₁ = σ(z₂₁)" },
    y2: { title: "Output Logit a₂", subtitle: "Citation confidence probability", formula: "a₂ = σ(z₂₂)" },
  };

  // Specific scientific weights (positive = cyan/emerald, negative = coral/rose)
  const connections: SynapseConnection[] = [
    // Input to Hidden connections
    { from: nodes[0], to: nodes[4], weight: 1.4 },
    { from: nodes[0], to: nodes[5], weight: -0.8 },
    { from: nodes[1], to: nodes[5], weight: 1.2 },
    { from: nodes[1], to: nodes[6], weight: -1.1 },
    { from: nodes[2], to: nodes[6], weight: 0.9 },
    { from: nodes[2], to: nodes[7], weight: 1.5 },
    // Bias 1 connections
    { from: nodes[3], to: nodes[4], weight: 0.5, isBiasConn: true },
    { from: nodes[3], to: nodes[5], weight: -0.4, isBiasConn: true },
    { from: nodes[3], to: nodes[6], weight: 0.6, isBiasConn: true },
    { from: nodes[3], to: nodes[7], weight: 0.3, isBiasConn: true },

    // Hidden to Output connections
    { from: nodes[4], to: nodes[9], weight: 1.8 },
    { from: nodes[5], to: nodes[9], weight: -1.3 },
    { from: nodes[6], to: nodes[10], weight: 1.6 },
    { from: nodes[7], to: nodes[10], weight: -0.7 },
    // Bias 2 connections
    { from: nodes[8], to: nodes[9], weight: 0.4, isBiasConn: true },
    { from: nodes[8], to: nodes[10], weight: -0.5, isBiasConn: true },
  ];

  // Sequential Signal Propagation Timer
  useEffect(() => {
    if (!isPlaying || isReducedMotion || selectedNodeId) return;

    const interval = setInterval(() => {
      setActiveSignalStep((prev) => (prev + 1) % 4);
    }, 1400);

    return () => clearInterval(interval);
  }, [isPlaying, isReducedMotion, selectedNodeId]);

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

  const activeFocusId = hoveredNode || selectedNodeId;
  const activeMetadata = activeFocusId ? NODE_METADATA[activeFocusId] : null;

  const handleNodeClick = (id: string, layer: number) => {
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    } else {
      setSelectedNodeId(id);
      setActiveSignalStep(layer);
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Neural Network Signal Propagation Visualizer"
      className="w-full max-w-[275px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 shadow-sm space-y-3 overflow-hidden"
    >
      {/* Header bar with scientific telemetry */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-200/70 dark:border-slate-800/70 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
          <Activity className="h-3.5 w-3.5 text-indigo-500" />
          <span>Feed-Forward MLP</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (selectedNodeId) setSelectedNodeId(null);
            }}
            aria-label={isPlaying ? "Pause neural animation" : "Resume neural animation"}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            {isPlaying && !selectedNodeId ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedNodeId(null);
              setHoveredNode(null);
              setActiveSignalStep(0);
            }}
            aria-label="Reset neural propagation sequence"
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <RotateCw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* SVG Neural Network Graph */}
      <div className="relative flex justify-center overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: "100%", height: "auto" }}
          className="w-full max-w-[240px] h-auto select-none"
          role="img"
          aria-label="Interactive layered neural network diagram. Click nodes to inspect pathways."
        >
          {/* Defs: Glow filters and pulse animations */}
          <defs>
            <linearGradient id="positiveWeightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="negativeWeightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
            </linearGradient>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Synaptic Connection Lines */}
          {connections.map((conn, idx) => {
            const isPositive = conn.weight > 0;
            const isConnectedToActive = activeFocusId
              ? conn.from.id === activeFocusId || conn.to.id === activeFocusId
              : false;

            const isCurrentLayerActive =
              (conn.from.layer === 0 && activeSignalStep === 1) ||
              (conn.from.layer === 1 && activeSignalStep === 2);

            let strokeWidth = Math.max(Math.abs(conn.weight) * 1.2, 0.7);
            let strokeOpacity = isCurrentLayerActive ? 0.9 : 0.22;

            if (activeFocusId) {
              if (isConnectedToActive) {
                strokeWidth = Math.max(Math.abs(conn.weight) * 1.8, 1.8);
                strokeOpacity = 0.95;
              } else {
                strokeOpacity = 0.08;
                strokeWidth = Math.max(strokeWidth * 0.6, 0.5);
              }
            }

            return (
              <g key={`conn-${idx}`}>
                <line
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke={
                    conn.isBiasConn
                      ? "#a855f7"
                      : isPositive
                      ? "#06b6d4"
                      : "#f43f5e"
                  }
                  strokeWidth={strokeWidth}
                  strokeDasharray={conn.isBiasConn ? "3,3" : undefined}
                  strokeOpacity={strokeOpacity}
                  className="transition-all duration-300"
                />

                {/* Animated Signal Pulses along Connections */}
                {isPlaying && !isReducedMotion && (isCurrentLayerActive || isConnectedToActive) && (
                  <circle
                    r={isConnectedToActive ? "2.8" : "2.2"}
                    fill={conn.isBiasConn ? "#c084fc" : isPositive ? "#38bdf8" : "#fb7185"}
                    filter="url(#nodeGlow)"
                  >
                    <animateMotion
                      path={`M${conn.from.x},${conn.from.y} L${conn.to.x},${conn.to.y}`}
                      dur={isConnectedToActive ? "0.9s" : "1.2s"}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* 2. Network Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isTargetNode = activeFocusId === node.id;
            const isNodeActive =
              (node.layer === 0 && activeSignalStep === 0) ||
              (node.layer === 1 && activeSignalStep === 1) ||
              (node.layer === 2 && activeSignalStep === 2) ||
              isTargetNode;

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${NODE_METADATA[node.id]?.title || "Neural Node"}. Click to inspect synaptic connections.`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode(node.id)}
                onBlur={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id, node.layer)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNodeClick(node.id, node.layer);
                  }
                  if (e.key === "Escape") {
                    setSelectedNodeId(null);
                    setHoveredNode(null);
                  }
                }}
                className="cursor-pointer transition-transform duration-200 outline-none focus-visible:scale-110"
              >
                {/* Outer halo when active or selected */}
                {isNodeActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isBias ? 14 : isSelected ? 17 : 15}
                    fill={node.isBias ? "#c084fc" : isSelected ? "#6366f1" : "#38bdf8"}
                    fillOpacity={isSelected ? "0.4" : "0.25"}
                    filter="url(#nodeGlow)"
                  />
                )}

                {/* Main Node Body */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isBias ? 9.5 : isSelected ? 12 : 11}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-indigo-600 stroke-white dark:stroke-indigo-200 shadow-md"
                      : node.isBias
                      ? "fill-violet-100 dark:fill-violet-950 stroke-violet-500"
                      : isNodeActive
                      ? "fill-sky-100 dark:fill-sky-950 stroke-sky-400"
                      : "fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700"
                  }`}
                  strokeWidth={isTargetNode ? 2.5 : 1.5}
                />

                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className={`font-mono text-[9px] font-bold select-none pointer-events-none transition-colors ${
                    isSelected
                      ? "fill-white"
                      : node.isBias
                      ? "fill-violet-700 dark:fill-violet-300"
                      : isNodeActive
                      ? "fill-sky-800 dark:fill-sky-200"
                      : "fill-slate-700 dark:fill-slate-300"
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Telemetry & Inspection Bar */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/60 p-2.5 font-mono text-[10px] space-y-1.5 min-h-[72px] flex flex-col justify-center">
        {activeMetadata ? (
          <div className="space-y-1 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-[11px]">
                {activeMetadata.title}
              </span>
              <code className="text-indigo-600 dark:text-cyan-400 font-bold text-[9px]">
                {activeMetadata.formula}
              </code>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[9.5px] leading-tight font-sans">
              {activeMetadata.subtitle}
            </p>
            <div className="text-[8.5px] text-indigo-500 dark:text-indigo-400 flex items-center justify-between pt-0.5 border-t border-slate-200/60 dark:border-slate-800/60">
              <span>Synaptic pathways isolated</span>
              <span className="cursor-pointer underline" onClick={() => setSelectedNodeId(null)}>Clear</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Affine Sum:</span>
              <code className="text-slate-900 dark:text-slate-100 font-bold">z = Σ(wᵢxᵢ) + b</code>
            </div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Activation:</span>
              <code className="text-indigo-600 dark:text-cyan-400 font-bold">a = GELU(z)</code>
            </div>

            {/* Legend */}
            <div className="pt-1 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-3 rounded-full bg-cyan-400" />
                <span>+w</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-3 rounded-full bg-rose-400" />
                <span>-w</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-2 rounded-full bg-violet-400" />
                <span>Bias</span>
              </span>
              <span className="text-[8px] text-slate-400">Click node</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

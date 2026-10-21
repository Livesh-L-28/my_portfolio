"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Database, Brain, Shield, Activity, CheckCircle2, Info, Code2 } from "lucide-react";
import { playClickSound } from "@/lib/sound";

interface SystemNode {
  id: string;
  name: string;
  role: string;
  metric: string;
  tech: string;
  codeSnippet: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  bgGlow: string;
  x: number; // percentage
  y: number; // percentage
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "retrieval",
    name: "Hybrid Retrieval",
    role: "Dense & Sparse Fusion",
    metric: "~24.5 ms avg latency",
    tech: "pgvector + BM25 + RRF",
    codeSnippet: "rrf_score = sum(1 / (60 + rank[d]) for rank in [dense_hnsw, sparse_bm25])",
    icon: Database,
    color: "text-sky-600 dark:text-sky-400",
    borderColor: "border-sky-300 dark:border-sky-700",
    bgGlow: "rgba(14, 165, 233, 0.15)",
    x: 22,
    y: 24,
  },
  {
    id: "security",
    name: "LLM Security Firewall",
    role: "In-Process Defense",
    metric: "608 security tests",
    tech: "llmfirewall-core",
    codeSnippet: "@llmfirewall.guard(rules=[JailbreakRule, PIIExfilRule], max_overhead_ms=0.05)",
    icon: Shield,
    color: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-300 dark:border-violet-700",
    bgGlow: "rgba(139, 92, 246, 0.15)",
    x: 74,
    y: 24,
  },
  {
    id: "reasoning",
    name: "Context Fusion",
    role: "7-Tier Dynamic Budget",
    metric: "6K token ceiling",
    tech: "RAG + CAG + MAG",
    codeSnippet: "context = DynamicBudgetEngine(tier_budget=6000).allocate(rag=0.6, cag=0.3, mag=0.1)",
    icon: Brain,
    color: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-300 dark:border-indigo-700",
    bgGlow: "rgba(79, 70, 229, 0.20)",
    x: 48,
    y: 52,
  },
  {
    id: "observability",
    name: "Observability Engine",
    role: "Multimodal Telemetry",
    metric: "O-Tel + Prometheus + Loki",
    tech: "AEGIS Framework",
    codeSnippet: "aegis.correlate_signals(prom_metrics, loki_logs, otel_spans, auto_gate=True)",
    icon: Activity,
    color: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-300 dark:border-amber-700",
    bgGlow: "rgba(217, 119, 6, 0.15)",
    x: 24,
    y: 78,
  },
  {
    id: "evaluation",
    name: "Deterministic Eval",
    role: "Agent Tool Assertions",
    metric: "362 regression tests",
    tech: "aireliability suite",
    codeSnippet: "airel.assert_tool_sequence(agent, ['vector_search', 'synthesize', 'cite_sources'])",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-300 dark:border-emerald-700",
    bgGlow: "rgba(5, 150, 105, 0.15)",
    x: 74,
    y: 78,
  },
];

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

export const InteractiveGraph: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SystemNode>(SYSTEM_NODES[2]); // Default to Context Fusion
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);

  const handleSelectNode = (node: SystemNode) => {
    playClickSound();
    setActiveNode(node);
  };

  // Peripheral connections to central reasoning node (id: reasoning, index: 2)
  const connections = [
    { fromId: "retrieval", x1: "22%", y1: "24%", x2: "48%", y2: "52%", path: "M 22 24 L 48 52", color: "#38bdf8" },
    { fromId: "security", x1: "74%", y1: "24%", x2: "48%", y2: "52%", path: "M 74 24 L 48 52", color: "#8b5cf6" },
    { fromId: "observability", x1: "24%", y1: "78%", x2: "48%", y2: "52%", path: "M 24 78 L 48 52", color: "#f59e0b" },
    { fromId: "evaluation", x1: "74%", y1: "78%", x2: "48%", y2: "52%", path: "M 74 78 L 48 52", color: "#10b981" },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto glass-card bento-hairline rounded-3xl p-6 sm:p-7 shadow-xl dark:bg-slate-900/80 dark:border-slate-800">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600" />
          </span>
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
            AI Systems Architecture Topology
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50/90 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs">
          <Info className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          <span>Click Nodes to Inspect</span>
        </div>
      </div>

      {/* SVG Canvas & Node Topology */}
      <div
        className="relative h-64 sm:h-72 w-full select-none rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner"
        style={{ minHeight: "256px", position: "relative" }}
        role="region"
        aria-label="Interactive Systems Architecture Graph"
      >
        {/* Subtle grid in canvas */}
        <div className="absolute inset-0 bg-tech-dots opacity-20 pointer-events-none" />

        {/* SVG connection lines with flowing pulses */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connections to central reasoning node */}
          {connections.map((conn) => {
            const isConnActive = activeNode.id === conn.fromId || activeNode.id === "reasoning" || hoveredNodeId === conn.fromId;
            return (
              <g key={conn.fromId}>
                {/* Background base line */}
                <line
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={isConnActive ? conn.color : "#475569"}
                  strokeWidth={isConnActive ? "1.5" : "0.75"}
                  strokeDasharray={isConnActive ? undefined : "2 2"}
                  strokeOpacity={isConnActive ? 0.9 : 0.3}
                  className="transition-all duration-300"
                />

                {/* Animated signal pulse particle along active connection */}
                {isConnActive && !isReducedMotion && (
                  <circle r="1.5" fill={conn.color} filter="url(#glowLine)">
                    <animateMotion
                      path={conn.path}
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render Interactive Nodes */}
        <div role="tablist" aria-label="System Components">
          {SYSTEM_NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = activeNode.id === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <button
                key={node.id}
                role="tab"
                aria-selected={isSelected}
                aria-label={`Inspect ${node.name} architecture module`}
                onClick={() => handleSelectNode(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                style={{
                  position: "absolute",
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute group flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-95 ${
                  isSelected
                    ? `bg-slate-900 border-indigo-400 shadow-lg shadow-indigo-500/25 scale-105 z-20 ring-2 ring-indigo-400/50`
                    : isHovered
                    ? "bg-slate-900 border-slate-500 scale-102 z-15"
                    : "bg-slate-900/90 border-slate-700/80 z-10"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg border border-white/10 transition-colors ${
                    isSelected ? "text-indigo-300" : "text-slate-400 group-hover:text-white"
                  }`}
                  style={{ backgroundColor: node.bgGlow }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left hidden sm:block whitespace-nowrap">
                  <p className="text-[11px] font-semibold leading-none text-white font-sans truncate max-w-[130px]">
                    {node.name}
                  </p>
                  <p className="text-[9px] font-mono leading-tight text-slate-400 mt-0.5 truncate max-w-[130px]">
                    {node.tech.split(" ")[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Detail Inspector Box with Real Code Lines */}
      <div className="mt-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md p-4 text-xs font-mono shadow-xs transition-all space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white font-sans text-sm">
              {activeNode.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md border border-indigo-300 dark:border-indigo-900/60 text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 font-bold">
              {activeNode.role}
            </span>
          </div>
          <span className="text-indigo-700 dark:text-indigo-400 text-xs font-bold font-mono">
            {activeNode.metric}
          </span>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-medium">
          Engineered with <strong className="text-slate-950 dark:text-white font-bold">{activeNode.tech}</strong>. Part of the verified multi-stage AI system architecture.
        </p>

        {/* Live Code Line */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[11px] font-mono text-emerald-400 flex items-center gap-2 overflow-x-auto">
          <Code2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <code className="whitespace-nowrap">{activeNode.codeSnippet}</code>
        </div>
      </div>
    </div>
  );
};

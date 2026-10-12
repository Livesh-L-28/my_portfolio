"use client";

import React, { useState } from "react";
import { Database, Brain, Shield, Activity, CheckCircle2, Info } from "lucide-react";

interface SystemNode {
  id: string;
  name: string;
  role: string;
  metric: string;
  tech: string;
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
    icon: Database,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgGlow: "rgba(34, 211, 238, 0.15)",
    x: 20,
    y: 22,
  },
  {
    id: "security",
    name: "LLM Security Firewall",
    role: "In-Process Defense",
    metric: "608 security tests",
    tech: "llmfirewall-core",
    icon: Shield,
    color: "text-violet-400",
    borderColor: "border-violet-500/40",
    bgGlow: "rgba(139, 92, 246, 0.15)",
    x: 75,
    y: 22,
  },
  {
    id: "reasoning",
    name: "Context Fusion",
    role: "7-Tier Dynamic Budget",
    metric: "6K token ceiling",
    tech: "RAG + CAG + MAG",
    icon: Brain,
    color: "text-indigo-400",
    borderColor: "border-indigo-500/40",
    bgGlow: "rgba(99, 102, 241, 0.15)",
    x: 48,
    y: 52,
  },
  {
    id: "observability",
    name: "Observability Engine",
    role: "Multimodal Telemetry",
    metric: "O-Tel + Prometheus + Loki",
    tech: "AEGIS Framework",
    icon: Activity,
    color: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgGlow: "rgba(245, 158, 11, 0.15)",
    x: 22,
    y: 80,
  },
  {
    id: "evaluation",
    name: "Deterministic Eval",
    role: "Agent Tool Assertions",
    metric: "362 regression tests",
    tech: "aireliability suite",
    icon: CheckCircle2,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    x: 76,
    y: 80,
  },
];

export const InteractiveGraph: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SystemNode>(SYSTEM_NODES[2]); // Default to Reasoning

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-violet-500/20 bg-[#090D1A]/90 p-5 shadow-2xl backdrop-blur-xl">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono font-medium tracking-wider text-slate-300 uppercase">
            AI Systems Architecture Topology
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
          <Info className="w-3 h-3 text-violet-400" />
          <span>Interactive</span>
        </div>
      </div>

      {/* SVG Canvas & Node Topology */}
      <div className="relative h-64 sm:h-72 w-full select-none rounded-xl bg-[#060810]/70 border border-white/[0.04] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />

        {/* SVG connection lines with flowing dashes */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Connections to central reasoning node */}
          <line
            x1="22%"
            y1="24%"
            x2="48%"
            y2="52%"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="74%"
            y1="24%"
            x2="48%"
            y2="52%"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="24%"
            y1="78%"
            x2="48%"
            y2="52%"
            stroke="url(#lineGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1="74%"
            y1="78%"
            x2="48%"
            y2="52%"
            stroke="url(#lineGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Render Interactive Nodes */}
        {SYSTEM_NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = activeNode.id === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute group flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                isSelected
                  ? `bg-[#13192B] ${node.borderColor} shadow-lg shadow-violet-500/20 scale-105 z-20 ring-1 ring-violet-400/50`
                  : "bg-[#0B0F1D]/80 border-white/[0.08] hover:border-violet-500/30 hover:scale-102 z-10"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg border border-white/[0.08] transition-colors ${
                  isSelected ? node.color : "text-slate-400 group-hover:text-slate-200"
                }`}
                style={{ backgroundColor: node.bgGlow }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-medium leading-none text-slate-200 font-sans">
                  {node.name}
                </p>
                <p className="text-[9px] font-mono leading-tight text-slate-400 mt-0.5">
                  {node.tech.split(" ")[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Node Detail Inspector Box */}
      <div className="mt-3.5 rounded-xl border border-violet-500/20 bg-[#0B0F1D] p-3 text-xs font-mono transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white font-sans text-sm">
              {activeNode.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-violet-500/30 text-violet-300 bg-violet-500/10">
              {activeNode.role}
            </span>
          </div>
          <span className="text-cyan-300 text-[11px] font-medium">{activeNode.metric}</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Engineered with <span className="text-slate-200 font-medium">{activeNode.tech}</span>.
          Part of the verified multi-stage AI system architecture.
        </p>
      </div>

      {/* Explicit Disclaimer */}
      <div className="mt-2 text-center">
        <p className="text-[10px] text-slate-500 font-mono">
          * Illustrative topology diagram representing portfolio engineering domains.
        </p>
      </div>
    </div>
  );
};

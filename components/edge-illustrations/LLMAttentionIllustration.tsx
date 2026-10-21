"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { Zap, Compass, Info } from "lucide-react";

interface TokenItem {
  id: number;
  text: string;
  tokenId: number;
  role: string;
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

export const LLMAttentionIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHead, setActiveHead] = useState<number>(0);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(1);
  const [hoveredTokenIdx, setHoveredTokenIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [step, setStep] = useState(0);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const tokens: TokenItem[] = [
    { id: 0, text: "User", tokenId: 2481, role: "Prompt Initiator" },
    { id: 1, text: "Query", tokenId: 18402, role: "Semantic Focus" },
    { id: 2, text: "pgvector", tokenId: 49102, role: "Knowledge Retrieval" },
    { id: 3, text: "RAG", tokenId: 8219, role: "Synthesis Objective" },
  ];

  // Illustrative 4x4 attention matrix for 3 heads: [Head][QueryIdx][KeyIdx]
  // Row = Query token, Column = Key token (Softmax normalized, sum to 1.0)
  const fullAttentionMatrix: number[][][] = [
    // Head 0: Syntactic linkage / Sequence Order
    [
      [0.62, 0.24, 0.09, 0.05], // User -> [User, Query, pgvector, RAG]
      [0.15, 0.45, 0.32, 0.08], // Query -> [User, Query, pgvector, RAG]
      [0.08, 0.22, 0.58, 0.12], // pgvector -> [User, Query, pgvector, RAG]
      [0.12, 0.28, 0.25, 0.35], // RAG -> [User, Query, pgvector, RAG]
    ],
    // Head 1: Semantic grounding (Vector Retrieval focus)
    [
      [0.28, 0.52, 0.15, 0.05],
      [0.08, 0.22, 0.58, 0.12],
      [0.04, 0.16, 0.70, 0.10],
      [0.06, 0.24, 0.48, 0.22],
    ],
    // Head 2: Task objective & Synthesis
    [
      [0.20, 0.35, 0.15, 0.30],
      [0.05, 0.35, 0.25, 0.35],
      [0.05, 0.15, 0.30, 0.50],
      [0.10, 0.38, 0.22, 0.30],
    ],
  ];

  const headDescriptions = [
    "Head 1: Syntactic Linkage",
    "Head 2: Semantic Grounding",
    "Head 3: Task & Synthesis",
  ];

  // Progressive attention illumination timer (disabled when reduced motion is preferred)
  useEffect(() => {
    if (!isAnimating || isReducedMotion) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1400);

    return () => clearInterval(interval);
  }, [isAnimating, isReducedMotion]);

  // Pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnimating(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeTokenIdx = selectedTokenIdx;
  const currentHeadMatrix = fullAttentionMatrix[activeHead] || fullAttentionMatrix[0];
  const queryWeights = currentHeadMatrix[activeTokenIdx] || currentHeadMatrix[0];

  const inspectionTargetIdx = hoveredTokenIdx !== null ? hoveredTokenIdx : activeTokenIdx;
  const inspectionWeight = queryWeights[inspectionTargetIdx];

  return (
    <aside
      ref={containerRef}
      aria-label="Transformer Self-Attention Edge Illustration"
      className="w-full max-w-[275px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 shadow-sm space-y-3 overflow-hidden text-slate-800 dark:text-slate-100"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-200/70 dark:border-slate-800/70 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
          <Zap className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
          <span>Self-Attention</span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span className="text-slate-400">Head:</span>
          {[0, 1, 2].map((h) => (
            <button
              key={h}
              type="button"
              aria-label={`Select Attention ${headDescriptions[h]}`}
              aria-pressed={activeHead === h}
              onClick={() => setActiveHead(h)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 ${
                activeHead === h
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              H{h + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Head role caption */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 -mt-1">
        <span className="font-semibold text-amber-600 dark:text-amber-400 truncate">
          {headDescriptions[activeHead]}
        </span>
        <span className="text-slate-400 shrink-0">d_k = 64</span>
      </div>

      {/* Interactive Token Strip */}
      <div className="space-y-1">
        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex justify-between">
          <span>Click query token Q_i:</span>
          <span className="text-indigo-600 dark:text-indigo-400">Q = {tokens[activeTokenIdx].text}</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 font-mono text-xs" role="tablist" aria-label="Sequence Tokens">
          {tokens.map((tok, idx) => {
            const isTarget = activeTokenIdx === idx;
            const isHovered = hoveredTokenIdx === idx;
            return (
              <button
                key={tok.id}
                type="button"
                role="tab"
                aria-selected={isTarget}
                aria-label={`Token ${tok.text}, ID ${tok.tokenId}. Weight ${queryWeights[idx]}`}
                onClick={() => setSelectedTokenIdx(idx)}
                onMouseEnter={() => setHoveredTokenIdx(idx)}
                onMouseLeave={() => setHoveredTokenIdx(null)}
                onFocus={() => setHoveredTokenIdx(idx)}
                onBlur={() => setHoveredTokenIdx(null)}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isTarget
                    ? "bg-indigo-50 dark:bg-indigo-950/70 border-indigo-400 dark:border-indigo-600 text-indigo-950 dark:text-indigo-200 font-bold shadow-xs scale-105"
                    : isHovered
                    ? "bg-slate-100 dark:bg-slate-800 border-indigo-300 dark:border-indigo-500 text-slate-900 dark:text-white"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="truncate text-[11px] font-bold">{tok.text}</div>
                <div className="text-[8px] text-slate-400 mt-0.5">#{tok.tokenId}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Attention Arc Matrix */}
      <div className="relative py-1">
        <svg
          viewBox="0 0 220 80"
          width="220"
          height="80"
          style={{ maxWidth: "100%", height: "auto" }}
          className="w-full h-auto select-none"
          role="img"
          aria-label={`Self-attention weights from token ${tokens[activeTokenIdx].text} to sequence`}
        >
          <defs>
            <linearGradient id="attentionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
            </linearGradient>
            <filter id="glowArc" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Attention Arc Curves from Active Token to Context Tokens */}
          {tokens.map((tok, idx) => {
            const startX = 27 + activeTokenIdx * 55;
            const endX = 27 + idx * 55;
            const weight = queryWeights[idx];
            const heightFactor = Math.abs(activeTokenIdx - idx) * 22;
            const controlY = Math.max(70 - heightFactor, 8);
            const isTargetHovered = hoveredTokenIdx === idx;
            const isHighlight = isTargetHovered || (!isReducedMotion && step === idx);

            if (activeTokenIdx === idx) {
              // Self-loop arc
              return (
                <g key={`loop-${idx}`} className="cursor-pointer">
                  <circle
                    cx={startX}
                    cy="66"
                    r={Math.max(weight * 12, 5)}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={Math.max(weight * 4.5, 1.2)}
                    strokeOpacity={isHighlight || hoveredTokenIdx === null ? 0.8 : 0.25}
                    className="transition-all duration-300"
                  />
                </g>
              );
            }

            return (
              <path
                key={`arc-${idx}`}
                d={`M${startX},68 Q${(startX + endX) / 2},${controlY} ${endX},68`}
                fill="none"
                stroke="url(#attentionGrad)"
                strokeWidth={Math.max(weight * 6.5, 1.0)}
                strokeOpacity={isHighlight ? 0.95 : hoveredTokenIdx !== null ? 0.15 : Math.max(weight * 1.2, 0.2)}
                strokeDasharray={isHighlight ? undefined : "3,2"}
                filter={isHighlight ? "url(#glowArc)" : undefined}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredTokenIdx(idx)}
                onMouseLeave={() => setHoveredTokenIdx(null)}
              />
            );
          })}

          {/* Token Position Anchors */}
          {tokens.map((tok, idx) => (
            <circle
              key={`dot-${idx}`}
              cx={27 + idx * 55}
              cy="68"
              r={activeTokenIdx === idx ? 4.5 : hoveredTokenIdx === idx ? 4 : 3}
              fill={activeTokenIdx === idx ? "#f59e0b" : hoveredTokenIdx === idx ? "#a855f7" : "#6366f1"}
              className="transition-all duration-200"
            />
          ))}
        </svg>
      </div>

      {/* Dynamic Weight Telemetry Panel */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/60 p-2 font-mono text-[10px] space-y-1.5">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1 font-semibold">
            <Info className="h-3 w-3 text-amber-500" />
            α({tokens[activeTokenIdx].text} → {tokens[inspectionTargetIdx].text}):
          </span>
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {(inspectionWeight * 100).toFixed(0)}% ({inspectionWeight.toFixed(2)})
          </span>
        </div>

        {/* Visual Attention Bar */}
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${Math.round(inspectionWeight * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-0.5">
          <span>Target role:</span>
          <span className="truncate max-w-[150px] text-slate-700 dark:text-slate-300">
            {tokens[inspectionTargetIdx].role}
          </span>
        </div>
      </div>

      {/* Conceptual disclaimer badge */}
      <div className="text-[9px] font-mono text-slate-400 text-center flex items-center justify-center gap-1">
        <Compass className="h-3 w-3 text-slate-400 shrink-0" />
        <span>Illustrative Softmax Attention (Normalized)</span>
      </div>
    </aside>
  );
};

"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Database, Play, Pause, RotateCw, ShieldCheck, Layers, FileSearch } from "lucide-react";

interface RAGStage {
  id: string;
  name: string;
  category: string;
  detail: string;
  badge: string;
  tech: string;
}

interface SampleQuery {
  id: string;
  text: string;
  category: string;
  targetStage: number;
  sampleChunks: { rank: number; score: number; method: string; preview: string }[];
}

const RAG_PIPELINE: RAGStage[] = [
  {
    id: "ingest",
    name: "Document Ingestion",
    category: "Ingest",
    detail: "PDF/DOCX recursive parser",
    badge: "Input",
    tech: "Token-aware extraction",
  },
  {
    id: "chunk",
    name: "Semantic Chunking",
    category: "Chunking",
    detail: "512 tokens + 64 token overlap",
    badge: "512 Tok",
    tech: "Recursive character split",
  },
  {
    id: "embed",
    name: "Dense Embeddings",
    category: "Vector",
    detail: "768-dim normalized vectors",
    badge: "768-d",
    tech: "HuggingFace MiniLM",
  },
  {
    id: "dual-retrieval",
    name: "pgvector + BM25",
    category: "Hybrid",
    detail: "Dense HNSW + Sparse Inverted Index",
    badge: "Dual Index",
    tech: "PostgreSQL 16 pgvector",
  },
  {
    id: "rrf",
    name: "Rank Fusion (RRF)",
    category: "Fusion",
    detail: "Reciprocal Rank Fusion k=60",
    badge: "k=60",
    tech: "Score synthesis junction",
  },
  {
    id: "rerank",
    name: "Cross-Encoder Filter",
    category: "Precision",
    detail: "MS-MARCO MiniLM joint attention",
    badge: "Top-K",
    tech: "Full cross-scoring",
  },
  {
    id: "context",
    name: "7-Tier Context Fusion",
    category: "Assembly",
    detail: "Dynamic 6,000 token budget",
    badge: "6K Cap",
    tech: "RAG + CAG + MAG orchestration",
  },
  {
    id: "generation",
    name: "Grounded Generation",
    category: "Output",
    detail: "SSE stream with clickable citations",
    badge: "99.2% Acc",
    tech: "FastAPI + React streaming",
  },
];

const SAMPLE_QUERIES: SampleQuery[] = [
  {
    id: "q1",
    text: "Hybrid RRF Rank Fusion",
    category: "Hybrid Retrieval",
    targetStage: 4,
    sampleChunks: [
      { rank: 1, score: 0.94, method: "RRF (HNSW + BM25)", preview: "Reciprocal Rank Fusion synthesizes dense embeddings with sparse BM25 tokens with k=60 constant." },
      { rank: 2, score: 0.88, method: "Dense Vector", preview: "pgvector HNSW index executes cosine similarity scan over 768-dimensional normalized document vectors." },
      { rank: 3, score: 0.79, method: "BM25 Sparse", preview: "Lexical inverted index matches exact terms across document chunk tokens." },
    ],
  },
  {
    id: "q2",
    text: "7-Tier Token Budget",
    category: "Context Assembly",
    targetStage: 6,
    sampleChunks: [
      { rank: 1, score: 0.96, method: "Tier-1 System", preview: "Allocates 800 tokens for system prompt, security boundary guardrails, and role definition." },
      { rank: 2, score: 0.91, method: "Tier-3 RAG Chunks", preview: "Dedicates 3,200 tokens to top-k cross-encoder verified document evidence." },
      { rank: 3, score: 0.82, method: "Tier-5 Conversation", preview: "Sliding memory buffer retains recent user and assistant dialogue exchanges." },
    ],
  },
  {
    id: "q3",
    text: "SSE Latency Benchmarks",
    category: "Streaming Output",
    targetStage: 7,
    sampleChunks: [
      { rank: 1, score: 0.98, method: "SSE Fast-Path", preview: "First-token time to first byte achieves ~24.5ms over FastAPI async generator." },
      { rank: 2, score: 0.85, method: "Citation Linker", preview: "Validates inline citation bracket references against database document primary keys." },
      { rank: 3, score: 0.77, method: "Chunk Cache", preview: "In-memory LRU cache serves hot chunk embeddings without secondary disk lookups." },
    ],
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

export const RAGRetrievalIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(3); // Default on pgvector retrieval
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"pipeline" | "chunks">("pipeline");
  const [selectedChunkIdx, setSelectedChunkIdx] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);

  // IntersectionObserver to pause offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential pipeline propagation loop (when user runs play)
  useEffect(() => {
    if (!isPlaying || !isInView || isReducedMotion) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % RAG_PIPELINE.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, isInView, isReducedMotion]);

  const currentStage = RAG_PIPELINE[activeStep];
  const currentQuery = SAMPLE_QUERIES[selectedQueryIdx];

  const handleSelectQuery = (idx: number) => {
    setSelectedQueryIdx(idx);
    setActiveStep(SAMPLE_QUERIES[idx].targetStage);
    setSelectedChunkIdx(0);
  };

  return (
    <aside
      ref={containerRef}
      className="w-full max-w-[275px] rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-3 shadow-lg shadow-black/5 dark:shadow-black/20 text-xs transition-all hover:border-cyan-500/40 text-foreground"
      aria-label="NexaRAG Verified Retrieval Pipeline Visualizer"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-[11px] leading-tight text-foreground truncate">
              NexaRAG Pipeline
            </h4>
            <p className="text-[9px] text-muted-foreground font-mono truncate">
              Verified Retrieval Engine
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-cyan-500"
            title={isPlaying ? "Pause pipeline demonstration" : "Play continuous demonstration"}
            aria-label={isPlaying ? "Pause pipeline demonstration" : "Play continuous demonstration"}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-cyan-500" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveStep(0);
              setIsPlaying(false);
            }}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-cyan-500"
            title="Reset to Document Ingest"
            aria-label="Reset to Document Ingest"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Sample Query Chips */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
          <span>Sample Query:</span>
          <span className="text-cyan-500 font-semibold">{currentQuery.category}</span>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none" role="tablist" aria-label="Sample Queries">
          {SAMPLE_QUERIES.map((q, idx) => {
            const isSelected = selectedQueryIdx === idx;
            return (
              <button
                key={q.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectQuery(idx)}
                className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full border whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-700 dark:text-cyan-300 font-bold"
                    : "bg-muted/40 border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {q.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Mode Toggle: Pipeline Architecture vs Sample Retrieved Chunks */}
      <div className="flex rounded-lg bg-muted/40 p-0.5 mb-2 font-mono text-[9px]">
        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === "pipeline"
              ? "bg-background text-foreground font-bold shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-2.5 h-2.5" />
          <span>8-Stage Pipeline</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("chunks")}
          className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === "chunks"
              ? "bg-background text-foreground font-bold shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileSearch className="w-2.5 h-2.5" />
          <span>Retrieved Chunks ({currentQuery.sampleChunks.length})</span>
        </button>
      </div>

      {/* Mode 1: 8-Stage Conduit & Stepper */}
      {activeTab === "pipeline" && (
        <>
          {/* Visual Pipeline Conduit Animation */}
          <div className="relative py-1 mb-2 px-1">
            <div className="flex items-center justify-between relative">
              {/* Background Track Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

              {/* Active Signal Progress Line */}
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(activeStep / (RAG_PIPELINE.length - 1)) * 100}%` }}
              />

              {/* Stepper Dots */}
              {RAG_PIPELINE.map((stg, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;

                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`relative z-10 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                      isActive
                        ? "bg-cyan-500 text-white ring-4 ring-cyan-500/20 scale-125 shadow-sm"
                        : isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                    title={`Stage ${idx + 1}: ${stg.name}`}
                    aria-label={`Jump to stage ${idx + 1}: ${stg.name}`}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pipeline Stage Semantic List (Controlled Height, Readable Text, No Overlap) */}
          <div className="space-y-1 mb-2">
            {RAG_PIPELINE.slice(Math.max(0, activeStep - 1), Math.max(0, activeStep - 1) + 3).map((stg) => {
              const originalIdx = RAG_PIPELINE.findIndex((s) => s.id === stg.id);
              const isActive = originalIdx === activeStep;

              return (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => {
                    setActiveStep(originalIdx);
                    setIsPlaying(false);
                  }}
                  className={`w-full flex items-center justify-between p-1.5 rounded-lg border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 ${
                    isActive
                      ? "bg-cyan-500/10 border-cyan-500/50 text-foreground shadow-xs"
                      : "bg-muted/20 border-border/40 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-mono font-bold shrink-0 ${
                        isActive ? "bg-cyan-500 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {originalIdx + 1}
                    </span>
                    <div className="min-w-0 truncate">
                      <div className="font-semibold text-[10px] leading-tight truncate">
                        {stg.name}
                      </div>
                      <div className="text-[8px] font-mono text-muted-foreground truncate">
                        {stg.tech}
                      </div>
                    </div>
                  </div>

                  <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-muted/80 text-foreground/80 shrink-0">
                    {stg.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Technical Telemetry Card (Semantic HTML, Fully Bounded) */}
          <div className="rounded-lg bg-black/85 dark:bg-black/90 border border-border/60 p-2 font-mono text-[9px] text-zinc-300">
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-zinc-800 text-[8px] text-zinc-400">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Stage {activeStep + 1}/{RAG_PIPELINE.length}: {currentStage.category}
              </span>
              <span className="text-[7.5px] text-emerald-400">Verified Pipeline</span>
            </div>

            <div className="space-y-0.5 text-zinc-300">
              <div className="text-[9.5px] font-bold text-white truncate">
                {currentStage.name}
              </div>
              <div className="text-[8.5px] text-zinc-400 leading-tight">
                {currentStage.detail}
              </div>
              <div className="text-[8px] text-cyan-300/80 pt-0.5 truncate">
                Tech: {currentStage.tech}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mode 2: Sample Retrieved Chunks Inspection */}
      {activeTab === "chunks" && (
        <div className="space-y-1.5 mb-2">
          <div className="text-[8.5px] font-mono text-muted-foreground flex justify-between">
            <span>Illustrative Retrieved Chunks:</span>
            <span className="text-cyan-600 dark:text-cyan-400">Top-3 Candidates</span>
          </div>

          {currentQuery.sampleChunks.map((chunk, idx) => {
            const isSelected = selectedChunkIdx === idx;
            return (
              <button
                key={chunk.rank}
                type="button"
                onClick={() => setSelectedChunkIdx(idx)}
                className={`w-full text-left p-1.5 rounded-lg border transition-all cursor-pointer font-mono text-[8.5px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 ${
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-500/60 shadow-xs"
                    : "bg-muted/20 border-border/40 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-0.5">
                  <span className="text-foreground">#{chunk.rank} • {chunk.method}</span>
                  <span className="text-emerald-500 font-bold">Score: {chunk.score.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-[8px] line-clamp-2 leading-tight">
                  {chunk.preview}
                </p>
              </button>
            );
          })}

          <div className="text-[8px] font-mono text-zinc-400 text-center pt-0.5">
            Cross-encoder verified candidate ranking
          </div>
        </div>
      )}

      {/* Verified Benchmarks Footer */}
      <div className="mt-2 pt-1.5 border-t border-border/50 flex items-center justify-between text-[8.5px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1 text-cyan-500 font-bold">
          <ShieldCheck className="w-3 h-3" />
          ~24.5ms Latency
        </span>
        <span>321 Tests Passing</span>
      </div>
    </aside>
  );
};

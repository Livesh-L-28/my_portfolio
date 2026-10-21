"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Server, ShieldCheck, Play, Pause, RotateCcw } from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  tool: string;
  status: "idle" | "running" | "success";
  duration: string;
  details: string;
  terminalOutput: string[];
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

export const DockerCICDIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const isReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
  const [isInView, setIsInView] = useState(true);

  // IntersectionObserver to pause offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0]?.isIntersecting ?? true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cycle through stages if playing & in view & not reduced motion
  useEffect(() => {
    if (!isPlaying || !isInView || isReducedMotion) return;

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % 5);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, isInView, isReducedMotion]);

  const stages: PipelineStage[] = [
    {
      id: "commit",
      name: "Source Ingestion",
      tool: "Git / FastAPI Lab",
      status: activeStageIndex >= 0 ? "success" : "idle",
      duration: "0.1s",
      details: "Commit e7f2a1c pushed to main branch",
      terminalOutput: [
        "$ git log -1 --oneline",
        "e7f2a1c feat(api): hardened health & pg pool",
        "✓ Clean working tree verified",
      ],
    },
    {
      id: "lint-test",
      name: "Lint & pytest",
      tool: "Ruff + pytest",
      status: activeStageIndex > 1 ? "success" : activeStageIndex === 1 ? "running" : "idle",
      duration: "1.2s",
      details: "Ruff 0.4s · 321 pytest assertions passed",
      terminalOutput: [
        "$ ruff check .",
        "All checks passed! (0.04s)",
        "$ pytest -q tests/test_endpoints.py",
        "321 passed, 0 warnings in 1.18s",
      ],
    },
    {
      id: "docker-build",
      name: "Multi-Stage Docker",
      tool: "BuildKit / OCI",
      status: activeStageIndex > 2 ? "success" : activeStageIndex === 2 ? "running" : "idle",
      duration: "14.2s",
      details: "Builder (wheels) -> Distroless slim runner (124MB)",
      terminalOutput: [
        "# Stage 1: builder (python:3.11-slim)",
        "# Stage 2: runtime (distroless)",
        "--> Image size reduced 850MB -> 124MB",
        "✓ SHA256:d83f2a... tagged latest",
      ],
    },
    {
      id: "container-run",
      name: "Container Mesh",
      tool: "Docker Compose",
      status: activeStageIndex > 3 ? "success" : activeStageIndex === 3 ? "running" : "idle",
      duration: "0.8s",
      details: "Ephemeral PostgreSQL + FastAPI container networked",
      terminalOutput: [
        "$ docker-compose up -d --wait",
        "✓ postgres-db: healthy (port 5432)",
        "✓ fastapi-api: listening on 0.0.0.0:8000",
      ],
    },
    {
      id: "health-deploy",
      name: "Health & Deploy",
      tool: "HTTP Probe / GHCR",
      status: activeStageIndex === 4 ? "running" : activeStageIndex > 4 ? "success" : "idle",
      duration: "0.4s",
      details: "GET /health 200 OK -> GHCR registry push",
      terminalOutput: [
        "$ curl -s http://localhost:8000/health",
        '{"status":"healthy","pg_pool":"active"}',
        "✓ HTTP 200 OK verified",
        "--> Pushed to ghcr.io/livesh-l-28/fastapi-lab",
      ],
    },
  ];

  const currentStage = stages[activeStageIndex];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[280px] rounded-xl border border-border/80 bg-background/85 backdrop-blur-md p-3.5 shadow-lg shadow-black/5 dark:shadow-black/20 text-xs transition-all hover:border-emerald-500/40"
      aria-label="Docker and CI/CD Pipeline Automation Diagram"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Server className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-semibold text-[11px] leading-tight text-foreground flex items-center gap-1">
              CI/CD & Docker Pipeline
            </h4>
            <p className="text-[9px] text-muted-foreground font-mono">FastAPI CI/CD Lab Workflow</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={isPlaying ? "Pause pipeline" : "Play pipeline"}
            aria-label={isPlaying ? "Pause pipeline animation" : "Play pipeline animation"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setActiveStageIndex(0)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Reset pipeline"
            aria-label="Reset pipeline to commit"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Pipeline Stage Indicators */}
      <div className="space-y-1.5 mb-2.5">
        {stages.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;

          return (
            <button
              key={stg.id}
              onClick={() => {
                setActiveStageIndex(idx);
                setIsPlaying(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md border text-left transition-all ${
                isActive
                  ? "bg-emerald-500/10 border-emerald-500/40 text-foreground shadow-sm"
                  : isPassed
                  ? "bg-muted/30 border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  : "bg-transparent border-transparent text-muted-foreground/60 hover:text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold shrink-0 transition-all ${
                    isActive
                      ? "bg-emerald-500 text-white animate-pulse"
                      : isPassed
                      ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40"
                      : "bg-muted text-muted-foreground/70"
                  }`}
                >
                  {isPassed ? "✓" : idx + 1}
                </span>
                <div className="truncate">
                  <div className="font-medium text-[10px] leading-tight truncate">{stg.name}</div>
                  <div className="text-[8.5px] font-mono text-muted-foreground truncate">{stg.tool}</div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-muted-foreground shrink-0 pl-1">
                {stg.duration}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Terminal Inspection */}
      <div className="rounded-lg bg-black/80 dark:bg-black/90 border border-border/50 p-2 font-mono text-[9px] text-zinc-300">
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-800 text-[8.5px] text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Stage {activeStageIndex + 1}/5: {currentStage.name}
          </span>
          <span className="text-[8px] text-emerald-400/80">OCI Compliant</span>
        </div>
        <div className="space-y-1">
          {currentStage.terminalOutput.map((line, lIdx) => (
            <div
              key={lIdx}
              className={`leading-tight truncate ${
                line.startsWith("$")
                  ? "text-cyan-400"
                  : line.startsWith("✓")
                  ? "text-emerald-400"
                  : line.startsWith("-->") || line.startsWith("#")
                  ? "text-amber-300/90"
                  : "text-zinc-400"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Artifact and Registry Metadata */}
      <div className="mt-2 pt-1.5 border-t border-border/50 flex items-center justify-between text-[9px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1 text-emerald-500">
          <ShieldCheck className="w-3 h-3" />
          Health: 200 OK
        </span>
        <span className="text-[8.5px]">ghcr.io/livesh-l-28</span>
      </div>
    </div>
  );
};

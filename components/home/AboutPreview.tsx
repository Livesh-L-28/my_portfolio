"use client";

import React from "react";
import { FileDown, Mail, Cpu, Database, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

interface AboutPreviewProps {
  standalone?: boolean;
}

const FOCUS_AREAS = [
  {
    icon: Cpu,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/60",
    title: "Production LLM & Agent Architectures",
    description:
      "Stateful agent loops with structured tool-calling boundaries, async streaming generators, token-budgeted context windows, and deterministic fallback paths.",
  },
  {
    icon: Database,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-900/60",
    title: "Hybrid Retrieval & RAG Systems",
    description:
      "Multi-tenant vector search with pgvector (HNSW) paired with sparse BM25 lexical ranking, Reciprocal Rank Fusion (RRF), and cross-encoder re-ranking.",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60",
    title: "In-Process AI Security & Guardrails",
    description:
      "Pre-execution prompt sanitization, heuristic injection defense, token leakage filters, and PII redaction operating locally without external latency.",
  },
  {
    icon: CheckCircle2,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-900/60",
    title: "Reliability, Evaluation & Automation",
    description:
      "Deterministic assertion suites for agent step sequences, schema contract testing with Pydantic/Zod, synthetic regression harnesses, and CI/CD quality gates.",
  },
];

export const AboutPreview: React.FC<AboutPreviewProps> = ({
  standalone = false,
}) => {
  return (
    <section
      id="about"
      className={standalone ? "relative w-full pb-16" : "relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"}
    >
      {!standalone && (
        <>
          {/* Ambient background aura */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-indigo-500/08 blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />
        </>
      )}

      <div className={standalone ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Personal introduction, philosophy, grounded background */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono text-indigo-800 dark:text-indigo-300 shadow-xs font-semibold">
              {!standalone ? (
                <>
                  <span>00</span>
                  <span className="text-indigo-400 dark:text-indigo-600">{"//"}</span>
                  <span>Engineering Philosophy</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span>Engineering Focus &amp; Philosophy</span>
                </>
              )}
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Building AI Systems That Work Beyond the Demo.
            </h2>

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              I am an AI developer and systems engineer focused on turning probabilistic model outputs into predictable, production-grade software. Rather than treating foundation models as black boxes or building superficial wrappers, I engineer the backend pipelines, guardrails, and evaluation harnesses that make AI dependable under real workloads.
            </p>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              My engineering philosophy centers on <strong className="font-semibold text-slate-900 dark:text-white">deterministic reliability over raw prompt optimism</strong>, <strong className="font-semibold text-slate-900 dark:text-white">defense-in-depth security</strong> to neutralize prompt injections and sensitive data leakage before execution, and <strong className="font-semibold text-slate-900 dark:text-white">traceable evaluation</strong> using automated regression suites and strict schema contracts.
            </p>

            {/* Academic Snapshot & Status Callout */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4 space-y-2 text-xs font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-600 dark:text-slate-400">Education</span>
                <span className="text-slate-900 dark:text-white font-sans font-bold">
                  B.Tech in Artificial Intelligence &amp; Data Science
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-600 dark:text-slate-400">Institution &amp; Merit</span>
                <span className="text-slate-900 dark:text-white font-sans">
                  Prathyusha Engineering College · <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">CGPA 8.53 / 10</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Availability</span>
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Graduating May 2027 · Open to AI Engineering Roles</span>
                </div>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <FileDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Download Resume (PDF)</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-semibold transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-600" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-indigo-600" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Four compact engineering focus areas */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold">
                Core Engineering Capabilities
              </span>
              <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400">
                4 Focus Areas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {FOCUS_AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="glass-card bento-hairline rounded-xl p-4 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${area.bg}`}>
                        <Icon className={`h-4 w-4 ${area.color}`} />
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white font-sans leading-tight">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Specialized Domain Note */}
            <div className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-3 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                Specialized Systems:
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-sans text-[12px]">
                Medical 3D volume rendering, computer vision (YOLO), &amp; Unity simulation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

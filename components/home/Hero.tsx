"use client";

import React from "react";
import {
  FileDown,
  ArrowDown,
  Mail,
  Database,
  Shield,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      {/* Dynamic Multi-layer Aurora Atmosphere */}
      <div className="absolute top-0 left-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/05 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 -z-10 h-[480px] w-[480px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/05 blur-[130px] pointer-events-none" />
      <div className="absolute top-48 left-1/2 -translate-x-1/2 -z-10 h-[400px] w-[600px] rounded-full bg-violet-500/08 dark:bg-violet-500/04 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-dots opacity-60 dark:opacity-15 pointer-events-none -z-20" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Authentic Intro & Direct Actions with Expansive Typography */}
        <div className="max-w-3xl lg:max-w-4xl space-y-6 py-2 transition-all duration-300">
          {/* High-Tech System Status Ribbon */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1 text-xs font-mono shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              System Online
            </span>
            <span className="text-slate-400 dark:text-slate-600 font-bold">•</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              1,392 Tests Passing
            </span>
            <span className="text-slate-400 dark:text-slate-600 font-bold">•</span>
            <span className="text-indigo-700 dark:text-indigo-300 font-bold inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              <span>CGPA 8.53</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Architecting AI systems that operate{" "}
            <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent">
              beyond the demo.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl font-sans font-medium">
            Hi, I&rsquo;m <strong className="text-slate-950 dark:text-white font-bold">Livesh L</strong>, an AI Developer and final-year student at Prathyusha Engineering College. I specialize in production LLM applications, hybrid RAG with pgvector &amp; Reciprocal Rank Fusion, in-process security firewalls, and deterministic agent reliability testing.
          </p>

          {/* Floating Quick-Tech Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {[
              { label: "pgvector + BM25", tag: "RAG" },
              { label: "PyTorch 110M Transformer", tag: "LLM" },
              { label: "OpenXR VR Clinical Suite", tag: "Vision" },
              { label: "LLM Security Firewall", tag: "Security" },
              { label: "Deterministic Test Suites", tag: "Eval" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-slate-800 dark:text-slate-200 font-semibold backdrop-blur-md hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 shadow-2xs transition-all hover:scale-[1.02]"
              >
                <span className="h-1 w-1 rounded-full bg-indigo-500" />
                <span>{chip.label}</span>
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="group relative inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 dark:from-indigo-600 dark:to-indigo-700 px-6 text-xs font-semibold text-white shadow-md shadow-indigo-950/20 dark:shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-500/25 transition-all font-sans cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 overflow-hidden"
            >
              {/* Light sweep animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span>Explore Projects (12)</span>
              <ArrowDown className="h-3.5 w-3.5 text-indigo-300 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href={PROFILE_LINKS.resumePdf}
              download="Livesh_L_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-5 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all font-sans shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <FileDown className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <span>Download Resume (PDF)</span>
            </a>

            <div className="flex items-center gap-1.5">
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-200 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all shadow-xs hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Contact link */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span>Direct Email:</span>
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors font-medium"
            >
              {PROFILE_LINKS.email}
            </a>
          </div>
        </div>

        {/* 4 High-Craft Bento Stat Tiles with Spotlight Interaction */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Tile 1: NexaRAG */}
          <SpotlightCard className="glass-card bento-hairline rounded-2xl p-4 sm:p-5 relative overflow-hidden group dark:bg-slate-900/70 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider font-bold">
                NexaRAG Engine
              </span>
              <div className="h-7 w-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-xs">
                <Database className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                321
              </span>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">
                Passing
              </span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-sans leading-tight font-medium">
              Automated tests &amp; ~24.5ms RRF retrieval
            </p>
          </SpotlightCard>

          {/* Tile 2: LLMFirewall */}
          <SpotlightCard className="glass-card bento-hairline rounded-2xl p-4 sm:p-5 relative overflow-hidden group dark:bg-slate-900/70 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-indigo-800 dark:text-indigo-400 uppercase tracking-wider font-bold">
                LLMFirewall Core
              </span>
              <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shrink-0 shadow-xs">
                <Shield className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                608
              </span>
              <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 font-bold uppercase">
                Tests
              </span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-sans leading-tight font-medium">
              In-process security &amp; token defense
            </p>
          </SpotlightCard>

          {/* Tile 3: aireliability */}
          <SpotlightCard className="glass-card bento-hairline rounded-2xl p-4 sm:p-5 relative overflow-hidden group dark:bg-slate-900/70 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-bold">
                aireliability Suite
              </span>
              <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 shadow-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                362
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Checks
              </span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-sans leading-tight font-medium">
              Deterministic agent tool assertions
            </p>
          </SpotlightCard>

          {/* Tile 4: Academic Standing */}
          <SpotlightCard className="glass-card bento-hairline rounded-2xl p-4 sm:p-5 relative overflow-hidden group dark:bg-slate-900/70 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-amber-900 dark:text-amber-400 uppercase tracking-wider font-bold">
                Academic Standing
              </span>
              <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 shadow-xs">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800 dark:text-emerald-400 tracking-tight">
                8.53
              </span>
              <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold">/ 10</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-sans leading-tight font-medium">
              CGPA · AI &amp; Data Science (2027)
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

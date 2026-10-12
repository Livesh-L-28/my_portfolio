"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  FileDown,
  Mail,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { InteractiveGraph } from "@/components/ui/InteractiveGraph";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28">
      {/* Background gradients and tech grid */}
      <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 radial-glow-hero pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-mono font-medium text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>AI ENGINEERING · LLM SYSTEMS · SECURITY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              I Build AI Systems That Work{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Beyond the Demo.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
              AI Developer focused on production-oriented LLM applications, retrieval-augmented generation, AI security, reliability engineering, and intelligent software systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-xs sm:text-sm font-mono font-medium text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all border border-violet-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-4 w-4" />
              </Link>

              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.05] px-4 py-3 text-xs sm:text-sm font-mono font-medium text-slate-200 hover:bg-white/[0.1] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <FileDown className="h-4 w-4 text-violet-400" />
                <span>View Resume</span>
              </a>

              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-3 text-xs sm:text-sm font-mono text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-3 text-xs sm:text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-4 pt-1 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Profiles:</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                <Mail className="h-3.5 w-3.5 text-violet-400" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live-Looking AI Systems Graph */}
          <div className="lg:col-span-5">
            <InteractiveGraph />
          </div>
        </div>

        {/* Hero Proof Points: Evidence-based metrics */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-[#0A0E1C]/80 p-3.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                NexaRAG Suite
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-mono text-white">
                321
              </p>
              <p className="mt-0.5 text-[11px] text-emerald-400 font-mono">
                Passing automated tests
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#0A0E1C]/80 p-3.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                LLMFirewall Core
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-mono text-violet-300">
                608
              </p>
              <p className="mt-0.5 text-[11px] text-violet-400 font-mono">
                Security & regression tests
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#0A0E1C]/80 p-3.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                aireliability
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                362
              </p>
              <p className="mt-0.5 text-[11px] text-cyan-400 font-mono">
                Deterministic agent tests
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#0A0E1C]/80 p-3.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Hybrid Retrieval
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-mono text-white">
                ~24.5 ms
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400 font-mono">
                Reported benchmark avg
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#0A0E1C]/80 p-3.5 col-span-2 sm:col-span-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Academic Standing
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-mono text-emerald-300">
                8.53 / 10
              </p>
              <p className="mt-0.5 text-[11px] text-emerald-400 font-mono">
                CGPA · Zero backlogs
              </p>
            </div>
          </div>
          <p className="mt-2 text-right text-[10px] font-mono text-slate-400">
            * Test counts and retrieval latencies are project-specific reported benchmark results from verified test suites.
          </p>
        </div>
      </div>
    </section>
  );
};

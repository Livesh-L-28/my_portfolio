"use client";

import React from "react";
import Link from "next/link";
import {
  FileDown,
  ArrowDown,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { Hero3DVisualizer } from "@/components/3d/Hero3DVisualizer";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Intro & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for AI Engineering · B.Tech 2027</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              I build AI systems that work{" "}
              <span className="text-zinc-400 font-normal underline decoration-zinc-700 underline-offset-8">
                beyond the demo.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl font-sans">
              Hi, I&rsquo;m <strong className="text-white font-semibold">Livesh L.</strong>, an AI Developer and final-year student at Prathyusha Engineering College (CGPA 8.53/10). I focus on production-oriented LLM applications, retrieval-augmented generation (RAG), in-process AI security firewalls, and deterministic agent reliability testing.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-zinc-950 hover:bg-zinc-200 transition-all font-sans shadow-sm"
              >
                <span>View Projects (10)</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/90 px-4 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all font-sans"
              >
                <FileDown className="h-3.5 w-3.5 text-zinc-300" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-sans"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-sans"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Contact link */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1 font-mono">
              <Mail className="h-3.5 w-3.5 text-zinc-400" />
              <span>Email:</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="text-zinc-200 hover:underline"
              >
                {PROFILE_LINKS.email}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Projects Showcase */}
          <div className="lg:col-span-5">
            <Hero3DVisualizer />
          </div>
        </div>

        {/* 4 Clean Proof Points Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
              NexaRAG Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              321
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Passing automated tests
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
              LLMFirewall Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              608
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Security validation suite
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
              aireliability Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              362
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Deterministic agent checks
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
              Academic Record
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              8.53 / 10
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              CGPA · Zero active backlogs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

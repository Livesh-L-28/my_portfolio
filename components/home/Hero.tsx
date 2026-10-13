"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileDown,
  ArrowDown,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { Hero3DVisualizer } from "@/components/3d/Hero3DVisualizer";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-zinc-800/80 overflow-hidden">
      {/* Ambient background aura & subtle grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-5xl aura-indigo pointer-events-none blur-3xl opacity-50" />
      <div className="absolute inset-0 bg-grid-subtle -z-20 opacity-35 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Intro & Direct Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for AI Engineering · B.Tech 2027 · CGPA 8.53</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              I build AI systems that work{" "}
              <span className="bg-gradient-to-r from-zinc-100 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                beyond the demo.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-sans">
              Hi, I&rsquo;m <strong className="text-white font-semibold">Livesh L</strong>, an AI Developer and final-year student at Prathyusha Engineering College. I focus on production-oriented LLM applications, hybrid RAG systems with pgvector and Reciprocal Rank Fusion, in-process AI security firewalls, and deterministic agent reliability testing.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="#projects"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors font-sans shadow-sm cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Projects (10)</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 px-4 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors font-sans shadow-sm active:scale-[0.98]"
              >
                <FileDown className="h-3.5 w-3.5 text-zinc-400" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-sans"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-sans"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Contact link */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-0.5 font-mono">
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              <span>Direct Email:</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="text-zinc-200 hover:text-white hover:underline transition-colors"
              >
                {PROFILE_LINKS.email}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Projects Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <Hero3DVisualizer />
          </motion.div>
        </div>

        {/* 4 Clean Color-Accented Proof Points Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5"
        >
          <div className="surface-card rounded-xl p-4 transition-all border-t-2 border-t-cyan-500/70 hover:border-t-cyan-400">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
              NexaRAG Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              321
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Passing automated tests
            </span>
          </div>

          <div className="surface-card rounded-xl p-4 transition-all border-t-2 border-t-indigo-500/70 hover:border-t-indigo-400">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
              LLMFirewall Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              608
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Security validation suite
            </span>
          </div>

          <div className="surface-card rounded-xl p-4 transition-all border-t-2 border-t-emerald-500/70 hover:border-t-emerald-400">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
              aireliability Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              362
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Deterministic agent checks
            </span>
          </div>

          <div className="surface-card rounded-xl p-4 transition-all border-t-2 border-t-amber-500/70 hover:border-t-amber-400">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
              Academic Record
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              8.53 / 10
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              CGPA · Zero active backlogs
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

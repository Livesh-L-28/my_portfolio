"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileDown,
  ArrowDown,
  Mail,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { Hero3DVisualizer } from "@/components/3d/Hero3DVisualizer";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-800/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 -z-10 h-80 w-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Intro & Direct Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Profile Avatar & Status Pill Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 p-1 pr-4 backdrop-blur-md shadow-lg shadow-black/40">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-md">
                  <Image
                    src="/images/livesh-profile.jpg"
                    alt="Livesh L. - AI Developer"
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                    priority
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white leading-tight">
                    Livesh L.
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 leading-tight">
                    ● Available for AI Engineering
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-mono text-indigo-300">
                <Sparkles className="h-3 w-3 text-indigo-400" />
                <span>B.Tech 2027 · CGPA 8.53/10</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-white leading-[1.15]">
              I build AI systems that work{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent underline decoration-indigo-500/40 underline-offset-8">
                beyond the demo.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              Hi, I&rsquo;m <strong className="text-white font-semibold">Livesh L.</strong>, an AI Developer and final-year student at Prathyusha Engineering College. I engineer production-oriented LLM applications, hybrid RAG systems with pgvector and Reciprocal Rank Fusion, in-process AI security firewalls, and deterministic agent reliability test suites.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 transition-all font-sans cursor-pointer"
              >
                <span>View Projects (10)</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all font-sans shadow-sm"
              >
                <FileDown className="h-3.5 w-3.5 text-slate-300" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors font-sans"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors font-sans"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Contact link */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5 font-mono">
              <Mail className="h-3.5 w-3.5 text-indigo-400" />
              <span>Email:</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="text-slate-200 hover:text-indigo-300 hover:underline transition-colors"
              >
                {PROFILE_LINKS.email}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Projects Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <Hero3DVisualizer />
          </motion.div>
        </div>

        {/* 4 Clean Proof Points Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5"
        >
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-[0_4px_20px_rgba(6,182,212,0.15)] group">
            <span className="text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider block">
              NexaRAG Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block group-hover:text-cyan-200 transition-colors">
              321
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Passing automated tests
            </span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-900/80 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] group">
            <span className="text-[11px] font-mono text-emerald-400/90 uppercase tracking-wider block">
              LLMFirewall Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block group-hover:text-emerald-200 transition-colors">
              608
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Security validation suite
            </span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)] group">
            <span className="text-[11px] font-mono text-indigo-400/90 uppercase tracking-wider block">
              aireliability Tests
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block group-hover:text-indigo-200 transition-colors">
              362
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Deterministic agent checks
            </span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900/80 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] group">
            <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-wider block">
              Academic Record
            </span>
            <span className="text-2xl font-bold font-mono text-amber-300 mt-1 block">
              8.53 / 10
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              CGPA · Zero active backlogs
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

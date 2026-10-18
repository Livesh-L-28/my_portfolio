import { Metadata } from "next";
import Link from "next/link";
import { CapabilityMap } from "@/components/home/CapabilityMap";
import { Cpu, ShieldCheck, Activity, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Skills & Technical Stack — Livesh L",
  description:
    "Comprehensive technical skills matrix spanning LLM systems, in-process AI security, deterministic reliability engineering, computer vision, and backend infrastructure.",
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-20 overflow-hidden">
      {/* Ambient background auroras & tech dots */}
      <div className="absolute top-16 left-1/4 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-35" />
      <div className="absolute top-48 right-1/4 -z-10 h-96 w-96 aura-cyan pointer-events-none blur-3xl opacity-30" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 mb-8 shadow-2xs hover:border-slate-400 transition-colors"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-950 dark:text-white font-bold">Skills</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-mono text-emerald-800 dark:text-emerald-300 mb-3 shadow-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Technical Competencies · 6 Core Engineering Domains</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
            Technical Stack &amp; <span className="text-gradient-hero">Capabilities</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
            Every capability listed below is backed by production code, automated test suites, published PyPI distributions, or clinical deployments.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                <Cpu className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">LLM &amp; Hybrid RAG</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 flex items-center justify-center">
                <ShieldCheck className="h-3 w-3 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">In-Process Firewalls</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                <Activity className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">Deterministic Testing</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 flex items-center justify-center">
                <Layers className="h-3 w-3 text-sky-600 dark:text-sky-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">28 Verified Skills</span>
            </span>
          </div>
        </div>

        {/* Capability Bento Matrix */}
        <CapabilityMap standalone={true} showHeader={false} />
      </div>
    </div>
  );
}

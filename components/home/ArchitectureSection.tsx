"use client";

import React from "react";
import { ShieldCheck, Database, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { InteractiveGraph } from "@/components/ui/InteractiveGraph";

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-35 dark:opacity-15" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 dark:opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Context & Principles */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 text-xs font-mono text-sky-800 dark:text-sky-300 shadow-xs font-semibold">
              <span>02</span>
              <span className="text-sky-400 dark:text-sky-600">{"//"}</span>
              <span>Full-Stack AI Architecture</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Production AI Pipeline <span className="text-gradient-hero">Topology</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed font-sans">
              Unlike generic wrappers that stream unverified tokens, my architectures enforce deterministic multi-stage pipelines: dense and sparse vector retrieval, in-process security firewalls, dynamic token budgeting, and open telemetry observability.
            </p>

            {/* Quick architectural metrics */}
            <div className="space-y-2.5 pt-2 font-mono text-xs text-slate-900 dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4 text-sky-500 shrink-0" />
                <span>Reciprocal Rank Fusion (~24.5ms avg latency)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-violet-500 shrink-0" />
                <span>Zero-network in-process prompt firewall (~0.02ms)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Deterministic agent tool sequence assertions</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/projects/nexarag"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
              >
                <span>Read Full NexaRAG Architecture Spec</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Node Graph */}
          <div className="lg:col-span-7">
            <InteractiveGraph />
          </div>
        </div>
      </div>
    </section>
  );
};

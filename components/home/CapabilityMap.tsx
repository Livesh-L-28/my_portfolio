"use client";

import React from "react";
import Link from "next/link";
import { SKILL_CATEGORIES } from "@/data/skills";
import {
  Cpu,
  ShieldCheck,
  Activity,
  Eye,
  Server,
  Layers,
} from "lucide-react";

export const CapabilityMap: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-4 w-4 text-indigo-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-4 w-4 text-violet-400" />;
      case "Activity":
        return <Activity className="h-4 w-4 text-emerald-400" />;
      case "Eye":
        return <Eye className="h-4 w-4 text-cyan-400" />;
      case "Server":
        return <Server className="h-4 w-4 text-sky-400" />;
      case "Layers":
        return <Layers className="h-4 w-4 text-amber-400" />;
      default:
        return <Cpu className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-20 border-b border-zinc-800/80 overflow-hidden">
      {/* Subtle ambient emerald spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-4xl aura-emerald pointer-events-none blur-3xl opacity-30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400 mb-2">
            <span className="font-bold">03</span>
            <span className="text-emerald-400/60">//</span>
            <span>Technical Stack & Capabilities</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Engineering Capabilities
          </h2>
          <p className="mt-1 text-sm text-zinc-400 font-sans">
            Every listed skill is grounded in production repositories, published packages, or verified benchmark suites.
          </p>
        </div>

        {/* 6-Category Comprehensive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="flex flex-col justify-between h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-zinc-700 hover:bg-zinc-900/95 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-200"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700/80">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 mb-4 font-sans leading-relaxed min-h-[2.5rem]">
                  {category.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-[11px] font-mono text-zinc-300 border border-zinc-700/60"
                    >
                      <span>{skill.name}</span>
                      {skill.linkedProject && (
                        <Link
                          href={`/projects/${skill.linkedProject}`}
                          title={`View ${skill.name} in project`}
                          className="text-[9px] text-indigo-400 hover:text-indigo-300 ml-0.5"
                        >
                          ↗
                        </Link>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

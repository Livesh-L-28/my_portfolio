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
  CheckCircle2,
} from "lucide-react";

export const CapabilityMap: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-4 w-4 text-indigo-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-4 w-4 text-cyan-400" />;
      case "Activity":
        return <Activity className="h-4 w-4 text-emerald-400" />;
      case "Eye":
        return <Eye className="h-4 w-4 text-amber-400" />;
      case "Server":
        return <Server className="h-4 w-4 text-sky-400" />;
      case "Layers":
        return <Layers className="h-4 w-4 text-purple-400" />;
      default:
        return <Cpu className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Technical Stack & Expertise
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Engineering Capabilities
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans">
            Every listed skill is grounded in production repositories, published packages, or verified benchmark suites.
          </p>
        </div>

        {/* 6-Category Comprehensive Grid - All visible at once! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 mb-4 font-sans leading-relaxed">
                  {category.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-[11px] font-mono text-zinc-200 border border-zinc-700/60"
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

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

interface CapabilityMapProps {
  standalone?: boolean;
  showHeader?: boolean;
}

export const CapabilityMap: React.FC<CapabilityMapProps> = ({
  standalone = false,
  showHeader = true,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-4 w-4 text-white" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-4 w-4 text-white" />;
      case "Activity":
        return <Activity className="h-4 w-4 text-white" />;
      case "Eye":
        return <Eye className="h-4 w-4 text-white" />;
      case "Server":
        return <Server className="h-4 w-4 text-white" />;
      case "Layers":
        return <Layers className="h-4 w-4 text-white" />;
      default:
        return <Cpu className="h-4 w-4 text-white" />;
    }
  };

  const getCategoryGradient = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return "from-indigo-600 to-indigo-700 shadow-indigo-500/25";
      case "ShieldCheck":
        return "from-violet-600 to-purple-700 shadow-violet-500/25";
      case "Activity":
        return "from-emerald-600 to-teal-700 shadow-emerald-500/25";
      case "Eye":
        return "from-cyan-600 to-blue-700 shadow-cyan-500/25";
      case "Server":
        return "from-sky-600 to-indigo-600 shadow-sky-500/25";
      case "Layers":
        return "from-amber-600 to-orange-700 shadow-amber-500/25";
      default:
        return "from-indigo-600 to-indigo-700 shadow-indigo-500/25";
    }
  };

  return (
    <section
      id="skills"
      className={standalone ? "relative w-full" : "relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"}
    >
      {!standalone && (
        <>
          {/* Ambient background aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-full max-w-5xl rounded-full bg-emerald-500/08 blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />
        </>
      )}

      <div className={standalone ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        {showHeader && (
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-mono text-emerald-800 dark:text-emerald-300 mb-3 shadow-xs font-semibold">
              <span>03</span>
              <span className="text-emerald-400 dark:text-emerald-600">{"//"}</span>
              <span>Technical Stack &amp; Capabilities</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Capabilities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
              Every listed capability is grounded in production repositories, published packages, or verified benchmark suites.
            </p>
          </div>
        )}

        {/* 6-Category Comprehensive Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="glass-card bento-hairline flex flex-col justify-between h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 relative group overflow-hidden dark:bg-slate-900/70 dark:border-slate-800"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${getCategoryGradient(
                        category.iconName
                      )} shadow-md flex items-center justify-center shrink-0`}
                    >
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <h3 className="font-sans text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-bold shrink-0">
                    {category.skills.length} Skills
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 font-sans leading-relaxed min-h-[2.5rem] font-medium">
                  {category.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-slate-800/90 px-2.5 py-1 text-[11px] font-mono text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all"
                    >
                      <span>{skill.name}</span>
                      {skill.linkedProject && (
                        <Link
                          href={`/projects/${skill.linkedProject}`}
                          title={`View ${skill.name} implementation in project`}
                          className="text-[9px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-bold ml-0.5"
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

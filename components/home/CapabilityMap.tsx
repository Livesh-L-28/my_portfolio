"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <section id="skills" className="relative py-16 sm:py-24 border-b border-slate-800/80 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
            Technical Stack & Expertise
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Engineering Capabilities
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-sans">
            Every listed skill is grounded in production repositories, published packages, or verified benchmark suites.
          </p>
        </div>

        {/* 6-Category Comprehensive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-slate-800/90 bg-[#0d121f]/75 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-[#111728]/90 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.2)] transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-sm">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
                  {category.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 text-[11px] font-mono text-slate-200 border border-slate-700/60 hover:border-slate-500 transition-colors"
                    >
                      <span>{skill.name}</span>
                      {skill.linkedProject && (
                        <Link
                          href={`/projects/${skill.linkedProject}`}
                          title={`View ${skill.name} in project`}
                          className="text-[9px] text-cyan-400 hover:text-cyan-300 ml-0.5"
                        >
                          ↗
                        </Link>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

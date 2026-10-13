"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 sm:py-20 border-b border-zinc-800/80 overflow-hidden bg-zinc-950/40">
      {/* Subtle ambient amber spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-4xl aura-amber pointer-events-none blur-3xl opacity-30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-mono text-amber-400 mb-2">
            <span className="font-bold">04</span>
            <span className="text-amber-400/60">//</span>
            <span>Industry Internships & History</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <p className="mt-1 text-sm text-zinc-400 font-sans">
            Software and machine learning systems engineered across 4 industry internships.
          </p>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="space-y-5">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/95 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] border-l-2 border-l-amber-500/50 hover:border-l-amber-400 backdrop-blur-xl group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">at</span>
                  <span className="font-sans text-base font-semibold text-zinc-200">
                    {exp.company}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700/60 ml-0.5">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{exp.period}</span>
                  <span className="text-zinc-600">·</span>
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 mb-4 font-sans leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements */}
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies & Case Study Link */}
              <div className="pt-3.5 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-300 border border-zinc-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.projectsLinked && (
                  <Link
                    href={`/projects/${exp.projectsLinked[0]}`}
                    className="text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>View Related System Case Study</span>
                    <ArrowRight className="h-3 w-3 text-zinc-400" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

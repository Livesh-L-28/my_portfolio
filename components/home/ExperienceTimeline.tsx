"use client";

import React from "react";
import Link from "next/link";
import { EXPERIENCES } from "@/data/experience";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface ExperienceTimelineProps {
  standalone?: boolean;
  showHeader?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  standalone = false,
  showHeader = true,
}) => {
  return (
    <section
      id="experience"
      className={standalone ? "relative w-full" : "relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"}
    >
      {!standalone && (
        <>
          {/* Subtle ambient amber spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl aura-amber pointer-events-none blur-[140px] opacity-35 dark:opacity-15" />
          <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />
        </>
      )}

      <div className={standalone ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        {showHeader && (
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-mono text-amber-800 dark:text-amber-300 mb-3 shadow-xs font-semibold">
              <span>04</span>
              <span className="text-amber-500 dark:text-amber-600">{"//"}</span>
              <span>Industry Internships &amp; History</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Professional Experience
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
              Software and machine learning systems engineered across 4 industry internships.
            </p>
          </div>
        )}

        {/* Clean Editorial Timeline */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="glass-card bento-hairline rounded-2xl p-6 sm:p-7 transition-all duration-300 relative group overflow-hidden border-l-4 border-l-amber-500 hover:border-l-amber-600 dark:bg-slate-900/70 dark:border-slate-800"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-sm font-bold">at</span>
                  <span className="font-sans text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                    {exp.company}
                  </span>
                  <span className="text-[10px] font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 ml-1 font-bold">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 shrink-0 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 font-semibold">
                  <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-slate-900 dark:text-white">{exp.period}</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <MapPin className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 mb-4 font-sans leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Achievements */}
              <ul className="space-y-2.5 mb-5">
                {exp.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-normal"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies & Case Study Link */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-800 dark:text-slate-200 mr-1 font-bold">
                    Tech Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white dark:bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-bold shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.projectsLinked && (
                  <Link
                    href={`/projects/${exp.projectsLinked[0]}`}
                    className="text-xs font-mono text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 flex items-center gap-1.5 font-bold transition-all hover:translate-x-0.5"
                  >
                    <span>Inspect Related Architecture</span>
                    <ArrowRight className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

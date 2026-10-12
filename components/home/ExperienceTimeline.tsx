"use client";

import React from "react";
import Link from "next/link";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Work History & Industry Internships
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-sans">
            Software and machine learning systems engineered across 4 industry internships.
          </p>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 transition-colors hover:border-zinc-700"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-zinc-500 font-mono text-sm">@</span>
                  <span className="font-sans text-base sm:text-lg font-semibold text-zinc-200">
                    {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>{exp.period}</span>
                  <span>·</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 mb-3 font-sans leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements */}
              <ul className="space-y-2 mb-4">
                {exp.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
                  >
                    <span className="text-zinc-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies & Case Study Link */}
              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
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
                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
                  >
                    <span>View Project Case Study</span>
                    <ArrowRight className="h-3 w-3" />
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

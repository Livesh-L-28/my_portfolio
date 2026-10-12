"use client";

import React from "react";
import Link from "next/link";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 border-t border-white/[0.08] bg-[#080C18]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
              <span>INDUSTRY INTERNSHIPS & CONTRIBUTIONS</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Professional Experience
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
              Practical software engineering and AI systems built across verified industry internships.
            </p>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-white transition-colors"
          >
            <span>View dedicated experience page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-violet-500/30 ml-4 sm:ml-6 space-y-10">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-violet-500 bg-[#080C18] group-hover:bg-violet-400 group-hover:scale-110 transition-all shadow-md shadow-violet-500/30" />

              {/* Experience Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0C1122] p-6 shadow-xl hover:border-violet-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <span className="text-slate-400 font-mono text-sm">@</span>
                      <span className="font-sans text-base sm:text-lg font-semibold text-violet-300">
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center self-start sm:self-auto rounded-md border px-2.5 py-1 text-xs font-mono font-medium ${
                      exp.badgeColor || "text-violet-300 bg-violet-500/10 border-violet-500/20"
                    }`}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Specific Achievements Bullets */}
                <div className="space-y-2 mb-5">
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Used */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.projectsLinked && (
                    <Link
                      href={`/projects/${exp.projectsLinked[0]}`}
                      className="ml-auto text-[11px] font-mono text-violet-400 hover:text-violet-300 hover:underline"
                    >
                      Inspect Leviathan Case Study →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 sm:py-24 border-b border-slate-800/80 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold block mb-1">
            Work History & Industry Internships
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-sans">
            Software and machine learning systems engineered across 4 industry internships.
          </p>
        </div>

        {/* Clean Editorial Timeline with Motion */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
              className="rounded-2xl border border-slate-800/90 bg-[#0d121f]/75 backdrop-blur-xl p-5 sm:p-7 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#111728]/90 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.2)] group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-slate-500 font-mono text-sm">@</span>
                  <span className="font-sans text-base sm:text-lg font-semibold text-cyan-300">
                    {exp.company}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 ml-1">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{exp.period}</span>
                  <span>·</span>
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 mb-4 font-sans leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements */}
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed"
                  >
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">▹</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies & Case Study Link */}
              <div className="pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-500 mr-1">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-800/70 px-2 py-0.5 text-[11px] font-mono text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.projectsLinked && (
                  <Link
                    href={`/projects/${exp.projectsLinked[0]}`}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>View Related System Case Study</span>
                    <ArrowRight className="h-3 w-3" />
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

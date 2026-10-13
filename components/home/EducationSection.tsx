"use client";

import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/data/certifications";
import { GraduationCap, Award, CheckCircle2, Sparkles } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 border-b border-zinc-800/80 overflow-hidden">
      {/* Subtle ambient violet spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-4xl aura-violet pointer-events-none blur-3xl opacity-30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-mono text-violet-400 mb-2">
            <span className="font-bold">05</span>
            <span className="text-violet-400/60">//</span>
            <span>Academics & Verified Certifications</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="mt-1 text-sm text-zinc-400 font-sans">
            Formal engineering degree credentials and verified technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Degree Card (Col 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/95 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] border-t-2 border-t-violet-500/60 backdrop-blur-xl transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700/80">
                  <GraduationCap className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-medium">
                  Undergraduate Degree
                </span>
              </div>

              <h3 className="font-sans text-lg font-bold text-white tracking-tight">
                B.Tech in Artificial Intelligence and Data Science
              </h3>
              <p className="text-sm text-zinc-300 font-medium mt-1">
                Prathyusha Engineering College
              </p>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Thiruvallur, Tamil Nadu · Aug 2023 – Expected May 2027
              </p>

              <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Cumulative GPA:</span>
                  <span className="font-bold text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    8.53 / 10 CGPA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Backlog Status:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Zero active backlogs</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 font-sans leading-relaxed">
              Core Coursework: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Distributed Systems, Database Management, and Data Structures & Algorithms.
            </p>
          </motion.div>

          {/* Certifications (Col 6-12) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-zinc-400" />
              <h3 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                Verified Certifications ({CERTIFICATIONS.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1.5">
                      <span className="text-zinc-400">{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans leading-snug line-clamp-2">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="mt-2 pt-2 border-t border-zinc-800/60 min-h-[1.25rem]">
                    {cert.scoreOrHonor ? (
                      <p className="text-[11px] font-mono text-emerald-400 font-medium truncate">
                        {cert.scoreOrHonor}
                      </p>
                    ) : (
                      <p className="text-[11px] font-mono text-zinc-500">
                        Verified Credential
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

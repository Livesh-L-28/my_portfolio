"use client";

import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/data/certifications";
import { GraduationCap, Award, CheckCircle2, Sparkles } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 border-b border-slate-800/80 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Academic & Professional Qualifications
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Degree Card (Col 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl border border-slate-800/90 bg-[#0d121f]/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl hover:border-indigo-500/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Undergraduate Degree
              </span>
            </div>

            <h3 className="font-sans text-lg font-bold text-white tracking-tight">
              B.Tech in Artificial Intelligence and Data Science
            </h3>
            <p className="text-sm text-cyan-300 font-medium mt-1">
              Prathyusha Engineering College
            </p>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Thiruvallur, Tamil Nadu · Aug 2023 – Expected May 2027
            </p>

            <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cumulative GPA:</span>
                <span className="font-bold text-emerald-400 text-sm bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                  8.53 / 10 CGPA
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Backlog Status:</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Zero active backlogs</span>
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 font-sans leading-relaxed">
              Core Coursework: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Distributed Systems, Database Management, and Data Structures & Algorithms.
            </p>
          </motion.div>

          {/* Certifications (Col 6-12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-3.5">
              <Award className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Verified Certifications ({CERTIFICATIONS.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-slate-800/80 bg-[#0d121f]/60 backdrop-blur-md p-4 hover:border-slate-700 hover:bg-[#111728]/80 transition-all duration-200"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span className="text-indigo-400/90">{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans leading-snug">
                    {cert.title}
                  </h4>
                  {cert.scoreOrHonor && (
                    <p className="text-[11px] font-mono text-emerald-400 mt-1 font-medium">
                      {cert.scoreOrHonor}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

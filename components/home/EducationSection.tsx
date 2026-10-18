"use client";

import React from "react";
import { CERTIFICATIONS } from "@/data/certifications";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

interface EducationSectionProps {
  standalone?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  standalone = false,
}) => {
  return (
    <section className={standalone ? "relative w-full pt-4 pb-16" : "relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"}>
      {!standalone && (
        <>
          {/* Subtle ambient violet spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl aura-violet pointer-events-none blur-[140px] opacity-35 dark:opacity-15" />
          <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />
        </>
      )}

      <div className={standalone ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 text-xs font-mono text-violet-800 dark:text-violet-300 mb-3 shadow-xs font-semibold">
            {!standalone ? (
              <>
                <span>05</span>
                <span className="text-violet-400 dark:text-violet-600">{"//"}</span>
                <span>Academics &amp; Verified Certifications</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span>Degree &amp; Verified Credentials</span>
              </>
            )}
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education &amp; Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
            Formal engineering degree credentials and verified technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Degree Card (Col 1-5) */}
          <div className="lg:col-span-5 glass-card bento-hairline rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden border-t-4 border-t-violet-600 dark:bg-slate-900/70 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-md shadow-violet-500/20">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-800 dark:text-violet-300 font-bold">
                  Undergraduate Degree
                </span>
              </div>

              <h3 className="font-sans text-xl font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
                B.Tech in Artificial Intelligence and Data Science
              </h3>
              <p className="text-sm text-slate-900 dark:text-slate-100 font-bold mt-1">
                Prathyusha Engineering College
              </p>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-0.5 font-semibold">
                Thiruvallur, Tamil Nadu · Aug 2023 – Expected May 2027
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-slate-200 font-bold">Cumulative GPA:</span>
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 text-xs bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                    8.53 / 10 CGPA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 dark:text-slate-200 font-bold">Academic Standing:</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Zero active backlogs</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
              Core Coursework: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Distributed Systems, Database Management, and Data Structures &amp; Algorithms.
            </p>
          </div>

          {/* Certifications (Col 6-12) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3.5">
              <Award className="h-4 w-4 text-slate-800 dark:text-slate-300" />
              <h3 className="text-xs font-mono font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                Verified Certifications ({CERTIFICATIONS.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-full">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="glass-card rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:border-indigo-400 dark:bg-slate-900/60 dark:border-slate-800"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="text-slate-900 dark:text-white font-bold">{cert.issuer}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{cert.year}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white font-sans leading-snug line-clamp-2">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 min-h-[1.25rem]">
                    {cert.scoreOrHonor ? (
                      <p className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-bold truncate">
                        {cert.scoreOrHonor}
                      </p>
                    ) : (
                      <p className="text-[11px] font-mono text-slate-800 dark:text-slate-200 font-semibold">
                        Verified Credential
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

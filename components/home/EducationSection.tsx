import React from "react";
import { CERTIFICATIONS } from "@/data/certifications";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Academic & Professional Qualifications
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Degree Card (Col 1-5) */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
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
              Thiruvallur, Tamil Nadu · Aug 2023 – Expected 2027
            </p>

            <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Cumulative GPA:</span>
                <span className="font-bold text-emerald-400 text-sm">8.53 / 10 CGPA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Backlog Status:</span>
                <span className="text-emerald-400 font-medium">No active backlogs</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-400 font-sans leading-relaxed">
              Core Coursework: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Distributed Systems, Database Management, and Data Structures & Algorithms.
            </p>
          </div>

          {/* Certifications (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                Verified Certifications ({CERTIFICATIONS.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans leading-snug">
                    {cert.title}
                  </h4>
                  {cert.scoreOrHonor && (
                    <p className="text-[11px] font-mono text-emerald-400 mt-1">
                      {cert.scoreOrHonor}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

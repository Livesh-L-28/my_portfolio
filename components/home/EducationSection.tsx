import React from "react";
import { CERTIFICATIONS } from "@/data/certifications";
import { GraduationCap, Award, CheckCircle2, ShieldCheck } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section className="relative py-20 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300 mb-2">
            <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
            <span>ACADEMIC FOUNDATIONS & CREDENTIALS</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
            Formal engineering degree coursework combined with rigorous specialized technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Degree Card (Col 1-5) */}
          <div className="lg:col-span-5 rounded-2xl border border-violet-500/30 bg-[#0C1022] p-6 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                Undergraduate Degree
              </span>
              <span className="text-xs font-mono text-slate-400">2023 – 2027</span>
            </div>

            <h3 className="font-sans text-xl font-bold text-white tracking-tight">
              B.Tech in Artificial Intelligence & Data Science
            </h3>
            <p className="text-sm font-semibold text-violet-300 mt-1">
              Prathyusha Engineering College
            </p>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Thiruvallur, Tamil Nadu, India
            </p>

            <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-[#090D1C] p-3 rounded-xl border border-white/[0.04]">
                <span className="text-slate-400 font-sans">Cumulative Grade:</span>
                <span className="text-emerald-400 font-bold text-sm">8.53 / 10 CGPA</span>
              </div>
              <div className="flex justify-between items-center bg-[#090D1C] p-3 rounded-xl border border-white/[0.04]">
                <span className="text-slate-400 font-sans">Backlog Status:</span>
                <span className="text-emerald-400 font-medium">No active backlogs</span>
              </div>
              <div className="flex justify-between items-center bg-[#090D1C] p-3 rounded-xl border border-white/[0.04]">
                <span className="text-slate-400 font-sans">Expected Graduation:</span>
                <span className="text-slate-200">2027</span>
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-300 leading-relaxed font-sans">
              Curriculum encompasses Advanced Data Structures, Algorithms, Machine Learning, Computer Vision, Database Management Systems, Operating Systems, and Distributed Computing.
            </div>
          </div>

          {/* Certifications Grid (Col 6-12) */}
          <div className="lg:col-span-7">
            <h4 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Verified Technical Certifications</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-white/[0.08] bg-[#0A0E1C] p-4 transition-all hover:border-violet-500/30 hover:bg-[#0D1224]"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {cert.issuer}
                    </span>
                    {cert.year && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <h5 className="font-sans text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h5>
                  {cert.scoreOrHonor && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                      <CheckCircle2 className="h-3 w-3 shrink-0" />
                      <span>{cert.scoreOrHonor}</span>
                    </div>
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

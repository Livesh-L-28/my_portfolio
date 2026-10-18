"use client";

import React from "react";
import { FileDown, Mail } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

interface AboutPreviewProps {
  standalone?: boolean;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({
  standalone = false,
}) => {
  return (
    <section
      id="about"
      className={standalone ? "relative w-full pb-16" : "relative py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"}
    >
      {!standalone && (
        <>
          {/* Ambient background aura */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-indigo-500/08 blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-15 pointer-events-none -z-20" />
        </>
      )}

      <div className={standalone ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono text-indigo-800 dark:text-indigo-300 shadow-xs font-semibold">
              {!standalone ? (
                <>
                  <span>00</span>
                  <span className="text-indigo-400 dark:text-indigo-600">{"//"}</span>
                  <span>Engineering Background</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span>Engineering Focus &amp; Philosophy</span>
                </>
              )}
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              About Livesh L
            </h2>

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-normal">
              I architect AI applications that go beyond superficial API wrappers. My engineering spans dense &amp; sparse hybrid retrieval (RAG), in-process AI security firewalls, deterministic reliability testing, and clinical-grade real-time systems.
            </p>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal">
              Currently completing my final year of B.Tech in Artificial Intelligence &amp; Data Science at Prathyusha Engineering College with a CGPA of 8.53/10. I have authored and published Python packages on PyPI, built multi-tenant RAG systems with pgvector and Reciprocal Rank Fusion, and engineered automated regression testing suites for autonomous agents.
            </p>

            {/* Quick Profile Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <FileDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Download Resume (PDF)</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-semibold transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-600" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-indigo-600" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Clean Profile & Academic Glass Card */}
          <div className="lg:col-span-5 glass-card bento-hairline rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm relative overflow-hidden dark:bg-slate-900/70 dark:border-slate-800">
            {/* Header: Monogram Avatar + Title */}
            <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
              <ProfileAvatar size="lg" showStatus={true} />
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white font-sans">Livesh L</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">
                  AI Systems &amp; Full-Stack Developer
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 dark:text-emerald-400 mt-1 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Full-Time AI Roles</span>
                </div>
              </div>
            </div>

            {/* Education Snapshot Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">Degree</span>
                <span className="text-slate-950 dark:text-white font-sans font-bold text-xs text-right max-w-[210px]">
                  B.Tech Artificial Intelligence &amp; Data Science
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">Institution</span>
                <span className="text-slate-900 dark:text-slate-200 font-sans font-bold text-xs text-right">
                  Prathyusha Engineering College
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">Academic CGPA</span>
                <span className="text-emerald-900 dark:text-emerald-300 font-bold text-xs bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                  8.53 / 10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">Graduation</span>
                <span className="text-slate-950 dark:text-white font-bold">Expected May 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

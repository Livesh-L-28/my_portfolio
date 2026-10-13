"use client";

import React from "react";
import { FileDown, Mail } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-0.5 text-xs font-mono text-zinc-300">
              <span className="text-zinc-500 font-bold">00</span>
              <span className="text-zinc-600">//</span>
              <span>Engineering Background</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              About Livesh L.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              I focus on building AI applications that go beyond superficial API wrappers. My engineering spans retrieval-augmented generation (RAG), in-process AI security firewalls, deterministic reliability testing, controlled infrastructure remediation, and production-grade full-stack systems.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Currently completing my final year of B.Tech in Artificial Intelligence & Data Science at Prathyusha Engineering College with a CGPA of 8.53/10. I have authored and published Python packages on PyPI, built multi-tenant RAG systems with pgvector and Reciprocal Rank Fusion, and engineered automated regression testing suites for autonomous agents.
            </p>

            {/* Quick Profile Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-zinc-200 font-medium hover:text-white hover:underline transition-colors"
              >
                <FileDown className="h-3.5 w-3.5 text-zinc-400" />
                <span>Resume (PDF)</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Clean Profile & Academic Card */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 space-y-4">
            {/* Header: Monogram Avatar + Title */}
            <div className="flex items-center gap-3.5 border-b border-zinc-800 pb-4">
              <ProfileAvatar size="lg" showStatus={true} />
              <div>
                <h3 className="text-base font-bold text-white font-sans">Livesh L.</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  AI Systems & Full-Stack Developer
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Available for Full-Time AI Engineering</span>
                </div>
              </div>
            </div>

            {/* Education Snapshot Details */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-start border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500 text-[11px]">Degree</span>
                <span className="text-zinc-200 font-sans font-medium text-xs text-right max-w-[210px]">
                  B.Tech Artificial Intelligence & Data Science
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500 text-[11px]">Institution</span>
                <span className="text-zinc-200 font-sans font-medium text-xs text-right">
                  Prathyusha Engineering College
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500 text-[11px]">Academic CGPA</span>
                <span className="text-emerald-400 font-bold text-xs">
                  8.53 / 10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-[11px]">Graduation</span>
                <span className="text-zinc-200">Expected May 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, FileDown, Mail, Award, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 border-b border-slate-800/80 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -z-10 h-72 w-72 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
              Engineering AI Beyond the Prototype
            </span>

            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              About Livesh L.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              I focus on building AI applications that go beyond superficial API wrappers. My engineering spans retrieval-augmented generation (RAG), in-process AI security firewalls, deterministic reliability testing, controlled infrastructure remediation, and production-grade full-stack systems.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Currently completing my final year of B.Tech in Artificial Intelligence & Data Science at Prathyusha Engineering College with a CGPA of 8.53/10. I have authored and published Python packages on PyPI, built multi-tenant RAG systems with pgvector and Reciprocal Rank Fusion, and engineered automated regression testing suites for autonomous agents.
            </p>

            {/* Quick Profile Links */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-white font-medium hover:text-indigo-300 transition-colors"
              >
                <FileDown className="h-3.5 w-3.5 text-indigo-400" />
                <span>Resume (PDF)</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Authentic Profile & Academic Card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0d121f]/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Portrait Header */}
            <div className="flex items-center gap-4 border-b border-slate-800/80 pb-4 mb-4">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-md shrink-0">
                <Image
                  src="/images/livesh-profile.jpg"
                  alt="Livesh L."
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white font-sans">Livesh L.</h3>
                  <Award className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  AI Systems & Full-Stack Engineer
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Open for Full-Time Roles</span>
                </span>
              </div>
            </div>

            {/* Education Snapshot Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-start border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-500 text-[11px]">Degree</span>
                <span className="text-slate-200 font-sans font-medium text-xs text-right max-w-[200px]">
                  B.Tech Artificial Intelligence & Data Science
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-500 text-[11px]">Institution</span>
                <span className="text-slate-200 font-sans font-medium text-xs text-right">
                  Prathyusha Engineering College
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-500 text-[11px]">Academic CGPA</span>
                <span className="text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  8.53 / 10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[11px]">Graduation</span>
                <span className="text-indigo-300 font-medium">May 2027</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

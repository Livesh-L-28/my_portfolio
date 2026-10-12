import React from "react";
import { GraduationCap, FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Engineering AI Beyond the Prototype
            </span>

            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              About Livesh L.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              I focus on building AI applications that go beyond model integration. My work spans retrieval systems, context engineering, AI security, deterministic reliability testing, controlled infrastructure remediation, and full-stack application development. I enjoy turning complex engineering concepts into reproducible, testable, and usable software.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Currently completing my final year of B.Tech in Artificial Intelligence & Data Science at Prathyusha Engineering College with a CGPA of 8.53/10. I have engineered published Python security packages on PyPI, built end-to-end multi-tenant RAG systems with pgvector and NeMo Guardrails, and developed deterministic regression frameworks for autonomous AI agents.
            </p>

            {/* Quick Profile Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-white font-medium hover:underline"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <span className="text-zinc-600">·</span>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-zinc-600">·</span>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-sky-400"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-600">·</span>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Academic Summary Box */}
          <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 font-mono text-xs">
            <span className="text-zinc-400 block font-semibold uppercase tracking-wider text-[11px]">
              Education Snapshot
            </span>
            <div className="border-b border-zinc-800 pb-2">
              <span className="text-zinc-500 block text-[11px]">Degree</span>
              <span className="text-zinc-200 font-sans font-medium text-xs">
                B.Tech Artificial Intelligence & Data Science
              </span>
            </div>
            <div className="border-b border-zinc-800 pb-2">
              <span className="text-zinc-500 block text-[11px]">College</span>
              <span className="text-zinc-200 font-sans font-medium text-xs">
                Prathyusha Engineering College
              </span>
            </div>
            <div className="border-b border-zinc-800 pb-2 flex justify-between">
              <span className="text-zinc-500 text-[11px]">CGPA</span>
              <span className="text-emerald-400 font-bold">8.53 / 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-[11px]">Graduation</span>
              <span className="text-zinc-200">Expected 2027</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

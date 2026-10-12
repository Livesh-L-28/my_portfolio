import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  Mail,
  FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 border-t border-white/[0.08] bg-[#090D1A]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300">
              <span>ABOUT & ACADEMIC CREDENTIALS</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Engineering AI Beyond the Prototype
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              I focus on building AI applications that go beyond model integration. My work spans retrieval systems, context engineering, AI security, deterministic reliability testing, controlled infrastructure remediation, and full-stack application development. I enjoy turning complex engineering concepts into reproducible, testable, and usable software.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-violet-300"
              >
                <Mail className="h-4 w-4" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Right Credentials Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-violet-500/20 bg-[#0C1124] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-sans">
                    Academic Background
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Prathyusha Engineering College
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-start gap-2 border-b border-white/[0.04] pb-2.5">
                  <span className="text-slate-400 font-sans">Degree:</span>
                  <span className="text-right text-slate-200 font-semibold font-sans">
                    B.Tech Artificial Intelligence and Data Science
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2 border-b border-white/[0.04] pb-2.5">
                  <span className="text-slate-400 font-sans">Institution:</span>
                  <span className="text-slate-200 font-medium">
                    Prathyusha Engineering College
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2 border-b border-white/[0.04] pb-2.5">
                  <span className="text-slate-400 font-sans">Location:</span>
                  <span className="text-slate-300">Thiruvallur, Tamil Nadu, India</span>
                </div>

                <div className="flex justify-between items-center gap-2 border-b border-white/[0.04] pb-2.5">
                  <span className="text-slate-400 font-sans">Timeline:</span>
                  <span className="text-slate-300">Aug 2023 – Expected 2027</span>
                </div>

                <div className="flex justify-between items-center gap-2 border-b border-white/[0.04] pb-2.5">
                  <span className="text-slate-400 font-sans">Cumulative GPA:</span>
                  <span className="text-emerald-400 font-bold text-sm">8.53 / 10</span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400 font-sans">Backlog Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <span>No active backlogs</span>
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-white transition-colors"
                >
                  <span>Read full background & engineering philosophy</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

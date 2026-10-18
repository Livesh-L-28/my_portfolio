import React from "react";
import Link from "next/link";
import { Mail, FileDown, ShieldCheck } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { GithubIcon, LinkedinIcon, PythonIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/90 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#070b12] backdrop-blur-md pt-14 pb-10 text-slate-700 dark:text-slate-300 font-sans text-xs relative overflow-hidden">
      {/* Subtle tech dots pattern */}
      <div className="absolute inset-0 bg-tech-dots -z-10 opacity-25 dark:opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/80 dark:border-slate-800">
          {/* Col 1: Bio & Monogram */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <ProfileAvatar size="sm" showStatus={true} />
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white text-sm">
                  Livesh L
                </span>
                <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 px-2 py-0.5 rounded-full font-semibold">
                  AI Systems Engineering
                </span>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md font-sans font-medium">
              AI Developer focused on production-oriented LLM applications, retrieval-augmented generation, in-process security firewalls, and deterministic reliability engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-mono font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Prathyusha Engineering College · CGPA 8.53/10 (Expected 2027)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 font-sans font-medium">
              <li>
                <Link
                  href="/#projects"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/#packages"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Published PyPI Packages</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                    3
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Professional Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Engineering Stack
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Background
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Direct Connect
            </h4>
            <div className="flex flex-col gap-2 font-mono">
              <a
                href={PROFILE_LINKS.pypi}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors group"
              >
                <div className="h-6 w-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors shadow-2xs">
                  <PythonIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>PyPI Author Profile</span>
              </a>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors group"
              >
                <div className="h-6 w-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-slate-400 dark:group-hover:border-slate-500 transition-colors shadow-2xs">
                  <GithubIcon className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" />
                </div>
                <span>GitHub Profile</span>
              </a>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 transition-colors group"
              >
                <div className="h-6 w-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-sky-300 transition-colors shadow-2xs">
                  <LinkedinIcon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                </div>
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors group"
              >
                <div className="h-6 w-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-indigo-300 transition-colors shadow-2xs">
                  <Mail className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="truncate">{PROFILE_LINKS.email}</span>
              </a>
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-400 hover:text-indigo-950 dark:hover:text-indigo-200 transition-colors font-semibold group mt-1"
              >
                <div className="h-6 w-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <FileDown className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <p>© 2026 Livesh L · Built with Next.js, Three.js & Tailwind CSS.</p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Static Generation · Zero Third-Party Tracking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

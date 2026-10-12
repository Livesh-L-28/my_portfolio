import React from "react";
import Link from "next/link";
import { Mail, FileDown, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070912] pt-12 pb-8 text-slate-400 font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Col 1: Wordmark & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded bg-violet-600/30 border border-violet-500/40 flex items-center justify-center font-bold text-white text-xs">
                L
              </span>
              <span className="font-bold tracking-widest text-white text-sm">LIVESH L.</span>
              <span className="text-[10px] text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                AI Engineering
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              AI Developer focused on production-oriented LLM applications, retrieval-augmented generation, AI security, reliability engineering, and deterministic evaluation systems.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Prathyusha Engineering College · CGPA 8.53/10 (Expected 2027)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-violet-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-violet-300 transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-violet-300 transition-colors">
                  Professional Experience
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-violet-300 transition-colors">
                  Engineering Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-violet-300 transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
              Verified Profiles
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>github.com/Livesh-L-28</span>
              </a>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{PROFILE_LINKS.email}</span>
              </a>
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium mt-1"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 Livesh L. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Static Generation · Zero Third-Party Tracking</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

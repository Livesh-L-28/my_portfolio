import React from "react";
import Link from "next/link";
import { Mail, FileDown, ShieldCheck } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 pt-12 pb-8 text-zinc-400 font-sans text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800/80">
          {/* Col 1: Bio & Monogram */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <ProfileAvatar size="sm" showStatus={false} />
              <span className="font-bold tracking-tight text-white text-sm">Livesh L.</span>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 border border-zinc-700/60 px-2 py-0.5 rounded">
                AI Engineering
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-sans">
              AI Developer focused on production-oriented LLM applications, retrieval-augmented generation, in-process security firewalls, and deterministic reliability engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Prathyusha Engineering College · CGPA 8.53/10 (Expected 2027)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-sans">
              <li>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-white transition-colors">
                  Professional Experience
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-white transition-colors">
                  Engineering Stack
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Background
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2 font-mono">
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PROFILE_LINKS.email}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span className="truncate">{PROFILE_LINKS.email}</span>
              </a>
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-medium mt-0.5"
              >
                <FileDown className="h-3.5 w-3.5 text-zinc-400" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
          <p>© 2026 Livesh L. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Static Generation · Zero Third-Party Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

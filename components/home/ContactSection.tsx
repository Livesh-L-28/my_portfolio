"use client";

import React, { useState } from "react";
import {
  Mail,
  FileDown,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 radial-glow-hero opacity-70 pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-mono text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>DIRECT ENGINEERING COLLABORATION</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Have a Challenging AI Engineering Problem?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Interested in AI engineering, LLM systems, security, reliability, or building something technically ambitious? Let&rsquo;s connect.
          </p>
        </div>

        {/* Contact Action Center */}
        <div className="mt-12 mx-auto max-w-2xl rounded-2xl border border-violet-500/30 bg-[#0C1022]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Email Mailto CTA */}
            <a
              href={`mailto:${PROFILE_LINKS.email}?subject=AI%20Engineering%20Inquiry%20-%20Livesh%20Portfolio`}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 text-sm font-mono font-medium text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all border border-violet-400/40 text-center"
            >
              <Send className="h-4 w-4" />
              <span>Send Email Directly</span>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-4 text-sm font-mono font-medium text-slate-200 hover:bg-white/[0.08] hover:text-white transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Email Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-violet-400" />
                  <span>Copy {PROFILE_LINKS.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#090D1C] p-3 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4 text-cyan-400" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#090D1C] p-3 text-slate-300 hover:border-violet-500/40 hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4 text-violet-400" />
              <span>GitHub Profile</span>
            </a>

            <a
              href={PROFILE_LINKS.resumePdf}
              download="Livesh_L_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-600/10 p-3 text-violet-300 hover:bg-violet-600/20 hover:text-white transition-colors"
            >
              <FileDown className="h-4 w-4 text-violet-400" />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="mt-6 text-center text-xs font-mono text-slate-400">
            Based in Tamil Nadu, India · Open to full-time AI/LLM engineering roles & research collaborations.
          </div>
        </div>
      </div>
    </section>
  );
};

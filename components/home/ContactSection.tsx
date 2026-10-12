"use client";

import React, { useState } from "react";
import { Mail, Phone, FileDown, Copy, Check, Send } from "lucide-react";
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
      // fallback
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              Direct Contact & Inquiries
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Have a Challenging AI Engineering Problem?
            </h2>
            <p className="mt-2 text-sm text-zinc-300 font-sans leading-relaxed">
              Interested in AI engineering, LLM systems, security, reliability, or building something technically ambitious? Let&rsquo;s connect.
            </p>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <a
              href={`mailto:${PROFILE_LINKS.email}?subject=AI%20Engineering%20Opportunity%20-%20Livesh%20Portfolio`}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors font-sans shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span>Send Email Directly</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-3 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors font-mono cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-400" />
                  <span>Copy {PROFILE_LINKS.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Details Bar */}
          <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              <span className="truncate">{PROFILE_LINKS.email}</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300">
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{PROFILE_LINKS.phone}</span>
            </div>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors"
            >
              <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={PROFILE_LINKS.resumePdf}
              download="Livesh_L_Resume.pdf"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

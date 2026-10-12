"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, FileDown, Copy, Check, Send, Sparkles } from "lucide-react";
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
    <section id="contact" className="relative py-16 sm:py-28 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-slate-800/90 bg-[#0d121f]/90 backdrop-blur-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
              Direct Contact & Inquiries
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Have a Challenging AI Engineering Problem?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Interested in production LLM applications, AI security firewalls, deterministic agent reliability, or technical internship/full-time opportunities? Let&rsquo;s connect.
            </p>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            <a
              href={`mailto:${PROFILE_LINKS.email}?subject=AI%20Engineering%20Opportunity%20-%20Livesh%20Portfolio`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-6 py-3.5 text-xs font-semibold text-white hover:brightness-110 shadow-lg shadow-indigo-600/30 transition-all font-sans cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Send Email Directly</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/80 px-6 py-3.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all font-mono cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-400" />
                  <span>Copy {PROFILE_LINKS.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Details Bar */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="h-3.5 w-3.5 text-indigo-400" />
              <span className="truncate">{PROFILE_LINKS.email}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="h-3.5 w-3.5 text-cyan-400" />
              <span>{PROFILE_LINKS.phone}</span>
            </div>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors"
            >
              <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={PROFILE_LINKS.resumePdf}
              download="Livesh_L_Resume.pdf"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <FileDown className="h-3.5 w-3.5 text-indigo-400" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

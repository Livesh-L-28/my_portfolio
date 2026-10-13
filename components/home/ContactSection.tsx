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
    <section id="contact" className="relative py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden bg-zinc-950/60">
      {/* Ambient background aura & subtle grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-full max-w-3xl aura-indigo pointer-events-none blur-3xl opacity-35" />
      <div className="absolute inset-0 bg-grid-subtle -z-20 opacity-25 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-mono text-indigo-400 mb-2">
              <span className="font-bold">06</span>
              <span className="text-indigo-400/60">//</span>
              <span>Direct Inquiries & Opportunities</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Let&rsquo;s Build Reliable AI Systems
            </h2>
            <p className="mt-1 text-sm text-zinc-300 font-sans leading-relaxed">
              Available for full-time AI Engineering, RAG architectures, in-process security firewalls, deterministic agent reliability, or technical internship roles starting 2026/2027.
            </p>
          </div>

          {/* Action Row - Clean & Equal Heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <a
              href={`mailto:${PROFILE_LINKS.email}?subject=AI%20Engineering%20Opportunity%20-%20Livesh%20Portfolio`}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors font-sans cursor-pointer shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-5 text-xs font-medium text-zinc-200 hover:bg-zinc-750 hover:text-white transition-colors font-mono cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-400" />
                  <span>Copy {PROFILE_LINKS.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Details Bar - Clean Aligned Grid */}
          <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300 rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 truncate">
              <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{PROFILE_LINKS.email}</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300 rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5">
              <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>{PROFILE_LINKS.phone}</span>
            </div>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 transition-colors"
            >
              <LinkedinIcon className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={PROFILE_LINKS.resumePdf}
              download="Livesh_L_Resume.pdf"
              className="flex items-center gap-2 text-zinc-300 hover:text-white rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 transition-colors"
            >
              <FileDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

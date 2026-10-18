"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  FileDown,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

const INQUIRY_TYPES = [
  "Full-Time Role",
  "AI & RAG Architecture",
  "LLM Firewall / Security",
  "Technical Advisory",
  "General Inquiry",
];

interface ContactSectionProps {
  standalone?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  standalone = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Full-Time Role",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formCopied, setFormCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Construct mailto link
      const subject = encodeURIComponent(
        `[${formData.inquiryType}] Inbound Inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${PROFILE_LINKS.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  const handleCopyFormattedMessage = async () => {
    const text = `From: ${formData.name} (${formData.email})\nTopic: ${formData.inquiryType}\n\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setFormCopied(true);
      setTimeout(() => setFormCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      inquiryType: "Full-Time Role",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 overflow-hidden bg-slate-50/70 dark:bg-transparent"
    >
      {/* Ambient background auroras & tech dots */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-40 dark:opacity-20" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-10 h-80 w-80 aura-cyan pointer-events-none blur-3xl opacity-30 dark:opacity-15" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 dark:opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="glass-card bento-hairline rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden dark:bg-slate-900/60 dark:border-slate-800"
        >
          {/* Subtle diagonal ambient glow within card */}
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/15 to-violet-500/0 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500/15 to-emerald-500/0 blur-2xl pointer-events-none" />

          {/* Section Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/90 dark:border-indigo-900/60 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono text-indigo-700 dark:text-indigo-300 mb-4 shadow-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            {!standalone ? (
              <>
                <span className="font-bold">06</span>
                <span className="text-indigo-300 dark:text-indigo-600">/</span>
                <span>Direct Inquiries &amp; Opportunities</span>
              </>
            ) : (
              <span>Direct Communication Channel · Available 2026/2027</span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative">
            {/* Left Column: Context, Credentials & Direct Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Let&rsquo;s Build{" "}
                  <span className="text-gradient-hero">Reliable AI Systems</span>
                </h2>

                <p className="mt-3.5 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
                  Available for full-time AI Engineering, RAG architectures, in-process security firewalls, or deterministic reliability roles starting 2026/2027.
                </p>

                {/* Response SLA & Status */}
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono font-medium">
                    <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>Typical response time: <strong className="text-slate-950 dark:text-white">&lt; 24 hours</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Open to remote, hybrid, or on-site roles</span>
                  </div>
                </div>

                {/* Primary Quick CTA buttons */}
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all font-mono cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                          Email Copied to Clipboard!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-slate-400 dark:text-slate-400" />
                        <span>Copy {PROFILE_LINKS.email}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PROFILE_LINKS.email}?subject=AI%20Engineering%20Opportunity%20-%20Livesh%20Portfolio`}
                    className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 dark:from-indigo-600 dark:to-indigo-800 px-5 text-xs sm:text-sm font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all font-sans cursor-pointer shadow-sm relative overflow-hidden"
                  >
                    <Send className="h-3.5 w-3.5 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                    <span>Launch Direct Email</span>
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400 opacity-60 ml-1" />
                  </a>
                </div>
              </div>

              {/* Direct channels */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 p-2.5 truncate font-medium">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{PROFILE_LINKS.phone}</span>
                </div>

                <a
                  href={PROFILE_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 p-2.5 transition-all font-medium truncate"
                >
                  <LinkedinIcon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PROFILE_LINKS.resumePdf}
                  download="Livesh_L_Resume.pdf"
                  className="col-span-2 flex items-center justify-center gap-2 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 p-2.5 transition-all font-medium"
                >
                  <FileDown className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Download Livesh_L_Resume.pdf</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Quick-Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-7 shadow-lg">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base">
                            Quick Inbound Message
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          Instant Mail Dispatch
                        </span>
                      </div>

                      {/* Inquiry Type Pills */}
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Topic / Nature of Inquiry:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {INQUIRY_TYPES.map((type) => {
                            const isSelected = formData.inquiryType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({ ...prev, inquiryType: type }))
                                }
                                className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-indigo-600 text-white font-semibold shadow-xs"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Name & Email inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Your Name *
                          </label>
                          <input
                            id="name"
                            required
                            type="text"
                            placeholder="e.g. Alex Chen"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Your Email *
                          </label>
                          <input
                            id="email"
                            required
                            type="email"
                            placeholder="e.g. alex@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label
                            htmlFor="message"
                            className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300"
                          >
                            Message / Opportunity Details *
                          </label>
                          <span className="text-[11px] font-mono text-slate-400">
                            {formData.message.length} chars
                          </span>
                        </div>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Tell me about the role, your AI stack, or the project you'd like to collaborate on..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, message: e.target.value }))
                          }
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-sans text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin text-white" />
                            <span>Opening Email Client...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message via Email</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 text-center space-y-4"
                    >
                      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>

                      <div>
                        <h4 className="font-sans font-bold text-slate-900 dark:text-white text-lg">
                          Message Prepared!
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                          Your email application should have opened automatically. If it didn&rsquo;t, you can copy your formatted message below or send it directly.
                        </p>
                      </div>

                      {/* Summary card */}
                      <div className="text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3.5 text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
                        <div><strong className="text-slate-900 dark:text-white">To:</strong> {PROFILE_LINKS.email}</div>
                        <div><strong className="text-slate-900 dark:text-white">Topic:</strong> {formData.inquiryType}</div>
                        <div><strong className="text-slate-900 dark:text-white">From:</strong> {formData.name} ({formData.email})</div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                        <button
                          onClick={handleCopyFormattedMessage}
                          className="flex-1 flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                        >
                          {formCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-emerald-700 dark:text-emerald-300">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 text-slate-400" />
                              <span>Copy Full Message</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleReset}
                          className="flex h-10 items-center justify-center gap-1.5 px-4 rounded-xl text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>New Message</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

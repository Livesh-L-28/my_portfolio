import { Metadata } from "next";
import Link from "next/link";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Briefcase, Building2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Experience & Internships — Livesh L",
  description:
    "Engineering internships and industry contributions at Chargebee, XARC, Femtosoft Technologies, and Cognifyz Technologies.",
};

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-20 overflow-hidden">
      {/* Ambient background auroras & tech dots */}
      <div className="absolute top-16 left-1/4 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-35" />
      <div className="absolute top-48 right-1/4 -z-10 h-96 w-96 aura-amber pointer-events-none blur-3xl opacity-25" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 mb-8 shadow-2xs hover:border-slate-400 transition-colors"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-950 dark:text-white font-bold">Experience</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-mono text-amber-800 dark:text-amber-300 mb-3 shadow-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>Professional Track · 4 Industry Internships</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
            Engineering <span className="text-gradient-hero">Experience</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
            Hands-on machine learning, cloud asset delivery, and software systems engineered across four industry internships.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
                <Briefcase className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">4 Internships Completed</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                <Building2 className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">Chargebee &amp; XARC</span>
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 shadow-2xs font-medium">
              <div className="h-5 w-5 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-slate-950 dark:text-white font-bold">Chennai &amp; Remote</span>
            </span>
          </div>
        </div>

        {/* Timeline Items */}
        <ExperienceTimeline standalone={true} showHeader={false} />
      </div>
    </div>
  );
}

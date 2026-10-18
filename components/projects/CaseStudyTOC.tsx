"use client";

import React, { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
}

const SECTIONS: TOCItem[] = [
  { id: "overview", label: "Overview & Goals" },
  { id: "architecture", label: "System Architecture" },
  { id: "workflow", label: "Execution Pipeline" },
  { id: "tradeoffs", label: "Engineering Decisions" },
  { id: "evaluation", label: "Empirical Testing" },
  { id: "security", label: "Security & Defenses" },
  { id: "setup", label: "Reproduction & Setup" },
];

export const CaseStudyTOC: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Check active section
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50 dark:bg-slate-800/50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Sticky Quick-Jump Pill for Desktop & Tablet */}
      <div className="sticky top-20 z-30 mb-8 hidden lg:block">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 py-2.5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 shrink-0">
              <ListFilter className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold uppercase tracking-wider">Case Study Sections:</span>
            </div>

            <nav className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-indigo-600 text-white font-semibold shadow-2xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white font-medium"
                    }`}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </nav>

            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold shrink-0">
              {Math.round(scrollProgress)}% read
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

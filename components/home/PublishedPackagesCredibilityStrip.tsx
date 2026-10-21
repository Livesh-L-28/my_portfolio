"use client";

import React, { useState } from "react";
import { Check, Copy, ArrowDownRight } from "lucide-react";
import { PythonIcon } from "@/components/ui/Icons";

interface QuickPackage {
  name: string;
  dist: string;
  version: string;
  install: string;
  pypiUrl: string;
}

const PACKAGES: QuickPackage[] = [
  {
    name: "LLMFirewall Core",
    dist: "llmfirewall-core",
    version: "v1.1.0",
    install: "pip install llmfirewall-core",
    pypiUrl: "https://pypi.org/project/llmfirewall-core/",
  },
  {
    name: "AI Reliability",
    dist: "aireliability",
    version: "v1.4.0",
    install: "pip install aireliability",
    pypiUrl: "https://pypi.org/project/aireliability/",
  },
  {
    name: "AEGIS Framework",
    dist: "aegis-resilience",
    version: "v0.1.0",
    install: "pip install aegis-resilience",
    pypiUrl: "https://pypi.org/project/aegis-resilience/",
  },
];

export const PublishedPackagesCredibilityStrip: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = async (cmd: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(cmd);
        setCopiedCmd(cmd);
        setTimeout(() => setCopiedCmd(null), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <section
      aria-label="Published Python Packages Quick Strip"
      className="relative z-10 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-md py-3.5 transition-colors"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          {/* Label & Python Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/90 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300">
              <PythonIcon className="h-3.5 w-3.5" />
            </span>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase text-[11px] tracking-wider">
                Published Python Packages
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.2 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>PyPI Verified</span>
              </span>
            </div>
          </div>

          {/* Quick Install Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {PACKAGES.map((pkg) => {
              const isCopied = copiedCmd === pkg.install;
              return (
                <div
                  key={pkg.dist}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 text-xs font-mono shadow-2xs transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
                >
                  <a
                    href={pkg.pypiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors"
                    title={`View ${pkg.dist} on PyPI`}
                  >
                    <span>{pkg.dist}</span>
                    <span className="text-[10px] font-normal text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-200 dark:border-indigo-800">
                      {pkg.version}
                    </span>
                  </a>

                  <span className="text-slate-300 dark:text-slate-700">|</span>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(pkg.install, e)}
                    aria-label={`Copy command ${pkg.install}`}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-mono cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded px-1"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 dark:text-slate-500 select-none">$</span>
                        <code className="text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white">
                          {pkg.install}
                        </code>
                        <Copy className="h-3 w-3 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0 ml-0.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Jump to deep-dive section */}
          <div className="shrink-0 flex items-center">
            <a
              href="#packages"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline transition-colors"
            >
              <span>Explore Architecture &amp; Pipelines</span>
              <ArrowDownRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

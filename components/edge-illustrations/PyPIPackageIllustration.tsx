"use client";

import React, { useState } from "react";
import { Package, Copy, Check, ExternalLink } from "lucide-react";
import { PythonIcon } from "@/components/ui/Icons";

interface PkgSpec {
  id: string;
  distName: string;
  importName: string;
  version: string;
  description: string;
  command: string;
  pypiUrl: string;
  githubUrl: string;
  modules: string[];
}

export const PyPIPackageIllustration: React.FC = () => {
  const packages: PkgSpec[] = [
    {
      id: "aireliability",
      distName: "aireliability",
      importName: "aireliability",
      version: "1.4.0",
      description: "Deterministic reliability testing framework & CLI for AI agents.",
      command: "pip install aireliability",
      pypiUrl: "https://pypi.org/project/aireliability/",
      githubUrl: "https://github.com/Livesh-L-28/aireliability",
      modules: ["airel.runner", "airel.drift", "airel.matrix"],
    },
    {
      id: "aegis-resilience",
      distName: "aegis-resilience",
      importName: "aegis",
      version: "0.1.0",
      description: "Autonomous telemetry isolation & incident remediation framework.",
      command: "pip install aegis-resilience",
      pypiUrl: "https://pypi.org/project/aegis-resilience/",
      githubUrl: "https://github.com/Livesh-L-28/aegis-resilience",
      modules: ["aegis.telemetry", "aegis.causal", "aegis.governor"],
    },
    {
      id: "llmfirewall-core",
      distName: "llmfirewall-core",
      importName: "llmfirewall",
      version: "1.1.0",
      description: "High-performance in-process prompt injection & PII firewall.",
      command: "pip install llmfirewall-core",
      pypiUrl: "https://pypi.org/project/llmfirewall-core/",
      githubUrl: "https://github.com/Livesh-L-28/llmfirewall-core",
      modules: ["firewall.interceptor", "firewall.pii", "firewall.jailbreak"],
    },
    {
      id: "logicfalcon",
      distName: "logicfalcon",
      importName: "logicfalcon",
      version: "0.1.2",
      description: "AI-powered code review with CLI, SDK & Model Context Protocol (MCP).",
      command: "pip install logicfalcon",
      pypiUrl: "https://pypi.org/project/logicfalcon/",
      githubUrl: "https://github.com/Livesh-L-28/logicfalcon",
      modules: ["falcon.mcp", "falcon.ast", "falcon.remediate"],
    },
  ];

  const [activePkgIdx, setActivePkgIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activePkg = packages[activePkgIdx];

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(activePkg.command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // fallback
    }
  };

  return (
    <aside
      aria-label="Published Python Packages Technical Pipeline Illustration"
      className="w-full max-w-[275px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 shadow-sm space-y-3 overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-200/70 dark:border-slate-800/70 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
          <PythonIcon className="h-3.5 w-3.5 text-indigo-500" />
          <span>PyPI Package Assembly</span>
        </div>

        <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded">
          Wheel Verified
        </span>
      </div>

      {/* Package Selector Tabs */}
      <div className="grid grid-cols-4 gap-1 font-mono text-[9px]">
        {packages.map((pkg, idx) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => {
              setActivePkgIdx(idx);
              setCopied(false);
            }}
            className={`py-1 px-1 rounded border text-center transition-all cursor-pointer truncate ${
              activePkgIdx === idx
                ? "bg-indigo-50 dark:bg-indigo-950/70 border-indigo-400 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
            }`}
          >
            {pkg.distName.split("-")[0]}
          </button>
        ))}
      </div>

      {/* Assembly Artifact Box */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/60 p-2.5 font-mono text-[10px] space-y-2">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">
          <div className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white">
              {activePkg.distName}
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold">
            v{activePkg.version}
          </span>
        </div>

        {/* Python Import Name Callout (e.g. aegis vs aegis-resilience) */}
        {activePkg.importName !== activePkg.distName && (
          <div className="text-[9px] bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 rounded p-1.5 text-violet-900 dark:text-violet-300">
            <strong>Import Syntax:</strong> <code>import {activePkg.importName}</code>
          </div>
        )}

        {/* Module Hierarchy */}
        <div className="space-y-1 text-[9px] text-slate-600 dark:text-slate-400">
          <div className="text-slate-400 uppercase text-[8px] tracking-wider">
            Distributable Modules (.whl):
          </div>
          {activePkg.modules.map((m) => (
            <div key={m} className="flex items-center gap-1.5 pl-1">
              <span className="text-emerald-500 font-bold">•</span>
              <code className="text-slate-800 dark:text-slate-200">{m}</code>
            </div>
          ))}
        </div>

        {/* Copyable Pip Command */}
        <div className="pt-1.5 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between gap-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5">
            <div className="flex items-center gap-1 truncate text-slate-800 dark:text-slate-200 text-[10px]">
              <span className="text-slate-400">$</span>
              <code className="truncate font-bold">{activePkg.command}</code>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`Copy ${activePkg.command}`}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors shrink-0"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between text-[9px] pt-0.5">
          <a
            href={activePkg.pypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View PyPI</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
          <a
            href={activePkg.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
          >
            <span>Repository</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};

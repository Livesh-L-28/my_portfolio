"use client";

import React from "react";
import { Package, ExternalLink, ShieldCheck, Terminal, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface PublishedPackage {
  name: string;
  pypiPackageName: string;
  installCommand: string;
  description: string;
  testsCount: string;
  pypiUrl: string;
  githubUrl: string;
  tag: string;
}

const PUBLISHED_PACKAGES: PublishedPackage[] = [
  {
    name: "LLMFirewall Core",
    pypiPackageName: "llmfirewall-core",
    installCommand: "pip install llmfirewall-core",
    description:
      "Lightweight, in-process security framework intercepting adversarial prompt injections, redacting sensitive credentials and PII, and enforcing Policy-as-Code with sub-millisecond overhead.",
    testsCount: "608+ tests passed",
    pypiUrl: "https://pypi.org/project/llmfirewall-core/",
    githubUrl: "https://github.com/Livesh-L-28/LLMFirewall",
    tag: "AI Security",
  },
  {
    name: "AI Reliability Engine",
    pypiPackageName: "aireliability",
    installCommand: "pip install aireliability",
    description:
      "Deterministic testing and regression framework for LLM applications and AI agents. Validates tool ordering, argument schemas, execution traces, and cost ceilings via the `airel` CLI.",
    testsCount: "362 tests passed",
    pypiUrl: "https://pypi.org/project/aireliability/",
    githubUrl: "https://github.com/Livesh-L-28/aireliability_testing",
    tag: "Reliability & Eval",
  },
  {
    name: "AEGIS Framework",
    pypiPackageName: "aegis-resilience",
    installCommand: "pip install aegis-resilience",
    description:
      "Autonomous reliability engineering framework correlating Prometheus, Grafana Loki, and OpenTelemetry signals for incident root-cause diagnosis with approval-gated remediation.",
    testsCount: "Production-grade release",
    pypiUrl: "https://pypi.org/project/aegis-resilience/",
    githubUrl: "https://github.com/Livesh-L-28/AEGIS-Framework",
    tag: "Incident Remediation",
  },
];

export const OpenSourceImpact: React.FC = () => {
  return (
    <section className="relative py-20 border-t border-white/[0.08] bg-[#090D1A]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-2">
              <Package className="h-3.5 w-3.5 text-cyan-400" />
              <span>PUBLISHED PYTHON PACKAGES & TOOLS</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Open-Source & PyPI Releases
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
              Published distributions available on the Python Package Index (PyPI) with automated CI/CD and regression suites.
            </p>
          </div>

          <a
            href="https://github.com/Livesh-L-28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            <span>github.com/Livesh-L-28</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* 3 Published PyPI Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLISHED_PACKAGES.map((pkg) => (
            <div
              key={pkg.pypiPackageName}
              className="flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-[#0C1022] p-5 sm:p-6 transition-all hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {pkg.tag}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{pkg.testsCount}</span>
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-white tracking-tight">
                  {pkg.name}
                </h3>
                <p className="mt-0.5 text-xs font-mono text-slate-400">
                  Distribution: <code className="text-violet-300">{pkg.pypiPackageName}</code>
                </p>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans">
                  {pkg.description}
                </p>

                <div className="mt-4">
                  <CodeBlock code={pkg.installCommand} prefix="$" />
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2 text-xs font-mono">
                <a
                  href={pkg.pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1.5 py-0.5"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>PyPI Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href={pkg.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400 rounded px-1.5 py-0.5"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { Package, ExternalLink, ShieldCheck } from "lucide-react";
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
      "In-process defense-in-depth security framework intercepting adversarial prompt injections, redacting sensitive credentials and PII, and enforcing Policy-as-Code with sub-millisecond overhead (~0.02ms).",
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
    testsCount: "Production-grade v0.1.0",
    pypiUrl: "https://pypi.org/project/aegis-resilience/",
    githubUrl: "https://github.com/Livesh-L-28/AEGIS-Framework",
    tag: "Incident Remediation",
  },
];

export const OpenSourceImpact: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              Public Python Distributions
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Open-Source & PyPI Releases
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-sans">
              Published packages available on the Python Package Index with automated CI/CD and regression suites.
            </p>
          </div>

          <a
            href="https://github.com/Livesh-L-28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            <span>github.com/Livesh-L-28</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PUBLISHED_PACKAGES.map((pkg) => (
            <div
              key={pkg.pypiPackageName}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
                    {pkg.tag}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{pkg.testsCount}</span>
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold text-white">
                  {pkg.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Package: <code className="text-zinc-200">{pkg.pypiPackageName}</code>
                </p>

                <p className="mt-3 text-xs text-zinc-300 leading-relaxed font-sans">
                  {pkg.description}
                </p>

                <div className="mt-4">
                  <CodeBlock code={pkg.installCommand} prefix="$" />
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <a
                  href={pkg.pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>PyPI Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href={pkg.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface PublishedPackage {
  name: string;
  slug: string;
  image: string;
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
    slug: "llmfirewall-core",
    image: "/images/projects/llmfirewall.jpg",
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
    slug: "aireliability",
    image: "/images/projects/aireliability.jpg",
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
    slug: "aegis-framework",
    image: "/images/projects/aegis.jpg",
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
    <section className="relative py-16 sm:py-20 border-b border-zinc-800/80 overflow-hidden bg-zinc-950/40">
      {/* Subtle ambient cyan spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-4xl aura-cyan pointer-events-none blur-3xl opacity-35" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-400 mb-2">
              <span className="font-bold">02</span>
              <span className="text-cyan-400/60">{"//"}</span>
              <span>Public Python Distributions</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Open-Source & PyPI Releases
            </h2>
            <p className="mt-1 text-sm text-zinc-400 font-sans">
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

        {/* 3 Packages Cards - Equal Heights & Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLISHED_PACKAGES.map((pkg) => (
            <article
              key={pkg.pypiPackageName}
              className="group flex flex-col justify-between h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-zinc-700 hover:bg-zinc-900/95 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-200"
            >
              <div className="flex flex-col flex-1">
                {/* Visual Thumbnail */}
                <Link
                  href={`/projects/${pkg.slug}`}
                  className="block relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 border border-zinc-800 bg-zinc-950"
                  tabIndex={-1}
                >
                  <Image
                    src={pkg.image}
                    alt={`${pkg.name} Preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {pkg.tag}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{pkg.testsCount}</span>
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  <Link href={`/projects/${pkg.slug}`}>
                    {pkg.name}
                  </Link>
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Package: <code className="text-zinc-200">{pkg.pypiPackageName}</code>
                </p>

                <p className="mt-2.5 text-xs text-zinc-300 leading-relaxed font-sans line-clamp-3 mb-4 min-h-[3.75rem]">
                  {pkg.description}
                </p>

                <div className="mt-auto">
                  <CodeBlock code={pkg.installCommand} prefix="$" />
                </div>
              </div>

              {/* Action Links Bar */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <a
                  href={pkg.pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                >
                  <Package className="h-3.5 w-3.5 text-zinc-400" />
                  <span>PyPI Package</span>
                  <ExternalLink className="h-3 w-3 text-zinc-500" />
                </a>

                <a
                  href={pkg.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

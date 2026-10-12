"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <section className="relative py-16 sm:py-24 border-b border-slate-800/80 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold block mb-1">
              Public Python Distributions
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Open-Source & PyPI Releases
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-sans">
              Published packages available on the Python Package Index with automated CI/CD and regression suites.
            </p>
          </div>

          <a
            href="https://github.com/Livesh-L-28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            <span>github.com/Livesh-L-28</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLISHED_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.pypiPackageName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0d121f]/75 backdrop-blur-xl p-5 hover:border-indigo-500/40 hover:bg-[#111728]/90 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.25)] transition-all duration-300"
            >
              <div>
                {/* Visual Thumbnail */}
                <Link
                  href={`/projects/${pkg.slug}`}
                  className="block relative h-36 w-full rounded-xl overflow-hidden mb-4 border border-slate-800/80 bg-slate-950"
                  tabIndex={-1}
                >
                  <Image
                    src={pkg.image}
                    alt={`${pkg.name} Preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-indigo-300 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2 py-0.5 rounded">
                    {pkg.tag}
                  </div>
                </Link>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{pkg.testsCount}</span>
                  </span>
                  <Link
                    href={`/projects/${pkg.slug}`}
                    className="text-[11px] font-mono text-slate-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>

                <h3 className="font-sans text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  <Link href={`/projects/${pkg.slug}`}>
                    {pkg.name}
                  </Link>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Package: <code className="text-slate-200 bg-slate-800/80 px-1.5 py-0.5 rounded">{pkg.pypiPackageName}</code>
                </p>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {pkg.description}
                </p>

                <div className="mt-4">
                  <CodeBlock code={pkg.installCommand} prefix="$" />
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <a
                  href={pkg.pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>PyPI Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href={pkg.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

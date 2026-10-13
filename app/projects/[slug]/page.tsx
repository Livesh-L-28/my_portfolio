import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { ProjectArchitecture } from "@/components/projects/ProjectArchitecture";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  ExternalLink,
  Package,
  Play,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Target,
  CheckCircle2,
  Workflow,
  Cpu,
  Layers,
  Terminal,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { getProject3DType } from "@/lib/types";
import { ProjectVisualShowcase } from "@/components/projects/ProjectVisualShowcase";

interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — AI System Case Study | Livesh L.`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find prev/next projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <article className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-zinc-200 font-semibold">{project.title}</span>
        </nav>

        {/* Header Hero Area */}
        <header className="border-b border-zinc-800 pb-8 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs font-mono font-medium text-zinc-300">
              {project.category}
            </span>
            {project.stats &&
              project.stats.slice(0, 2).map((s) => (
                <span
                  key={s.label}
                  className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
                >
                  {s.label}: <strong className="text-white">{s.value}</strong>
                </span>
              ))}
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {project.fullName}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            {project.tagline}
          </p>

          {/* Key Achievement Badge */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-mono text-zinc-200">
            <span className="text-emerald-400 font-bold">✓ Verified Milestone:</span>
            <span>{project.keyAchievement}</span>
          </div>

          {/* Action Links Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Launch Live Application</span>
              </a>
            )}

            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-sans text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View Repository</span>
              </a>
            )}

            {project.links.pypiUrl && (
              <a
                href={project.links.pypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-sans text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>PyPI Package</span>
              </a>
            )}

            {project.links.installCommand && (
              <div className="min-w-[240px]">
                <CodeBlock code={project.links.installCommand} prefix="$" />
              </div>
            )}
          </div>

          {/* Technology Badges */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-zinc-400 mr-2">Technologies:</span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300 border border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Interactive System Interface & 3D Model Showcase */}
        <ProjectVisualShowcase
          slug={project.slug}
          title={project.title}
          thumbnail={project.thumbnail}
          threeDType={getProject3DType(project.slug)}
        />

        {/* Embedded Video Demo Player if available */}
        {project.links.demoVideoUrl && (
          <section className="mb-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-900">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-sky-400 fill-sky-400" />
                  <span className="font-sans text-xs sm:text-sm font-semibold text-white">
                    Verified Project Demonstration Video
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Direct In-Portfolio Player
                </span>
              </div>
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={project.links.demoVideoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
            </div>
          </section>
        )}

        {/* Disclaimer if present */}
        {project.caseStudy.disclaimer && (
          <div className="mb-10 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-mono text-amber-200 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{project.caseStudy.disclaimer}</span>
          </div>
        )}

        {/* Problem Statement & Goals */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3 text-zinc-200">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <h2 className="font-sans text-base font-bold text-white">Problem Statement</h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {project.caseStudy.problemStatement}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3 text-zinc-200">
              <Target className="h-4 w-4 text-emerald-400" />
              <h2 className="font-sans text-base font-bold text-white">Engineering Goals</h2>
            </div>
            <ul className="space-y-2">
              {project.caseStudy.engineeringGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* System Architecture */}
        {project.architectureDiagram && (
          <section className="mb-12">
            <ProjectArchitecture
              architecture={project.architectureDiagram}
              title={`${project.title} — System Architecture`}
            />
          </section>
        )}

        {/* Pipeline Steps */}
        {project.caseStudy.pipelineSteps && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Workflow className="h-5 w-5 text-indigo-400" />
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
                Execution Pipeline & Mechanics
              </h2>
            </div>

            <div className="space-y-3">
              {project.caseStudy.pipelineSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <span className="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-zinc-200 shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-white mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Implementation Highlights */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-5 w-5 text-sky-400" />
            <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
              Implementation Details & Architecture
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
            {project.caseStudy.systemArchitecture}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.caseStudy.implementationHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-xs sm:text-sm text-zinc-300 font-sans flex items-start gap-2.5"
              >
                <span className="text-zinc-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{hl}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Trade-offs */}
        {project.caseStudy.technicalTradeoffs && project.caseStudy.technicalTradeoffs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-amber-400" />
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
                Technical Decisions & Trade-offs
              </h2>
            </div>

            <div className="space-y-3">
              {project.caseStudy.technicalTradeoffs.map((tradeoff, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5"
                >
                  <h3 className="font-sans text-sm sm:text-base font-bold text-white mb-1.5">
                    Decision: {tradeoff.decision}
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm font-sans">
                    <p className="text-emerald-400/90 leading-relaxed">
                      <strong>Rationale:</strong> {tradeoff.rationale}
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      <strong>Alternative Rejected:</strong> {tradeoff.alternativeRejected}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testing & Empirical Evaluation */}
        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
              Testing & Empirical Evaluation
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
            {project.caseStudy.testingAndEvaluation.methodology}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.caseStudy.testingAndEvaluation.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 text-xs font-mono text-zinc-200"
              >
                <div className="font-bold text-emerald-400 text-xs mb-0.5">
                  Result #{idx + 1}
                </div>
                <div>{metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Reliability */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
              Security & Reliability Defenses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.caseStudy.securityReliability.map((sec, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 text-xs sm:text-sm text-zinc-300 font-sans flex items-start gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Learnings */}
        <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
          <h2 className="font-sans text-base sm:text-lg font-bold text-white mb-3">
            Key Engineering Learnings
          </h2>
          <ul className="space-y-2">
            {project.caseStudy.keyLearnings.map((learning, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
              >
                <span className="text-zinc-500 font-bold shrink-0">•</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Local Deployment Commands */}
        {project.caseStudy.localDeploymentInstructions && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <h2 className="font-sans text-base font-bold text-white">
                Local Reproduction & Setup
              </h2>
            </div>
            <div className="space-y-2">
              {project.caseStudy.localDeploymentInstructions.map((cmd, idx) => (
                <CodeBlock key={idx} code={cmd} prefix="$" />
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Navigation */}
        <nav
          className="pt-8 border-t border-zinc-800 flex items-center justify-between gap-4"
          aria-label="Previous and Next Project"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start gap-0.5 text-left"
          >
            <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 group-hover:text-zinc-300">
              <ArrowLeft className="h-3 w-3" />
              <span>Previous</span>
            </span>
            <span className="text-sm font-semibold text-white group-hover:text-zinc-200 font-sans">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-0.5 text-right"
          >
            <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 group-hover:text-zinc-300">
              <span>Next</span>
              <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-sm font-semibold text-white group-hover:text-zinc-200 font-sans">
              {nextProject.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

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
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

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
      {/* Background decorations */}
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow-hero opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8"
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
          <span className="text-violet-300 font-semibold">{project.title}</span>
        </nav>

        {/* Header Hero Area */}
        <header className="border-b border-white/[0.08] pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-mono font-medium text-violet-300">
              {project.category}
            </span>
            {project.stats &&
              project.stats.slice(0, 2).map((s) => (
                <span
                  key={s.label}
                  className="rounded-md border border-white/[0.08] bg-[#0C1022] px-3 py-1 text-xs font-mono text-slate-300"
                >
                  {s.label}: <strong className="text-cyan-300">{s.value}</strong>
                </span>
              ))}
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {project.fullName}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 font-sans leading-relaxed">
            {project.tagline}
          </p>

          {/* Key Achievement Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-950/30 px-4 py-2.5 text-xs sm:text-sm font-mono text-violet-200">
            <span className="text-violet-400 font-bold">⚡ Verified Engineering Milestone:</span>
            <span>{project.keyAchievement}</span>
          </div>

          {/* Action Links Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm font-mono text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all"
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
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-xs sm:text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all"
              >
                <Package className="h-4 w-4" />
                <span>PyPI Distribution</span>
              </a>
            )}

            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs sm:text-sm font-mono text-emerald-300 hover:bg-emerald-500/20 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Launch Live Application</span>
              </a>
            )}

            {project.links.installCommand && (
              <div className="min-w-[260px]">
                <CodeBlock code={project.links.installCommand} prefix="$" />
              </div>
            )}
          </div>

          {/* Technology Badges */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Core Technologies:</span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/[0.08] bg-[#0E1326] px-2.5 py-1 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Embedded Video Demo Player if available */}
        {project.links.demoVideoUrl && (
          <section className="mb-14">
            <div className="rounded-2xl border border-violet-500/30 bg-[#0B0F1C] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3 bg-[#080C16]">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-violet-400 fill-violet-400" />
                  <span className="font-sans text-sm font-semibold text-white">
                    Verified Project Demonstration Video
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Recorded Demonstration
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
              <div className="px-5 py-2.5 bg-[#070A14] border-t border-white/[0.06] text-xs font-mono text-slate-400">
                Direct in-portfolio video playback of {project.title}.
              </div>
            </div>
          </section>
        )}

        {/* Disclaimer if present */}
        {project.caseStudy.disclaimer && (
          <div className="mb-12 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-mono text-amber-200 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{project.caseStudy.disclaimer}</span>
          </div>
        )}

        {/* Section 1: Problem Statement & Engineering Goals */}
        <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B0F1E] p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-4 text-violet-300">
              <ShieldAlert className="h-5 w-5" />
              <h2 className="font-sans text-lg font-bold text-white">Problem Statement</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.caseStudy.problemStatement}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0B0F1E] p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-4 text-cyan-300">
              <Target className="h-5 w-5" />
              <h2 className="font-sans text-lg font-bold text-white">Engineering Goals</h2>
            </div>
            <ul className="space-y-2.5">
              {project.caseStudy.engineeringGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Interactive System Architecture */}
        {project.architectureDiagram && (
          <section className="mb-14">
            <ProjectArchitecture
              architecture={project.architectureDiagram}
              title={`${project.title} — System Architecture`}
            />
          </section>
        )}

        {/* Section 3: In-Depth Pipeline Execution */}
        {project.caseStudy.pipelineSteps && (
          <section className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <Workflow className="h-5 w-5 text-violet-400" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                Execution Pipeline & Mechanics
              </h2>
            </div>

            <div className="space-y-4">
              {project.caseStudy.pipelineSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-xl border border-white/[0.06] bg-[#0C1022] p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <span className="h-8 w-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center font-mono font-bold text-xs text-violet-300 shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Implementation Highlights */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-6">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Implementation Details & Architecture
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-6">
            {project.caseStudy.systemArchitecture}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.caseStudy.implementationHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-[#090D1C] p-4.5 text-xs sm:text-sm text-slate-300 font-sans flex items-start gap-3"
              >
                <span className="text-violet-400 font-bold shrink-0">▪</span>
                <span className="leading-relaxed">{hl}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Technical Decisions & Trade-offs */}
        {project.caseStudy.technicalTradeoffs && project.caseStudy.technicalTradeoffs.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <Layers className="h-5 w-5 text-amber-400" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                Technical Decisions & Trade-offs
              </h2>
            </div>

            <div className="space-y-4">
              {project.caseStudy.technicalTradeoffs.map((tradeoff, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-[#0C1124] p-5 sm:p-6"
                >
                  <h3 className="font-sans text-base font-bold text-white mb-2">
                    Decision: {tradeoff.decision}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm font-sans">
                    <p className="text-emerald-300/90 leading-relaxed">
                      <strong>Engineering Rationale:</strong> {tradeoff.rationale}
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      <strong>Alternative Rejected:</strong> {tradeoff.alternativeRejected}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Testing, Evaluation & Benchmarks */}
        <section className="mb-14 rounded-2xl border border-violet-500/20 bg-[#0B0F1E] p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Testing & Empirical Evaluation
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
            {project.caseStudy.testingAndEvaluation.methodology}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.caseStudy.testingAndEvaluation.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs font-mono text-emerald-200"
              >
                <div className="font-bold text-white text-sm mb-1">
                  Metric #{idx + 1}
                </div>
                <div>{metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Security & Reliability */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-6">
            <ShieldAlert className="h-5 w-5 text-violet-400" />
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Security & Reliability Defenses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.caseStudy.securityReliability.map((sec, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-[#0A0E1C] p-4 text-xs sm:text-sm text-slate-300 font-sans flex items-start gap-2.5"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Key Learnings */}
        <section className="mb-14 rounded-2xl border border-white/[0.08] bg-[#0C1022] p-6 sm:p-7">
          <div className="flex items-center gap-2.5 mb-4">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h2 className="font-sans text-lg font-bold text-white">
              Key Engineering Learnings
            </h2>
          </div>
          <ul className="space-y-2.5">
            {project.caseStudy.keyLearnings.map((learning, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed"
              >
                <span className="text-violet-400 font-bold shrink-0">→</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 9: Local Deployment Instructions */}
        {project.caseStudy.localDeploymentInstructions && (
          <section className="mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <Terminal className="h-5 w-5 text-emerald-400" />
              <h2 className="font-sans text-lg font-bold text-white">
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

        {/* Previous / Next Project Navigation Bar */}
        <nav
          className="pt-10 border-t border-white/[0.08] flex items-center justify-between gap-4"
          aria-label="Previous and Next Project Navigation"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start gap-1 text-left"
          >
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
              <ArrowLeft className="h-3 w-3" />
              <span>Previous Project</span>
            </span>
            <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors font-sans">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1 text-right"
          >
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
              <span>Next Project</span>
              <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors font-sans">
              {nextProject.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

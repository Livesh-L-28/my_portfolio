import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getAbsoluteUrl } from "@/lib/seo";
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
import { GithubIcon, PythonIcon } from "@/components/ui/Icons";
import { getProject3DType } from "@/lib/types";
import { ProjectVisualShowcase } from "@/components/projects/ProjectVisualShowcase";
import { ProjectVideoGallery } from "@/components/projects/ProjectVideoGallery";
import { VenipunctureTechnicalDeepDive } from "@/components/projects/VenipunctureTechnicalDeepDive";
import { VenipunctureTechStack } from "@/components/projects/VenipunctureTechStack";
import { VenipunctureResources } from "@/components/projects/VenipunctureResources";
import { CaseStudyTOC } from "@/components/projects/CaseStudyTOC";

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

  const canonicalUrl = getAbsoluteUrl(`/projects/${slug}`);

  return {
    title: `${project.title} — AI System Case Study | Livesh L`,
    description: project.tagline,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — AI Engineering Case Study | Livesh L`,
      description: project.tagline,
      url: canonicalUrl,
      siteName: "Livesh L — AI Engineering Portfolio",
      type: "article",
      images: project.thumbnail ? [{ url: project.thumbnail, alt: `${project.title} Architecture Preview` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — AI Engineering Case Study | Livesh L`,
      description: project.tagline,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isVenipuncture = project.slug === "venipuncture-vr";

  // Find prev/next projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <article className="relative min-h-screen py-12 sm:py-20 overflow-hidden">
      {/* Ambient background auroras & tech dots */}
      <div className="absolute top-16 left-1/4 -z-10 h-96 w-96 aura-indigo pointer-events-none blur-3xl opacity-35" />
      <div className="absolute top-48 right-1/4 -z-10 h-96 w-96 aura-cyan pointer-events-none blur-3xl opacity-30" />
      <div className="absolute inset-0 bg-tech-dots -z-20 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Breadcrumb Navigation - Modern Frosted Capsule */}
        <nav
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 mb-8 shadow-2xs hover:border-slate-400 transition-colors"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <Link href="/projects" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
            Projects
          </Link>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-950 dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">{project.title}</span>
        </nav>

        {/* Sticky Table of Contents & Reading Progress Bar */}
        <CaseStudyTOC />

        {/* 1. Project Hero Header */}
        <header id="overview" className="border-b border-slate-200 dark:border-slate-800 pb-10 mb-12 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl border border-indigo-200/90 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300 shadow-xs">
              {project.category}
            </span>
            {project.categories && project.categories.length > 1 && (
              project.categories.slice(1, 4).map((cat) => (
                <span
                  key={cat}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-800 dark:text-slate-200 hidden sm:inline-block font-semibold"
                >
                  {cat}
                </span>
              ))
            )}
            {project.stats &&
              project.stats.slice(0, 2).map((s) => (
                <span
                  key={s.label}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 text-xs font-mono text-slate-800 dark:text-slate-200 shadow-2xs font-semibold"
                >
                  {s.label}: <strong className="text-slate-950 dark:text-white font-bold">{s.value}</strong>
                </span>
              ))}
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
            {project.fullName}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium font-sans leading-relaxed">
            {project.tagline}
          </p>

          {/* Key Achievement Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-300/90 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 backdrop-blur-sm px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-200 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-950 dark:text-emerald-300 font-bold">Verified Milestone:</span>
            <span>{project.keyAchievement}</span>
          </div>

          {/* PyPI-Only Architecture Banner */}
          {project.pypiOnly && (
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/90 dark:bg-indigo-950/40 p-4 text-xs font-sans space-y-2 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold font-mono">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-white">
                    <PythonIcon className="h-3 w-3" />
                  </span>
                  <span>Published Python Package · PyPI Distribution</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Distribution:</span>
                  <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 font-bold text-indigo-700 dark:text-indigo-300">
                    {project.links.publishedPackageName || project.slug}
                  </code>
                </div>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs">
                This project is authored and published strictly as an in-process Python library on the Python Package Index. It does not require a hosted dashboard or cloud service — executing natively within the consumer&apos;s application runtime.
              </p>
            </div>
          )}

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {isVenipuncture && (
              <a
                href="#demos-gallery"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Watch All 5 Demos</span>
              </a>
            )}

            {project.links.liveUrl && !isVenipuncture && !project.links.liveUrl.includes("drive.google.com") && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-sm hover:scale-[1.02]"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Launch Live Application</span>
              </a>
            )}

            {project.links.demoVideoUrl && !isVenipuncture && (
              <a
                href={project.links.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-4 py-2.5 text-xs font-sans text-sky-900 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors shadow-2xs font-semibold"
              >
                <Play className="h-4 w-4 fill-sky-700 text-sky-700 dark:fill-sky-400 dark:text-sky-400" />
                <span>Watch Demonstration Video</span>
              </a>
            )}

            {project.links.githubUrl && (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 text-xs font-sans text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 transition-colors shadow-2xs font-semibold"
              >
                <GithubIcon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                <span>View Repository</span>
              </a>
            )}

            {project.links.pypiUrl && (
              <a
                href={project.links.pypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2.5 text-xs font-sans text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-2xs font-semibold"
              >
                <Package className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-bold mr-2">Technologies:</span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-white dark:bg-slate-800 backdrop-blur-sm px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* 2. Featured Demo & Visual Simulation Showcase */}
        <section className="mb-10">
          <ProjectVisualShowcase
            slug={project.slug}
            title={project.title}
            thumbnail={project.thumbnail}
            threeDType={getProject3DType(project.slug)}
            videoUrl={project.links.demoVideoUrl}
          />
        </section>

        {/* 3. Five-Video Gallery for Venipuncture VR */}
        {isVenipuncture && (
          <section className="mb-14">
            <ProjectVideoGallery />
          </section>
        )}

        {/* Disclaimer if present */}
        {project.caseStudy.disclaimer && (
          <div className="mb-10 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 p-4 text-xs font-mono text-amber-950 dark:text-amber-200 flex items-start gap-3 shadow-2xs font-medium">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>{project.caseStudy.disclaimer}</span>
          </div>
        )}

        {/* If not Venipuncture, render Problem Statement & Goals first */}
        {!isVenipuncture && (
          <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card bento-hairline rounded-2xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-3.5 text-slate-950 dark:text-white">
                <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200/80 dark:border-amber-800 flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="font-sans text-base font-bold text-slate-950 dark:text-white">Problem Statement</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
                {project.caseStudy.problemStatement}
              </p>
            </div>

            <div className="glass-card bento-hairline rounded-2xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-3.5 text-slate-950 dark:text-white">
                <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-center shrink-0">
                  <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="font-sans text-base font-bold text-slate-950 dark:text-white">Engineering Goals</h2>
              </div>
              <ul className="space-y-2.5">
                {project.caseStudy.engineeringGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 4. Overall System Architecture */}
        {project.architectureDiagram && (
          <section id="architecture" className="mb-14">
            <ProjectArchitecture
              architecture={project.architectureDiagram}
              title={`${project.title} — System Architecture`}
            />
          </section>
        )}

        {/* 5 through 10. Technical Deep Dives (VR, LM, RAG, Voice, Assessment, Backend) */}
        {isVenipuncture && (
          <section className="mb-14">
            <VenipunctureTechnicalDeepDive />
          </section>
        )}

        {/* 11. Technology Stack for Venipuncture */}
        {isVenipuncture && <VenipunctureTechStack />}

        {/* 12. End-to-end Workflow / Pipeline Steps */}
        {project.caseStudy.pipelineSteps && (
          <section id="workflow" className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                <Workflow className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                {isVenipuncture
                  ? "End-to-End Procedural Workflow & Mechanics"
                  : "Execution Pipeline & Mechanics"}
              </h2>
            </div>

            <div className="space-y-3.5">
              {project.caseStudy.pipelineSteps.map((step) => (
                <div
                  key={step.step}
                  className="glass-card bento-hairline rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <span className="h-8 w-8 rounded-xl bg-slate-950 dark:bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-slate-950 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 13. Engineering Challenges & Design Decisions */}
        <section id="tradeoffs" className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-md bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
              <Layers className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
              Engineering Challenges &amp; Design Decisions
            </h2>
          </div>

          {/* Problem Statement & Goals for Venipuncture */}
          {isVenipuncture && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card bento-hairline rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3 text-slate-950 dark:text-white">
                  <div className="h-6 w-6 rounded-md bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-sans text-sm font-bold text-slate-950 dark:text-white">Problem Statement</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
                  {project.caseStudy.problemStatement}
                </p>
              </div>

              <div className="glass-card bento-hairline rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3 text-slate-950 dark:text-white">
                  <div className="h-6 w-6 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                    <Target className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-sans text-sm font-bold text-slate-950 dark:text-white">Engineering Goals</h3>
                </div>
                <ul className="space-y-2">
                  {project.caseStudy.engineeringGoals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Technical Decisions & Trade-offs */}
          {project.caseStudy.technicalTradeoffs && project.caseStudy.technicalTradeoffs.length > 0 && (
            <div className="space-y-3.5 mb-6">
              {project.caseStudy.technicalTradeoffs.map((tradeoff, idx) => (
                <div
                  key={idx}
                  className="glass-card bento-hairline rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="font-sans text-sm sm:text-base font-bold text-slate-950 dark:text-white mb-2">
                    Decision: {tradeoff.decision}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm font-sans">
                    <p className="text-emerald-900 dark:text-emerald-300 leading-relaxed font-semibold bg-emerald-50/90 dark:bg-emerald-950/60 rounded-xl p-3 border border-emerald-200 dark:border-emerald-800">
                      <strong>Rationale:</strong> {tradeoff.rationale}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-1 font-medium">
                      <strong>Alternative Rejected:</strong> {tradeoff.alternativeRejected}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Implementation Highlights */}
          <div className="glass-card bento-hairline rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="font-sans text-sm font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 flex items-center justify-center">
                <Cpu className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              </div>
              <span>Core Architectural Highlights</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed mb-4 font-medium">
              {project.caseStudy.systemArchitecture}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.implementationHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 font-sans flex items-start gap-2.5 shadow-2xs font-medium"
                >
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">•</span>
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testing & Empirical Evaluation */}
        <section id="evaluation" className="mb-14 glass-card bento-hairline rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-6 w-6 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
              Testing &amp; Empirical Evaluation
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed mb-5 font-medium">
            {project.caseStudy.testingAndEvaluation.methodology}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {project.caseStudy.testingAndEvaluation.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-emerald-300/80 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/60 p-4 text-xs font-mono text-slate-900 dark:text-slate-200 shadow-2xs"
              >
                <div className="font-bold text-emerald-800 dark:text-emerald-300 text-xs mb-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>Result #{idx + 1}</span>
                </div>
                <div className="leading-relaxed font-semibold">{metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Reliability Defenses */}
        <section id="security" className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
              <ShieldAlert className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-sans text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
              Security &amp; Reliability Defenses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {project.caseStudy.securityReliability.map((sec, idx) => (
              <div
                key={idx}
                className="glass-card bento-hairline rounded-xl p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-200 font-sans flex items-start gap-2.5 shadow-2xs hover:shadow-xs transition-shadow font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{sec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Engineering Learnings */}
        <section className="mb-14 glass-card bento-hairline rounded-2xl p-6 sm:p-7 shadow-sm">
          <h2 className="font-sans text-base sm:text-lg font-bold text-slate-950 dark:text-white mb-3.5">
            Key Engineering Learnings
          </h2>
          <ul className="space-y-2.5">
            {project.caseStudy.keyLearnings.map((learning, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium"
              >
                <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">•</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 14. GitHub & Verified Project Resources */}
        {isVenipuncture && <VenipunctureResources />}

        {/* Local Deployment Commands */}
        {project.caseStudy.localDeploymentInstructions && (
          <section id="setup" className="mb-14">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="h-6 w-6 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="font-sans text-base font-bold text-slate-950 dark:text-white">
                Local Reproduction &amp; Setup Commands
              </h2>
            </div>
            <div className="space-y-2.5">
              {project.caseStudy.localDeploymentInstructions.map((cmd, idx) => (
                <CodeBlock key={idx} code={cmd} prefix="$" />
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Navigation - Modern Frosted Floating Cards */}
        <nav
          className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
          aria-label="Previous and Next Project"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start gap-1 text-left rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 hover:border-indigo-400 hover:shadow-md transition-all flex-1 max-w-sm"
          >
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-semibold">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous Project</span>
            </span>
            <span className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-sans transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1 text-right rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 hover:border-indigo-400 hover:shadow-md transition-all flex-1 max-w-sm"
          >
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-semibold">
              <span>Next Project</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-sans transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

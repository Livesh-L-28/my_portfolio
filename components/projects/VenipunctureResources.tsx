import React from "react";
import {
  FolderOpen,
  ExternalLink,
  ShieldCheck,
  HardDrive,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export const VenipunctureResources: React.FC = () => {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-2">
        <FolderOpen className="h-5 w-5 text-emerald-400" />
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
          Verified Project Resources & Artifacts
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
        Direct links to verified repositories, Google Drive multi-stream video recordings, model specifications, and clinical guidelines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* GitHub Repository Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white">
                <GithubIcon className="h-5 w-5" />
                <h3 className="font-sans text-sm font-bold">Source Code Repository</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                Verified
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
              Access the complete Unity 3D project scripts, C# procedural state machine, FastAPI backend services, PyTorch training scripts, and automated ReportLab evaluation engine.
            </p>
          </div>

          <a
            href="https://github.com/liveshl/venipuncture-vr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-mono text-zinc-200 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4" />
              <span>github.com/liveshl/venipuncture-vr</span>
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Simulation Demonstrations Suite Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white">
                <HardDrive className="h-5 w-5 text-sky-400" />
                <h3 className="font-sans text-sm font-bold">Integrated Simulation Suite</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-sky-500/30 bg-sky-500/10 text-sky-400">
                5 In-Page Demos
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
              All five high-resolution recordings (Medical LLM demo, full VR web walkthrough, test scenes with console telemetry, and training scene) are embedded directly in this case study.
            </p>
          </div>

          <a
            href="#demos-gallery"
            className="inline-flex items-center justify-between gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3.5 py-2 text-xs font-mono text-sky-300 hover:bg-sky-500/20 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-sky-400" />
              <span className="truncate">Explore All 5 Demos In-Page</span>
            </span>
          </a>
        </div>
      </div>

      {/* Clinical Standards Compliance Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
        <div className="flex items-center gap-2 mb-2 text-zinc-200">
          <BookOpen className="h-4 w-4 text-violet-400" />
          <h3 className="font-sans text-sm font-bold text-white">Clinical Standards & Guidelines Grounding</h3>
        </div>
        <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-3">
          All procedural steps, error triggers, question-answering vectors, and evaluation scoring models strictly conform to published clinical phlebotomy protocols:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded border border-zinc-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>CLSI GP41 (6th Ed.) Collection of Diagnostic Venous Specimens</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded border border-zinc-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>WHO Guidelines on Drawing Blood: Best Practices in Phlebotomy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

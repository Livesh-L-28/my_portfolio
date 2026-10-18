import Link from "next/link";
import { ArrowLeft, Terminal, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/05 blur-3xl pointer-events-none" />

      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 sm:p-12 max-w-lg w-full shadow-xl">
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs">
            <Terminal className="h-7 w-7" />
          </div>
        </div>

        <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 font-bold uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/80">
          HTTP 404 · Route Undefined
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          System Pathway Not Found
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          The requested route, paper, or project slug does not exist in the active portfolio registry.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 dark:bg-indigo-600 px-5 py-2.5 text-xs font-mono font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-white transition-all shadow-xs cursor-pointer"
          >
            <FolderGit2 className="h-4 w-4 text-indigo-500" />
            <span>Browse 10 Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

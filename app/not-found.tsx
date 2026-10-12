import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-violet-500/20 bg-[#0C1022] p-8 sm:p-12 max-w-lg w-full shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
            <Terminal className="h-6 w-6" />
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
          HTTP 404 · Resource Not Found
        </span>

        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-sans">
          Route Undefined
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          The requested system pathway or case study does not exist in the project registry.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-mono font-medium text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

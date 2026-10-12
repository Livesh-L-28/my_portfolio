"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  prefix?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "bash",
  prefix = "$",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback if clipboard fails
    }
  };

  return (
    <div
      className={`group relative flex items-center justify-between rounded-lg border border-violet-500/20 bg-[#0B0F1C] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-slate-300 transition-all hover:border-violet-500/40 ${className}`}
    >
      <div className="flex items-center gap-2.5 overflow-x-auto pr-3 scrollbar-none">
        <Terminal className="h-4 w-4 shrink-0 text-violet-400" />
        {prefix && <span className="select-none text-slate-500">{prefix}</span>}
        <code className="text-violet-200 select-all whitespace-nowrap">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy command to clipboard"}
        className="shrink-0 flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-sans text-xs">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-400 font-sans text-xs">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

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
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setCopyFailed(false);
        setTimeout(() => setCopied(false), 2200);
      } else {
        // Fallback for older browsers / non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setCopyFailed(false);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      setCopyFailed(true);
      setCopied(false);
      setTimeout(() => setCopyFailed(false), 3000);
    }
  };

  return (
    <div
      data-language={language}
      className={`group relative flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-3.5 py-2 font-mono text-xs text-slate-800 dark:text-slate-200 transition-colors hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2.5 overflow-x-auto pr-3 scrollbar-none">
        <Terminal className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400" />
        {prefix && <span className="select-none text-slate-400 dark:text-slate-500 font-bold">{prefix}</span>}
        <code className="text-slate-950 dark:text-slate-100 select-all whitespace-nowrap font-semibold">{code}</code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : copyFailed ? "Copy failed" : `Copy ${code} to clipboard`}
        className="shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer shadow-xs"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">Copied</span>
          </>
        ) : copyFailed ? (
          <span className="text-rose-600 dark:text-rose-400 font-bold text-[11px]">Failed</span>
        ) : (
          <>
            <Copy className="h-3 w-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold text-[11px]">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

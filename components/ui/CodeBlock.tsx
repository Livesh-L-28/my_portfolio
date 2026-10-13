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
      className={`group relative flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700 ${className}`}
    >
      <div className="flex items-center gap-2.5 overflow-x-auto pr-3 scrollbar-none">
        <Terminal className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
        {prefix && <span className="select-none text-zinc-500">{prefix}</span>}
        <code className="text-zinc-200 select-all whitespace-nowrap">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy command to clipboard"}
        className="shrink-0 flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-400" />
            <span className="text-emerald-400 text-[11px]">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-zinc-400" />
            <span className="text-zinc-400 text-[11px]">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

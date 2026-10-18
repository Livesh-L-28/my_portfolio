"use client";

import React, { useState } from "react";
import { ArchitectureFlow, ArchitectureNode } from "@/lib/types";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";

interface ProjectArchitectureProps {
  architecture: ArchitectureFlow;
  title?: string;
}

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({
  architecture,
  title = "System Architecture & Execution Pipeline",
}) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(
    architecture.nodes[0]
  );

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 font-bold">
              Verified Pipeline
            </span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-sans font-medium">
            Select any pipeline stage below to inspect verified engineering details.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
          <Info className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{architecture.nodes.length} Stages</span>
        </div>
      </div>

      {/* Horizontal Flow Diagram for Mobile & Desktop */}
      <div className="overflow-x-auto pb-4 pt-1 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {architecture.nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isLast = index === architecture.nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer min-w-[170px] ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/50 ring-2 ring-indigo-500 text-slate-950 dark:text-white shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {node.role}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white font-sans">
                    {node.label}
                  </h4>
                  <p className={`text-[10px] font-mono mt-1 line-clamp-1 ${isSelected ? "text-indigo-800 dark:text-indigo-300 font-semibold" : "text-slate-600 dark:text-slate-400"}`}>
                    {node.tech}
                  </p>
                </button>

                {!isLast && (
                  <div className="flex items-center justify-center text-slate-400 dark:text-slate-600 px-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Detail Card */}
      {selectedNode && (
        <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white font-sans">
                Stage: {selectedNode.label}
              </h4>
              <span className="text-[11px] font-mono text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-medium">
                Role: {selectedNode.role}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
              Stack: <strong className="text-slate-950 dark:text-white font-bold">{selectedNode.tech}</strong>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
            {selectedNode.description}
          </p>
        </div>
      )}
    </div>
  );
};

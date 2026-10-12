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
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-700 text-zinc-300 bg-zinc-800">
              Verified Pipeline
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 font-sans">
            Select any pipeline stage below to inspect verified engineering details.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <Info className="h-3.5 w-3.5 text-zinc-400" />
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
                  className={`group relative flex flex-col items-start rounded-lg border p-3 text-left transition-all cursor-pointer min-w-[170px] ${
                    isSelected
                      ? "border-zinc-500 bg-zinc-800 ring-1 ring-zinc-500 text-white"
                      : "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {node.role}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans">
                    {node.label}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400 mt-1 line-clamp-1">
                    {node.tech}
                  </p>
                </button>

                {!isLast && (
                  <div className="flex items-center justify-center text-zinc-600 px-0.5">
                    <ArrowRight className="h-4 w-4 text-zinc-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Detail Card */}
      {selectedNode && (
        <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm sm:text-base font-bold text-white font-sans">
                Stage: {selectedNode.label}
              </h4>
              <span className="text-[11px] font-mono text-zinc-300 border border-zinc-700 bg-zinc-800 px-2 py-0.5 rounded">
                Role: {selectedNode.role}
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Stack: <strong className="text-zinc-200">{selectedNode.tech}</strong>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {selectedNode.description}
          </p>
        </div>
      )}
    </div>
  );
};

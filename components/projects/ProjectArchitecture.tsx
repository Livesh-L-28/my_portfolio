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
  title = "Interactive System Architecture",
}) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(
    architecture.nodes[0]
  );

  return (
    <div className="w-full rounded-2xl border border-violet-500/20 bg-[#090D1A] p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
              Verified Pipeline
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select any pipeline stage below to inspect verified engineering details.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Info className="h-3.5 w-3.5 text-violet-400" />
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
                  className={`group relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 min-w-[170px] ${
                    isSelected
                      ? "border-violet-400 bg-violet-950/40 shadow-lg shadow-violet-500/20 ring-1 ring-violet-400/40"
                      : "border-white/[0.08] bg-[#0E1324] hover:border-violet-500/30 hover:bg-[#11172C]"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono text-violet-400 font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-violet-500/30 text-violet-200"
                          : "bg-white/[0.04] text-slate-400"
                      }`}
                    >
                      {node.role}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors font-sans">
                    {node.label}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">
                    {node.tech}
                  </p>
                </button>

                {!isLast && (
                  <div className="flex items-center justify-center text-slate-600 px-0.5">
                    <ArrowRight className="h-4 w-4 text-violet-500/50" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Detail Card */}
      {selectedNode && (
        <div className="mt-4 rounded-xl border border-violet-500/30 bg-[#0E1428] p-4.5 sm:p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm sm:text-base font-bold text-white">
                Stage: {selectedNode.label}
              </h4>
              <span className="text-xs font-mono text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded">
                Role: {selectedNode.role}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-300">
              Stack: <strong className="text-violet-300">{selectedNode.tech}</strong>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {selectedNode.description}
          </p>
        </div>
      )}
    </div>
  );
};

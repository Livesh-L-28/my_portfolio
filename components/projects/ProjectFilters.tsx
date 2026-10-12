"use client";

import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { ProjectCategory } from "@/lib/types";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: "featured" | "tests" | "name";
  onSortChange: (sort: "featured" | "tests" | "name") => void;
  totalCount: number;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by technology, keyword, or title..."
            className="w-full rounded-xl border border-violet-500/20 bg-[#0B0F1D] pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500 font-sans transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort and Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
          <span className="text-slate-400">
            Showing <strong className="text-violet-300">{totalCount}</strong> projects
          </span>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0B0F1D] px-2.5 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "featured" | "tests" | "name")}
              aria-label="Sort projects"
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#0B0F1D] text-slate-200">
                Featured First
              </option>
              <option value="tests" className="bg-[#0B0F1D] text-slate-200">
                Most Tests / Rigor
              </option>
              <option value="name" className="bg-[#0B0F1D] text-slate-200">
                Alphabetical (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Slider / Wrap */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category as ProjectCategory)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-mono transition-all select-none ${
                isActive
                  ? "bg-violet-600 text-white font-semibold shadow-md shadow-violet-500/20 border border-violet-400/40"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-slate-200"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

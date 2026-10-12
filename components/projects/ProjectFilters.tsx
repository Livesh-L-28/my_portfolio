"use client";

import React from "react";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";
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
      {/* Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, technology (e.g. pgvector, PyTorch), or keyword..."
            className="w-full rounded-xl border border-slate-800 bg-[#0d121f]/80 backdrop-blur-md pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Counter and Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-sans">
          <span className="text-slate-400">
            Showing <strong className="text-cyan-300 font-mono">{totalCount}</strong> projects
          </span>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-[#0d121f]/80 backdrop-blur-md px-3 py-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "featured" | "tests" | "name")}
              aria-label="Sort projects"
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs font-mono"
            >
              <option value="featured" className="bg-slate-900 text-slate-200">
                Featured Systems First
              </option>
              <option value="tests" className="bg-slate-900 text-slate-200">
                Most Tests / Verified Rigor
              </option>
              <option value="name" className="bg-slate-900 text-slate-200">
                Alphabetical (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category as ProjectCategory)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-[#0d121f]/70 text-slate-400 border border-slate-800/80 hover:bg-slate-800/80 hover:text-white"
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

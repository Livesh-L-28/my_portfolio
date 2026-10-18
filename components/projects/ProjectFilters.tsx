"use client";

import React from "react";
import { Search, X, SlidersHorizontal, List, LayoutGrid } from "lucide-react";
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
  viewMode?: "showcase" | "grid";
  onViewModeChange?: (mode: "showcase" | "grid") => void;
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
  viewMode = "showcase",
  onViewModeChange,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, technology, or keywords..."
            className="h-11 w-full rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md pl-10 pr-9 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-sans shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Counter, Sort Control, and View Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 text-xs font-sans">
          <span className="text-slate-800 dark:text-slate-200 font-mono text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold hidden sm:inline-block">
            {totalCount} {totalCount === 1 ? "project" : "projects"}
          </span>

          {/* View Mode Toggle Pill */}
          {onViewModeChange && (
            <div className="flex h-11 items-center p-1 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-xs">
              <button
                type="button"
                onClick={() => onViewModeChange("showcase")}
                aria-label="Showcase One-by-One View"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  viewMode === "showcase"
                    ? "bg-slate-950 dark:bg-indigo-600 text-white shadow-xs font-bold"
                    : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-semibold"
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden md:inline">1-by-1</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                aria-label="Compact Grid View"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-950 dark:bg-indigo-600 text-white shadow-xs font-bold"
                    : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white font-semibold"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Grid</span>
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 shadow-xs hover:border-slate-400 dark:hover:border-slate-700 transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "featured" | "tests" | "name")}
              aria-label="Sort projects"
              className="bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer text-xs font-sans font-bold"
            >
              <option value="featured" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100">
                Featured First
              </option>
              <option value="tests" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100">
                Most Tests / Rigor
              </option>
              <option value="name" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100">
                Alphabetical (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category as ProjectCategory)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-mono transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-slate-950 text-white font-semibold shadow-md shadow-slate-950/20 ring-1 ring-white/10 scale-[1.02]"
                  : "bg-white dark:bg-slate-800 backdrop-blur-md text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 hover:bg-slate-50 font-medium shadow-2xs"
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

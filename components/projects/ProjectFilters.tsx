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
      {/* Search Bar & Sort Dropdown - Perfectly Aligned */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, technology, or keywords..."
            className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-9 pr-8 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Counter and Sort Control */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-sans">
          <span className="text-zinc-400 font-mono text-xs">
            {totalCount} {totalCount === 1 ? "project" : "projects"}
          </span>

          <div className="flex h-10 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "featured" | "tests" | "name")}
              aria-label="Sort projects"
              className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer text-xs font-sans"
            >
              <option value="featured" className="bg-zinc-900 text-zinc-200">
                Featured First
              </option>
              <option value="tests" className="bg-zinc-900 text-zinc-200">
                Most Tests / Rigor
              </option>
              <option value="name" className="bg-zinc-900 text-zinc-200">
                Alphabetical (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category as ProjectCategory)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer select-none ${
                isActive
                  ? "bg-zinc-100 text-zinc-950 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
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

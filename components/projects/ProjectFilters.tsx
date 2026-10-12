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
      {/* Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, technology (e.g. pgvector, PyTorch), or keyword..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Counter and Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-sans">
          <span className="text-zinc-400">
            Showing <strong className="text-white font-mono">{totalCount}</strong> projects
          </span>

          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "featured" | "tests" | "name")}
              aria-label="Sort projects"
              className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
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
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-mono transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-semibold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
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

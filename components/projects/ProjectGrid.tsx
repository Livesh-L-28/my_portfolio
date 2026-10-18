"use client";

import React, { useState, useMemo } from "react";
import { PROJECTS, getAllProjectCategories } from "@/data/projects";
import { ProjectCategory, ProjectData } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { VideoModal } from "@/components/projects/VideoModal";
import { SearchX } from "lucide-react";

interface ProjectGridProps {
  initialCategory?: ProjectCategory;
  limit?: number;
  showFilters?: boolean;
  excludePyPIOnly?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  initialCategory = "All Projects",
  limit,
  showFilters = true,
  excludePyPIOnly = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "tests" | "name">("featured");
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>();
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>("");
  const [videoTriggerRef, setVideoTriggerRef] = useState<React.RefObject<HTMLElement | null> | undefined>();

  const handleOpenVideo = (
    url: string,
    title: string,
    triggerRef: React.RefObject<HTMLElement | null>
  ) => {
    setCurrentVideoUrl(url);
    setCurrentVideoTitle(title);
    setVideoTriggerRef(triggerRef);
    setVideoModalOpen(true);
  };

  const categories = useMemo(() => getAllProjectCategories(), []);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...PROJECTS];

    // Exclude PyPI-only packages if requested (e.g. for homepage flagship systems section)
    if (excludePyPIOnly) {
      result = result.filter((p) => !p.pypiOnly);
    }

    // Filter by category
    if (activeCategory !== "All Projects") {
      result = result.filter(
        (p) =>
          p.category === activeCategory ||
          p.categories?.includes(activeCategory as ProjectCategory) ||
          (activeCategory === "Published Packages (PyPI)" && (p.pypiOnly || Boolean(p.links.pypiUrl)))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.fullName.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(q)) ||
          p.keyAchievement.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === "tests") {
      const getTestScore = (p: ProjectData) => {
        if (p.id === "llmfirewall-core") return 608;
        if (p.id === "aireliability") return 362;
        if (p.id === "nexarag") return 321;
        if (p.id === "venipuncture-vr") return 120;
        return 0;
      };
      result.sort((a, b) => getTestScore(b) - getTestScore(a));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (limit) {
      return result.slice(0, limit);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, limit, excludePyPIOnly]);

  return (
    <div className="w-full">
      {showFilters && (
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredProjects.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      {/* Project Cards (Showcase 1-by-1 or Compact Grid) */}
      {filteredProjects.length > 0 ? (
        viewMode === "showcase" ? (
          <div className="flex flex-col gap-8 sm:gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                compact={false}
                onOpenVideo={handleOpenVideo}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                compact={true}
                onOpenVideo={handleOpenVideo}
              />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <SearchX className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <h4 className="text-base font-semibold text-slate-900">No projects found</h4>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            No projects matched your search criteria for &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Projects");
            }}
            className="mt-4 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-mono text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Reusable Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
        title={currentVideoTitle}
        triggerRef={videoTriggerRef}
      />
    </div>
  );
};

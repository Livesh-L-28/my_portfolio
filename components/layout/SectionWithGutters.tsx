"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionWithGuttersProps {
  id?: string;
  className?: string;
  leftIllustration?: React.ReactNode;
  rightIllustration?: React.ReactNode;
  children: React.ReactNode;
  stickyTopClass?: string;
}

export const SectionWithGutters: React.FC<SectionWithGuttersProps> = ({
  id,
  className,
  leftIllustration,
  rightIllustration,
  children,
  stickyTopClass = "top-24",
}) => {
  const hasLeft = Boolean(leftIllustration);
  const hasRight = Boolean(rightIllustration);

  return (
    <div id={id} className={cn("relative w-full overflow-visible", className)}>
      <div className="w-full max-w-[1660px] mx-auto px-2 sm:px-4 lg:px-6 2xl:px-8">
        <div className="flex justify-center items-start gap-3 xl:gap-5 2xl:gap-7">
          {/* Left Gutter: Only rendered if left has illustration, or as balancer if right has one */}
          {hasLeft ? (
            <aside
              className={cn(
                "hidden xl:flex flex-col items-end w-[240px] 2xl:w-[275px] shrink-0 z-20 select-none sticky pt-4 pb-12",
                stickyTopClass
              )}
              aria-label="Edge technical illustration - left gutter"
            >
              <div className="w-full flex justify-end">
                {leftIllustration}
              </div>
            </aside>
          ) : hasRight ? (
            <div
              className="hidden xl:block w-[240px] 2xl:w-[275px] shrink-0 pointer-events-none"
              aria-hidden="true"
            />
          ) : null}

          {/* Central Content Column: Unobstructed, high-craft, fully readable */}
          <div className="w-full max-w-4xl 2xl:max-w-5xl min-w-0">
            {children}
          </div>

          {/* Right Gutter: Only rendered if right has illustration, or as balancer if left has one */}
          {hasRight ? (
            <aside
              className={cn(
                "hidden xl:flex flex-col items-start w-[240px] 2xl:w-[275px] shrink-0 z-20 select-none sticky pt-4 pb-12",
                stickyTopClass
              )}
              aria-label="Edge technical illustration - right gutter"
            >
              <div className="w-full flex justify-start">
                {rightIllustration}
              </div>
            </aside>
          ) : hasLeft ? (
            <div
              className="hidden xl:block w-[240px] 2xl:w-[275px] shrink-0 pointer-events-none"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showStatus?: boolean;
  src?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = "md",
  className = "",
  showStatus = true,
  src,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs rounded-lg",
    md: "h-10 w-10 text-xs rounded-xl",
    lg: "h-14 w-14 text-sm rounded-xl",
    xl: "h-20 w-20 text-base rounded-2xl",
  };

  const statusDotSizes = {
    sm: "h-2 w-2 ring-1",
    md: "h-2.5 w-2.5 ring-2",
    lg: "h-3 w-3 ring-2",
    xl: "h-3.5 w-3.5 ring-2",
  };

  const hasValidImage = Boolean(src && !imgError);

  return (
    <div
      className={`relative shrink-0 select-none ${sizeClasses[size]} ${className}`}
    >
      {hasValidImage ? (
        <div className="relative h-full w-full overflow-hidden rounded-inherit border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={src!}
            alt="Livesh L"
            fill
            sizes={size === "sm" ? "32px" : size === "md" ? "40px" : "64px"}
            className="object-cover object-top"
            onError={() => setImgError(true)}
            priority
          />
        </div>
      ) : (
        /* Executive High-Craft Developer Monogram */
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-inherit border border-indigo-200 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)]">
          {/* Subtle tech grid background accent */}
          <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

          {/* Monogram Typography */}
          <span className="relative z-10 font-mono font-bold tracking-tight text-indigo-900 drop-shadow-xs">
            LL
          </span>
        </div>
      )}

      {/* Live availability indicator */}
      {showStatus && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-500 ring-white ${statusDotSizes[size]} shadow-xs`}
          title="Available for AI Engineering"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
        </span>
      )}
    </div>
  );
};

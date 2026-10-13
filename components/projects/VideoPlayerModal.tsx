"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ExternalLink, AlertCircle, Loader2, Play, HardDrive, ShieldCheck } from "lucide-react";
import { VenipunctureDemo } from "@/data/venipuncture-demos";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  demo: VenipunctureDemo | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  demo,
  triggerRef,
}) => {
  if (!isOpen || !demo) return null;

  return (
    <VideoPlayerDialog
      key={demo.id}
      demo={demo}
      onClose={onClose}
      triggerRef={triggerRef}
    />
  );
};

interface VideoPlayerDialogProps {
  demo: VenipunctureDemo;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const VideoPlayerDialog: React.FC<VideoPlayerDialogProps> = ({
  demo,
  onClose,
  triggerRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Manage Escape key, focus lock, and background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const triggerElement = triggerRef?.current;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus to the trigger button that launched the modal
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [onClose, triggerRef]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950 shadow-2xl focus:outline-none flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 sm:px-6 py-3.5 bg-zinc-900/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  {demo.demoNumber}
                </span>
                <span className="text-zinc-600 font-mono text-xs">·</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${demo.badgeStyle.bg} ${demo.badgeStyle.text} ${demo.badgeStyle.border}`}
                >
                  {demo.category}
                </span>
              </div>
              <h2
                id="video-modal-title"
                className="font-sans text-sm sm:text-base font-bold text-white tracking-tight truncate mt-0.5"
              >
                {demo.title}
              </h2>
            </div>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close video player"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {/* Loading Indicator */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-4 text-center">
              <Loader2 className="h-9 w-9 text-sky-400 animate-spin mb-3" />
              <p className="text-sm font-sans font-medium text-white">
                Initializing Demonstration Video Stream
              </p>
              <p className="text-xs font-mono text-zinc-400 mt-1 max-w-sm">
                Streaming directly from Google Drive ({demo.fileSize} · {demo.format})
              </p>
            </div>
          )}

          {/* Error / Fallback State */}
          {hasError ? (
            <div className="p-8 text-center max-w-md z-20">
              <AlertCircle className="mx-auto h-10 w-10 mb-3 text-amber-400" />
              <h3 className="font-sans text-base font-semibold text-white">
                Embedded Player Restricted by Browser Security
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 font-sans leading-relaxed">
                Your browser or network policy blocked third-party Google Drive frame embeds. You can watch the full verified recording directly on Google Drive.
              </p>
              <a
                href={demo.directDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Watch Directly on Google Drive ({demo.fileSize})</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <iframe
              src={demo.embedUrl}
              title={`${demo.title} — Google Drive Demonstration Player`}
              className={`w-full h-full border-0 transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>

        {/* Footer Meta Bar */}
        <div className="border-t border-zinc-800/80 px-4 sm:px-6 py-3 bg-zinc-900/60 flex items-center justify-between gap-3 text-xs font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <HardDrive className="h-3.5 w-3.5 text-zinc-400" />
              <span className="truncate">{demo.filename}</span>
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-semibold">{demo.fileSize}</span>
            <span className="text-zinc-600">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>In-Page Simulation Stream</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

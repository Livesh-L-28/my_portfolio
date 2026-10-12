"use client";

import React, { useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";
import { getEmbeddableVideoUrl } from "@/lib/links";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  triggerRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Manage Escape key and focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";

      // Pause playback if direct video
      if (videoElementRef.current) {
        videoElementRef.current.pause();
      }

      // Restore focus to trigger
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const parsedVideo = getEmbeddableVideoUrl(videoUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-violet-500/30 bg-[#0B0F1C] shadow-2xl shadow-violet-500/10 focus:outline-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-[#080C16]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse" />
            <h2
              id="video-modal-title"
              className="font-sans text-sm sm:text-base font-semibold text-white tracking-tight"
            >
              {title} — Demo Walkthrough
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close demo video modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {parsedVideo.type === "direct" ? (
            <video
              ref={videoElementRef}
              src={parsedVideo.url}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : parsedVideo.type === "embed" ? (
            <iframe
              src={parsedVideo.url}
              title={`${title} demo player`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <AlertCircle className="h-10 w-10 text-amber-400 mb-2" />
              <p className="text-sm font-medium text-slate-300">Demo video unavailable</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                The demonstration recording for this project has not been published or the path is invalid.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#070A14] px-5 py-2.5 text-xs font-mono text-slate-400">
          <span>In-Portfolio Demo Player · Native playback</span>
          <span className="hidden sm:inline">Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};

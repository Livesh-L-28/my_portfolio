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
    const videoEl = videoElementRef.current;
    const triggerEl = triggerRef?.current;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";

      // Pause playback if direct video
      if (videoEl) {
        videoEl.pause();
      }

      // Restore focus to trigger
      if (triggerEl) {
        triggerEl.focus();
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
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl focus:outline-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <h2
              id="video-modal-title"
              className="font-sans text-sm sm:text-base font-semibold text-slate-900 tracking-tight"
            >
              {title} — Demonstration Video
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close demo video modal"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
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
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <AlertCircle className="h-10 w-10 text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-800">Demo video unavailable</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                The demonstration recording for this project has not been published or the path is invalid.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-mono text-slate-600">
          <span>In-Portfolio Demo Player · Native playback</span>
          <span className="hidden sm:inline">Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};

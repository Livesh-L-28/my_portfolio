"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X, Sparkles } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { toggleSound, playClickSound, playThemeSwitchSound } from "@/lib/sound";

export const KeyboardShortcutsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    let lastKey = "";
    let lastKeyTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Check ? or Shift + /
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        playClickSound();
        setIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Quick hotkeys: T (Theme), M (Mute/Sound)
      if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !isOpen) {
        e.preventDefault();
        playThemeSwitchSound();
        toggleTheme();
        return;
      }

      if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey && !isOpen) {
        e.preventDefault();
        toggleSound();
        return;
      }

      // 2-key sequences: G then H, P, A, S, E, C
      const now = Date.now();
      if (e.key.toLowerCase() === "g") {
        lastKey = "g";
        lastKeyTime = now;
        return;
      }

      if (lastKey === "g" && now - lastKeyTime < 1000) {
        const next = e.key.toLowerCase();
        lastKey = "";
        if (next === "h") {
          playClickSound();
          router.push("/#");
        } else if (next === "p") {
          playClickSound();
          router.push("/#projects");
        } else if (next === "o") {
          playClickSound();
          router.push("/#packages");
        } else if (next === "a") {
          playClickSound();
          router.push("/#architecture");
        } else if (next === "s") {
          playClickSound();
          router.push("/#security");
        } else if (next === "e") {
          playClickSound();
          router.push("/#experience");
        } else if (next === "c") {
          playClickSound();
          router.push("/#contact");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, router, toggleTheme]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-2xl z-10 space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Keyboard className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 dark:text-white text-sm">
                    Keyboard Navigation HUD
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    Pro-mode quick access
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                aria-label="Close HUD"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shortcuts Grid */}
            <div className="space-y-4 text-xs font-mono">
              {/* Navigation Sequence */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Navigation Sequences
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Projects</span>
                    <div className="flex items-center gap-1">
                      <span className="keycap text-[9px]">G</span>
                      <span className="keycap text-[9px]">P</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>PyPI Packages</span>
                    <div className="flex items-center gap-1">
                      <span className="keycap text-[9px]">G</span>
                      <span className="keycap text-[9px]">O</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Architecture</span>
                    <div className="flex items-center gap-1">
                      <span className="keycap text-[9px]">G</span>
                      <span className="keycap text-[9px]">A</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Playground</span>
                    <div className="flex items-center gap-1">
                      <span className="keycap text-[9px]">G</span>
                      <span className="keycap text-[9px]">S</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Contact</span>
                    <div className="flex items-center gap-1">
                      <span className="keycap text-[9px]">G</span>
                      <span className="keycap text-[9px]">C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Quick Actions */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Global Quick Actions
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Command / AI</span>
                    <span className="keycap text-[9px]">⌘K</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Theme Toggle</span>
                    <span className="keycap text-[9px]">T</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Sound Effects</span>
                    <span className="keycap text-[9px]">M</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span>Show Shortcuts</span>
                    <span className="keycap text-[9px]">?</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                <Sparkles className="h-3 w-3" />
                <span>Zero Latency Controls</span>
              </span>
              <span className="keycap text-[9px]">ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

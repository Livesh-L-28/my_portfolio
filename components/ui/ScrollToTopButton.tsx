"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-slate-300/90 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-xl shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
    >
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

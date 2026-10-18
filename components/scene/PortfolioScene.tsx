"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { SceneController } from "./SceneController";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/components/theme/ThemeProvider";
import { checkWebGLSupport } from "@/lib/utils/webgl";

const emptySubscribe = () => () => {};

export const PortfolioScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const webGlSupported = useSyncExternalStore(emptySubscribe, checkWebGLSupport, () => true);

  const { smoothProgress } = useScrollProgress();
  const { theme } = useTheme();

  // Initialize WebGL SceneController
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !checkWebGLSupport()) return;

    const isInitialDark = document.documentElement.classList.contains("dark");
    const controller = new SceneController(canvas, isInitialDark);
    controllerRef.current = controller;

    // Initialize controller and sync initial route
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
    controller.setRoute(currentPath);

    return () => {
      controller.dispose();
      controllerRef.current = null;
    };
  }, []);

  // Reactively sync route changes to 3D environment transitions
  useEffect(() => {
    if (controllerRef.current && pathname) {
      controllerRef.current.setRoute(pathname);
    }
  }, [pathname]);

  // Sync scroll progress to 3D scene (active on homepage)
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setProgress(smoothProgress);
    }
  }, [smoothProgress]);

  // Sync theme changes
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setTheme(theme === "dark");
    }
  }, [theme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          mounted && webGlSupported ? "opacity-75 dark:opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: "none" }}
      />
      {mounted && !webGlSupported && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-[#06070B] dark:via-[#0D1018] dark:to-[#06070B] opacity-80" />
      )}
    </div>
  );
};



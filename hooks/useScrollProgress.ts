"use client";

import { useEffect, useState, useRef } from "react";
import { SCENE_CONFIG, WorldDefinition } from "@/lib/scene/sceneConfig";

export interface ScrollProgressState {
  rawProgress: number;
  smoothProgress: number;
  currentWorldIndex: number;
  currentWorld: WorldDefinition;
  worldProgress: number; // 0 to 1 inside current world
  direction: "down" | "up" | "idle";
}

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    rawProgress: 0,
    smoothProgress: 0,
    currentWorldIndex: 0,
    currentWorld: SCENE_CONFIG.worlds[0],
    worldProgress: 0,
    direction: "idle",
  });

  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const maxScroll = Math.max(docHeight, 1);
      const raw = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      rawProgressRef.current = raw;
      lastScrollYRef.current = scrollY;
    };

    // Calculate initial
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lerp smoothProgress toward rawProgress
      const diff = rawProgressRef.current - smoothProgressRef.current;
      smoothProgressRef.current += diff * (1 - Math.exp(-12 * delta));

      const sp = smoothProgressRef.current;

      // Determine active world
      let worldIdx = 0;
      for (let i = 0; i < SCENE_CONFIG.worlds.length; i++) {
        const w = SCENE_CONFIG.worlds[i];
        if (sp >= w.startProgress && sp <= w.endProgress) {
          worldIdx = i;
          break;
        }
        if (i === SCENE_CONFIG.worlds.length - 1 && sp >= w.endProgress) {
          worldIdx = i;
        }
      }

      const activeWorld = SCENE_CONFIG.worlds[worldIdx];
      const worldSpan = Math.max(
        activeWorld.endProgress - activeWorld.startProgress,
        0.001
      );
      const localProgress = Math.min(
        Math.max((sp - activeWorld.startProgress) / worldSpan, 0),
        1
      );

      const direction: "down" | "up" | "idle" =
        Math.abs(diff) < 0.0001
          ? "idle"
          : diff > 0
          ? "down"
          : "up";

      setState({
        rawProgress: rawProgressRef.current,
        smoothProgress: sp,
        currentWorldIndex: worldIdx,
        currentWorld: activeWorld,
        worldProgress: localProgress,
        direction,
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return state;
}

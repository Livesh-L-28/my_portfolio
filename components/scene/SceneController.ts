import * as THREE from "three";
import { ODYSSEY_CHAPTERS } from "@/lib/scene/odysseyConfig";
import { CharacterVisualGuide } from "@/lib/scene/characterModel";
import { ComputationalWorld } from "@/lib/scene/computationalWorld";

interface ProjectThemeConfig {
  keyColor: number;
  accentColor: number;
  wireColor: number;
  speed: number;
  particleSize: number;
}

const PROJECT_THEMES: Record<string, ProjectThemeConfig> = {
  nexarag: {
    keyColor: 0x06b6d4, // Cyan
    accentColor: 0x6366f1, // Indigo
    wireColor: 0x38bdf8,
    speed: 1.1,
    particleSize: 0.05,
  },
  "venipuncture-vr": {
    keyColor: 0x0284c7, // Clinical Sky
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0x38bdf8,
    speed: 0.9,
    particleSize: 0.045,
  },
  "llmfirewall-core": {
    keyColor: 0x8b5cf6, // Purple
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0xa855f7,
    speed: 1.3,
    particleSize: 0.05,
  },
  aireliability: {
    keyColor: 0x10b981, // Emerald
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0x34d399,
    speed: 1.2,
    particleSize: 0.05,
  },
  "aegis-framework": {
    keyColor: 0x536dff, // Electric Cobalt
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0x818cf8,
    speed: 1.15,
    particleSize: 0.055,
  },
  "fastapi-cicd-lab": {
    keyColor: 0x10b981, // Emerald
    accentColor: 0x3b82f6, // Blue
    wireColor: 0x6ee7b7,
    speed: 1.25,
    particleSize: 0.045,
  },
  "stock-price-prediction": {
    keyColor: 0x10b981, // Green
    accentColor: 0x6366f1, // Indigo
    wireColor: 0x34d399,
    speed: 1.0,
    particleSize: 0.045,
  },
  "skill-ascend": {
    keyColor: 0xf59e0b, // Amber
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0xfbbf24,
    speed: 1.0,
    particleSize: 0.05,
  },
  "ai-visual-memory": {
    keyColor: 0x3b82f6, // Blue
    accentColor: 0x06b6d4, // Cyan
    wireColor: 0x60a5fa,
    speed: 1.05,
    particleSize: 0.05,
  },
  leviathan: {
    keyColor: 0x06b6d4, // Cyan
    accentColor: 0x10b981, // Emerald
    wireColor: 0x22d3ee,
    speed: 1.2,
    particleSize: 0.05,
  },
};

const DEFAULT_THEME: ProjectThemeConfig = {
  keyColor: 0x38bdf8, // Sky / Cobalt
  accentColor: 0x6366f1, // Indigo
  wireColor: 0x8b5cf6, // Violet
  speed: 1.0,
  particleSize: 0.05,
};

export class SceneController {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Cinematic Lighting Rig
  private ambientLight: THREE.AmbientLight;
  private keyLight: THREE.PointLight;
  private fillLight: THREE.PointLight;
  private rimLight: THREE.PointLight;

  // The AI Engineering Odyssey Components
  private computationalWorld: ComputationalWorld;
  private character: CharacterVisualGuide;

  // Background subtle star dust for cosmic computational depth
  private starDust: THREE.Points;

  // Dynamic Navigation & Animation State
  private animFrameId: number | null = null;
  private isDestroyed = false;
  private lastTime = 0;
  private currentProgress = 0;
  private targetProgress = 0;
  private lastProgress = 0;
  private scrollVelocity = 0;
  private isStationaryTimer = 0;
  private pointerX = 0;
  private pointerY = 0;
  private targetPointerX = 0;
  private targetPointerY = 0;
  private isDark = true;
  private isReducedMotion = false;
  private currentRoute = "/";
  private isProjectPage = false;

  private targetTheme: ProjectThemeConfig = DEFAULT_THEME;

  constructor(canvas: HTMLCanvasElement, isDark: boolean = true) {
    this.canvas = canvas;
    this.isDark = isDark;
    this.lastTime = performance.now();

    if (typeof window !== "undefined") {
      this.isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    // 1. Scene & Camera Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(isDark ? 0x05070e : 0xf1f5f9, 0.045);

    const width = window.innerWidth || 1280;
    const height = window.innerHeight || 800;
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    this.camera.position.set(0, 1.4, 6.8);

    // 2. High-Performance WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = isDark ? 1.15 : 1.0;

    // 3. Studio Lighting Rig
    this.ambientLight = new THREE.AmbientLight(
      isDark ? 0x0a0f1d : 0xf8fafc,
      isDark ? 2.0 : 2.8
    );
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.PointLight(DEFAULT_THEME.keyColor, 4.0, 30);
    this.keyLight.position.set(4, 5, 6);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.PointLight(DEFAULT_THEME.accentColor, 3.0, 30);
    this.fillLight.position.set(-4, -2, 4);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.PointLight(0x8b5cf6, 2.5, 25);
    this.rimLight.position.set(0, 4, -8);
    this.scene.add(this.rimLight);

    // 4. Initialize Continuous Computational 3D World
    this.computationalWorld = new ComputationalWorld(this.isDark);
    this.scene.add(this.computationalWorld.rootGroup);

    // 5. Initialize 3D Character Visual Guide
    this.character = new CharacterVisualGuide(this.isDark);
    this.scene.add(this.character.group);

    // 6. Deep Cosmic Background Dust
    const dustCount = 300;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 40;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      dustPositions[i * 3 + 2] = -10 - Math.random() * 25;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.03,
      transparent: true,
      opacity: this.isDark ? 0.35 : 0.15,
    });
    this.starDust = new THREE.Points(dustGeo, dustMat);
    this.scene.add(this.starDust);

    // 7. Bind Listeners
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleContextLost = this.handleContextLost.bind(this);
    this.handleContextRestored = this.handleContextRestored.bind(this);

    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("pointermove", this.handlePointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    this.canvas.addEventListener("webglcontextlost", this.handleContextLost);
    this.canvas.addEventListener("webglcontextrestored", this.handleContextRestored);

    this.startLoop();
  }

  public setRoute(pathname: string) {
    this.currentRoute = pathname;
    if (pathname.startsWith("/projects/") && pathname !== "/projects") {
      this.isProjectPage = true;
      const slug = pathname
        .replace("/projects/", "")
        .split("/")[0]
        .split("?")[0]
        .split("#")[0]
        .toLowerCase();
      this.targetTheme = PROJECT_THEMES[slug] || DEFAULT_THEME;
      // Dim or position character slightly off-center for project focus
      this.character.group.position.set(2.4, -0.9, 0);
      this.character.setRotationY(-0.4);
    } else {
      this.isProjectPage = false;
      this.targetTheme = DEFAULT_THEME;
    }
  }

  public setProgress(smoothProgress: number) {
    this.targetProgress = Math.min(Math.max(smoothProgress, 0), 1);
  }

  public setTheme(isDark: boolean) {
    this.isDark = isDark;
    this.ambientLight.color.setHex(isDark ? 0x0a0f1d : 0xf8fafc);
    this.ambientLight.intensity = isDark ? 2.0 : 2.8;
    if (this.scene.fog) {
      (this.scene.fog as THREE.FogExp2).color.setHex(isDark ? 0x05070e : 0xf1f5f9);
    }
  }

  private handleContextLost(event: Event) {
    event.preventDefault();
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private handleContextRestored() {
    this.lastTime = performance.now();
    this.startLoop();
  }

  private handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private handlePointerMove(e: PointerEvent) {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    this.targetPointerX = (e.clientX - halfW) / halfW;
    this.targetPointerY = (e.clientY - halfH) / halfH;
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      if (this.animFrameId !== null) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    } else {
      this.lastTime = performance.now();
      this.startLoop();
    }
  }

  private startLoop() {
    if (this.animFrameId !== null || this.isDestroyed) return;

    const tick = (time: number) => {
      if (this.isDestroyed) return;

      const delta = Math.min((time - this.lastTime) / 1000, 0.1);
      this.lastTime = time;

      this.renderFrame(time / 1000, delta);

      this.animFrameId = requestAnimationFrame(tick);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  private getInterpolatedChapterState(p: number): {
    camPos: THREE.Vector3;
    camTarget: THREE.Vector3;
    charPos: THREE.Vector3;
    charRotY: number;
    keyColor: THREE.Color;
    accentColor: THREE.Color;
  } {
    const chapters = ODYSSEY_CHAPTERS;
    if (p <= chapters[0].startProgress) {
      const c = chapters[0];
      return {
        camPos: new THREE.Vector3(...c.cameraPos),
        camTarget: new THREE.Vector3(...c.cameraTarget),
        charPos: new THREE.Vector3(...c.characterPos),
        charRotY: c.characterRotY,
        keyColor: new THREE.Color(c.keyColor),
        accentColor: new THREE.Color(c.accentColor),
      };
    }

    if (p >= chapters[chapters.length - 1].endProgress) {
      const c = chapters[chapters.length - 1];
      return {
        camPos: new THREE.Vector3(...c.cameraPos),
        camTarget: new THREE.Vector3(...c.cameraTarget),
        charPos: new THREE.Vector3(...c.characterPos),
        charRotY: c.characterRotY,
        keyColor: new THREE.Color(c.keyColor),
        accentColor: new THREE.Color(c.accentColor),
      };
    }

    // Find active or bounding chapters
    let currentIdx = 0;
    for (let i = 0; i < chapters.length; i++) {
      if (p >= chapters[i].startProgress && p <= chapters[i].endProgress) {
        currentIdx = i;
        break;
      }
      if (i < chapters.length - 1 && p > chapters[i].endProgress && p < chapters[i + 1].startProgress) {
        currentIdx = i;
        break;
      }
    }

    const c1 = chapters[currentIdx];
    const c2 = chapters[Math.min(currentIdx + 1, chapters.length - 1)];

    const span = Math.max(c2.startProgress - c1.startProgress, 0.001);
    const t = Math.min(Math.max((p - c1.startProgress) / span, 0), 1);
    const easeT = t * t * (3 - 2 * t); // Smooth cubic hermite ease

    const camPos = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.cameraPos[0], c2.cameraPos[0], easeT),
      THREE.MathUtils.lerp(c1.cameraPos[1], c2.cameraPos[1], easeT),
      THREE.MathUtils.lerp(c1.cameraPos[2], c2.cameraPos[2], easeT)
    );

    const camTarget = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.cameraTarget[0], c2.cameraTarget[0], easeT),
      THREE.MathUtils.lerp(c1.cameraTarget[1], c2.cameraTarget[1], easeT),
      THREE.MathUtils.lerp(c1.cameraTarget[2], c2.cameraTarget[2], easeT)
    );

    const charPos = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.characterPos[0], c2.characterPos[0], easeT),
      THREE.MathUtils.lerp(c1.characterPos[1], c2.characterPos[1], easeT),
      THREE.MathUtils.lerp(c1.characterPos[2], c2.characterPos[2], easeT)
    );

    const charRotY = THREE.MathUtils.lerp(c1.characterRotY, c2.characterRotY, easeT);
    const keyColor = new THREE.Color(c1.keyColor).lerp(new THREE.Color(c2.keyColor), easeT);
    const accentColor = new THREE.Color(c1.accentColor).lerp(new THREE.Color(c2.accentColor), easeT);

    return { camPos, camTarget, charPos, charRotY, keyColor, accentColor };
  }

  private renderFrame(time: number, delta: number) {
    // 1. Lerp smooth scroll progress
    const pDiff = this.targetProgress - this.currentProgress;
    this.currentProgress += pDiff * (1 - Math.exp(-8 * delta));
    const p = this.currentProgress;

    // Track scroll velocity
    this.scrollVelocity = (p - this.lastProgress) / Math.max(delta, 0.001);
    this.lastProgress = p;

    if (Math.abs(this.scrollVelocity) < 0.005) {
      this.isStationaryTimer += delta;
    } else {
      this.isStationaryTimer = 0;
    }
    const isStationary = this.isStationaryTimer > 0.15;

    // 2. Lerp pointer parallax
    this.pointerX += (this.targetPointerX - this.pointerX) * 0.05;
    this.pointerY += (this.targetPointerY - this.pointerY) * 0.05;

    // 3. Update Computational 3D World animations
    this.computationalWorld.update(time, delta);

    if (!this.isProjectPage) {
      // 4. Update Odyssey Choreography along Chapters
      const state = this.getInterpolatedChapterState(p);

      // Camera glides along trajectory with subtle pointer parallax
      const camX = state.camPos.x + this.pointerX * 0.35;
      const camY = state.camPos.y + this.pointerY * 0.25;
      const camZ = state.camPos.z;

      this.camera.position.set(camX, camY, camZ);
      this.camera.lookAt(
        state.camTarget.x + this.pointerX * 0.2,
        state.camTarget.y,
        state.camTarget.z
      );

      // Character updates position, orientation, and walking kinematics
      this.character.setPosition(state.charPos.x, state.charPos.y, state.charPos.z);
      this.character.setRotationY(state.charRotY);
      this.character.update(delta, this.scrollVelocity, isStationary);

      // Harmonize lighting with active chapter palette
      this.keyLight.color.lerp(state.keyColor, 0.08);
      this.fillLight.color.lerp(state.accentColor, 0.08);
    } else {
      // Project Detail Page: Focus on ambient project palette
      const keyCol = new THREE.Color(this.targetTheme.keyColor);
      const accentCol = new THREE.Color(this.targetTheme.accentColor);
      this.keyLight.color.lerp(keyCol, 0.06);
      this.fillLight.color.lerp(accentCol, 0.06);

      // Gentle camera orbit for project view
      const angle = time * 0.04 + this.pointerX * 0.1;
      this.camera.position.set(Math.sin(angle) * 1.5, 0.8 + this.pointerY * 0.2, 5.5);
      this.camera.lookAt(0, 0.2, 0);
      this.character.update(delta, 0, true);
    }

    // 5. Cosmic dust slow drift
    this.starDust.rotation.y = -time * 0.015;

    // 6. Render frame
    this.renderer.render(this.scene, this.camera);
  }

  public dispose() {
    this.isDestroyed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("pointermove", this.handlePointerMove);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    this.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.handleContextRestored);

    this.computationalWorld.dispose();
    this.character.dispose();
    this.scene.clear();
    this.renderer.dispose();
  }
}

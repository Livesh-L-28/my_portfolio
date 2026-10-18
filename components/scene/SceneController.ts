import * as THREE from "three";

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
  keyColor: 0x6366f1, // Indigo
  accentColor: 0x06b6d4, // Cyan
  wireColor: 0x38bdf8, // Sky
  speed: 1.0,
  particleSize: 0.05,
};

export class SceneController {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Lighting
  private ambientLight: THREE.AmbientLight;
  private keyLight: THREE.PointLight;
  private fillLight: THREE.PointLight;

  // Spatial Neural Constellation
  private constellationGroup: THREE.Group;
  private particlePoints: THREE.Points;
  private particlePositions: Float32Array;
  private particleVelocities: Float32Array;
  private particleCount = 360;
  private synapseLines: THREE.LineSegments;
  private synapsePositions: Float32Array;
  private maxSynapses = 300;

  // Background Cosmic Dust
  private starDust: THREE.Points;

  // Dynamic State & Controls
  private animFrameId: number | null = null;
  private isDestroyed = false;
  private lastTime = 0;
  private currentProgress = 0;
  private targetProgress = 0;
  private pointerX = 0;
  private pointerY = 0;
  private targetPointerX = 0;
  private targetPointerY = 0;
  private isDark = true;
  private isReducedMotion = false;

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

    // 1. Scene & Camera
    this.scene = new THREE.Scene();

    const width = window.innerWidth || 1280;
    const height = window.innerHeight || 800;
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 10);

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
    this.renderer.toneMappingExposure = 1.0;

    // 3. Studio Lighting
    this.ambientLight = new THREE.AmbientLight(
      isDark ? 0x060812 : 0xf8fafc,
      isDark ? 1.5 : 2.5
    );
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.PointLight(DEFAULT_THEME.keyColor, 3.5, 30);
    this.keyLight.position.set(5, 5, 8);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.PointLight(DEFAULT_THEME.accentColor, 2.5, 30);
    this.fillLight.position.set(-5, -4, 6);
    this.scene.add(this.fillLight);

    // 4. Construct Neural Constellation Group
    this.constellationGroup = new THREE.Group();
    this.scene.add(this.constellationGroup);

    // 4A. Primary Neural Synapse Nodes
    this.particlePositions = new Float32Array(this.particleCount * 3);
    this.particleVelocities = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      // Distribute nodes across a wide spatial volume
      this.particlePositions[i * 3] = (Math.random() - 0.5) * 26;
      this.particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;

      this.particleVelocities[i * 3] = (Math.random() - 0.5) * 0.008;
      this.particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      this.particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(this.particlePositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: DEFAULT_THEME.wireColor,
      size: DEFAULT_THEME.particleSize,
      transparent: true,
      opacity: this.isDark ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
    });

    this.particlePoints = new THREE.Points(pGeo, pMat);
    this.constellationGroup.add(this.particlePoints);

    // 4B. Dynamic Synaptic Connections (Nearest-Neighbor Lines)
    this.synapsePositions = new Float32Array(this.maxSynapses * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(this.synapsePositions, 3)
    );

    const lineMat = new THREE.LineBasicMaterial({
      color: DEFAULT_THEME.accentColor,
      transparent: true,
      opacity: this.isDark ? 0.22 : 0.12,
      blending: THREE.AdditiveBlending,
    });

    this.synapseLines = new THREE.LineSegments(lineGeo, lineMat);
    this.constellationGroup.add(this.synapseLines);

    // 4C. Distant Cosmic Dust (Deep Stars)
    const dustCount = 450;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 50;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      dustPositions[i * 3 + 2] = -15 - Math.random() * 30;
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

    // 5. Bind Listeners
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
    if (pathname.startsWith("/projects/") && pathname !== "/projects") {
      const slug = pathname
        .replace("/projects/", "")
        .split("/")[0]
        .split("?")[0]
        .split("#")[0]
        .toLowerCase();
      this.targetTheme = PROJECT_THEMES[slug] || DEFAULT_THEME;
    } else {
      this.targetTheme = DEFAULT_THEME;
    }
  }

  public setProgress(smoothProgress: number) {
    this.targetProgress = Math.min(Math.max(smoothProgress, 0), 1);
  }

  public setTheme(isDark: boolean) {
    this.isDark = isDark;
    this.ambientLight.color.setHex(isDark ? 0x060812 : 0xf8fafc);
    this.ambientLight.intensity = isDark ? 1.5 : 2.5;

    const pMat = this.particlePoints.material as THREE.PointsMaterial;
    pMat.opacity = isDark ? 0.75 : 0.45;

    const lMat = this.synapseLines.material as THREE.LineBasicMaterial;
    lMat.opacity = isDark ? 0.22 : 0.12;

    const dMat = this.starDust.material as THREE.PointsMaterial;
    dMat.opacity = isDark ? 0.35 : 0.15;
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

  private renderFrame(time: number, delta: number) {
    // 1. Lerp scroll progress
    const pDiff = this.targetProgress - this.currentProgress;
    this.currentProgress += pDiff * (1 - Math.exp(-8 * delta));
    const p = this.currentProgress;

    // 2. Lerp pointer coordinates
    this.pointerX += (this.targetPointerX - this.pointerX) * 0.05;
    this.pointerY += (this.targetPointerY - this.pointerY) * 0.05;

    // 3. Update particle drift and boundary wrap
    if (!this.isReducedMotion) {
      const posAttr = this.particlePoints.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < this.particleCount; i++) {
        positions[i * 3] += this.particleVelocities[i * 3] * this.targetTheme.speed;
        positions[i * 3 + 1] += this.particleVelocities[i * 3 + 1] * this.targetTheme.speed;
        positions[i * 3 + 2] += this.particleVelocities[i * 3 + 2] * this.targetTheme.speed;

        // Soft boundary wraps
        if (positions[i * 3] > 14) positions[i * 3] = -14;
        if (positions[i * 3] < -14) positions[i * 3] = 14;
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
        if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
        if (positions[i * 3 + 2] > 6) positions[i * 3 + 2] = -14;
        if (positions[i * 3 + 2] < -14) positions[i * 3 + 2] = 6;
      }
      posAttr.needsUpdate = true;

      // 4. Update Synaptic nearest-neighbor connections
      let lineIdx = 0;
      const distThresholdSq = 3.6 * 3.6;

      for (let i = 0; i < this.particleCount && lineIdx < this.maxSynapses; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        // Connect only forward to avoid duplicates
        for (let j = i + 1; j < this.particleCount && lineIdx < this.maxSynapses; j++) {
          const dx = x1 - positions[j * 3];
          const dy = y1 - positions[j * 3 + 1];
          const dz = z1 - positions[j * 3 + 2];
          const dSq = dx * dx + dy * dy + dz * dz;

          if (dSq < distThresholdSq) {
            this.synapsePositions[lineIdx * 6] = x1;
            this.synapsePositions[lineIdx * 6 + 1] = y1;
            this.synapsePositions[lineIdx * 6 + 2] = z1;
            this.synapsePositions[lineIdx * 6 + 3] = positions[j * 3];
            this.synapsePositions[lineIdx * 6 + 4] = positions[j * 3 + 1];
            this.synapsePositions[lineIdx * 6 + 5] = positions[j * 3 + 2];
            lineIdx++;
          }
        }
      }

      // Zero out unused line segments
      for (let k = lineIdx; k < this.maxSynapses; k++) {
        this.synapsePositions[k * 6] = 0;
        this.synapsePositions[k * 6 + 1] = 0;
        this.synapsePositions[k * 6 + 2] = 0;
        this.synapsePositions[k * 6 + 3] = 0;
        this.synapsePositions[k * 6 + 4] = 0;
        this.synapsePositions[k * 6 + 5] = 0;
      }

      this.synapseLines.geometry.attributes.position.needsUpdate = true;

      // Slow rotation of constellation
      this.constellationGroup.rotation.y = time * 0.04 + this.pointerX * 0.15;
      this.constellationGroup.rotation.x = Math.sin(time * 0.03) * 0.06 + this.pointerY * 0.15;
      this.starDust.rotation.y = -time * 0.015;
    }

    // 5. Scroll-responsive Camera Gliding
    const camAngle = p * Math.PI * 0.8;
    const targetCamX = Math.sin(camAngle) * 2.0 + this.pointerX * 0.5;
    const targetCamY = -p * 3.0 + this.pointerY * 0.4;
    const targetCamZ = 10 - p * 3.5;

    this.camera.position.set(targetCamX, targetCamY, targetCamZ);
    this.camera.lookAt(this.pointerX * 0.8, -p * 1.5, 0);

    // 6. Smooth Theme Color Lerp
    const keyColorObj = new THREE.Color(this.targetTheme.keyColor);
    const accentColorObj = new THREE.Color(this.targetTheme.accentColor);
    const wireColorObj = new THREE.Color(this.targetTheme.wireColor);

    this.keyLight.color.lerp(keyColorObj, 0.06);
    this.fillLight.color.lerp(accentColorObj, 0.06);

    const pMat = this.particlePoints.material as THREE.PointsMaterial;
    pMat.color.lerp(wireColorObj, 0.06);

    const lMat = this.synapseLines.material as THREE.LineBasicMaterial;
    lMat.color.lerp(accentColorObj, 0.06);

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

    this.scene.clear();
    this.renderer.dispose();
  }
}

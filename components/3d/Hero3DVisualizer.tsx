"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import Link from "next/link";
import { checkWebGLSupport } from "@/lib/utils/webgl";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowRight, RotateCw, Layers, Zap, Sparkles } from "lucide-react";

type VisualizerMode = "tensor" | "vectorspace" | "citadel";

interface ModeMeta {
  id: VisualizerMode;
  name: string;
  badge: string;
  projectSlug: string;
  projectTitle: string;
  metric: string;
  spec: string;
}

const MODES: ModeMeta[] = [
  {
    id: "vectorspace",
    name: "NexaRAG Vector",
    badge: "pgvector + BM25",
    projectSlug: "nexarag",
    projectTitle: "NexaRAG Engine",
    metric: "~24.5 ms Retrieval · 321 Tests",
    spec: "High-dimensional 160-node semantic embedding manifold with nearest-neighbor search rays, reciprocal rank fusion, and query vector beacon.",
  },
  {
    id: "citadel",
    name: "AEGIS Citadel",
    badge: "Zero-Leak",
    projectSlug: "aegis-framework",
    projectTitle: "AEGIS Framework",
    metric: "100% Fail-Closed · PyPI Verified",
    spec: "Multi-tier geodesic tenant boundary with verified cryptographic conduits, dynamic policy shields, and real-time approval gates.",
  },
  {
    id: "tensor",
    name: "Medical 3D Core",
    badge: "VR + Transformer",
    projectSlug: "venipuncture-vr",
    projectTitle: "Venipuncture VR",
    metric: "16-Step Workflow · OpenXR",
    spec: "3D procedural clinical simulation with authentic medical hardware, custom medical language model, and hands-free voice assistant.",
  },
];

const emptySubscribe = () => () => {};

export const Hero3DVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const webGlSupported = useSyncExternalStore(emptySubscribe, checkWebGLSupport, () => true);

  const [activeMode, setActiveMode] = useState<VisualizerMode>("vectorspace");
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const isAutoRotateRef = useRef(true);

  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  const [fps, setFps] = useState<number>(60);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const modeGroupsRef = useRef<{
    tensor: THREE.Group;
    vectorspace: THREE.Group;
    citadel: THREE.Group;
  } | null>(null);

  // Interaction & Physics state
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });
  const baseRotationRef = useRef({ x: 0.2, y: 0 });
  const pulseRef = useRef(0);

  const currentMeta = MODES.find((m) => m.id === activeMode) || MODES[0];

  useEffect(() => {
    if (!mounted || !webGlSupported) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // 2. Renderer with ACES Filmic Tone Mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
    rendererRef.current = renderer;

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x060812 : 0xf1f5f9,
      isDark ? 1.8 : 2.6
    );
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.PointLight(0x06b6d4, 4.5, 25);
    cyanKeyLight.position.set(4, 3, 5);
    scene.add(cyanKeyLight);

    const indigoFillLight = new THREE.PointLight(0x6366f1, 4.0, 25);
    indigoFillLight.position.set(-4, -2, 4);
    scene.add(indigoFillLight);

    const violetRimLight = new THREE.PointLight(0xa855f7, 3.2, 20);
    violetRimLight.position.set(0, 4, -4);
    scene.add(violetRimLight);

    // 4. Construct Mode 1: Tensor Core
    const tensorGroup = new THREE.Group();
    scene.add(tensorGroup);

    // 4A. Polyhedron Core with Dynamic Vertex Wave
    const coreGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x4338ca,
      emissiveIntensity: isDark ? 0.25 : 0.1,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    tensorGroup.add(coreMesh);

    // Save base vertex positions for wave deformation
    const basePositions = coreGeo.attributes.position.array.slice() as Float32Array;

    // 4B. Inner Quantum Glow
    const innerLight = new THREE.PointLight(0x22d3ee, 3.0, 8);
    coreMesh.add(innerLight);

    // 4C. Concentric Gimbal Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.035, 16, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    tensorGroup.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.025, 16, 80);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    tensorGroup.add(ring2);

    // 4D. Synaptic Nodes & Filaments
    const nodeCount = 70;
    const nodeCoords = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.0 + Math.random() * 0.9;
      nodeCoords[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      nodeCoords[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      nodeCoords[i * 3 + 2] = rad * Math.cos(phi);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodeCoords, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    tensorGroup.add(nodePoints);

    // 5. Construct Mode 2: Vector Space Manifold
    const vectorGroup = new THREE.Group();
    vectorGroup.visible = false;
    scene.add(vectorGroup);

    const vecCount = 140;
    const vecPositions = new Float32Array(vecCount * 3);
    const vecColors = new Float32Array(vecCount * 3);
    const clusterCenters = [
      new THREE.Vector3(-1.4, 0.8, -0.2),
      new THREE.Vector3(1.5, -0.6, 0.4),
      new THREE.Vector3(0.2, 1.4, -0.8),
      new THREE.Vector3(-0.6, -1.2, 0.9),
    ];
    const clusterPalettes = [
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0xa855f7), // Violet
      new THREE.Color(0x10b981), // Emerald
    ];

    for (let i = 0; i < vecCount; i++) {
      const clusterIdx = i % 4;
      const center = clusterCenters[clusterIdx];
      const col = clusterPalettes[clusterIdx];
      const spread = 0.85;

      vecPositions[i * 3] = center.x + (Math.random() - 0.5) * spread;
      vecPositions[i * 3 + 1] = center.y + (Math.random() - 0.5) * spread;
      vecPositions[i * 3 + 2] = center.z + (Math.random() - 0.5) * spread;

      vecColors[i * 3] = col.r;
      vecColors[i * 3 + 1] = col.g;
      vecColors[i * 3 + 2] = col.b;
    }

    const vecGeo = new THREE.BufferGeometry();
    vecGeo.setAttribute("position", new THREE.BufferAttribute(vecPositions, 3));
    vecGeo.setAttribute("color", new THREE.BufferAttribute(vecColors, 3));
    const vecMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const vecPoints = new THREE.Points(vecGeo, vecMat);
    vectorGroup.add(vecPoints);

    // Query Beacon Vector
    const queryBeaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const queryBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
    });
    const queryBeacon = new THREE.Mesh(queryBeaconGeo, queryBeaconMat);
    queryBeacon.position.set(0, 0, 0);
    vectorGroup.add(queryBeacon);

    // Search rays connecting query beacon to nearest clusters
    const rayCoords: number[] = [];
    clusterCenters.forEach((c) => {
      rayCoords.push(0, 0, 0, c.x, c.y, c.z);
    });
    const rayGeo = new THREE.BufferGeometry();
    rayGeo.setAttribute("position", new THREE.Float32BufferAttribute(rayCoords, 3));
    const rayMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.5,
    });
    const searchRays = new THREE.LineSegments(rayGeo, rayMat);
    vectorGroup.add(searchRays);

    // 6. Construct Mode 3: Security Citadel
    const citadelGroup = new THREE.Group();
    citadelGroup.visible = false;
    scene.add(citadelGroup);

    // Outer Geodesic Shield
    const shieldGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const shieldWireGeo = new THREE.WireframeGeometry(shieldGeo);
    const shieldMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const shieldMesh = new THREE.LineSegments(shieldWireGeo, shieldMat);
    citadelGroup.add(shieldMesh);

    // Middle Isolation Ring
    const isoRingGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 64);
    const isoRingMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.3,
      metalness: 0.8,
    });
    const isoRing = new THREE.Mesh(isoRingGeo, isoRingMat);
    isoRing.rotation.x = Math.PI / 2;
    citadelGroup.add(isoRing);

    // Inner Cryptographic Prism
    const prismGeo = new THREE.OctahedronGeometry(1.0, 0);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.88,
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    citadelGroup.add(prismMesh);

    modeGroupsRef.current = {
      tensor: tensorGroup,
      vectorspace: vectorGroup,
      citadel: citadelGroup,
    };

    // 7. Interactive Drag-to-Rotate Physics Listeners
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      const factor = 0.005;
      baseRotationRef.current.y += deltaX * factor;
      baseRotationRef.current.x += deltaY * factor;
      rotationVelocityRef.current = { x: deltaY * factor, y: deltaX * factor };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Animation & Render Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Track FPS
      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)));
        frameCount = 0;
        fpsTimer = time;
      }

      // Physics damping for rotation
      if (!isDraggingRef.current) {
        if (isAutoRotateRef.current) {
          baseRotationRef.current.y += 0.006;
        } else {
          baseRotationRef.current.x += rotationVelocityRef.current.x;
          baseRotationRef.current.y += rotationVelocityRef.current.y;
          rotationVelocityRef.current.x *= 0.94;
          rotationVelocityRef.current.y *= 0.94;
        }
      }

      // Harmonic Pulse decay
      if (pulseRef.current > 0) {
        pulseRef.current = Math.max(0, pulseRef.current - delta * 2.5);
      }

      // Mode 1 Tensor animation
      if (tensorGroup.visible) {
        tensorGroup.rotation.x = baseRotationRef.current.x;
        tensorGroup.rotation.y = baseRotationRef.current.y;

        // Dynamic vertex wave displacement
        const posAttr = coreGeo.attributes.position;
        const posArr = posAttr.array as Float32Array;
        const count = posAttr.count;
        const waveTime = time * 0.002;
        const pulseAmp = pulseRef.current * 0.35;

        for (let i = 0; i < count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];

          const wave =
            Math.sin(bx * 2.0 + waveTime) *
            Math.cos(by * 2.0 + waveTime * 0.8) *
            (0.12 + pulseAmp);

          posArr[i * 3] = bx * (1 + wave);
          posArr[i * 3 + 1] = by * (1 + wave);
          posArr[i * 3 + 2] = bz * (1 + wave);
        }
        posAttr.needsUpdate = true;
        coreGeo.computeVertexNormals();

        ring1.rotation.z += 0.015;
        ring2.rotation.x += 0.012;
        nodePoints.rotation.y -= 0.004;
      }

      // Mode 2 Vector Space animation
      if (vectorGroup.visible) {
        vectorGroup.rotation.x = baseRotationRef.current.x;
        vectorGroup.rotation.y = baseRotationRef.current.y;

        const scanT = time * 0.0015;
        queryBeacon.position.x = Math.sin(scanT) * 1.5;
        queryBeacon.position.y = Math.cos(scanT * 1.3) * 1.0;
        queryBeacon.position.z = Math.sin(scanT * 0.7) * 0.8;
      }

      // Mode 3 Citadel animation
      if (citadelGroup.visible) {
        citadelGroup.rotation.x = baseRotationRef.current.x;
        citadelGroup.rotation.y = baseRotationRef.current.y;

        shieldMesh.rotation.y -= 0.008;
        isoRing.rotation.z += 0.01;
        prismMesh.rotation.y += 0.02;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      renderer.dispose();
      rendererRef.current = null;
    };
  }, [mounted, webGlSupported, isDark]);

  // Sync mode transitions
  useEffect(() => {
    if (!modeGroupsRef.current) return;
    const { tensor, vectorspace, citadel } = modeGroupsRef.current;
    tensor.visible = activeMode === "tensor";
    vectorspace.visible = activeMode === "vectorspace";
    citadel.visible = activeMode === "citadel";
  }, [activeMode]);

  // Toggle wireframe mode
  const toggleWireframe = () => {
    const next = !isWireframe;
    setIsWireframe(next);
    if (!sceneRef.current) return;

    sceneRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if ("wireframe" in m) (m as THREE.MeshStandardMaterial).wireframe = next;
          });
        } else if ("wireframe" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = next;
        }
      }
    });
  };

  // Trigger energy pulse wave
  const triggerPulse = () => {
    pulseRef.current = 1.0;
  };

  // Reset orientation
  const resetCamera = () => {
    baseRotationRef.current = { x: 0.2, y: 0 };
    rotationVelocityRef.current = { x: 0, y: 0.005 };
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-full h-[460px] sm:h-[500px] rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-indigo-950/10 dark:shadow-black/40 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Studio Header */}
      <div className="relative z-20 flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        {/* Mode Selector Pills */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="3D Architecture Modes">
          {MODES.map((mode) => {
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveMode(mode.id)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md scale-[1.02]"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                }`}
              >
                <span>{mode.name}</span>
                {isSelected && (
                  <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-400 dark:text-indigo-600 font-semibold uppercase">
                    {mode.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Hardware Telemetry Tag */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{fps} FPS</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="text-indigo-600 dark:text-cyan-400 font-medium">Three.js WebGL2</span>
        </div>
      </div>

      {/* Main 3D Canvas Center Stage */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden">
        {mounted && webGlSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label={`${currentMeta.name} 3D generative model. Drag to rotate 360 degrees.`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-3">
            <Layers className="h-12 w-12 text-indigo-500 animate-pulse" />
            <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
              {currentMeta.name} Architecture
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Hardware WebGL accelerated rendering
            </span>
          </div>
        )}

        {/* Interactive Floating Quick Toolbars (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleWireframe}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-all backdrop-blur-md cursor-pointer ${
              isWireframe
                ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
            }`}
            title="Toggle Wireframe / Solid Surface"
            aria-label="Toggle Wireframe"
          >
            <Layers className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={triggerPulse}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:border-amber-400 backdrop-blur-md transition-all cursor-pointer shadow-xs"
            title="Trigger Energy Pulse"
            aria-label="Trigger Energy Pulse"
          >
            <Zap className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-all backdrop-blur-md cursor-pointer ${
              isAutoRotate
                ? "bg-white/80 dark:bg-slate-800/80 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
            title={isAutoRotate ? "Pause Auto Rotation" : "Resume Auto Rotation"}
            aria-label="Toggle Auto Rotation"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isAutoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
          </button>

          <button
            type="button"
            onClick={resetCamera}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white backdrop-blur-md transition-all cursor-pointer"
            title="Reset Orientation"
            aria-label="Reset Orientation"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Orbit Hint badge */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-900/60 dark:bg-slate-800/80 text-slate-200 backdrop-blur-md border border-white/10">
            Drag to Rotate 360°
          </span>
        </div>
      </div>

      {/* Bottom Architectural Telemetry & Case Study Link */}
      <div className="relative z-20 border-t border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-xs text-slate-900 dark:text-white">
                {currentMeta.projectTitle}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.2 rounded font-semibold">
                {currentMeta.metric}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans line-clamp-1">
              {currentMeta.spec}
            </p>
          </div>

          <Link
            href={`/projects/${currentMeta.projectSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-mono font-bold transition-all shrink-0 hover:translate-x-0.5"
          >
            <span>Case Study</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

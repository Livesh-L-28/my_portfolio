"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type Project3DType =
  | "nexarag"
  | "llmfirewall"
  | "visualmemory"
  | "aegis"
  | "medical"
  | "stock";

interface Project3DCanvasProps {
  type: Project3DType;
  interactive?: boolean;
  className?: string;
  height?: string;
  showControlsHelp?: boolean;
}

export const Project3DCanvas: React.FC<Project3DCanvasProps> = ({
  type,
  interactive = true,
  className = "",
  height = "h-48 sm:h-56",
  showControlsHelp = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root group for all project-specific objects
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x818cf8, 2, 20);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 20);
    cyanLight.position.set(-4, -4, 4);
    scene.add(cyanLight);

    // BUILD SPECIFIC 3D DESIGNS PER PROJECT
    let animateCallback: (delta: number) => void = () => {};

    if (type === "nexarag") {
      // 1. NEXARAG: 3D Vector Space & Dense Embeddings Lattice
      const particleCount = 120;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = Math.cbrt(Math.random()) * radius;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Gradient from cyan (dense vector) to violet (lexical candidate)
        const isDense = Math.random() > 0.4;
        colors[i * 3] = isDense ? 0.38 : 0.02; // R
        colors[i * 3 + 1] = isDense ? 0.4 : 0.71; // G
        colors[i * 3 + 2] = isDense ? 0.95 : 0.83; // B
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      });

      const particleSystem = new THREE.Points(geometry, particleMaterial);
      rootGroup.add(particleSystem);

      // Connecting nearest-neighbor lines (KNN)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.25,
      });

      const linePositions: number[] = [];
      for (let i = 0; i < 40; i++) {
        const i1 = Math.floor(Math.random() * particleCount);
        const i2 = Math.floor(Math.random() * particleCount);
        linePositions.push(
          positions[i1 * 3],
          positions[i1 * 3 + 1],
          positions[i1 * 3 + 2],
          positions[i2 * 3],
          positions[i2 * 3 + 1],
          positions[i2 * 3 + 2]
        );
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      rootGroup.add(lines);

      // Central query vector point (glowing beacon)
      const queryGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const queryMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const queryMesh = new THREE.Mesh(queryGeo, queryMat);
      rootGroup.add(queryMesh);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.25;
        rootGroup.rotation.x += delta * 0.1;
      };
    } else if (type === "llmfirewall") {
      // 2. LLMFIREWALL: 3D Geodesic Security Shield & Defense Perimeter
      const shieldGeo = new THREE.IcosahedronGeometry(2.1, 1);
      const wireframeMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const shieldMesh = new THREE.Mesh(shieldGeo, wireframeMat);
      rootGroup.add(shieldMesh);

      // Inner protected core
      const coreGeo = new THREE.OctahedronGeometry(1.0, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      rootGroup.add(coreMesh);

      // Orbital defense ring
      const ringGeo = new THREE.TorusGeometry(2.6, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      rootGroup.add(ringMesh);

      animateCallback = (delta) => {
        shieldMesh.rotation.y += delta * 0.3;
        shieldMesh.rotation.x += delta * 0.15;
        coreMesh.rotation.y -= delta * 0.6;
        coreMesh.rotation.z += delta * 0.4;
        ringMesh.rotation.z += delta * 0.5;
      };
    } else if (type === "visualmemory") {
      // 3. AI VISUAL MEMORY: 3D Spatial Tracking & Perspective Camera Frustum
      // Ground plane grid
      const grid = new THREE.GridHelper(5, 10, 0x38bdf8, 0x1f2937);
      grid.position.y = -1.5;
      rootGroup.add(grid);

      // Tracked object bounding box 1
      const boxGeo1 = new THREE.BoxGeometry(0.8, 1.2, 0.8);
      const boxEdges1 = new THREE.EdgesGeometry(boxGeo1);
      const boxLine1 = new THREE.LineSegments(
        boxEdges1,
        new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 })
      );
      boxLine1.position.set(-1.2, -0.9, 0.5);
      rootGroup.add(boxLine1);

      // Tracked object bounding box 2
      const boxGeo2 = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const boxEdges2 = new THREE.EdgesGeometry(boxGeo2);
      const boxLine2 = new THREE.LineSegments(
        boxEdges2,
        new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 2 })
      );
      boxLine2.position.set(1.4, -1.15, -0.6);
      rootGroup.add(boxLine2);

      // Camera frustum pyramid (observer position)
      const frustumGeo = new THREE.ConeGeometry(1.6, 2.5, 4, 1, true);
      const frustumEdges = new THREE.EdgesGeometry(frustumGeo);
      const frustumLine = new THREE.LineSegments(
        frustumEdges,
        new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.5 })
      );
      frustumLine.position.set(0, 1.5, 0);
      frustumLine.rotation.x = Math.PI;
      rootGroup.add(frustumLine);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.2;
      };
    } else if (type === "aegis") {
      // 4. AEGIS: 3D Distributed Cluster Pod Mesh & Telemetry Rings
      const ringCount = 3;
      const rings: THREE.Mesh[] = [];

      for (let i = 0; i < ringCount; i++) {
        const radius = 1.4 + i * 0.7;
        const torusGeo = new THREE.TorusGeometry(radius, 0.03, 16, 60);
        const torusMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x10b981 : i === 1 ? 0x6366f1 : 0xf59e0b,
          transparent: true,
          opacity: 0.7,
        });
        const ring = new THREE.Mesh(torusGeo, torusMat);
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        rings.push(ring);
        rootGroup.add(ring);
      }

      // Cluster nodes
      const nodeGeo = new THREE.DodecahedronGeometry(0.18, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
      });

      for (let i = 0; i < 8; i++) {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        const angle = (i / 8) * Math.PI * 2;
        mesh.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, (i % 2) * 0.5 - 0.25);
        rootGroup.add(mesh);
      }

      animateCallback = (delta) => {
        rings.forEach((r, idx) => {
          r.rotation.z += delta * (0.2 + idx * 0.1);
        });
        rootGroup.rotation.y += delta * 0.15;
      };
    } else if (type === "medical") {
      // 5. MEDICAL: 3D Biomedical Transformer Attention Helix
      const curvePoints: THREE.Vector3[] = [];
      const numPoints = 60;
      for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 4;
        curvePoints.push(
          new THREE.Vector3(Math.cos(t) * 1.6, (i / numPoints) * 3.6 - 1.8, Math.sin(t) * 1.6)
        );
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.05, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.3,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      rootGroup.add(tube);

      // Second complementary helix strand
      const curvePoints2 = curvePoints.map(
        (p) => new THREE.Vector3(-p.x, p.y, -p.z)
      );
      const curve2 = new THREE.CatmullRomCurve3(curvePoints2);
      const tubeGeo2 = new THREE.TubeGeometry(curve2, 60, 0.05, 8, false);
      const tubeMat2 = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.3,
      });
      const tube2 = new THREE.Mesh(tubeGeo2, tubeMat2);
      rootGroup.add(tube2);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.35;
      };
    } else {
      // 6. STOCK: 3D Time-Series Trajectory Waveform
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 40; i++) {
        const x = (i / 40) * 4.6 - 2.3;
        const y = Math.sin(i * 0.4) * 0.8 + Math.cos(i * 0.8) * 0.4;
        const z = Math.cos(i * 0.3) * 0.8;
        points.push(new THREE.Vector3(x, y, z));
      }

      const path = new THREE.CatmullRomCurve3(points);
      const ribbonGeo = new THREE.TubeGeometry(path, 40, 0.06, 8, false);
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.7,
      });
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      rootGroup.add(ribbon);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.25;
      };
    }

    // Interactive mouse drag controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive || !isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      rootGroup.rotation.y += deltaX * 0.01;
      rootGroup.rotation.x += deltaY * 0.01;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length !== 1) return;
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!interactive || !isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      rootGroup.rotation.y += deltaX * 0.01;
      rootGroup.rotation.x += deltaY * 0.01;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Animation loop with pause on offscreen (IntersectionObserver)
    let animationFrameId: number;
    let isVisible = true;
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = clock.getDelta();
      if (!prefersReducedMotion && (!isDragging || !interactive)) {
        animateCallback(delta);
      }

      renderer.render(scene, camera);
    };

    render();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      // Clean up Three.js resources
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [type, interactive]);

  return (
    <div
      className={`relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-xl bg-zinc-950/70 border border-zinc-800/80 ${height} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="h-full w-full" />

      {/* Interactive Helper Label */}
      {showControlsHelp && (
        <div
          className={`absolute bottom-2 right-2 rounded bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 transition-opacity pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-60"
          }`}
        >
          <span>Drag to orbit 3D</span>
        </div>
      )}
    </div>
  );
};

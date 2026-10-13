"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Project3DType, getProject3DType } from "@/lib/types";
export { type Project3DType, getProject3DType };

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x818cf8, 2.2, 20);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.2, 20);
    cyanLight.position.set(-4, -4, 4);
    scene.add(cyanLight);

    // BUILD SPECIFIC 3D DESIGNS PER PROJECT
    let animateCallback: (delta: number) => void = () => { };

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
      // 5. VENIPUNCTURE VR: 3D Precision Medical Phlebotomy Apparatus, Insertion Angle & Procedural Guidance
      // Syringe / Vacutainer Barrel (translucent surgical cylinder)
      const barrelGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.2, 24);
      const barrelMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
        metalness: 0.8,
      });
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.position.set(0, 0.4, 0);
      rootGroup.add(barrel);

      // Plunger & Stopper (metallic core)
      const plungerGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16);
      const plungerMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        metalness: 0.9,
        roughness: 0.2,
      });
      const plunger = new THREE.Mesh(plungerGeo, plungerMat);
      plunger.position.set(0, 1.2, 0);
      barrel.add(plunger);

      // Precision Cannula / Needle Tip (angled downwards at 15-30 deg insertion angle)
      const needleGeo = new THREE.CylinderGeometry(0.04, 0.015, 1.4, 16);
      const needleMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,
        roughness: 0.1,
      });
      const needle = new THREE.Mesh(needleGeo, needleMat);
      needle.position.set(0, -1.5, 0);
      barrel.add(needle);

      // Flashback verification glow point
      const flashGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const flashMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const flash = new THREE.Mesh(flashGeo, flashMat);
      flash.position.set(0, -0.8, 0);
      barrel.add(flash);

      // Targeted Vein Channel (cylindrical vessel along the horizontal plane)
      const veinGeo = new THREE.CylinderGeometry(0.22, 0.22, 4.0, 24);
      const veinMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.75,
        roughness: 0.3,
      });
      const vein = new THREE.Mesh(veinGeo, veinMat);
      vein.rotation.z = Math.PI / 2;
      vein.position.set(0, -1.4, 0);
      rootGroup.add(vein);

      // Procedural 16-Step Protocol Guidance Ring (glowing emerald orbit)
      const ringGeo = new THREE.TorusGeometry(2.3, 0.035, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      rootGroup.add(ring);

      // Voice AI Clinical RAG Audio Waveform Ring
      const voiceRingGeo = new THREE.TorusGeometry(2.0, 0.025, 16, 64);
      const voiceRingMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.6,
      });
      const voiceRing = new THREE.Mesh(voiceRingGeo, voiceRingMat);
      voiceRing.rotation.x = -Math.PI / 4;
      rootGroup.add(voiceRing);

      let animTime = 0;
      animateCallback = (delta) => {
        animTime += delta;
        barrel.rotation.z = Math.sin(animTime * 1.2) * 0.12 - 0.25; // 15–25° insertion angle oscillation
        ring.rotation.z += delta * 0.4;
        voiceRing.rotation.z -= delta * 0.35;
        rootGroup.rotation.y += delta * 0.2;
      };
    } else if (type === "stock") {
      // 6. STOCK: 3D Time-Series Trajectory Waveform & Bollinger Envelopes
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 40; i++) {
        const x = (i / 40) * 4.6 - 2.3;
        const y = Math.sin(i * 0.4) * 0.8 + Math.cos(i * 0.8) * 0.4;
        const z = Math.cos(i * 0.3) * 0.8;
        points.push(new THREE.Vector3(x, y, z));
      }

      const path = new THREE.CatmullRomCurve3(points);
      const ribbonGeo = new THREE.TubeGeometry(path, 40, 0.07, 8, false);
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.7,
      });
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      rootGroup.add(ribbon);

      // Lower support boundary ribbon
      const lowerPoints = points.map((p) => new THREE.Vector3(p.x, p.y - 0.7, p.z));
      const lowerPath = new THREE.CatmullRomCurve3(lowerPoints);
      const lowerGeo = new THREE.TubeGeometry(lowerPath, 40, 0.03, 8, false);
      const lowerMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.5,
      });
      const lowerRibbon = new THREE.Mesh(lowerGeo, lowerMat);
      rootGroup.add(lowerRibbon);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.25;
      };
    } else if (type === "aireliability") {
      // 7. AIRELIABILITY: Chaos Stress Matrix & Perturbation Vectors
      // Central AI Core under test (Crystalline Dodecahedron)
      const coreGeo = new THREE.DodecahedronGeometry(0.95, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.2,
        metalness: 0.8,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      rootGroup.add(coreMesh);

      // Core wireframe cage
      const coreWireGeo = new THREE.DodecahedronGeometry(0.98, 0);
      const coreWireMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
      });
      const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
      rootGroup.add(coreWireMesh);

      // Outer resilience damping sphere / shield
      const shieldGeo = new THREE.IcosahedronGeometry(2.1, 1);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      rootGroup.add(shieldMesh);

      // 4 Adversarial Stress Probe Vectors (red/amber beams converging on core)
      const probePositions = [
        new THREE.Vector3(2.4, 1.8, 1.2),
        new THREE.Vector3(-2.4, -1.5, 1.4),
        new THREE.Vector3(1.8, -2.2, -1.5),
        new THREE.Vector3(-2.0, 2.0, -1.8),
      ];

      probePositions.forEach((startPos) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          startPos,
          new THREE.Vector3(0, 0, 0),
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xf43f5e,
          transparent: true,
          opacity: 0.8,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        rootGroup.add(line);

        // Probe origin beacon
        const probeBeaconGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const probeBeaconMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        const probeBeacon = new THREE.Mesh(probeBeaconGeo, probeBeaconMat);
        probeBeacon.position.copy(startPos);
        rootGroup.add(probeBeacon);
      });

      // Orbital perturbation telemetry ring
      const ringGeo = new THREE.TorusGeometry(2.5, 0.035, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      rootGroup.add(ringMesh);

      animateCallback = (delta) => {
        coreMesh.rotation.y += delta * 0.4;
        coreMesh.rotation.x += delta * 0.2;
        coreWireMesh.rotation.y += delta * 0.4;
        shieldMesh.rotation.y -= delta * 0.25;
        shieldMesh.rotation.z += delta * 0.15;
        ringMesh.rotation.z += delta * 0.5;
        rootGroup.rotation.y += delta * 0.1;
      };
    } else if (type === "fastapicicd") {
      // 8. FASTAPICICD: Automated CI/CD Pipeline Circuit & Microservice Containers
      // Continuous racetrack / pipeline curve
      const pipelineTrackGeo = new THREE.TorusGeometry(1.9, 0.06, 16, 80);
      const pipelineTrackMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.3,
        metalness: 0.8,
      });
      const pipelineTrack = new THREE.Mesh(pipelineTrackGeo, pipelineTrackMat);
      pipelineTrack.rotation.x = Math.PI / 3;
      rootGroup.add(pipelineTrack);

      // Inner data bus loop
      const innerTrackGeo = new THREE.TorusGeometry(1.3, 0.04, 16, 64);
      const innerTrackMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
      });
      const innerTrack = new THREE.Mesh(innerTrackGeo, innerTrackMat);
      innerTrack.rotation.x = -Math.PI / 4;
      rootGroup.add(innerTrack);

      // 3 Pipeline Stage Gates along the perimeter (Lint, Pytest, Docker Deploy)
      const gateColors = [0x38bdf8, 0x10b981, 0x818cf8];
      for (let i = 0; i < 3; i++) {
        const gateGeo = new THREE.TorusGeometry(0.35, 0.04, 12, 32);
        const gateMat = new THREE.MeshBasicMaterial({ color: gateColors[i] });
        const gate = new THREE.Mesh(gateGeo, gateMat);
        const angle = (i * Math.PI * 2) / 3;
        gate.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, 0);
        pipelineTrack.add(gate);
      }

      // 3 Docker Container cubes traversing the pipeline
      const containerCubes: THREE.Mesh[] = [];
      for (let i = 0; i < 3; i++) {
        const cubeGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.2,
          metalness: 0.9,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        pipelineTrack.add(cube);
        containerCubes.push(cube);
      }

      let pipelineTime = 0;
      animateCallback = (delta) => {
        pipelineTime += delta * 0.8;
        containerCubes.forEach((cube, idx) => {
          const angle = pipelineTime + (idx * Math.PI * 2) / 3;
          cube.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, 0);
          cube.rotation.x += delta * 1.2;
          cube.rotation.y += delta * 1.5;
        });
        pipelineTrack.rotation.z += delta * 0.25;
        innerTrack.rotation.z -= delta * 0.35;
        rootGroup.rotation.y += delta * 0.15;
      };
    } else if (type === "skillascend") {
      // 9. SKILLASCEND: Hierarchical Skill Knowledge Graph & Career Ascension Lattice
      const tier1Points = [
        new THREE.Vector3(-1.6, -1.3, -0.7),
        new THREE.Vector3(1.6, -1.3, -0.7),
        new THREE.Vector3(-0.9, -1.3, 1.2),
        new THREE.Vector3(0.9, -1.3, 1.2),
      ];
      const tier2Points = [
        new THREE.Vector3(-1.1, 0.0, -0.5),
        new THREE.Vector3(1.1, 0.0, -0.5),
        new THREE.Vector3(-0.6, 0.0, 0.9),
        new THREE.Vector3(0.6, 0.0, 0.9),
      ];
      const apexPoint = new THREE.Vector3(0, 1.4, 0);
      const allPoints = [...tier1Points, ...tier2Points, apexPoint];

      // Add nodes
      const nodeGeo = new THREE.SphereGeometry(0.14, 16, 16);
      allPoints.forEach((pt, idx) => {
        const isApex = idx === allPoints.length - 1;
        const nodeMat = new THREE.MeshStandardMaterial({
          color: isApex ? 0xf59e0b : idx < 4 ? 0x06b6d4 : 0x8b5cf6,
          roughness: 0.2,
          metalness: 0.8,
        });
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.copy(pt);
        rootGroup.add(mesh);
      });

      // Connective synaptic lines between tiers
      const linePositions: number[] = [];
      for (let i = 0; i < 4; i++) {
        linePositions.push(
          tier1Points[i].x, tier1Points[i].y, tier1Points[i].z,
          tier2Points[i].x, tier2Points[i].y, tier2Points[i].z
        );
        linePositions.push(
          tier1Points[i].x, tier1Points[i].y, tier1Points[i].z,
          tier2Points[(i + 1) % 4].x, tier2Points[(i + 1) % 4].y, tier2Points[(i + 1) % 4].z
        );
      }
      for (let i = 0; i < 4; i++) {
        linePositions.push(
          tier2Points[i].x, tier2Points[i].y, tier2Points[i].z,
          apexPoint.x, apexPoint.y, apexPoint.z
        );
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.4,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      rootGroup.add(lines);

      // Ascending spiral trajectory helix
      const spiralPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 60; i++) {
        const t = (i / 60) * Math.PI * 4;
        const radius = 1.8 * (1 - (i / 60) * 0.7);
        const y = (i / 60) * 2.8 - 1.4;
        spiralPoints.push(new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius));
      }
      const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
      const spiralGeo = new THREE.TubeGeometry(spiralCurve, 60, 0.035, 8, false);
      const spiralMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.8,
      });
      const spiralMesh = new THREE.Mesh(spiralGeo, spiralMat);
      rootGroup.add(spiralMesh);

      animateCallback = (delta) => {
        rootGroup.rotation.y += delta * 0.25;
        spiralMesh.rotation.y -= delta * 0.15;
      };
    } else {
      // 10. LEVIATHAN: ESG Truth Prism & Multi-Modal Regulatory Scanner
      const prismGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.7, 6);
      const prismMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      rootGroup.add(prism);

      const innerCrystalGeo = new THREE.OctahedronGeometry(0.7, 0);
      const innerCrystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.7,
      });
      const innerCrystal = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
      rootGroup.add(innerCrystal);

      // Input claim beam (amber ray)
      const inputBeamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.8, 0, 0),
        new THREE.Vector3(-0.7, 0, 0),
      ]);
      const inputBeamMat = new THREE.LineBasicMaterial({ color: 0xfbbf24 });
      const inputBeam = new THREE.Line(inputBeamGeo, inputBeamMat);
      rootGroup.add(inputBeam);

      // Verified green beam
      const verifiedBeamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.7, 0, 0),
        new THREE.Vector3(2.8, -1.2, 0.6),
      ]);
      const verifiedBeamMat = new THREE.LineBasicMaterial({ color: 0x10b981 });
      const verifiedBeam = new THREE.Line(verifiedBeamGeo, verifiedBeamMat);
      rootGroup.add(verifiedBeam);

      // Greenwashing violation beam (crimson)
      const flaggedBeamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.7, 0, 0),
        new THREE.Vector3(2.8, 1.2, -0.6),
      ]);
      const flaggedBeamMat = new THREE.LineBasicMaterial({ color: 0xf43f5e });
      const flaggedBeam = new THREE.Line(flaggedBeamGeo, flaggedBeamMat);
      rootGroup.add(flaggedBeam);

      // Concentric rings
      const ring1Geo = new THREE.TorusGeometry(2.1, 0.03, 16, 64);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.6,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      rootGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(2.4, 0.03, 16, 64);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.5,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = -Math.PI / 4;
      rootGroup.add(ring2);

      animateCallback = (delta) => {
        prism.rotation.y += delta * 0.3;
        prism.rotation.z += delta * 0.1;
        innerCrystal.rotation.y -= delta * 0.5;
        ring1.rotation.z += delta * 0.4;
        ring2.rotation.z -= delta * 0.3;
        rootGroup.rotation.y += delta * 0.12;
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
    const clock = new THREE.Clock();

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
          className={`absolute bottom-2 right-2 rounded bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 transition-opacity pointer-events-none ${isHovered ? "opacity-100" : "opacity-60"
            }`}
        >
          <span>Drag to orbit 3D</span>
        </div>
      )}
    </div>
  );
};

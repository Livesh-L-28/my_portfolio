import * as THREE from "three";

export interface FoundryChamber {
  id: string;
  name: string;
  project: string;
  subtitle: string;
  code: string;
  startProgress: number;
  endProgress: number;
  cameraPos: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  ambientColor: number;
  keyColor: number;
  fillColor: number;
  fogDensity: number;
}

export const FOUNDRY_CONFIG = {
  // Industrial Computational Architecture Palette
  colors: {
    obsidianVoid: 0x050608,
    graphiteMass: 0x0c0e14,
    structuralAlloy: 0x161a24,
    machinedSteel: 0x242a38,
    titaniumPanel: 0x3a4256,
    electricViolet: 0x8b5cf6,
    deepIndigo: 0x4f46e5,
    luminousCyan: 0x67e8f9,
    conduitCyan: 0x06b6d4,
    verifiedEmerald: 0x10b981,
    warningAmber: 0xf59e0b,
    threatRed: 0xef4444,
    clinicalCyan: 0x38bdf8,
    clinicalTaskLight: 0xe0f2fe,
    pureWhite: 0xffffff,
  },

  // 6 Connected Chambers of the AI Infrastructure Foundry
  chambers: [
    {
      id: "aegis-citadel",
      name: "AEGIS Control Citadel",
      project: "AEGIS Framework (PyPI: aegis-resilience)",
      subtitle: "7-Phase Autonomous Control Citadel & Fail-Closed Gatekeeper",
      code: "FOUNDRY_01 // AEGIS_CONTROL_CITADEL",
      startProgress: 0.0,
      endProgress: 0.18,
      cameraPos: new THREE.Vector3(0, 1.2, 9.5),
      cameraTarget: new THREE.Vector3(0, 0.4, 0),
      ambientColor: 0x06080e,
      keyColor: 0x8b5cf6,
      fillColor: 0x67e8f9,
      fogDensity: 0.022,
    },
    {
      id: "nexarag-archive",
      name: "NexaRAG Knowledge Foundry",
      project: "NexaRAG Hybrid Retrieval Platform",
      subtitle: "pgvector Semantic Vault + BM25 Lexical Archive + RRF Manifold",
      code: "FOUNDRY_02 // NEXARAG_KNOWLEDGE_ARCHIVE",
      startProgress: 0.18,
      endProgress: 0.38,
      cameraPos: new THREE.Vector3(1.6, 0.8, -3.2),
      cameraTarget: new THREE.Vector3(0.2, 0.2, -6.5),
      ambientColor: 0x070914,
      keyColor: 0x67e8f9,
      fillColor: 0x8b5cf6,
      fogDensity: 0.024,
    },
    {
      id: "firewall-vault",
      name: "LLMFirewall Security Vault",
      project: "LLMFirewall Core (PyPI: llmfirewall-core)",
      subtitle: "Layered Titanium Bulkheads, Inspection Gantry & Threat Quarantine",
      code: "FOUNDRY_03 // LLMFIREWALL_SECURITY_VAULT",
      startProgress: 0.38,
      endProgress: 0.60,
      cameraPos: new THREE.Vector3(-1.8, 1.4, -10.5),
      cameraTarget: new THREE.Vector3(0, 0.3, -14.0),
      ambientColor: 0x0a0712,
      keyColor: 0x8b5cf6,
      fillColor: 0xef4444,
      fogDensity: 0.023,
    },
    {
      id: "reliability-engine",
      name: "AI Reliability Verification Engine",
      project: "AI Reliability Test Suite (PyPI: aireliability)",
      subtitle: "Deterministic Pipeline Rails, Dual State Comparator & Assertion Matrix",
      code: "FOUNDRY_04 // AIRELIABILITY_TESTING_ENGINE",
      startProgress: 0.60,
      endProgress: 0.80,
      cameraPos: new THREE.Vector3(1.4, 0.9, -17.8),
      cameraTarget: new THREE.Vector3(0, 0.2, -21.5),
      ambientColor: 0x060914,
      keyColor: 0x10b981,
      fillColor: 0x67e8f9,
      fogDensity: 0.023,
    },
    {
      id: "medical-simulation",
      name: "Medical VR Simulation Chamber",
      project: "Venipuncture VR + MedicalTransformerLM",
      subtitle: "Clinical Workstation, Translucent Vascular Model & Spatial Guides",
      code: "FOUNDRY_05 // MEDICAL_VR_SIMULATION_CHAMBER",
      startProgress: 0.80,
      endProgress: 0.92,
      cameraPos: new THREE.Vector3(-1.4, 1.1, -25.2),
      cameraTarget: new THREE.Vector3(0, 0.3, -28.5),
      ambientColor: 0x060d1a,
      keyColor: 0x38bdf8,
      fillColor: 0x67e8f9,
      fogDensity: 0.020,
    },
    {
      id: "foundry-sanctum",
      name: "Foundry Observation Sanctum",
      project: "Livesh L — Autonomous AI & Systems Engineer",
      subtitle: "Monolithic Architectural Framing & High-Bandwidth Inbound Gateway",
      code: "FOUNDRY_06 // OBSERVATION_SANCTUM",
      startProgress: 0.92,
      endProgress: 1.0,
      cameraPos: new THREE.Vector3(0, 1.8, -32.5),
      cameraTarget: new THREE.Vector3(0, 0.6, -37.0),
      ambientColor: 0x050608,
      keyColor: 0x8b5cf6,
      fillColor: 0x67e8f9,
      fogDensity: 0.020,
    },
  ] as FoundryChamber[],

  // Damping / interpolation factors
  damping: {
    camera: 0.065,
    rotation: 0.04,
    parallax: 0.05,
    scroll: 0.08,
  },
};

// Aliases for compatibility
export const SCENE_CONFIG = {
  colors: {
    obsidian: FOUNDRY_CONFIG.colors.obsidianVoid,
    graphite: FOUNDRY_CONFIG.colors.graphiteMass,
    electricViolet: FOUNDRY_CONFIG.colors.electricViolet,
    luminousCyan: FOUNDRY_CONFIG.colors.luminousCyan,
    deepIndigo: FOUNDRY_CONFIG.colors.deepIndigo,
    emerald: FOUNDRY_CONFIG.colors.verifiedEmerald,
    warningAmber: FOUNDRY_CONFIG.colors.warningAmber,
    dangerRed: FOUNDRY_CONFIG.colors.threatRed,
    clinicalBlue: FOUNDRY_CONFIG.colors.clinicalCyan,
    white: FOUNDRY_CONFIG.colors.pureWhite,
  },
  worlds: FOUNDRY_CONFIG.chambers,
  particles: {
    desktopCount: 600,
    mobileCount: 300,
  },
  damping: FOUNDRY_CONFIG.damping,
};

export type WorldDefinition = FoundryChamber;

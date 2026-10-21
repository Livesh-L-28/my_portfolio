import * as THREE from "three";

export class ComputationalWorld {
  public rootGroup: THREE.Group;
  private milestoneGroups: THREE.Group[] = [];
  private pulseObjects: { mesh: THREE.Object3D; baseScale: number; speed: number }[] = [];
  private flowPackets: { mesh: THREE.Mesh; startZ: number; endZ: number; speed: number }[] = [];
  private neuralSynapses: THREE.LineSegments | null = null;
  private attentionRays: THREE.LineSegments | null = null;
  private ragContextBox: THREE.Mesh | null = null;
  private containerUnits: THREE.Mesh[] = [];
  private pipelineStages: THREE.Group[] = [];
  private highwayConduits: THREE.LineSegments | null = null;

  private isDark: boolean;

  constructor(isDark: boolean = true) {
    this.isDark = isDark;
    this.rootGroup = new THREE.Group();
    this.rootGroup.name = "ComputationalLandscape";

    // Build the continuous digital highway & 7 computational milestones
    this.buildHighwayConduits();
    this.buildChapter1Input();
    this.buildChapter2NeuralNetwork();
    this.buildChapter3Transformer();
    this.buildChapter4RAG();
    this.buildChapter5AIEngineering();
    this.buildChapter6Docker();
    this.buildChapter7CICD();
  }

  // Ground Path: Computational Data Highway
  private buildHighwayConduits() {
    const isDark = this.isDark;
    const highwayGroup = new THREE.Group();

    // Subtle grid lines along the path from z = 4 to z = -16
    const lineCoords: number[] = [];
    const zStart = 4;
    const zEnd = -16;
    const stepZ = 1.0;

    // Longitudinal guiding tracks
    for (let x = -2.5; x <= 2.5; x += 1.25) {
      lineCoords.push(x, -1.0, zStart, x, -1.0, zEnd);
    }

    // Transverse interval thresholds
    for (let z = zStart; z >= zEnd; z -= stepZ) {
      lineCoords.push(-2.5, -1.0, z, 2.5, -1.0, z);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x1e293b : 0xcfd8dc,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    this.highwayConduits = new THREE.LineSegments(lineGeo, lineMat);
    highwayGroup.add(this.highwayConduits);

    // Glowing Central Data Flow Conduits (Cobalt & Cyan)
    const conduitGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.4, -0.99, zStart),
      new THREE.Vector3(-0.4, -0.99, zEnd),
      new THREE.Vector3(0.4, -0.99, zStart),
      new THREE.Vector3(0.4, -0.99, zEnd),
    ]);
    const conduitMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
    });
    const centralConduits = new THREE.LineSegments(conduitGeo, conduitMat);
    highwayGroup.add(centralConduits);

    this.rootGroup.add(highwayGroup);
  }

  // Chapter 1: Data Ingestion & Token Boundary (z ~ 1.0 to 0.0)
  private buildChapter1Input() {
    const group = new THREE.Group();
    group.position.set(0, 0, 0);

    // Gateway Boundary Arch (clean computational portal frame)
    const frameGeo = new THREE.BoxGeometry(3.6, 2.8, 0.08);
    const frameEdges = new THREE.EdgesGeometry(frameGeo);
    const frameMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });
    const boundaryFrame = new THREE.LineSegments(frameEdges, frameMat);
    boundaryFrame.position.set(0, 0.4, 0.5);
    group.add(boundaryFrame);

    // Streaming Data Token Packets
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = 0; i < 18; i++) {
      const packetGeo = new THREE.BoxGeometry(0.12, 0.06, 0.22);
      const packet = new THREE.Mesh(packetGeo, packetMat);
      const startX = (Math.random() - 0.5) * 2.2;
      const startY = -0.6 + Math.random() * 1.6;
      packet.position.set(startX, startY, 2.8 - i * 0.2);
      group.add(packet);

      this.flowPackets.push({
        mesh: packet,
        startZ: 3.2,
        endZ: -0.2,
        speed: 0.6 + Math.random() * 0.4,
      });
    }

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 2: Neural Networks & Signal Propagation (z ~ -1.5)
  private buildChapter2NeuralNetwork() {
    const isDark = this.isDark;
    const group = new THREE.Group();
    group.position.set(0, 0, -1.8);

    const layerX = [-1.4, -0.6, 0.2, 1.0];
    const layerNodes: THREE.Vector3[][] = [];
    const nodeGeo = new THREE.SphereGeometry(0.08, 14, 14);

    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, // Violet
      emissive: 0x6d28d9,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    // 4 Layers: Input -> Hidden 1 -> Bottleneck Encoder -> Output/Decoder
    const layerSizes = [5, 7, 4, 6];
    layerSizes.forEach((count, lIdx) => {
      const x = layerX[lIdx];
      const nodes: THREE.Vector3[] = [];
      const yStep = 0.36;
      const startY = ((count - 1) * yStep) / 2;

      for (let i = 0; i < count; i++) {
        const y = startY - i * yStep;
        const pos = new THREE.Vector3(x, y + 0.3, 0);
        nodes.push(pos);

        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(pos);
        group.add(nodeMesh);
      }
      layerNodes.push(nodes);
    });

    // Synaptic connections between adjacent layers
    const synapseCoords: number[] = [];
    for (let l = 0; l < layerNodes.length - 1; l++) {
      const current = layerNodes[l];
      const next = layerNodes[l + 1];

      current.forEach((n1) => {
        next.forEach((n2) => {
          synapseCoords.push(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z);
        });
      });
    }

    const synapseGeo = new THREE.BufferGeometry();
    synapseGeo.setAttribute("position", new THREE.Float32BufferAttribute(synapseCoords, 3));
    const synapseMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: isDark ? 0.25 : 0.15,
    });
    this.neuralSynapses = new THREE.LineSegments(synapseGeo, synapseMat);
    group.add(this.neuralSynapses);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 3: Transformer & Multi-Head Attention Core (z ~ -3.6)
  private buildChapter3Transformer() {
    const group = new THREE.Group();
    group.position.set(0, 0, -3.8);

    // Multi-Head Attention Matrix Ring
    const torusGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.4,
      metalness: 0.85,
    });
    const attentionRing = new THREE.Mesh(torusGeo, torusMat);
    attentionRing.rotation.x = Math.PI / 3;
    attentionRing.position.set(0, 0.4, 0);
    group.add(attentionRing);

    // Residual Skip Conduit (outer bypass curve)
    const curvePoints = [
      new THREE.Vector3(-1.6, -0.6, 0),
      new THREE.Vector3(-2.0, 0.4, 0.6),
      new THREE.Vector3(-1.6, 1.4, 0),
      new THREE.Vector3(0, 1.6, 0),
      new THREE.Vector3(1.6, 1.4, 0),
      new THREE.Vector3(2.0, 0.4, 0.6),
      new THREE.Vector3(1.6, -0.6, 0),
    ];
    const bypassCurve = new THREE.CatmullRomCurve3(curvePoints);
    const bypassGeo = new THREE.TubeGeometry(bypassCurve, 32, 0.03, 8, false);
    const bypassMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Amber
      transparent: true,
      opacity: 0.75,
    });
    const bypassMesh = new THREE.Mesh(bypassGeo, bypassMat);
    group.add(bypassMesh);

    // Central Query-Key-Value Attention Beacons
    const qkvColors = [0x38bdf8, 0x8b5cf6, 0x10b981];
    const qkvPositions = [
      new THREE.Vector3(-0.6, 0.4, 0),
      new THREE.Vector3(0, 0.7, 0.2),
      new THREE.Vector3(0.6, 0.4, 0),
    ];

    qkvPositions.forEach((pos, idx) => {
      const qkvGeo = new THREE.OctahedronGeometry(0.14, 0);
      const qkvMat = new THREE.MeshStandardMaterial({
        color: qkvColors[idx],
        metalness: 0.9,
        roughness: 0.1,
      });
      const qkvMesh = new THREE.Mesh(qkvGeo, qkvMat);
      qkvMesh.position.copy(pos);
      group.add(qkvMesh);
      this.pulseObjects.push({ mesh: qkvMesh, baseScale: 1.0, speed: 2.0 + idx * 0.5 });
    });

    // Dynamic Attention Rays linking Q, K, V
    const rayCoords: number[] = [
      -0.6, 0.4, 0, 0, 0.7, 0.2,
      0, 0.7, 0.2, 0.6, 0.4, 0,
      0.6, 0.4, 0, -0.6, 0.4, 0,
    ];
    const rayGeo = new THREE.BufferGeometry();
    rayGeo.setAttribute("position", new THREE.Float32BufferAttribute(rayCoords, 3));
    const rayMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
    });
    this.attentionRays = new THREE.LineSegments(rayGeo, rayMat);
    group.add(this.attentionRays);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 4: NexaRAG Hybrid Retrieval Pipeline (z ~ -5.8)
  private buildChapter4RAG() {
    const group = new THREE.Group();
    group.position.set(0, 0, -5.8);

    // 1. Ingested Document Slices (Chunking)
    const chunkMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.7,
      metalness: 0.7,
      roughness: 0.3,
    });

    for (let i = 0; i < 4; i++) {
      const chunkGeo = new THREE.BoxGeometry(0.35, 0.45, 0.03);
      const chunk = new THREE.Mesh(chunkGeo, chunkMat);
      chunk.position.set(-1.8, 0.2 + i * 0.22, -0.2 + i * 0.1);
      chunk.rotation.y = 0.3;
      group.add(chunk);
    }

    // 2. pgvector Dense Cluster & BM25 Sparse Lattice
    const vecPointsCount = 45;
    const vecPositions = new Float32Array(vecPointsCount * 3);
    for (let i = 0; i < vecPointsCount; i++) {
      const radius = 0.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * radius;

      vecPositions[i * 3] = -0.5 + r * Math.sin(phi) * Math.cos(theta);
      vecPositions[i * 3 + 1] = 0.5 + r * Math.sin(phi) * Math.sin(theta);
      vecPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const vecGeo = new THREE.BufferGeometry();
    vecGeo.setAttribute("position", new THREE.BufferAttribute(vecPositions, 3));
    const vecMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const vecCluster = new THREE.Points(vecGeo, vecMat);
    group.add(vecCluster);

    // 3. Reciprocal Rank Fusion (RRF k=60) Junction Node
    const rrfGeo = new THREE.DodecahedronGeometry(0.2, 0);
    const rrfMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald
      metalness: 0.85,
      roughness: 0.15,
    });
    const rrfNode = new THREE.Mesh(rrfGeo, rrfMat);
    rrfNode.position.set(0.5, 0.5, 0);
    group.add(rrfNode);
    this.pulseObjects.push({ mesh: rrfNode, baseScale: 1.0, speed: 3.0 });

    // 4. 7-Tier Dynamic Context Assembly Window (6,000 token container)
    const contextGeo = new THREE.BoxGeometry(0.8, 0.95, 0.5);
    const contextEdges = new THREE.EdgesGeometry(contextGeo);
    const contextMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.85,
    });
    this.ragContextBox = new THREE.LineSegments(contextEdges, contextMat) as unknown as THREE.Mesh;
    this.ragContextBox.position.set(1.6, 0.5, 0);
    group.add(this.ragContextBox);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 5: AI-Forward Engineering & Code Intelligence (z ~ -7.8)
  private buildChapter5AIEngineering() {
    const group = new THREE.Group();
    group.position.set(0, 0, -7.8);

    // Abstract Syntax Tree (AST) Hierarchy
    const astNodes = [
      new THREE.Vector3(0, 1.2, 0), // Root: Module AST
      new THREE.Vector3(-0.8, 0.6, 0), // Class: EvidenceGraph
      new THREE.Vector3(0.8, 0.6, 0), // Class: Localizer
      new THREE.Vector3(-1.2, 0.0, 0), // Func: parse_ast
      new THREE.Vector3(-0.4, 0.0, 0), // Func: correlate_trace
      new THREE.Vector3(0.4, 0.0, 0), // Func: seed_lock
      new THREE.Vector3(1.2, 0.0, 0), // Func: verify_assertion
    ];

    const astLines = [
      astNodes[0], astNodes[1],
      astNodes[0], astNodes[2],
      astNodes[1], astNodes[3],
      astNodes[1], astNodes[4],
      astNodes[2], astNodes[5],
      astNodes[2], astNodes[6],
    ];

    const astGeo = new THREE.BufferGeometry().setFromPoints(astLines);
    const astMat = new THREE.LineBasicMaterial({
      color: 0xf97316, // Coral Orange
      transparent: true,
      opacity: 0.55,
    });
    const astTreeLines = new THREE.LineSegments(astGeo, astMat);
    group.add(astTreeLines);

    // AST Nodes
    const astNodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const astNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xc2410c,
      emissiveIntensity: 0.5,
      metalness: 0.8,
    });

    astNodes.forEach((pos) => {
      const node = new THREE.Mesh(astNodeGeo, astNodeMat);
      node.position.copy(pos);
      group.add(node);
    });

    // Sub-millisecond In-Process Firewall Inspection Ring (LLMFirewall Core)
    const fwRingGeo = new THREE.TorusGeometry(1.6, 0.035, 16, 64);
    const fwRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet security gate
      transparent: true,
      opacity: 0.65,
    });
    const fwRing = new THREE.Mesh(fwRingGeo, fwRingMat);
    fwRing.rotation.y = Math.PI / 4;
    fwRing.position.set(0, 0.6, 0);
    group.add(fwRing);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 6: Docker Containerization & Microservice Mesh (z ~ -9.8)
  private buildChapter6Docker() {
    const isDark = this.isDark;
    const group = new THREE.Group();
    group.position.set(0, 0, -9.8);

    // 3 Lightweight Microservice Computational Units (FastAPI Gateway, pgvector DB, Redis Cache)
    const unitConfigs = [
      { name: "FastAPI Gateway", x: -1.2, y: 0.4, color: 0x38bdf8 },
      { name: "pgvector HNSW", x: 0, y: 0.8, color: 0x10b981 },
      { name: "Redis Cache", x: 1.2, y: 0.4, color: 0xf43f5e },
    ];

    unitConfigs.forEach((cfg) => {
      const unitGroup = new THREE.Group();
      unitGroup.position.set(cfg.x, cfg.y, 0);

      // Clean cubic microservice enclosure
      const boxGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
      const boxMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0xe2e8f0,
        roughness: 0.25,
        metalness: 0.85,
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      unitGroup.add(boxMesh);

      // Frame border
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: cfg.color });
      const edgeMesh = new THREE.LineSegments(edges, edgeMat);
      unitGroup.add(edgeMesh);

      // Health Indicator Beacon
      const beaconGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 0.35, 0);
      unitGroup.add(beacon);

      group.add(unitGroup);
      this.containerUnits.push(unitGroup as unknown as THREE.Mesh);
    });

    // Inter-Service Networking Bus Line
    const busGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.2, 0.4, 0),
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(1.2, 0.4, 0),
    ]);
    const busMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const busLine = new THREE.LineSegments(busGeo, busMat);
    group.add(busLine);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  // Chapter 7: CI/CD Pipeline & Verified Delivery (z ~ -11.8)
  private buildChapter7CICD() {
    const group = new THREE.Group();
    group.position.set(0, 0, -11.8);

    // 4 Sequential Gate Rings along the delivery trajectory
    const stageColors = [0x38bdf8, 0x8b5cf6, 0x10b981, 0x10b981];
    const stageX = [-1.5, -0.5, 0.5, 1.5];

    stageX.forEach((x, idx) => {
      const stageGroup = new THREE.Group();
      stageGroup.position.set(x, 0.4, 0);

      // Gate Arch
      const gateGeo = new THREE.TorusGeometry(0.38, 0.03, 16, 32);
      const gateMat = new THREE.MeshStandardMaterial({
        color: stageColors[idx],
        metalness: 0.9,
        roughness: 0.1,
      });
      const gate = new THREE.Mesh(gateGeo, gateMat);
      stageGroup.add(gate);

      // Passed Checkmark Diamond
      const checkGeo = new THREE.OctahedronGeometry(0.1, 0);
      const checkMat = new THREE.MeshBasicMaterial({ color: stageColors[idx] });
      const check = new THREE.Mesh(checkGeo, checkMat);
      check.position.set(0, 0, 0);
      stageGroup.add(check);

      group.add(stageGroup);
      this.pipelineStages.push(stageGroup);
      this.pulseObjects.push({ mesh: check, baseScale: 1.0, speed: 2.5 + idx * 0.3 });
    });

    // Continuous delivery conduit connecting stages
    const conduitGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.8, 0.4, 0),
      new THREE.Vector3(1.8, 0.4, 0),
    ]);
    const conduitMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.75,
    });
    const conduit = new THREE.Line(conduitGeo, conduitMat);
    group.add(conduit);

    this.milestoneGroups.push(group);
    this.rootGroup.add(group);
  }

  public update(time: number, delta: number) {
    // 1. Animate flowing data packets in Chapter 1
    this.flowPackets.forEach((p) => {
      p.mesh.position.z -= delta * p.speed * 2.0;
      if (p.mesh.position.z < p.endZ) {
        p.mesh.position.z = p.startZ;
      }
    });

    // 2. Animate pulsing neural nodes and beacons
    this.pulseObjects.forEach((p) => {
      const scale = p.baseScale + Math.sin(time * p.speed) * 0.18;
      p.mesh.scale.set(scale, scale, scale);
    });

    // 3. Subtle rotation of container units
    this.containerUnits.forEach((u, idx) => {
      u.rotation.y += delta * (0.2 + idx * 0.1);
    });

    // 4. Subtle rotation of pipeline gate rings
    this.pipelineStages.forEach((s, idx) => {
      s.rotation.z += delta * (0.2 + idx * 0.1);
    });

    // 5. Attention rays subtle opacity oscillation
    if (this.attentionRays) {
      const mat = this.attentionRays.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(time * 3.0) * 0.25;
    }

    // 6. RAG Context box pulse
    if (this.ragContextBox) {
      this.ragContextBox.rotation.y += delta * 0.15;
    }
  }

  public dispose() {
    this.rootGroup.clear();
    this.milestoneGroups = [];
    this.pulseObjects = [];
    this.flowPackets = [];
    this.containerUnits = [];
    this.pipelineStages = [];
  }
}

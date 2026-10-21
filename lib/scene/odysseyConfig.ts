
export interface OdysseyChapter {
  id: string;
  number: string;
  title: string;
  tagline: string;
  concept: string;
  projectTie: string;
  projectSlug?: string;
  startProgress: number;
  endProgress: number;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  characterPos: [number, number, number];
  characterRotY: number;
  keyColor: number;
  accentColor: number;
  metrics: { label: string; value: string }[];
  technicalDetails: {
    title: string;
    description: string;
    subpoints: string[];
  }[];
}

export const ODYSSEY_CHAPTERS: OdysseyChapter[] = [
  {
    id: "chapter-01-input",
    number: "01",
    title: "Data Ingestion & Token Boundary",
    tagline: "Where unstructured reality meets computational order.",
    concept: "Input streams, raw byte quantization, token vocabulary mapping, and boundary parsing.",
    projectTie: "Foundation for all language models and multimodal ingestion engines.",
    startProgress: 0.0,
    endProgress: 0.14,
    cameraPos: [0, 1.4, 6.8],
    cameraTarget: [0, 0.4, 0],
    characterPos: [0, -1.0, 1.6],
    characterRotY: 0,
    keyColor: 0x38bdf8, // Sky / Cobalt
    accentColor: 0x6366f1, // Indigo
    metrics: [
      { label: "Token Ingestion", value: "Sub-millisecond" },
      { label: "Vocabulary Size", value: "32K - 128K tokens" },
      { label: "Data Framing", value: "UTF-8 Normalized" },
    ],
    technicalDetails: [
      {
        title: "Byte-Pair & Unigram Tokenization",
        description: "Raw human text, sensor inputs, and code are decomposed into atomic numerical token identifiers via reversible statistical vocabularies.",
        subpoints: [
          "Preserves structural syntax, indentation tabs, and code tokens verbatim.",
          "Special token injection: BOS, EOS, PAD, and role separator anchors.",
          "Normalization handles Unicode composition and whitespace consistency.",
        ],
      },
      {
        title: "Input Boundary Gate",
        description: "The computational gateway enforces strict token budget constraints before tensors enter GPU memory.",
        subpoints: [
          "Static sequence length clipping & dynamic sliding window batching.",
          "Pre-allocation of continuous tensor buffers to prevent memory thrashing.",
        ],
      },
    ],
  },
  {
    id: "chapter-02-neural",
    number: "02",
    title: "Neural Networks & Signal Propagation",
    tagline: "Layered transformations through high-dimensional weight matrices.",
    concept: "Forward propagation, matrix multiplication, non-linear activations, and encoder-decoder manifolds.",
    projectTie: "Deep learning fundamentals powering custom representation learning.",
    startProgress: 0.14,
    endProgress: 0.28,
    cameraPos: [1.8, 1.6, 5.2],
    cameraTarget: [0.2, 0.2, -1.0],
    characterPos: [0.3, -1.0, -0.4],
    characterRotY: -0.2,
    keyColor: 0x8b5cf6, // Electric Violet
    accentColor: 0x06b6d4, // Cyan
    metrics: [
      { label: "Matrix Operations", value: "FP16 Tensor Cores" },
      { label: "Activation Function", value: "GELU / SiLU" },
      { label: "Hidden Dimensions", value: "768 -> 4,096 d_model" },
    ],
    technicalDetails: [
      {
        title: "Feed-Forward Vector Mapping",
        description: "Discrete token values are mapped through affine transformations W·x + b, projecting features across latent manifolds.",
        subpoints: [
          "Non-linear activation functions prevent model collapse into trivial linear regressions.",
          "Gradient flow is maintained through residual normalization (RMSNorm / LayerNorm).",
        ],
      },
      {
        title: "Encoder-Decoder Compression",
        description: "Encoder stages compress input entropy into concentrated latent vectors; decoder stages reconstruct or generate autoregressive sequences.",
        subpoints: [
          "Information bottleneck forces dense conceptual abstraction.",
          "Dimensional reduction isolates invariant structural patterns from noise.",
        ],
      },
    ],
  },
  {
    id: "chapter-03-transformer",
    number: "03",
    title: "Transformer & Multi-Head Attention",
    tagline: "Dynamically routing relationships across every token in context.",
    concept: "Scaled dot-product attention, Query-Key-Value projection, positional encodings, and residual skip conduits.",
    projectTie: "Medical Transformer LM — 110M parameter clinical language model.",
    projectSlug: "venipuncture-vr",
    startProgress: 0.28,
    endProgress: 0.42,
    cameraPos: [-1.6, 1.8, 4.4],
    cameraTarget: [0, 0.3, -2.6],
    characterPos: [-0.4, -1.0, -2.2],
    characterRotY: 0.15,
    keyColor: 0x6366f1, // Indigo
    accentColor: 0xf59e0b, // Amber
    metrics: [
      { label: "Attention Heads", value: "12 - 32 Parallel Heads" },
      { label: "Positional Encoding", value: "RoPE Rotary Embeddings" },
      { label: "Context Complexity", value: "O(N²) Scaled Dot-Product" },
    ],
    technicalDetails: [
      {
        title: "Query, Key, and Value Dynamics",
        description: "Every token projects into Query (what I seek), Key (what I offer), and Value (what I contain) subspaces to compute pairwise relevance scores.",
        subpoints: [
          "Attention(Q,K,V) = softmax(Q·Kᵀ / √d_k) · V routes contextual information.",
          "Multi-head partitioning allows concurrent tracking of syntax, semantics, and long-range dependencies.",
        ],
      },
      {
        title: "Residual Bypass & Feed-Forward Blocks",
        description: "Residual skip connections x + Sublayer(x) ensure unimpeded gradient flow during backpropagation across hundreds of transformer layers.",
        subpoints: [
          "LayerNorm stabilizes hidden state variance throughout deep stacks.",
          "Two-layer MLP expands token dimensionality by 4x before projection back to d_model.",
        ],
      },
    ],
  },
  {
    id: "chapter-04-rag",
    number: "04",
    title: "RAG & Knowledge Retrieval",
    tagline: "Grounding generative models in deterministic enterprise facts.",
    concept: "Document extraction, recursive chunking, pgvector HNSW indexing, BM25 lexical search, RRF k=60, and cross-encoder reranking.",
    projectTie: "NexaRAG — Enterprise Document Intelligence & Hybrid RAG Platform.",
    projectSlug: "nexarag",
    startProgress: 0.42,
    endProgress: 0.58,
    cameraPos: [2.0, 1.5, 3.8],
    cameraTarget: [0, 0.2, -4.5],
    characterPos: [0.2, -1.0, -4.2],
    characterRotY: -0.25,
    keyColor: 0x06b6d4, // Cyan
    accentColor: 0x10b981, // Emerald
    metrics: [
      { label: "Retrieval P99", value: "24.5 ms" },
      { label: "Hybrid RRF", value: "k=60 Calibrated" },
      { label: "Context Budget", value: "7 Tiers · 6K Tokens" },
      { label: "Citation Accuracy", value: "99.2% Grounded" },
    ],
    technicalDetails: [
      {
        title: "Structure-Aware Chunking & Dense Embeddings",
        description: "Documents are split at structural boundaries (headings, tables, paragraphs) with 512-token windows and 64-token overlap, then indexed in PostgreSQL via pgvector HNSW cosine indexing.",
        subpoints: [
          "Eliminates boundary truncation of critical alphanumeric codes and table cells.",
          "HNSW graph navigation enables sub-15ms nearest-neighbor vector traversal.",
        ],
      },
      {
        title: "Dual-Engine Hybrid Retrieval & Cross-Encoder",
        description: "Parallel dense vector search and sparse BM25 lexical token search are fused through Reciprocal Rank Fusion (RRF), followed by cross-encoder joint scoring.",
        subpoints: [
          "Dense search captures semantic concepts; BM25 captures exact IDs, part numbers, and policy codes.",
          "Cross-encoder computes full self-attention across query-passage pairs to eliminate false positives.",
        ],
      },
    ],
  },
  {
    id: "chapter-05-ai-engineering",
    number: "05",
    title: "AI-Forward Engineering & Code Intelligence",
    tagline: "Software engineering augmented by AST analysis, evidence graphs, and safety governors.",
    concept: "Abstract syntax tree parsing, dependency graph resolution, deterministic test assertions, and in-process firewall inspection.",
    projectTie: "AEGIS AI, LLMFirewall Core, and AI Reliability.",
    projectSlug: "llmfirewall-core",
    startProgress: 0.58,
    endProgress: 0.72,
    cameraPos: [-1.8, 1.6, 3.5],
    cameraTarget: [0, 0.3, -6.5],
    characterPos: [-0.3, -1.0, -6.0],
    characterRotY: 0.3,
    keyColor: 0xf97316, // Coral Orange
    accentColor: 0x8b5cf6, // Violet
    metrics: [
      { label: "Firewall Latency", value: "0.022 ms In-Process" },
      { label: "Determinism Score", value: "100.0% Exact Match" },
      { label: "Network Overhead", value: "0 bytes (Pure Local)" },
      { label: "Safety Controls", value: "Fail-Closed Gatekeeper" },
    ],
    technicalDetails: [
      {
        title: "Code Intelligence & Evidence Graphs (AEGIS AI)",
        description: "Analyzes codebase ASTs, call graphs, and telemetry traces to localize fault lines and synthesize verifiable remediation paths.",
        subpoints: [
          "Parser extracts function signatures, class hierarchies, and import dependencies.",
          "Evidence graph correlates runtime exceptions to exact source line spans.",
          "Dry-run sandbox execution validates proposed diffs before applying changes.",
        ],
      },
      {
        title: "Deterministic Testing & In-Process Firewalls",
        description: "AI Reliability locks random seeds and verifies floating-point drift, while LLMFirewall Core intercepts DAN jailbreaks and PII under 0.02ms latency.",
        subpoints: [
          "Seed-locked agent trajectories guarantee reproducible evaluation pipelines.",
          "Pure in-process regex & entropy heuristics eliminate third-party network vulnerabilities.",
        ],
      },
    ],
  },
  {
    id: "chapter-06-docker",
    number: "06",
    title: "Docker & Container Infrastructure",
    tagline: "Encapsulating intelligence into immutable, reproducible runtime units.",
    concept: "Multi-stage container builds, microservice network fabrics, resource isolation, and health probe telemetry.",
    projectTie: "FastAPI CI/CD Lab — Containerized AI Microservices.",
    projectSlug: "fastapi-cicd-lab",
    startProgress: 0.72,
    endProgress: 0.86,
    cameraPos: [1.7, 1.4, 3.2],
    cameraTarget: [0, 0.2, -8.6],
    characterPos: [0.2, -1.0, -8.2],
    characterRotY: -0.15,
    keyColor: 0x38bdf8, // Docker Blue
    accentColor: 0x10b981, // Emerald
    metrics: [
      { label: "Base Image", value: "python:3.11-slim" },
      { label: "Build Stages", value: "Multi-stage minimal" },
      { label: "Security Profile", value: "Non-root UID 10001" },
      { label: "Health Checks", value: "HTTP /healthz 200 OK" },
    ],
    technicalDetails: [
      {
        title: "Lightweight Multi-Stage Containerization",
        description: "Build dependencies (compilers, headers) are isolated in builder stages; runtime images contain only stripped wheels and the application binary.",
        subpoints: [
          "Reduces attack surface and container footprint from 1.4GB down to <160MB.",
          "Executes with read-only root filesystems and explicit resource limits (cgroups).",
        ],
      },
      {
        title: "Inter-Service Mesh & Dependency Topologies",
        description: "FastAPI gateways connect over private container networks to PostgreSQL pgvector nodes, Redis cache instances, and local LLM runtime workers.",
        subpoints: [
          "Liveness and readiness probes prevent traffic routing to uninitialized models.",
          "Graceful SIGTERM handlers drain in-flight inference queries before termination.",
        ],
      },
    ],
  },
  {
    id: "chapter-07-cicd",
    number: "07",
    title: "CI/CD & Verified Software Delivery",
    tagline: "Automated pipelines ensuring no untested code reaches production.",
    concept: "Continuous integration, linting gates, automated Pytest suites, container image push, and health verification.",
    projectTie: "Published PyPI distributions & automated test matrices across 1,291 tests.",
    projectSlug: "aireliability",
    startProgress: 0.86,
    endProgress: 1.0,
    cameraPos: [0, 1.6, 3.0],
    cameraTarget: [0, 0.3, -10.8],
    characterPos: [0, -1.0, -10.4],
    characterRotY: 0,
    keyColor: 0x10b981, // Verified Emerald
    accentColor: 0x6366f1, // Indigo
    metrics: [
      { label: "Total Tests", value: "1,291 Automated" },
      { label: "Test Pass Rate", value: "100.0% Passing" },
      { label: "Delivery Pipeline", value: "GitHub Actions + PyPI" },
      { label: "Deployment", value: "Zero-Downtime Blue/Green" },
    ],
    technicalDetails: [
      {
        title: "Multi-Tier Automated Verification Matrix",
        description: "Every pull request triggers static analysis (Ruff, Mypy), security scanning (Trivy), and automated Pytest test suites running in parallel.",
        subpoints: [
          "608 tests for LLMFirewall Core (~1.42s execution time).",
          "362 deterministic assertions for AI Reliability framework.",
          "321 hybrid retrieval & citation grounding tests for NexaRAG.",
        ],
      },
      {
        title: "Immutable Release Packaging & PyPI Distribution",
        description: "Verified artifacts are signed and published directly to PyPI and container registries with semantic versioning and changelogs.",
        subpoints: [
          "pip install aireliability (v1.4.0)",
          "pip install aegis-resilience (v0.1.0, import aegis)",
          "pip install llmfirewall-core (v1.1.0)",
        ],
      },
    ],
  },
];

export const ODYSSEY_CONFIG = {
  colors: {
    bgInk: 0x05070f,
    gridInk: 0x0d1322,
    conduitCobalt: 0x38bdf8,
    electricViolet: 0x8b5cf6,
    coralOrange: 0xf97316,
    emeraldVerified: 0x10b981,
    amberWarm: 0xf59e0b,
    pureWhite: 0xffffff,
  },
  totalChapters: ODYSSEY_CHAPTERS.length,
};

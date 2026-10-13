import { ProjectData } from "@/lib/types";

export const PROJECTS: ProjectData[] = [
  {
    id: "nexarag",
    slug: "nexarag",
    title: "NexaRAG",
    fullName: "NexaRAG — Enterprise Document Intelligence & Hybrid RAG Platform",
    tagline: "Hybrid retrieval, context orchestration, and citation-grounded LLM synthesis for complex enterprise documents.",
    category: "LLM & RAG",
    categories: ["LLM & RAG", "AI Security", "Full Stack"],
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "React",
      "TypeScript",
      "Docker",
      "BM25",
      "Reciprocal Rank Fusion",
      "Cross-Encoder Reranking",
      "NVIDIA NeMo Guardrails",
    ],
    keyAchievement: "321 passing tests · ~24.5 ms average retrieval latency · 7-tier context fusion",
    stats: [
      { label: "Retrieval Latency", value: "~24.5 ms" },
      { label: "Automated Tests", value: "321 passed" },
      { label: "Context Fusion", value: "7 tiers" },
      { label: "Token Budget", value: "6,000 tokens" },
    ],
    summary:
      "A production-grade document intelligence platform merging RAG, Cache-Augmented Generation (CAG), and Memory-Augmented Generation (MAG) with hybrid vector/lexical search, NeMo Guardrails, and citation tracking.",
    description:
      "Enterprise document intelligence requires more than naive vector similarity. NexaRAG combines dense embeddings in pgvector with sparse BM25 indexing via Reciprocal Rank Fusion (RRF), cross-encoder reranking, and dynamic 6-route query classification. It enforces tenant isolation, prompt-injection defenses, and token-exact citation tracking over streaming SSE responses.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/Nexa_RAG",
      demoVideoUrl: "/videos/nexa_rag_demo.mov",
      demoVideoType: "local",
    },
    thumbnail: "/images/projects/nexarag.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "ingest",
          label: "Document Ingestion",
          role: "Ingestion",
          tech: "PDF/DOCX/TXT Parsers",
          description: "Extracts text, preserves headings and bounding boxes, applies token-aware recursive chunking.",
        },
        {
          id: "dense",
          label: "pgvector Index",
          role: "Vector Search",
          tech: "PostgreSQL 16 + pgvector",
          description: "HNSW index over 768-dim embeddings with multi-tenant row-level security isolation.",
        },
        {
          id: "sparse",
          label: "BM25 Search",
          role: "Lexical Search",
          tech: "BM25 Okapi Engine",
          description: "Captures exact alphanumeric identifiers, acronyms, and technical codes often missed by embeddings.",
        },
        {
          id: "rrf",
          label: "Rank Fusion (RRF)",
          role: "Hybrid Scoring",
          tech: "Reciprocal Rank Fusion",
          description: "Merges dense and sparse ranks with k=60 hyperparameter to produce balanced recall candidates.",
        },
        {
          id: "rerank",
          label: "Cross-Encoder",
          role: "Precision Filter",
          tech: "MS-MARCO MiniLM",
          description: "Full self-attention cross-scoring between query and candidate passages to eliminate false positives.",
        },
        {
          id: "fusion",
          label: "7-Tier Context Fusion",
          role: "Context Builder",
          tech: "Dynamic 6K Token Budget",
          description: "Orchestrates retrieved chunks, cached knowledge (CAG), and conversational memory (MAG) into budget.",
        },
        {
          id: "guardrails",
          label: "NeMo Guardrails",
          role: "Security Boundary",
          tech: "NVIDIA NeMo 3-Tier",
          description: "Fail-closed input/output safety checks, prompt injection interception, and PII masking.",
        },
        {
          id: "generation",
          label: "LLM & SSE Streaming",
          role: "Response Engine",
          tech: "FastAPI + React SSE",
          description: "Streams citation-anchored tokens with clickable page-level verification overlays.",
        },
      ],
      connections: [
        { from: "ingest", to: "dense", label: "Embeddings" },
        { from: "ingest", to: "sparse", label: "Inverted Index" },
        { from: "dense", to: "rrf", label: "Top-K Dense" },
        { from: "sparse", to: "rrf", label: "Top-K Lexical" },
        { from: "rrf", to: "rerank", label: "Candidate Pool" },
        { from: "rerank", to: "fusion", label: "Top Filtered" },
        { from: "fusion", to: "guardrails", label: "Synthesized Prompt" },
        { from: "guardrails", to: "generation", label: "Clean Context" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Naive RAG architectures suffer from semantic drift, missed alphanumeric identifiers (e.g. part numbers, policy codes), hallucinated citations, and catastrophic context overflow when ingesting complex 100+ page enterprise reports.",
      engineeringGoals: [
        "Sub-30ms retrieval latency combining dense semantic search and lexical exact matching.",
        "Zero hallucinated citations with verifiable document page and line anchors.",
        "Hard multi-tenant isolation and fail-closed prompt-injection defenses.",
        "Predictable context assembly staying within a strict 6,000-token allocation.",
      ],
      systemArchitecture:
        "NexaRAG utilizes a layered architecture separating ingestion, dual-index retrieval, cross-encoder reranking, context orchestration, and guardrailed generation. State and vectors reside in PostgreSQL 16 with pgvector, while FastAPI handles non-blocking SSE streams to the React client.",
      pipelineSteps: [
        {
          step: "01",
          title: "Intelligent Ingestion & Chunking",
          detail: "Documents are parsed into structure-aware blocks preserving headers, tables, and page metadata, chunked at 512 tokens with 64-token overlap.",
        },
        {
          step: "02",
          title: "Dual-Engine Hybrid Retrieval",
          detail: "Parallel execution queries pgvector (HNSW cosine similarity) and an in-memory BM25 index. Candidate ranks are fused via Reciprocal Rank Fusion (RRF).",
        },
        {
          step: "03",
          title: "Cross-Encoder Precision Reranking",
          detail: "A distilled MS-MARCO cross-encoder scores query-passage pairs jointly, promoting passages with strong factual alignment.",
        },
        {
          step: "04",
          title: "7-Tier Context Fusion (RAG + CAG + MAG)",
          detail: "Balances live retrieval, pre-computed cached facts (CAG), and conversation history (MAG) under a dynamic 6,000-token budget ceiling.",
        },
        {
          step: "05",
          title: "Guardrails & Grounded SSE Streaming",
          detail: "NeMo Guardrails validates input/output against prompt injection and secret leakage, streaming tokens with page-specific citation anchors.",
        },
      ],
      implementationHighlights: [
        "Implemented 6-route dynamic query router classifying inputs into factual, exploratory, code, summary, multi-hop, or conversational modes.",
        "Built custom SSE (Server-Sent Events) streaming protocol that synchronizes token delivery with citation metadata frames.",
        "Engineered row-level security (RLS) tenant isolation inside PostgreSQL so users cannot retrieve across organization silos.",
        "Created end-to-end Docker Compose setup for instant offline reproducibility.",
      ],
      technicalTradeoffs: [
        {
          decision: "BM25 + pgvector over standalone vector-only search",
          rationale: "Pure dense vectors frequently fail on exact codes, invoice IDs, and specific regulation names. Hybrid RRF achieved 28% higher retrieval recall in enterprise documents.",
          alternativeRejected: "Vector-only embedding retrieval with OpenAI text-embedding-3-small.",
        },
        {
          decision: "Local cross-encoder reranking vs reranking LLM API",
          rationale: "Local cross-encoder executes in ~14ms without adding external API costs or network jitter to the hot retrieval loop.",
          alternativeRejected: "Third-party Cohere Rerank API.",
        },
      ],
      testingAndEvaluation: {
        testCount: 321,
        methodology: "321 automated pytest unit, integration, and security tests covering query classification, chunk boundary integrity, RLS tenant leak prevention, and RRF rank order stability.",
        metrics: [
          "Average retrieval latency: ~24.5 ms across test corpus",
          "Pass rate: 100% (321 / 321 automated tests)",
          "Citation precision: 96.4% on structured test question bank",
        ],
      },
      securityReliability: [
        "NVIDIA NeMo Guardrails 3-tier pipeline intercepts prompt injection and jailbreaks before LLM dispatch.",
        "Automatic regex and entropy scanning for credentials, JWT tokens, and PII.",
        "JWT-based role-based access control (RBAC) with strict tenant namespace partitioning.",
      ],
      keyLearnings: [
        "RRF parameter k=60 proved resilient across variable corpus sizes without hyperparameter fine-tuning per tenant.",
        "Context budget capping at 6,000 tokens prevented downstream model degradation caused by 'lost in the middle' phenomena.",
      ],
      localDeploymentInstructions: [
        "git clone https://github.com/Livesh-L-28/Nexa_RAG.git",
        "cd Nexa_RAG",
        "docker compose up --build",
        "Access frontend at http://localhost:3000 and FastAPI docs at http://localhost:8000/docs",
      ],
    },
  },
  {
    id: "venipuncture-vr",
    slug: "venipuncture-vr",
    title: "Venipuncture VR",
    fullName: "Venipuncture VR — AI-Powered Medical Training, Simulation & Assessment",
    tagline: "Immersive medical training simulator built with Unity & C# featuring a structured 16-step workflow, scenario-based learning, and a voice-powered RAG assistant.",
    category: "LLM & RAG",
    categories: ["LLM & RAG", "Machine Learning", "Full Stack"],
    featured: true,
    technologies: [
      "Unity",
      "C#",
      "OpenXR",
      "BNG VR Interaction Framework",
      "Python",
      "FastAPI",
      "Whisper",
      "RAG",
      "PostgreSQL",
      "pgvector",
      "BM25",
      "PyTorch",
      "LLMs",
    ],
    keyAchievement: "Structured 16-step procedural workflow · Training & Test assessment modes · Voice-guided RAG clinical assistant",
    stats: [
      { label: "VR Workflow", value: "16-Step Protocol" },
      { label: "Simulator Modes", value: "Training & Test" },
      { label: "Knowledge RAG", value: "pgvector + BM25" },
      { label: "Speech Engine", value: "Whisper STT / TTS" },
    ],
    summary:
      "An immersive medical training simulator built with Unity and C# that enables learners to practice blood collection procedures through interactive 3D equipment, scenario-based learning, and an AI-powered voice assistant.",
    description:
      "Venipuncture VR is an immersive medical training simulator built with Unity and C#. It enables learners to practise blood collection procedures through guided training, scenario-based learning, and dedicated test environments. The project combines interactive 3D medical equipment, a structured 16-step procedural workflow, and an AI-powered medical assistant using FastAPI, speech recognition, Retrieval-Augmented Generation (RAG), and configurable LLM providers.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/MEDICAL_LLM",
      demoVideoUrl: "/videos/medical_llm_demo.mov",
      demoVideoType: "local",
    },
    thumbnail: "/images/projects/medical.png",
    architectureDiagram: {
      nodes: [
        {
          id: "vr_env",
          label: "Unity VR Simulator",
          role: "VR Client",
          tech: "Unity 3D · OpenXR · BNG Framework",
          description: "Manages spatial hand tracking, haptics, and physics interactions with syringes, needles, and tourniquets.",
        },
        {
          id: "procedure_engine",
          label: "16-Step Procedural Engine",
          role: "State Engine",
          tech: "C# State Machine",
          description: "Tracks sequential steps: patient ID, vein palpation, tourniquet application, needle insertion angle (15–30°), and flashback.",
        },
        {
          id: "mode_controller",
          label: "Scenario & Assessment Mode",
          role: "Evaluation",
          tech: "Training & Test Scenes",
          description: "Switches between guided training (visual highlights and tips) and blind test mode with objective error scoring.",
        },
        {
          id: "voice_pipeline",
          label: "Whisper Speech Processing",
          role: "Voice Channel",
          tech: "Whisper STT + TTS WebSockets",
          description: "Captures hands-free questions from learners inside VR and returns audio clinical explanations.",
        },
        {
          id: "rag_retrieval",
          label: "Medical Knowledge RAG",
          role: "Retrieval",
          tech: "pgvector + BM25 Hybrid Search",
          description: "Indexes clinical guidelines, needle gauges, and contraindications in PostgreSQL with metadata filtering.",
        },
        {
          id: "llm_assistant",
          label: "AI Medical Assistant",
          role: "Clinical Guidance",
          tech: "FastAPI + Configurable LLMs",
          description: "Synthesizes medically grounded, conversational responses constrained strictly by retrieved literature.",
        },
      ],
      connections: [
        { from: "vr_env", to: "procedure_engine", label: "User Interaction" },
        { from: "procedure_engine", to: "mode_controller", label: "Step Verification" },
        { from: "vr_env", to: "voice_pipeline", label: "Voice Query" },
        { from: "voice_pipeline", to: "rag_retrieval", label: "Expanded Query" },
        { from: "rag_retrieval", to: "llm_assistant", label: "Grounded Context" },
        { from: "llm_assistant", to: "vr_env", label: "TTS Voice Guidance" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Venipuncture is one of the most critical foundational clinical procedures, yet traditional medical education relies on static rubber manikins or high-stakes live practice. Learners lack an immersive, repeatable simulation platform where they can develop physical procedural muscle memory while asking real-time clinical questions without breaking the sterile field.",
      engineeringGoals: [
        "Develop an immersive virtual reality training environment in Unity with C#, OpenXR, and BNG VR Interaction Framework.",
        "Implement a structured 16-step procedural workflow enforcing proper hygiene, vein palpation, insertion angle, and sharps disposal.",
        "Provide dedicated Training Mode (guided practice with interactive hints) and Test Mode (unassisted scenario-based evaluation).",
        "Engineer a hands-free AI medical assistant with Whisper speech recognition and text-to-speech for real-time procedural guidance.",
        "Build a hybrid RAG backend in FastAPI leveraging BM25 and PostgreSQL with pgvector for verified medical knowledge retrieval.",
      ],
      systemArchitecture:
        "Venipuncture VR couples an OpenXR-based Unity simulation client with an asynchronous FastAPI intelligence server. In VR, learners interact with 3D phlebotomy equipment using realistic grab points and snap zones governed by a 16-step state machine. Questions asked aloud are captured via microphone, transcribed via Whisper, grounded against a dual pgvector + BM25 medical store, and spoken back as audio guidance via TTS.",
      pipelineSteps: [
        {
          step: "01",
          title: "OpenXR & Spatial Interaction Initialization",
          detail: "Configures VR head-mounted displays and hand controllers using the BNG VR Interaction Framework for physical tool manipulation.",
        },
        {
          step: "02",
          title: "16-Step Procedural Execution",
          detail: "Enforces strict protocol: PPE sanitization, vein palpation, tourniquet placement, alcohol swabbing, 15–30° needle insertion, flashback verification, tube filling, and sharps disposal.",
        },
        {
          step: "03",
          title: "Scenario-Based Mode Routing",
          detail: "Routes learners between Training Mode (interactive visual highlights and immediate error feedback) and Test Mode (blind assessment with rubric logging).",
        },
        {
          step: "04",
          title: "Hands-Free Whisper Speech Capture",
          detail: "Records learner audio queries directly inside the VR headset and streams audio to FastAPI for Whisper speech-to-text transcription.",
        },
        {
          step: "05",
          title: "Hybrid Knowledge Retrieval (pgvector + BM25)",
          detail: "Executes simultaneous dense semantic search in PostgreSQL pgvector and sparse lexical matching in BM25 for medical terms, tube additives, and contraindications.",
        },
        {
          step: "06",
          title: "Grounded LLM Synthesis & Voice Feedback",
          detail: "Synthesizes clinically accurate guidance constrained by retrieved literature, converts response to audio via TTS, and streams back to the headset.",
        },
      ],
      implementationHighlights: [
        "Built in Unity with C#, OpenXR, and BNG VR Interaction Framework for realistic physics and tactile grab mechanics.",
        "Structured 16-step procedural engine validating physical insertion angles, order of operations, and hygiene compliance.",
        "Dual-scene architecture: Training Mode for guided practice and Test Mode for objective assessment.",
        "Voice-powered AI Medical Assistant powered by FastAPI, Whisper ASR, and configurable LLM providers.",
        "Hybrid clinical RAG system combining PostgreSQL pgvector embeddings with BM25 lexical precision.",
      ],
      technicalTradeoffs: [
        {
          decision: "BNG VR Interaction Framework over custom physics algorithms",
          rationale: "Provides rock-solid grab physics, snap points, two-handed manipulation, and multi-device OpenXR support out of the box, saving hundreds of hours of low-level physics debugging.",
          alternativeRejected: "Custom physics grab implementation from scratch.",
        },
        {
          decision: "Hybrid PostgreSQL pgvector + BM25 over dense-only vector search",
          rationale: "Medical equipment codes, tube cap colors (e.g. lavender EDTA vs red serum), and phlebotomy abbreviations require exact keyword precision combined with semantic reasoning.",
          alternativeRejected: "Dense vector-only embeddings without keyword indexing.",
        },
        {
          decision: "Decoupled Training vs Test mode scene architecture",
          rationale: "Ensures the assessment mode cannot be compromised or influenced by training hints or step assists, guaranteeing objective evaluations.",
          alternativeRejected: "Single monolithic scene with conditional UI flags.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Benchmarked across simulated clinical scenarios with 16-step procedural assertions, automated error classification, and voice AI latency profiling.",
        metrics: [
          "16 procedural milestones strictly tracked and graded",
          "Sub-1.5s round-trip voice query latency for real-time VR feedback",
          "100% compliance with WHO and CDC phlebotomy guidelines",
        ],
      },
      securityReliability: [
        "Strict procedural safety gates: skipping vein disinfection or failing sharps disposal immediately flags critical safety violations in assessment mode.",
        "Fail-closed medical knowledge fallback whenever RAG similarity scores drop below clinical confidence thresholds.",
      ],
      keyLearnings: [
        "Combining spatial VR muscle memory practice with voice-driven conversational RAG creates a significantly more effective learning loop than passive video lectures or static simulation manikins.",
        "Decoupling procedural state logic from visual feedback allows seamless expansion to additional clinical nursing and surgical procedures.",
      ],
      disclaimer: "Educational medical training prototype. Built for simulation, training, and assessment purposes.",
    },
  },
  {
    id: "llmfirewall-core",
    slug: "llmfirewall-core",
    title: "LLMFirewall Core",
    fullName: "LLMFirewall Core — Defense-in-Depth Security Framework for AI & LLMs",
    tagline: "Sub-millisecond in-process firewall intercepting prompt injection, PII leaks, and rogue tool execution.",
    category: "AI Security",
    categories: ["AI Security", "Reliability Engineering", "Developer Infrastructure"],
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "ASGI",
      "Security Engineering",
      "Policy-as-Code",
      "pytest",
      "Entropy Analyzers",
      "AST Analysis",
    ],
    keyAchievement: "608+ tests passed · Published on PyPI (llmfirewall-core) · ~0.02ms median latency",
    stats: [
      { label: "PyPI Release", value: "llmfirewall-core" },
      { label: "Automated Tests", value: "608 passed" },
      { label: "Median Overhead", value: "~0.02 ms" },
      { label: "Defense Layers", value: "6 in-depth" },
    ],
    summary:
      "An open-source, provider-agnostic security framework published on PyPI. It acts as an in-process gatekeeper for LLMs, detecting adversarial injections, redacting PII, and sandboxing agent tool calls.",
    description:
      "LLMFirewall is an in-process application-layer defense system that sits between users, autonomous agents, retrieval systems, and models. Published on PyPI as llmfirewall-core, it enforces Policy-as-Code with sub-millisecond execution latency, intercepting direct and indirect prompt injection, masking sensitive credentials and PII, sandboxing tool execution, and maintaining cryptographic audit trails.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/LLMFirewall",
      pypiUrl: "https://pypi.org/project/llmfirewall-core/",
      publishedPackageName: "llmfirewall-core",
      installCommand: "pip install llmfirewall-core",
      documentationUrl: "https://github.com/Livesh-L-28/LLMFirewall#readme",
    },
    thumbnail: "/images/projects/llmfirewall.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "input",
          label: "Prompt / Tool Request",
          role: "Untrusted Input",
          tech: "User / Agent Invocation",
          description: "Incoming natural language prompt, document payload, or proposed agent tool call.",
        },
        {
          id: "injection",
          label: "Injection Detector",
          role: "Adversarial Filter",
          tech: "Heuristic & Semantic Patterns",
          description: "Scans for jailbreaks, prompt leaks, system prompt overrides, and base64 obfuscations.",
        },
        {
          id: "pii",
          label: "Secret & PII Redactor",
          role: "Data Privacy",
          tech: "High-Entropy & Regex Analyzers",
          description: "Identifies API keys, private tokens, passwords, SSNs, credit cards, and emails; applies irreversible masking.",
        },
        {
          id: "policy",
          label: "Policy-as-Code Engine",
          role: "Authorization",
          tech: "Deterministic Rule Evaluator",
          description: "Validates caller role, tenant quotas, tool action boundaries, and blast radius limits.",
        },
        {
          id: "sandbox",
          label: "Tool Call Sandbox",
          role: "Execution Guard",
          tech: "AST & Argument Sanitizer",
          description: "Prevents SSRF, SQL injection, and path traversal in AI agent function arguments.",
        },
        {
          id: "audit",
          label: "Cryptographic Audit Trail",
          role: "Observability",
          tech: "Immutable Event Logger",
          description: "Records SHA-256 event digests, violation codes, and policy decisions for compliance audits.",
        },
      ],
      connections: [
        { from: "input", to: "injection", label: "Raw Payload" },
        { from: "injection", to: "pii", label: "Clean of Jailbreak" },
        { from: "pii", to: "policy", label: "Redacted Payload" },
        { from: "policy", to: "sandbox", label: "Authorized Calls" },
        { from: "sandbox", to: "audit", label: "Execution Trace" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Traditional Web Application Firewalls (WAFs) operate on HTTP payloads and know nothing about prompt semantics, indirect document poisoning, or autonomous agent tool execution parameters. Meanwhile, model-based guardrails add 500-1500ms latency and high token costs.",
      engineeringGoals: [
        "Provide in-process security with sub-millisecond overhead (<0.1ms).",
        "Zero external database or cloud API dependencies.",
        "Deterministic Policy-as-Code for enterprise compliance (OWASP Top 10 for LLMs, NIST AI RMF).",
        "Publish as a clean, pip-installable package on PyPI.",
      ],
      systemArchitecture:
        "LLMFirewall operates as an ASGI middleware or Python function decorator. Payloads pass through a multi-stage validation chain before dispatch to the downstream LLM or agent runtime. If an anomaly or unauthorized action is detected, it fails closed with structured error objects.",
      pipelineSteps: [
        {
          step: "01",
          title: "Token Pre-Processing & De-obfuscation",
          detail: "Decodes hidden Unicode homoglyphs, zero-width characters, and base64 payloads to defeat bypass attempts.",
        },
        {
          step: "02",
          title: "Adversarial Prompt Injection Detection",
          detail: "Matches against known injection vectors, roleplay jailbreaks, and system override constructs.",
        },
        {
          step: "03",
          title: "High-Entropy Secret Detection & PII Redaction",
          detail: "Calculates Shannon entropy to identify high-risk strings like AWS keys and tokens, replacing them with typed placeholders.",
        },
        {
          step: "04",
          title: "Agent Tool-Call Argument Sandboxing",
          detail: "Inspects proposed tool arguments to prevent SSRF against internal IP ranges and directory traversal.",
        },
        {
          step: "05",
          title: "Immutable Structured Audit Logging",
          detail: "Emits structured JSON audit records containing violation classifications and event fingerprints.",
        },
      ],
      implementationHighlights: [
        "Published llmfirewall-core to the official Python Package Index (PyPI).",
        "Engineered an ultra-fast compiled regex and entropy scanning engine measuring ~0.02ms median latency.",
        "Created an ASGI middleware drop-in for FastAPI that intercepts payloads at the network boundary.",
        "Implemented 608 automated tests with comprehensive attack payload suites.",
      ],
      technicalTradeoffs: [
        {
          decision: "In-process deterministic rules over secondary LLM judge",
          rationale: "Secondary LLM judges introduce 400-1000ms latency and their own susceptibility to adversarial persuasion. In-process deterministic checks execute in 0.02ms with zero token cost.",
          alternativeRejected: "Llama-Guard / OpenAI Moderation API roundtrips.",
        },
      ],
      testingAndEvaluation: {
        testCount: 608,
        methodology: "608 automated test cases covering adversarial prompt injection datasets, credential leakage patterns, tool argument tampering, and concurrency stress tests.",
        metrics: [
          "608 passing unit and integration tests",
          "Sub-millisecond overhead: ~0.02 ms median execution latency",
          "Zero false positives across standard benign prompt baseline corpus",
        ],
      },
      securityReliability: [
        "Fail-closed architecture: Any unhandled exception during security evaluation causes the request to be rejected safely.",
        "No network egress required, preventing side-channel data exfiltration.",
      ],
      keyLearnings: [
        "Adversaries frequently use zero-width Unicode characters to evade naive string matching; canonicalization must precede all heuristic scans.",
      ],
      localDeploymentInstructions: [
        "pip install llmfirewall-core",
        "from llmfirewall import Firewall",
        "fw = Firewall(policy='strict')",
        "result = fw.inspect('User prompt here')",
      ],
    },
  },
  {
    id: "aireliability",
    slug: "aireliability",
    title: "AI Reliability Engine",
    fullName: "AI Reliability Engine (aireliability) — Deterministic Testing & Regression",
    tagline: "Deterministic assertion framework, tool-call validation, and regression testing for LLM workflows and autonomous agents.",
    category: "Reliability Engineering",
    categories: ["Reliability Engineering", "AI Security", "Developer Infrastructure"],
    featured: true,
    technologies: [
      "Python",
      "Pydantic",
      "pytest",
      "Ruff",
      "GitHub Actions",
      "PyPI",
      "CLI (airel)",
      "Execution Tracing",
    ],
    keyAchievement: "362 passing tests · Published on PyPI (aireliability) · Developer CLI (airel)",
    stats: [
      { label: "PyPI Package", value: "aireliability" },
      { label: "Passing Tests", value: "362 passed" },
      { label: "Developer CLI", value: "airel" },
      { label: "Assertion Engine", value: "Deterministic" },
    ],
    summary:
      "A published open-source testing framework on PyPI that introduces deterministic unit and regression testing to non-deterministic AI agents and multi-step LLM workflows.",
    description:
      "Evaluating AI agents with vague vibe-checks fails in production. aireliability provides programmatic assertions over tool invocation sequences, argument schemas, execution budgets, cost ceilings, and latency thresholds. With 362 passing tests and the dedicated `airel` CLI, it integrates directly into GitHub Actions CI/CD pipelines to catch model regressions before code ships.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/aireliability_testing",
      pypiUrl: "https://pypi.org/project/aireliability/",
      publishedPackageName: "aireliability",
      installCommand: "pip install aireliability",
      documentationUrl: "https://github.com/Livesh-L-28/aireliability_testing#readme",
    },
    thumbnail: "/images/projects/aireliability.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "spec",
          label: "Test Specification",
          role: "Test Definition",
          tech: "Pydantic Schemas / YAML",
          description: "Declares expected tool sequence, argument constraints, latency budgets, and cost thresholds.",
        },
        {
          id: "tracer",
          label: "Execution Tracer",
          role: "Telemetry Capture",
          tech: "Runtime Interceptor",
          description: "Records full call graph, function arguments, returns, token consumption, and timestamps.",
        },
        {
          id: "assertions",
          label: "Deterministic Assertions",
          role: "Validation Engine",
          tech: "Order & Schema Matcher",
          description: "Enforces tool order invariants, argument type safety, and output contracts.",
        },
        {
          id: "taxonomy",
          label: "Failure Taxonomy",
          role: "Classification",
          tech: "Structured Error Engine",
          description: "Categorizes failures into tool misfire, argument hallucination, timeout, or budget breach.",
        },
        {
          id: "cli",
          label: "airel CLI & CI/CD",
          role: "Developer Workflow",
          tech: "GitHub Actions + CLI",
          description: "Emits junit/json reports and blocks pull requests that trigger agent behavioral regressions.",
        },
      ],
      connections: [
        { from: "spec", to: "tracer", label: "Test Harness" },
        { from: "tracer", to: "assertions", label: "Trace Log" },
        { from: "assertions", to: "taxonomy", label: "Evaluation" },
        { from: "taxonomy", to: "cli", label: "Regression Report" },
      ],
    },
    caseStudy: {
      problemStatement:
        "AI agents are inherently stochastic. When an agent fails, developers struggle to distinguish between normal output variance, tool hallucination, argument corruption, or breaking model updates.",
      engineeringGoals: [
        "Create deterministic assertions over agent execution properties that must never be stochastic (e.g. tool sequence, schema validity, cost budget).",
        "Build a developer-friendly CLI (`airel`) that runs in CI/CD alongside pytest.",
        "Classify agent failures into a standardized failure taxonomy.",
        "Publish as a clean, dependency-minimal Python package on PyPI.",
      ],
      systemArchitecture:
        "The framework wraps agent runtimes with an execution tracer that records every tool call and model transition. Test suites define declarative assertions using Pydantic models. Traces are validated deterministically, producing rich terminal diffs and CI exit codes.",
      pipelineSteps: [
        {
          step: "01",
          title: "Deterministic Test Definition",
          detail: "Engineers declare required invariants: e.g. tool 'search_database' must execute before 'send_notification'.",
        },
        {
          step: "02",
          title: "Non-Intrusive Trace Capture",
          detail: "Intercepts runtime execution to capture exact payload arguments, response structures, latency, and tokens.",
        },
        {
          step: "03",
          title: "Contract & Invariant Evaluation",
          detail: "Validates inputs against Pydantic schemas and ensures tool call ordering matches the directed acyclic graph.",
        },
        {
          step: "04",
          title: "Failure Taxonomy & Regression Reporting",
          detail: "Generates clear diffs indicating whether the failure was an argument schema mismatch, sequence violation, or cost overrun.",
        },
      ],
      implementationHighlights: [
        "Published aireliability on PyPI, currently downloaded and tested across multiple Python versions.",
        "Built developer CLI `airel` supporting commands like `airel run` and `airel diff`.",
        "362 automated tests in the project repository verifying assertion semantics across diverse agent runtimes.",
      ],
      technicalTradeoffs: [
        {
          decision: "Deterministic trace assertion over LLM-as-a-judge",
          rationale: "LLM-as-a-judge tests are noisy, expensive, and fail to catch subtle schema violations. Deterministic code assertions provide 100% reproducible test outcomes in CI.",
          alternativeRejected: "Prompt-based LLM evaluation frameworks.",
        },
      ],
      testingAndEvaluation: {
        testCount: 362,
        methodology: "362 automated pytest tests validating trace recorders, argument validator schemas, assertion matchers, and CLI entry points.",
        metrics: [
          "362 passing tests",
          "Reproducible CLI test suite across clean virtual environments",
          "Zero flaky tests in GitHub Actions CI runs",
        ],
      },
      securityReliability: [
        "Catches unauthorized tool invocation attempts before production release.",
        "Enforces hard timeouts and dollar-denominated cost ceilings on agent execution.",
      ],
      keyLearnings: [
        "Separating execution tracing from assertion evaluation allowed testing mock and live agent runs with identical test suites.",
      ],
      localDeploymentInstructions: [
        "pip install aireliability",
        "airel --help",
        "airel test ./tests/agent_suite.py",
      ],
    },
  },
  {
    id: "aegis-framework",
    slug: "aegis-framework",
    title: "AEGIS Framework",
    fullName: "AEGIS Framework — AI Reliability & Controlled Autonomous Remediation",
    tagline: "Autonomous incident investigation, evidence correlation, and approval-gated infrastructure remediation.",
    category: "Reliability Engineering",
    categories: ["Reliability Engineering", "Developer Infrastructure", "AI Security"],
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic",
      "Prometheus",
      "OpenTelemetry",
      "Loki",
      "Kubernetes",
      "Docker",
      "GitHub Actions",
    ],
    keyAchievement: "Published on PyPI (aegis-resilience) · Multimodal telemetry correlation · Fail-closed gates",
    stats: [
      { label: "PyPI Package", value: "aegis-resilience" },
      { label: "Safety Controls", value: "Fail-Closed" },
      { label: "Telemetry", value: "O-Tel + Loki + Prom" },
      { label: "Remediation", value: "Approval-Gated" },
    ],
    summary:
      "An open-source reliability engineering framework published on PyPI as aegis-resilience. It correlates metrics, logs, and traces to diagnose production incidents, reason over root causes, and execute controlled, policy-gated infrastructure remediation.",
    description:
      "When production incidents hit at 3 AM, manual triage is slow and error-prone. AEGIS correlates multimodal observability signals from Prometheus, Grafana Loki, and OpenTelemetry. An AI reasoning engine formulates failure hypotheses, while a strict fail-closed safety governor ensures destructive actions can never execute without cryptographic approval and dry-run validation.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/AEGIS-Framework",
      pypiUrl: "https://pypi.org/project/aegis-resilience/",
      publishedPackageName: "aegis-resilience",
      installCommand: "pip install aegis-resilience",
      documentationUrl: "https://github.com/Livesh-L-28/AEGIS-Framework#readme",
    },
    thumbnail: "/images/projects/aegis.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "obs",
          label: "Observability Ingestion",
          role: "Telemetry Ingestion",
          tech: "Prometheus + Loki + O-Tel",
          description: "Continuous ingestion of error spikes, anomalous log entries, and distributed trace spans.",
        },
        {
          id: "correlate",
          label: "Incident Correlator",
          role: "Evidence Synthesis",
          tech: "Graph Correlation Engine",
          description: "Connects latency degradation in frontend services to specific database lock contention.",
        },
        {
          id: "reason",
          label: "Root-Cause Reasoner",
          role: "AI Hypothesis Engine",
          tech: "Constrained LLM Reasoning",
          description: "Formulates root cause hypotheses backed by citations to ingested log snippets and metrics.",
        },
        {
          id: "governor",
          label: "Safety Governor",
          role: "Policy Enforcement",
          tech: "Fail-Closed Gatekeeper",
          description: "Enforces autonomy tiers (Level 0–3), blast radius limits, and mandatory human approval gates.",
        },
        {
          id: "remediate",
          label: "Controlled Remediation",
          role: "Execution",
          tech: "Kubernetes & Cloud Actions",
          description: "Executes dry-run preview, scaling operations, or container restarts with rollback safeties.",
        },
        {
          id: "verify",
          label: "Recovery Verification",
          role: "Health Check",
          tech: "Cryptographic Audit Trail",
          description: "Monitors post-action health metrics to confirm stabilization before closing incident.",
        },
      ],
      connections: [
        { from: "obs", to: "correlate", label: "Multimodal Signals" },
        { from: "correlate", to: "reason", label: "Evidence Bundle" },
        { from: "reason", to: "governor", label: "Proposed Action" },
        { from: "governor", to: "remediate", label: "Authorized Execution" },
        { from: "remediate", to: "verify", label: "Post-Remediation Health" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Autonomous remediation bots frequently cause cascading outages because they act on hallucinations or lack safety controls to contain blast radiuses when diagnosing distributed systems failures.",
      engineeringGoals: [
        "Correlate telemetry across Prometheus (metrics), Loki (logs), and OpenTelemetry (distributed traces).",
        "Enforce fail-closed bounded autonomy: AI can recommend, but cannot execute high-risk actions without explicit authorization.",
        "Implement dry-run remediation modes and automatic rollback if recovery metrics fail.",
        "Maintain cryptographic SHA-256 audit trails of all incident events.",
      ],
      systemArchitecture:
        "AEGIS separates the read-only observability and diagnosis layer from the action authorization engine. All remediation actions are typed Pydantic models with schema-validated parameters. A human approval gate or strict policy filter must sign every remediation plan.",
      pipelineSteps: [
        {
          step: "01",
          title: "Multimodal Incident Ingestion",
          detail: "Monitors Prometheus alerts and pulls correlated Loki log bursts and OpenTelemetry trace traces.",
        },
        {
          step: "02",
          title: "Evidence Correlation & Hypothesis Building",
          detail: "Synthesizes clues into an incident evidence bundle, filtering out unrelated background noise.",
        },
        {
          step: "03",
          title: "Policy-Based Action Authorization",
          detail: "Evaluates action against autonomy budget: Level 0 (observe), Level 1 (read-only diagnostics), Level 2 (low-risk restart), Level 3 (high-risk scaling/rollback requiring human signoff).",
        },
        {
          step: "04",
          title: "Dry-Run & Controlled Execution",
          detail: "Applies planned change against Kubernetes or Docker APIs in dry-run mode first, then commits.",
        },
        {
          step: "05",
          title: "Post-Action Recovery Verification",
          detail: "Monitors SLOs for 5 minutes post-action; initiates automated rollback if error rates do not subside.",
        },
      ],
      implementationHighlights: [
        "Published aegis-resilience on PyPI.",
        "Integrated fail-closed security controls using llmfirewall-core for prompt-injection defense on incident summaries.",
        "Validated end-to-end incident lifecycles including controlled Kubernetes pod restarts and horizontal pod autoscaler adjustments.",
      ],
      technicalTradeoffs: [
        {
          decision: "Mandatory human-in-the-loop for destructive actions",
          rationale: "Unsupervised AI remediation carries catastrophic risks of cascading deletion in production clusters. Approval gates provide complete safety while cutting triage time by 80%.",
          alternativeRejected: "Fully autonomous unchecked execution loops.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Simulated multi-service chaos tests inducing memory leaks, thread pool exhaustion, and upstream network partitions.",
        metrics: [
          "Zero unauthorized action executions across all test scenarios",
          "Incident correlation time under 8 seconds from alert trigger",
          "100% cryptographic audit trail fidelity verified",
        ],
      },
      securityReliability: [
        "Cryptographic audit trails record actor signatures, timestamps, and state before/after every remediation.",
        "Built-in kill switch disables all autonomous actions across the fleet instantly.",
      ],
      keyLearnings: [
        "Clear differentiation between AI recommendations and framework authorization is critical for operator trust in mission-critical SRE tooling.",
      ],
      localDeploymentInstructions: [
        "pip install aegis-resilience",
        "aegis --version",
        "aegis diagnose --prometheus http://localhost:9090",
      ],
    },
  },
  {
    id: "fastapi-cicd-lab",
    slug: "fastapi-cicd-lab",
    title: "FastAPI CI/CD Lab",
    fullName: "FastAPI CI/CD Lab — Containerized API & Deployment Pipeline",
    tagline: "Reproducible FastAPI backend, multi-stage Docker builds, PostgreSQL integration, and hardened GitHub Actions.",
    category: "Developer Infrastructure",
    categories: ["Developer Infrastructure", "Full Stack"],
    featured: false,
    technologies: [
      "FastAPI",
      "Python",
      "Docker",
      "GitHub Actions",
      "Ruff",
      "pytest",
      "PostgreSQL",
      "AWS",
    ],
    keyAchievement: "Multi-stage Docker builds · Automated linting & pytest suite · GHCR container packaging",
    stats: [
      { label: "CI Pipeline", value: "GitHub Actions" },
      { label: "Linter / Formatter", value: "Ruff" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Packaging", value: "Multi-stage Docker" },
    ],
    summary:
      "A production-style FastAPI backend and automated CI/CD lab featuring Ruff linting, pytest integration suites, multi-stage Docker builds, and container networking.",
    description:
      "A developer lab focused on bulletproof backend deployment workflows. Features automated linting with Ruff, comprehensive pytest test suites, multi-stage Docker container builds optimizing image size, container networking debugging, and automated CI workflows.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/fastapi-cicd-lab",
    },
    thumbnail: "/images/projects/fastapicicd.jpg",
    caseStudy: {
      problemStatement:
        "Backend microservices frequently break during deployment due to mismatched Python environments, slow un-cached Docker builds, and unverified database migrations in CI.",
      engineeringGoals: [
        "Achieve sub-90-second CI run times using Ruff and cached Docker layers.",
        "Ensure parity between local development and cloud container execution.",
        "Validate PostgreSQL database connectivity and migrations inside ephemeral CI runners.",
      ],
      systemArchitecture:
        "The repository uses GitHub Actions to orchestrate linting, unit tests, Docker builds, and container verification. A multi-stage Dockerfile produces slim production images by separating build dependencies from the final runtime image.",
      pipelineSteps: [
        { step: "01", title: "Lint & Format Check", detail: "Ruff validates code style and checks for common Python antipatterns in <1s." },
        { step: "02", title: "Automated Testing", detail: "pytest executes API endpoint tests with an ephemeral PostgreSQL service container." },
        { step: "03", title: "Multi-Stage Docker Build", detail: "Constructs a minimal production image, minimizing attack surface and image size." },
        { step: "04", title: "Container Health Verification", detail: "Spins up the built container to verify `/health` endpoint response before publishing." },
      ],
      implementationHighlights: [
        "Configured hardened GitHub Actions workflows with branch protection requirements.",
        "Optimized Docker layer caching to reduce repeated CI build times by over 60%.",
        "Configured PostgreSQL integration tests with clean teardown hooks.",
      ],
      technicalTradeoffs: [
        {
          decision: "Ruff over Flake8 + Black + isort",
          rationale: "Ruff is 10-100x faster than traditional Python linters, drastically accelerating CI feedback loops.",
          alternativeRejected: "Flake8 + Black combination.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Full test matrix running across Python 3.11 and 3.12 with mock external services.",
        metrics: ["100% CI pass rate", "Docker image reduced by 65% via multi-stage build"],
      },
      securityReliability: [
        "Containers run as non-root users inside Docker containers.",
        "Secret scanning integrated into CI pipeline.",
      ],
      keyLearnings: [
        "Designing test suites around ephemeral PostgreSQL containers catches real-world SQL constraint errors that sqlite in-memory mocks hide.",
      ],
      localDeploymentInstructions: [
        "git clone https://github.com/Livesh-L-28/fastapi-cicd-lab.git",
        "cd fastapi-cicd-lab",
        "docker build -t fastapi-lab .",
        "docker run -p 8000:8000 fastapi-lab",
      ],
    },
  },
  {
    id: "stock-price-prediction",
    slug: "stock-price-prediction",
    title: "Stock Price Prediction",
    fullName: "Stock Price Prediction — Stacked LSTM Time-Series Forecasting",
    tagline: "Time-series forecasting using historical stock market data and two-layer stacked LSTM networks.",
    category: "Machine Learning",
    categories: ["Machine Learning"],
    featured: false,
    technologies: [
      "Python",
      "TensorFlow/Keras",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Flask",
    ],
    keyAchievement: "Under 4% MAPE across top 100 blue chips · RMSE/MAE ratio 1.25 · Live on Render",
    stats: [
      { label: "Reported MAPE", value: "< 4%" },
      { label: "RMSE / MAE Ratio", value: "1.25" },
      { label: "Architecture", value: "Stacked 2-Layer LSTM" },
      { label: "Live Deployment", value: "Hosted on Render" },
    ],
    summary:
      "A deep learning time-series forecasting system using historical market data and two-layer stacked LSTM networks, hosted as a live interactive web application.",
    description:
      "Time-series financial modeling using historical equities data. Implements careful train/test split preserving temporal causality, moving-average feature engineering, and a two-layer stacked LSTM network with dropout regularization to mitigate overfitting. Hosted live on Render.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/Stock_price_prediction",
      liveUrl: "https://alphapulse-stock-predictor-xo4h.onrender.com/",
    },
    thumbnail: "/images/projects/stock.jpg",
    caseStudy: {
      problemStatement:
        "Financial market series exhibit non-stationary distributions and high noise-to-signal ratios. Standard regression models fail to capture sequential temporal dependencies without experiencing data leakage.",
      engineeringGoals: [
        "Implement strict chronological train/test splitting to prevent look-ahead bias.",
        "Design a 2-layer stacked LSTM architecture with dropout to avoid overfitting noisy market fluctuations.",
        "Achieve low MAPE across top blue-chip securities.",
        "Deploy a working interactive forecasting interface.",
      ],
      systemArchitecture:
        "Data is ingested, normalized via MinMaxScaler, transformed into rolling 60-day sequence windows, and passed through stacked LSTM layers with dropout. Predictions are denormalized and visualized against actual market prices.",
      pipelineSteps: [
        { step: "01", title: "Data Ingestion & Cleaning", detail: "Fetches historical adjusted close prices, handling missing trading days and splits." },
        { step: "02", title: "Feature Engineering & Scaling", detail: "Computes exponential moving averages and normalizes data to [0, 1] range." },
        { step: "03", title: "Sliding Window Transformation", detail: "Constructs 60-day historical feature matrices to predict day t+1." },
        { step: "04", title: "Stacked LSTM Training", detail: "Trains 2-layer LSTM with 50 units each and 0.2 dropout, optimizing Adam with MSE loss." },
      ],
      implementationHighlights: [
        "Achieved reported under 4% Mean Absolute Percentage Error (MAPE) across top 100 blue-chip stocks.",
        "Maintained RMSE/MAE ratio of 1.25, indicating few extreme outlier prediction errors.",
        "Deployed the forecasting application to Render as an interactive tool.",
      ],
      technicalTradeoffs: [
        {
          decision: "Stacked LSTM over standard feed-forward networks",
          rationale: "Recurrent LSTM gates preserve sequential dependency over rolling time windows far better than vanilla MLPs.",
          alternativeRejected: "Simple linear regression or shallow multi-layer perceptron.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Backtested across historical blue-chip market cycles with out-of-sample test splits.",
        metrics: [
          "Reported MAPE: Under 4% on top 100 blue-chip stocks",
          "RMSE/MAE ratio: 1.25",
        ],
      },
      securityReliability: [
        "Clear financial risk disclaimers highlighting model limitations and market volatility.",
      ],
      keyLearnings: [
        "Preventing lookahead bias requires normalizing the test partition strictly using parameters derived from the training partition.",
      ],
      disclaimer: "Educational time-series forecasting project. Not financial advice.",
    },
  },
  {
    id: "skill-ascend",
    slug: "skill-ascend",
    title: "Skill Ascend",
    fullName: "Skill Ascend — AI-Powered Career Mentorship Platform",
    tagline: "Personalized career roadmaps, skill-gap analysis, D3.js progress graphs, and AI mock interviews.",
    category: "Full Stack",
    categories: ["Full Stack", "LLM & RAG"],
    featured: false,
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "Node.js",
      "Express.js",
      "Gemini AI",
      "Tailwind CSS",
    ],
    keyAchievement: "Interactive D3.js XP visualization · AI mock interviews · Live on Render",
    stats: [
      { label: "Live Deployment", value: "Hosted on Render" },
      { label: "Visualizations", value: "Custom D3.js" },
      { label: "AI Engine", value: "Gemini AI" },
      { label: "Frontend", value: "React + TypeScript" },
    ],
    summary:
      "A full-stack career mentorship platform featuring personalized learning curricula, skill-gap analysis, interactive D3.js progress graphs, and AI mock interviews.",
    description:
      "Skill Ascend helps engineering students and early-career developers bridge the gap between academic theory and industry requirements. Users take automated skill diagnostics to reveal blind spots, generate dynamic learning pathways, track XP milestones using custom D3.js tree graphs, and practice with an AI mock interviewer. Hosted live on Render.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/AI_SKILL_ASSISTANCE",
      liveUrl: "https://skill-ascend-rahb.onrender.com/#how-it-works",
    },
    thumbnail: "/images/projects/skillascend.jpg",
    caseStudy: {
      problemStatement:
        "Static career advice and generic roadmaps fail to address individual student skill deficits or provide actionable, hands-on project milestones.",
      engineeringGoals: [
        "Create dynamic, adaptive skill roadmaps generated by LLMs based on user diagnostic scores.",
        "Build an engaging, interactive D3.js visualization for XP and milestone progress.",
        "Provide realistic AI technical interview simulations with constructive feedback.",
        "Deploy a responsive, accessible web application.",
      ],
      systemArchitecture:
        "The React frontend communicates with an Express.js backend. User skill profiles are analyzed by Gemini AI to synthesize tailored curricula, while D3.js renders interactive hierarchical graphs on canvas/SVG.",
      pipelineSteps: [
        { step: "01", title: "Diagnostic Assessment", detail: "Users complete diagnostic quizzes across languages, algorithms, and system design." },
        { step: "02", title: "Skill-Gap Synthesis", detail: "Identifies weak foundational areas and suggests high-leverage learning milestones." },
        { step: "03", title: "Personalized Roadmap Graph", detail: "D3.js renders an interactive milestone tree with progress tracking and XP nodes." },
        { step: "04", title: "AI Mock Interviewer", detail: "Engages in voice/text technical interview scenarios with post-session rubric scoring." },
      ],
      implementationHighlights: [
        "Engineered custom D3.js force-directed and tree graphs that smoothly transition as users complete tasks.",
        "Integrated structured JSON output generation from Gemini AI to ensure predictable UI rendering.",
        "Deployed to Render with full responsive styling.",
      ],
      technicalTradeoffs: [
        {
          decision: "D3.js for roadmap visualization over static cards",
          rationale: "Interactive graph nodes provide clear visual dependency chains (prerequisites before advanced topics) that encourage progression.",
          alternativeRejected: "Simple linear checklists.",
        },
      ],
      testingAndEvaluation: {
        methodology: "User journey testing across diverse target engineering roles (Full Stack, Data Science, DevOps).",
        metrics: ["Live deployment operational on Render", "Sub-100ms client-side graph render latency"],
      },
      securityReliability: [
        "Input sanitization on all user survey responses.",
        "JWT-based session authentication.",
      ],
      keyLearnings: [
        "D3.js integration with React state requires strict separation between React DOM reconciliation and D3's imperative SVG selections.",
      ],
    },
  },
  {
    id: "ai-visual-memory",
    slug: "ai-visual-memory",
    title: "AI Visual Memory System",
    fullName: "AI Visual Memory & 3D Spatial Tracking System",
    tagline: "Persistent visual memory, object detection, appearance Re-ID, FAISS indexing, and semantic natural language search.",
    category: "Computer Vision",
    categories: ["Computer Vision", "Machine Learning", "Full Stack"],
    featured: false,
    technologies: [
      "OpenCV",
      "YOLOv11",
      "ByteTrack",
      "CLIP",
      "FAISS",
      "FastAPI",
      "React",
      "Docker",
      "WebSockets",
      "SQLite",
    ],
    keyAchievement: "30–50 ms/frame inference · Real-time ByteTrack + CLIP Re-ID · Live on Render",
    stats: [
      { label: "Frame Latency", value: "30–50 ms/frame" },
      { label: "Live App", value: "Hosted on Render" },
      { label: "Tracking", value: "YOLOv11 + ByteTrack" },
      { label: "Memory Index", value: "FAISS + CLIP" },
    ],
    summary:
      "A real-time visual memory system pairing YOLOv11 and ByteTrack with CLIP embeddings and FAISS index for continuous object re-identification and natural language search over video feeds.",
    description:
      "Video cameras capture scenes, but humans remember objects and their history. This system creates a persistent visual memory bank. YOLOv11 detects objects in real-time, ByteTrack maintains trajectory continuity, and CLIP generates visual embeddings stored in FAISS. Users can query natural language questions like 'Where did I leave my keys?' to retrieve timestamped video clips.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/AI-Visual-Memory-System",
      liveUrl: "https://ai-visual-memory-system.onrender.com",
    },
    thumbnail: "/images/projects/visualmemory.jpg",
    caseStudy: {
      problemStatement:
        "Traditional surveillance and camera systems record gigabytes of raw pixels without semantic understanding, making retrospective event search tedious and manual.",
      engineeringGoals: [
        "Achieve real-time processing (30-50 ms/frame) for multi-object tracking.",
        "Re-identify objects across camera view occlusions using visual appearance embeddings.",
        "Enable natural language semantic search over tracked object memories.",
        "Provide a live interactive React monitoring dashboard over WebSockets.",
      ],
      systemArchitecture:
        "Video streams are processed frame-by-frame by OpenCV and YOLOv11. Detected bounding boxes are tracked via ByteTrack. Crop thumbnails are embedded by CLIP into a FAISS index. FastAPI coordinates WebSocket feeds to the React frontend.",
      pipelineSteps: [
        { step: "01", title: "Frame Ingestion & Detection", detail: "FastAPI stream receiver feeds frames into YOLOv11 for bounding box proposal." },
        { step: "02", title: "Trajectory Tracking", detail: "ByteTrack associates bounding boxes across frames to maintain unique object IDs." },
        { step: "03", title: "Appearance Embedding", detail: "Cropped object thumbnails are encoded via CLIP visual encoder." },
        { step: "04", title: "Memory Bank Indexing", detail: "Embeddings are stored in FAISS alongside timestamps, camera IDs, and spatial coordinates." },
        { step: "05", title: "Semantic Query Retrieval", detail: "Natural language queries are embedded and matched against FAISS vectors to highlight historical locations." },
      ],
      implementationHighlights: [
        "Reported 30–50 ms per frame processing performance.",
        "Integrated homography matrix calculations for 2D plane spatial localization.",
        "Deployed public live web application to Render.",
      ],
      technicalTradeoffs: [
        {
          decision: "ByteTrack over DeepSORT",
          rationale: "ByteTrack utilizes low-score detection boxes to maintain tracking during partial occlusions with significantly lower computational overhead.",
          alternativeRejected: "DeepSORT with heavy appearance descriptor networks.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Benchmarked across diverse synthetic and real indoor camera feeds with varied lighting.",
        metrics: [
          "30–50 ms average processing latency per frame",
          "Continuous tracking through short occlusions up to 30 frames",
        ],
      },
      securityReliability: [
        "Local thumbnail storage with automated retention and deletion policies.",
      ],
      keyLearnings: [
        "Filtering low-confidence detection noise before embedding generation prevents polluting the FAISS memory bank with false positives.",
      ],
    },
  },
  {
    id: "leviathan",
    slug: "leviathan",
    title: "Leviathan",
    fullName: "Leviathan — Sustainability & Anti-Greenwashing Audit Platform",
    tagline: "Scikit-learn ensemble and Gemini reasoning to predict product carbon footprints and audit corporate greenwashing against ISO 14021.",
    category: "Machine Learning",
    categories: ["Machine Learning", "Full Stack"],
    featured: true,
    technologies: [
      "scikit-learn",
      "Random Forest",
      "Gradient Boosting",
      "Ridge Regression",
      "TF-IDF",
      "Gemini API",
      "Open Food Facts API",
      "Google Shopping API",
      "Python",
    ],
    keyAchievement: "Reported R² = 0.88 ensemble · ISO 14021 greenwashing audit · Built at Chargebee",
    stats: [
      { label: "Ensemble Accuracy", value: "R² = 0.88" },
      { label: "Standard Audited", value: "ISO 14021" },
      { label: "Experience", value: "Chargebee AI Intern" },
      { label: "Period", value: "Feb 2026 – Aug 2026" },
    ],
    summary:
      "Developed during the AI internship at Chargebee. Uses a scikit-learn ensemble to predict carbon footprint and durability, plus a Greenwashing Inspector auditing marketing claims against ISO 14021.",
    description:
      "Built as part of an AI engineering internship at Chargebee (Feb–Aug 2026). Leviathan tackles corporate environmental deception. It trains an ensemble model (Random Forest, Gradient Boosting, Ridge Regression) to forecast carbon footprints and product lifespans, and pairs it with a TF-IDF and Gemini-driven Greenwashing Inspector that evaluates marketing assertions against the international ISO 14021 standard.",
    links: {
      demoVideoUrl: "/videos/leviathan_demo.mp4",
      demoVideoType: "local",
    },
    thumbnail: "/images/projects/leviathan.jpg",
    caseStudy: {
      problemStatement:
        "Consumers and enterprise procurement teams face pervasive 'greenwashing'—vague, unsubstantiated eco-friendly claims ('100% natural', 'carbon neutral') that mislead buyers and violate international advertising regulations.",
      engineeringGoals: [
        "Train an accurate predictive model for product carbon footprint and durability using multi-modal product attributes.",
        "Implement a Greenwashing Inspector auditing marketing claims strictly against ISO 14021 environmental labeling criteria.",
        "Integrate external product knowledge bases via Open Food Facts and Google Shopping APIs.",
        "Deliver clear, auditable reasoning reports for procurement compliance.",
      ],
      systemArchitecture:
        "Product metadata is fetched from public databases and shopping APIs. Numerical and categorical features are fed to a scikit-learn ensemble (Random Forest, Gradient Boosting, Ridge Regression). Textual marketing claims are extracted, vectorized via TF-IDF, and audited using Gemini reasoning prompted with ISO 14021 rules.",
      pipelineSteps: [
        { step: "01", title: "Product Ingestion", detail: "Pulls product composition, packaging materials, and manufacturer claims from Open Food Facts API." },
        { step: "02", title: "Ensemble Footprint Modeling", detail: "Ensemble of Random Forest, Gradient Boosting, and Ridge Regression predicts lifecycle carbon emissions (R² = 0.88)." },
        { step: "03", title: "TF-IDF Vague Claim Extraction", detail: "Detects non-specific marketing buzzwords lacking measurable metrics." },
        { step: "04", title: "ISO 14021 Regulatory Audit", detail: "Gemini reasoning maps specific claims against ISO 14021 clauses, classifying claims as Verified, Misleading, or Unsubstantiated." },
      ],
      implementationHighlights: [
        "Built during AI internship at Chargebee (Feb 2026 – Aug 2026).",
        "Achieved a reported R² of 0.88 with the ensemble regression pipeline on the validation split.",
        "Engineered the Greenwashing Inspector with ISO 14021 clause references.",
      ],
      technicalTradeoffs: [
        {
          decision: "Ensemble of tree-based models and Ridge regression over deep neural network",
          rationale: "Tabular product attribute datasets with high cardinality benefit from gradient boosted trees and regularized linear ensembles, providing both higher accuracy and interpretable feature importance.",
          alternativeRejected: "Deep MLP or TabNet architecture.",
        },
      ],
      testingAndEvaluation: {
        methodology: "Cross-validated regression models against verified lifecycle analysis (LCA) environmental datasets.",
        metrics: [
          "Reported R² score of 0.88 on carbon footprint and durability predictions",
          "Automated claim classification validated against known regulatory enforcement rulings",
        ],
      },
      securityReliability: [
        "Preserved enterprise confidentiality; no internal Chargebee proprietary telemetry or billing schemas exposed.",
        "External API rate limiting and fail-safe caching.",
      ],
      keyLearnings: [
        "Combining quantitative tabular ensembles with LLM semantic reasoning provides far stronger regulatory audits than either technique alone.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  if (slug === "medical-transformer-lm") {
    return PROJECTS.find((p) => p.slug === "venipuncture-vr");
  }
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectCategories(): string[] {
  return [
    "All Projects",
    "LLM & RAG",
    "AI Security",
    "Reliability Engineering",
    "Machine Learning",
    "Computer Vision",
    "Developer Infrastructure",
    "Full Stack",
  ];
}

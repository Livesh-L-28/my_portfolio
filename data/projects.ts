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
    id: "sentinel-ai",
    slug: "sentinel-ai",
    title: "SENTINEL AI",
    fullName: "SENTINEL AI — Agentic Industrial Safety Intelligence Platform",
    tagline:
      "See hazards. Understand context. Verify evidence. Vision-based detection, deterministic safety policies, agent-assisted investigation, and interactive 3D digital-twin environments.",
    category: "Computer Vision",
    categories: [
      "Computer Vision",
      "AI Security",
      "Reliability Engineering",
      "Full Stack",
      "AI Agents",
    ],
    featured: true,
    technologies: [
      "Python",
      "PyTorch",
      "YOLO",
      "OpenCV",
      "FastAPI",
      "React",
      "TypeScript",
      "SQLAlchemy",
      "SQLite / PostgreSQL",
      "Docker",
      "JWT & RBAC",
      "SHA-256 Ledger",
    ],
    keyAchievement:
      "100+ tests · Sub-18ms YOLO inference · Deterministic policy gates & 3D digital-twin spatial safety",
    stats: [
      { label: "Perception Latency", value: "<18 ms" },
      { label: "Policy Enforcement", value: "Deterministic" },
      { label: "Investigation Workflow", value: "4-Stage Agent" },
      { label: "Audit Integrity", value: "SHA-256 Ledger" },
    ],
    summary:
      "An industrial safety intelligence platform connecting computer vision, agent-assisted investigation, deterministic safety policies, and interactive digital-twin environments into one unified, auditable operational experience.",
    description:
      "Industrial safety monitoring requires strict separation between AI reasoning and authoritative safety enforcement. SENTINEL AI pairs real-time YOLO object detection and spatial hazard tracking with deterministic geometric safety zones, ensuring LLMs assist with root-cause investigations while non-negotiable safety rules remain hardcoded, auditable, and backed by SHA-256 cryptographic evidence ledgers.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/AI_Agent_CV",
      liveUrl: "https://sentinel-ai-5uz2.onrender.com",
    },
    thumbnail: "/images/projects/sentinel.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "video_stream",
          label: "Multi-Camera Ingest",
          role: "Ingestion",
          tech: "OpenCV / Video Feeds",
          description:
            "Captures industrial RTSP/video feeds, performs color normalization, and feeds non-blocking frame buffers.",
        },
        {
          id: "yolo_vision",
          label: "YOLO Perception & Tracking",
          role: "Vision Engine",
          tech: "PyTorch YOLOv8 + ByteTrack",
          description:
            "Detects workers, PPE compliance (helmets, vests), and heavy equipment in <18ms with persistent trajectory IDs.",
        },
        {
          id: "zone_engine",
          label: "Spatial Zone Engine",
          role: "Spatial Geometry",
          tech: "Polygon Incursion Calculus",
          description:
            "Evaluates configured exclusion zones and danger perimeters against worker trajectories with temporal debounce.",
        },
        {
          id: "policy_gate",
          label: "Deterministic Policy Gate",
          role: "Safety Enforcement",
          tech: "Authoritative Rule Engine",
          description:
            "Enforces hardcoded regulatory safety thresholds independently of LLM reasoning; triggers instant fail-closed alarms.",
        },
        {
          id: "agent_workflow",
          label: "4-Stage Agent Investigator",
          role: "Reasoning & Advisory",
          tech: "Investigator -> Gate -> Responder -> Verifier",
          description:
            "Orchestrates multi-agent analysis to reconstruct incident context, evaluate policy outcomes, and draft response actions.",
        },
        {
          id: "digital_twin",
          label: "3D Industrial Digital Twin",
          role: "Spatial Context",
          tech: "Three.js / WebGL Facility Twin",
          description:
            "Maps 2D camera coordinates into an interactive 3D factory layout with real-time hazard cones and equipment telemetry.",
        },
        {
          id: "evidence_ledger",
          label: "Cryptographic Evidence Ledger",
          role: "Audit Integrity",
          tech: "SHA-256 Hash Chaining",
          description:
            "Seals visual evidence frames, detected bounding boxes, and operator actions into an immutable, tamper-evident audit ledger.",
        },
        {
          id: "operator_ui",
          label: "Operational Command Center",
          role: "Interface",
          tech: "FastAPI + React TypeScript",
          description:
            "Real-time web monitoring for CCTV streams, incident timelines, agent investigation traces, and role-based operator controls.",
        },
      ],
      connections: [
        { from: "video_stream", to: "yolo_vision", label: "Video Frames" },
        { from: "yolo_vision", to: "zone_engine", label: "BBoxes & Track IDs" },
        { from: "zone_engine", to: "policy_gate", label: "Spatial Violations" },
        { from: "policy_gate", to: "agent_workflow", label: "Triggered Incidents" },
        { from: "zone_engine", to: "digital_twin", label: "Spatial Coordinates" },
        { from: "agent_workflow", to: "evidence_ledger", label: "Signed Traces" },
        { from: "evidence_ledger", to: "operator_ui", label: "Tamper-Evident Records" },
        { from: "digital_twin", to: "operator_ui", label: "3D Facility View" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Industrial facilities struggle with fragmented camera feeds, manual incident reviews, and disconnected evidence workflows that delay critical hazard response. Furthermore, naive LLM vision systems are non-deterministic and can hallucinate safety approvals, creating catastrophic compliance vulnerabilities under OSHA and ISO 45001 standards.",
      engineeringGoals: [
        "Deliver sub-18ms real-time object detection and multi-camera trajectory tracking.",
        "Enforce authoritative safety policies deterministically, strictly separating AI-assisted investigation from non-negotiable safety enforcement.",
        "Project 2D camera observations into an interactive 3D industrial digital-twin environment.",
        "Guarantee evidence integrity through SHA-256 cryptographic hash chaining for regulatory audit readiness.",
        "Implement secure, enterprise-grade access control with JWT authentication and role-based permissions (RBAC).",
      ],
      systemArchitecture:
        "SENTINEL AI is organized into four modular tiers: Perception (OpenCV frame intake + PyTorch YOLOv8 detection + ByteTrack association), Deterministic Safety Enforcement (geometric polygon containment calculus), Agentic Investigation (Investigator, Policy Gate, Responder, and Verifier workflow), and Operational Experience (React TypeScript frontend, Three.js 3D facility twin, FastAPI async backend, and cryptographic evidence ledger).",
      pipelineSteps: [
        {
          step: "01",
          title: "Multi-Camera Ingest & Frame Normalization",
          detail:
            "Video streams are decoded asynchronously with non-blocking queue buffers, normalized for illumination variance, and dispatched to inference workers.",
        },
        {
          step: "02",
          title: "YOLOv8 Perception & Spatial Tracking",
          detail:
            "PyTorch neural networks identify personnel, PPE compliance (helmets, high-visibility vests), and moving machinery with persistent track IDs across temporary visual occlusions.",
        },
        {
          step: "03",
          title: "Deterministic Spatial Incursion Gate",
          detail:
            "Worker bounding polygons are evaluated against defined 2D/3D hazard exclusion zones. Incursions require temporal persistence debounce (consecutive frame threshold) before triggering policy gates.",
        },
        {
          step: "04",
          title: "4-Stage Agentic Investigation Workflow",
          detail:
            "Triggered safety events dispatch a structured agent pipeline: the Investigator gathers scene context, Policy Gate evaluates compliance rules, Responder formulates remediation, and Verifier validates recommendation consistency.",
        },
        {
          step: "05",
          title: "3D Digital Twin Projection & Cryptographic Audit",
          detail:
            "Events are projected into the Three.js facility model in real time while visual frame crops and event metadata are hashed via SHA-256 and appended to the immutable database ledger.",
        },
      ],
      implementationHighlights: [
        "Architected a strict dual-track safety model: AI agents provide context and diagnostic recommendations, but zero LLM output can override or delay deterministic safety interlocks.",
        "Implemented calibrated 2D-to-3D spatial homography projection mapping camera pixel detections into exact 3D coordinates in the factory digital twin.",
        "Created an immutable SHA-256 cryptographic evidence ledger preserving frame snapshots, detector confidence scores, and operator acknowledgments.",
        "Structured a 4-agent collaborative investigation pipeline (Investigator, Policy Gate, Responder, Verifier) producing auditable markdown reports.",
        "Shipped production containerized deployment on Render with automated Docker builds, JWT authentication, and zero-downtime health monitoring.",
      ],
      technicalTradeoffs: [
        {
          decision: "Deterministic Geometric Rules over End-to-End Multimodal LLM Safety Decisions",
          rationale:
            "Multimodal LLMs have non-zero hallucination rates and variable latency (1-3s). In industrial safety, a missed alarm can cause injury. Hardcoded polygon math executes in microseconds with 100% deterministic reproducibility.",
          alternativeRejected: "Direct prompt-based visual question answering using multimodal vision LLMs.",
        },
        {
          decision: "Cryptographic SHA-256 Hash Chaining over Standard Database Timestamps",
          rationale:
            "Regulatory disputes and insurance investigations require proof that incident evidence was not retroactively edited or trimmed. Cryptographic hash chaining ensures complete data integrity.",
          alternativeRejected: "Standard relational database timestamps with mutable media storage.",
        },
      ],
      testingAndEvaluation: {
        testCount: 116,
        methodology:
          "116 automated pytest unit and integration tests covering YOLO inference adapters, polygon incursion boundary tests, multi-object tracking persistence, SHA-256 cryptographic chain validation, and JWT RBAC security policies.",
        metrics: [
          "Perception latency: <18 ms average YOLO detection and tracking per frame",
          "Safety policy accuracy: 100% deterministic breach detection on configured polygon benchmarks",
          "Evidence auditability: 100% SHA-256 cryptographic verification pass across all incident records",
        ],
      },
      securityReliability: [
        "Fail-closed safety architecture: Camera drops or processing timeouts automatically escalate to operator alerts.",
        "Cryptographic SHA-256 tamper-evident evidence hashing for post-incident audits.",
        "JWT-based role-based access control (RBAC) partitioning Admin, Safety Officer, Investigator, and Operator privileges.",
        "Rate-limited REST endpoints with correlation ID request tracing across asynchronous workers.",
      ],
      keyLearnings: [
        "Enterprises eagerly adopt AI for safety investigation when guaranteed that an AI agent cannot arbitrarily silence or bypass authoritative safety rules.",
        "Temporal debounce algorithms eliminated over 94% of transient false-positive boundary warnings caused by optical noise without compromising reaction speed.",
      ],
      localDeploymentInstructions: [
        "git clone https://github.com/Livesh-L-28/AI_Agent_CV.git",
        "cd AI_Agent_CV",
        "python -m venv .venv && source .venv/bin/activate",
        "pip install -e .",
        "pytest tests/ -v",
        "docker compose up --build (or view live at https://sentinel-ai-5uz2.onrender.com)",
      ],
    },
  },
  {
    id: "venipuncture-vr",
    slug: "venipuncture-vr",
    title: "Venipuncture VR",
    fullName: "AI-Enhanced VR Venipuncture Training & Medical AI System",
    tagline:
      "An integrated medical training platform combining immersive Unity VR, a custom medical language model, retrieval-grounded medical assistance, voice interaction, and performance reporting.",
    category: "Full Stack",
    categories: [
      "Virtual Reality",
      "Medical AI",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Voice AI",
      "Clinical Skills Simulation",
    ],
    featured: true,
    technologies: [
      "Unity 3D",
      "C#",
      "VR Interaction Framework",
      "PyTorch",
      "MedicalTransformerLM (110M)",
      "OpenBioLLM-8B",
      "Llama 3.2 3B",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "BM25 Lexical Retrieval",
      "Whisper STT",
      "macOS Speech TTS",
      "ReportLab PDF",
      "REST APIs",
    ],
    keyAchievement:
      "Integrated 16-step Unity VR simulator · Custom 110M PyTorch MedicalTransformerLM · Hybrid BM25+pgvector clinical RAG · 5 recorded demo walkthroughs",
    stats: [
      { label: "Clinical Protocol", value: "16-Step Guided Workflow" },
      { label: "Custom Model", value: "~110M Params (PyTorch)" },
      { label: "Knowledge Grounding", value: "pgvector + BM25" },
      { label: "Voice Interface", value: "Whisper STT + macOS TTS" },
      { label: "Verified Demos", value: "5 Recordings (~791 MB)" },
    ],
    summary:
      "An integrated medical training platform combining immersive Unity VR, a custom 110M-parameter medical language model, retrieval-grounded clinical assistance, hands-free voice interaction, and automated performance reporting.",
    description:
      "AI-Enhanced VR Venipuncture Training & Medical AI System is an end-to-end clinical simulation ecosystem developed using Unity, C#, PyTorch, and FastAPI. It integrates an authentic 16-step phlebotomy state machine with tactile VR physics, an approximately 110M-parameter custom medical transformer model, a hybrid BM25 + PostgreSQL pgvector RAG pipeline, hands-free Whisper voice assistance, and automated PDF performance reports.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28",
      demoVideoUrl: "https://drive.google.com/file/d/1LHKsk5CE26J-j----wyzhhJFx95zEkkN/preview",
      demoVideoType: "embed",
    },
    thumbnail: "/images/projects/venipuncture.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "unity_vr",
          label: "Unity VR Application",
          role: "VR Client & Simulation",
          tech: "Unity 3D · C# · VR Interaction Framework",
          description:
            "Enforces the structured 16-step phlebotomy protocol, two-handed tool physics, 15°–30° insertion angle tracking, and flashback visual verification.",
        },
        {
          id: "fastapi_gateway",
          label: "FastAPI Orchestration Gateway",
          role: "Central Backend Gateway",
          tech: "Python 3.11 · FastAPI · Asynchronous ASGI",
          description:
            "Coordinates training session lifecycles, REST telemetry ingest, speech processing endpoints, and dynamic model routing.",
        },
        {
          id: "medical_llm",
          label: "Medical AI & Transformer Engine",
          role: "Clinical Language Modeling",
          tech: "PyTorch (110M MedicalTransformerLM) + OpenBioLLM-8B + Llama 3.2 3B",
          description:
            "Lightweight ~110M PyTorch model for sub-150ms VR guidance, with multi-tier routing to OpenBioLLM-8B for complex clinical queries.",
        },
        {
          id: "medical_rag",
          label: "Medical RAG Pipeline",
          role: "Hybrid Knowledge Retrieval",
          tech: "PostgreSQL · pgvector · BM25 Lexical Index",
          description:
            "Executes hybrid dense and sparse search over CLSI GP41 and WHO phlebotomy guidelines, enforcing response-grounding safety gates.",
        },
        {
          id: "voice_engine",
          label: "Voice Interaction Pipeline",
          role: "Hands-Free Voice Interface",
          tech: "OpenAI Whisper ASR · macOS Speech TTS",
          description:
            "Transcribes spoken questions from headset microphones and streams synthesized audio guidance without breaking sterile field technique.",
        },
        {
          id: "reporting_service",
          label: "Assessment & PDF Reporting",
          role: "Clinical Rubrics & Certification",
          tech: "ReportLab PDF Engine · PostgreSQL Session Store",
          description:
            "Evaluates procedural accuracy and mistake telemetry, automatically generating downloadable clinical training PDF summary reports.",
        },
      ],
      connections: [
        { from: "unity_vr", to: "fastapi_gateway", label: "Session & Telemetry Events" },
        { from: "unity_vr", to: "voice_engine", label: "Headset Audio Stream" },
        { from: "voice_engine", to: "fastapi_gateway", label: "Whisper Transcribed Query" },
        { from: "fastapi_gateway", to: "medical_rag", label: "Hybrid RAG Query" },
        { from: "medical_rag", to: "medical_llm", label: "Grounded Clinical Context" },
        { from: "medical_llm", to: "voice_engine", label: "Grounded Text Response" },
        { from: "voice_engine", to: "unity_vr", label: "Spatial TTS Spoken Audio" },
        { from: "fastapi_gateway", to: "reporting_service", label: "Test Performance Telemetry" },
        { from: "reporting_service", to: "unity_vr", label: "Generated PDF Performance Report" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Venipuncture is one of the most critical foundational clinical procedures, yet traditional medical education relies on static rubber manikins or high-stakes live practice. Learners lack an immersive, repeatable simulation platform where they can develop physical procedural muscle memory, ask real-time clinical questions without breaking the sterile field, and receive objective automated performance assessments with certified reporting.",
      engineeringGoals: [
        "Unity VR Development: Build an immersive virtual clinical healthcare room in Unity with C# and the VR Interaction Framework, implementing an enforced 16-step procedural state machine across Training and Test modes.",
        "Custom MedicalTransformerLM: Design, train, and deploy an approximately 110M-parameter PyTorch autoregressive medical model alongside OpenBioLLM-8B and Llama 3.2 3B for low-latency clinical Q&A.",
        "Medical RAG Pipeline: Engineer a hybrid retrieval engine combining BM25 lexical precision with PostgreSQL pgvector dense embeddings for verified clinical guidance and strict grounding.",
        "Voice Assistant: Integrate hands-free Whisper speech-to-text and macOS speech engine text-to-speech so learners can ask procedure questions without leaving the virtual sterile field.",
        "Assessment & PDF Reporting: Build an automated evaluation engine tracking insertion angle variance (15°–30°), procedural errors, and generating downloadable ReportLab clinical PDF reports.",
        "Backend Integration: Couple Unity to an asynchronous FastAPI backend service with REST endpoints orchestrating models, speech, and training session lifecycles.",
      ],
      systemArchitecture:
        "The platform unifies six interconnected subsystems into an integrated training pipeline: (1) An OpenXR-compliant Unity VR client running a 16-step clinical state machine; (2) An asynchronous FastAPI backend acting as the central coordination gateway; (3) A custom 110M PyTorch MedicalTransformerLM routed dynamically with OpenBioLLM-8B and Llama 3.2 3B; (4) A hybrid clinical RAG pipeline querying PostgreSQL pgvector and BM25 indices; (5) A hands-free Whisper STT and macOS TTS audio loop; and (6) An automated assessment engine compiling performance metrics into downloadable clinical PDF reports.",
      pipelineSteps: [
        {
          step: "01",
          title: "Unity VR Scene & 16-Step Procedural Protocol",
          detail:
            "Spawns the learner inside an authentic hospital simulation room, enforcing sequential clinical milestones from patient identification to sharps disposal.",
        },
        {
          step: "02",
          title: "Tactile Tool Interaction & 15°–30° Angle Tracking",
          detail:
            "Handles physics-based manipulation of vacutainers, needles, and tubes via VR Interaction Framework, with real-time insertion angle validation.",
        },
        {
          step: "03",
          title: "Hands-Free Voice Query & Whisper STT Streaming",
          detail:
            "Captures microphone audio directly from the VR headset and streams buffers to FastAPI for real-time Whisper speech-to-text transcription.",
        },
        {
          step: "04",
          title: "Hybrid BM25 + pgvector Clinical RAG Retrieval",
          detail:
            "Queries clinical guidelines (CLSI GP41 & WHO) via dense semantic vectors and sparse lexical search in PostgreSQL, enforcing citation verification.",
        },
        {
          step: "05",
          title: "Grounded LLM Inference & Spoken Audio Feedback",
          detail:
            "Synthesizes clinically accurate guidance through the custom 110M model or foundation LLMs, converting text to audio via macOS speech engine.",
        },
        {
          step: "06",
          title: "Test Scenario Scoring & Automated PDF Report Generation",
          detail:
            "Tracks procedural execution, logs mistake telemetry, and automatically compiles comprehensive clinical PDF training summary reports.",
        },
      ],
      implementationHighlights: [
        "Unity VR Development: Implemented a structured 16-step procedural engine validating physical insertion angles, order of operations, and hygiene compliance.",
        "Custom MedicalTransformerLM: Trained an autoregressive ~110M PyTorch transformer model optimized for clinical phlebotomy and bedside assistance.",
        "Medical RAG Pipeline: Hybrid search combining PostgreSQL pgvector embeddings with BM25 lexical precision across CLSI GP41 and WHO phlebotomy guidelines.",
        "Voice-Based Medical Assistant: Hands-free Whisper ASR and macOS TTS audio guidance allowing sterile-field clinical consultations inside the headset.",
        "Assessment & PDF Reporting: Automated mistake detection flagging angle deviations, missed sanitization, or unreleased tourniquets with ReportLab PDF exports.",
        "Backend Integration: Asynchronous FastAPI ASGI web service coordinating telemetry, model routing, and session persistence.",
      ],
      technicalTradeoffs: [
        {
          decision: "Custom 110M MedicalTransformerLM + Foundation Router over single cloud LLM",
          rationale:
            "Local 110M model delivers sub-150ms inference latency critical for real-time VR guidance on consumer hardware, while router dispatches complex medical questions to OpenBioLLM-8B.",
          alternativeRejected: "Relying exclusively on high-latency cloud API calls for every VR hint.",
        },
        {
          decision: "Hybrid PostgreSQL pgvector + BM25 over dense-only vector search",
          rationale:
            "Medical equipment codes, tube cap colors (lavender EDTA vs gold SST), and phlebotomy abbreviations require exact keyword precision combined with semantic reasoning.",
          alternativeRejected: "Dense vector-only embeddings without keyword indexing.",
        },
        {
          decision: "Decoupled Training vs Test mode scene architecture",
          rationale:
            "Ensures the assessment mode cannot be compromised or influenced by training hints or step assists, guaranteeing objective evaluations.",
          alternativeRejected: "Single monolithic scene with conditional UI flags.",
        },
      ],
      testingAndEvaluation: {
        methodology:
          "Benchmarked across five dedicated demonstration recordings covering the medical AI assistant, full VR web walkthrough, test scenes with live developer console, and training scenes with local storage.",
        metrics: [
          "5 verified cloud-streamed recordings (~791 MB total) covering complete system operation",
          "Sub-150ms local MedicalTransformerLM inference latency on Apple Silicon MPS",
          "Sub-1.2s round-trip hands-free voice Q&A latency inside the VR headset",
          "100% adherence to CLSI GP41 (6th Ed) and WHO venipuncture standards",
        ],
      },
      securityReliability: [
        "Sterile Field Protocol Safety: Critical safety violations (omitted vein disinfection, improper insertion angle, or failed sharps disposal) immediately trigger error scoring in assessment mode.",
        "Fail-Closed Medical Grounding: Responses below similarity confidence threshold safely refuse speculative clinical advice to prevent medical hallucinations.",
        "Offline Resilient Telemetry: Unity client buffers session event logs locally if network connection to FastAPI is interrupted.",
      ],
      keyLearnings: [
        "Pairing spatial VR procedural muscle memory with hands-free voice-grounded medical RAG creates an unprecedentedly effective clinical learning environment.",
        "A multi-tier model router running a fast local 110M model alongside foundation LLMs delivers the optimal balance between VR real-time latency and clinical depth.",
      ],
      disclaimer:
        "Educational medical simulation and clinical training platform prototype. Designed for procedural skills training and clinical knowledge familiarization.",
    },
  },
  {
    id: "llmfirewall-core",
    slug: "llmfirewall-core",
    title: "LLMFirewall Core",
    fullName: "LLMFirewall Core — Defense-in-Depth Security Framework for AI & LLMs",
    tagline: "Sub-millisecond in-process firewall intercepting prompt injection, PII leaks, and rogue tool execution.",
    category: "AI Security",
    categories: ["Published Packages (PyPI)", "AI Security", "Reliability Engineering", "Developer Infrastructure"],
    featured: true,
    pypiOnly: true,
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
      "An open-source, provider-agnostic security framework published on PyPI (llmfirewall-core). Operates purely in-process with zero hosted UI or cloud API dependencies, detecting adversarial injections, redacting PII, and sandboxing agent tool calls.",
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
    categories: ["Published Packages (PyPI)", "Reliability Engineering", "AI Security", "Developer Infrastructure"],
    featured: true,
    pypiOnly: true,
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
      githubUrl: "https://github.com/Livesh-L-28/aireliability",
      pypiUrl: "https://pypi.org/project/aireliability/",
      publishedPackageName: "aireliability",
      installCommand: "pip install aireliability",
      documentationUrl: "https://github.com/Livesh-L-28/aireliability#readme",
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
    categories: ["Published Packages (PyPI)", "Reliability Engineering", "Developer Infrastructure", "AI Security"],
    featured: true,
    pypiOnly: true,
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
    id: "logicfalcon",
    slug: "logicfalcon",
    title: "LogicFalcon",
    fullName: "LogicFalcon — AI-Powered Code Review & Developer Intelligence Package",
    tagline: "Modular Python code review engine with CLI, SDK, and Model Context Protocol (MCP) interfaces, AST analysis, and safe remediation.",
    category: "Developer Infrastructure",
    categories: ["Published Packages (PyPI)", "Developer Infrastructure", "AI Security", "Reliability Engineering"],
    featured: false,
    pypiOnly: true,
    technologies: [
      "Python",
      "AST Analysis",
      "CLI",
      "SDK",
      "MCP",
      "Ruff",
      "SARIF",
      "GitHub Actions",
      "pytest",
      "Pydantic",
    ],
    keyAchievement: "101/101 tests passed · 3 interfaces (CLI, SDK, MCP) · 10 safe remediation acceptance checks",
    stats: [
      { label: "PyPI Package", value: "logicfalcon" },
      { label: "Automated Tests", value: "101 passed" },
      { label: "Interfaces", value: "CLI + SDK + MCP" },
      { label: "Safety Controls", value: "10 Acceptance Checks" },
    ],
    summary:
      "A modular Python code review package offering CLI, SDK, and Model Context Protocol (MCP) interfaces for programmatic code analysis, structured diagnostic reporting, proposed code fixes, and safe approval-controlled remediation.",
    description:
      "LogicFalcon is a high-precision code review and developer intelligence package engineered for modern software pipelines and AI developer workflows. It exposes 3 distinct interfaces: a CLI for developer workstations, an importable SDK for backend integrations, and an MCP server enabling autonomous coding agents to inspect and remediate workspaces safely. It features file and workspace scanning, structured findings, severity classification, SARIF reporting, and 10 acceptance-checked safety mechanisms including path containment, symlink protection, dry-run diffs, and automatic backup rollback.",
    links: {
      githubUrl: "https://github.com/Livesh-L-28/logicfalcon",
      pypiUrl: "https://pypi.org/project/logicfalcon/",
      publishedPackageName: "logicfalcon",
      installCommand: "pip install logicfalcon",
      documentationUrl: "https://github.com/Livesh-L-28/logicfalcon#readme",
    },
    thumbnail: "/images/projects/aegis.jpg",
    architectureDiagram: {
      nodes: [
        {
          id: "interfaces",
          label: "Developer Interfaces",
          role: "Access Layer",
          tech: "CLI / SDK / Model Context Protocol (MCP)",
          description: "Provides terminal commands, importable Python classes, and MCP tools for AI coding assistants.",
        },
        {
          id: "ast_parser",
          label: "AST & Syntax Parser",
          role: "Code Analysis",
          tech: "Python ast & Tree Traversal",
          description: "Parses source code into abstract syntax trees for deep semantic pattern recognition without executing untrusted code.",
        },
        {
          id: "rule_engine",
          label: "Rule Engine & Ruff Bridge",
          role: "Linting & Heuristics",
          tech: "Ruff + Custom AST Rules",
          description: "Evaluates security risks, code smells, type violations, and generates structured findings with severity classifications.",
        },
        {
          id: "safety_governor",
          label: "Remediation Governor",
          role: "Safety Layer",
          tech: "10 Acceptance Checks",
          description: "Enforces dry-run diffs, approval controls, path containment, symlink protection, atomic backups, and rollback.",
        },
        {
          id: "exporter",
          label: "Diagnostics & SARIF Exporter",
          role: "Reporting",
          tech: "SARIF 2.1.0 + Machine JSON",
          description: "Outputs structured findings for GitHub Code Scanning, CI/CD gates, and interactive terminal diffs.",
        },
      ],
      connections: [
        { from: "interfaces", to: "ast_parser", label: "File/Workspace Query" },
        { from: "ast_parser", to: "rule_engine", label: "AST Nodes" },
        { from: "rule_engine", to: "safety_governor", label: "Proposed Fixes" },
        { from: "safety_governor", to: "exporter", label: "Approved Diffs & Findings" },
        { from: "exporter", to: "interfaces", label: "SARIF / JSON / Terminal" },
      ],
    },
    caseStudy: {
      problemStatement:
        "Developer tools and AI coding assistants frequently propose automated code changes without verification, risking destructive overwrites, directory traversal, broken syntax, or unvetted logic errors in production codebases.",
      engineeringGoals: [
        "Provide 3 seamless interfaces: CLI, SDK, and Model Context Protocol (MCP) for modern AI-assisted engineering.",
        "Implement automated file and workspace analysis with structured findings and severity ratings.",
        "Guarantee safe remediation with 10 strict acceptance checks including path containment and rollback.",
        "Achieve 100% test pass rate across core review, security, and CLI modules.",
      ],
      systemArchitecture:
        "LogicFalcon uses a modular architecture where the Analysis Core parses Python AST and coordinates with Ruff rule-checking. Proposed fixes pass through a fail-closed Remediation Governor that creates atomic file backups and enforces path boundaries before any write occurs. Results are surfaced via CLI, Python SDK, or MCP server with SARIF and JSON export options.",
      pipelineSteps: [
        {
          step: "01",
          title: "Multi-Interface Ingestion",
          detail: "Accepts review requests via CLI flags, Python method calls, or Model Context Protocol tool invocations.",
        },
        {
          step: "02",
          title: "AST & Heuristic Analysis",
          detail: "Constructs syntax trees to detect dead code, insecure patterns, and type inconsistencies without runtime risk.",
        },
        {
          step: "03",
          title: "Safety-Gated Remediation",
          detail: "Executes 10 acceptance checks: path containment, symlink traversal prevention, dry-run diff generation, approval confirmation, and automated backup.",
        },
        {
          step: "04",
          title: "SARIF & Diagnostic Export",
          detail: "Generates machine-readable SARIF 2.1.0 outputs compatible with GitHub Security tabs and CI/CD quality gates.",
        },
      ],
      implementationHighlights: [
        "3 unified interfaces: CLI, SDK, and Model Context Protocol (MCP).",
        "10 verified safety acceptance checks for approval-controlled code remediation.",
        "101/101 automated Python tests passing with zero failures.",
        "SARIF 2.1.0 and machine-readable JSON output for CI/CD automation.",
        "Prepared version 0.1.2 release artifacts (wheel and source distribution) with clean virtual-environment verification.",
      ],
      technicalTradeoffs: [
        {
          decision: "In-process AST and Ruff analysis instead of running dynamic code execution.",
          rationale: "Dynamic execution introduces severe security and sandbox vulnerability risks on untrusted repositories.",
          alternativeRejected: "Running untrusted code in an unisolated runtime.",
        },
        {
          decision: "Strict fail-closed approval requirement for all automated file edits.",
          rationale: "Prevents accidental mass-modification or developer data loss when running automated review scripts.",
          alternativeRejected: "Silent in-place file mutation.",
        },
      ],
      testingAndEvaluation: {
        metrics: [
          "101 / 101 tests passed (100% test pass rate)",
          "10 safe remediation acceptance checks verified",
          "Zero path traversal vulnerabilities (symlink protection enabled)",
        ],
        methodology:
          "Comprehensive pytest suite verifying AST visitor correctness, CLI flag parsing, MCP server protocol adherence, and edge-case error recovery.",
        testCount: 101,
      },
      securityReliability: [
        "Path containment checks prevent edits outside targeted workspace directories.",
        "Symlink traversal protection blocks malicious link-following attacks.",
        "Atomic backup creation prior to any file mutation with automatic rollback on failure.",
        "Post-fix re-analysis verifies that proposed fixes do not introduce new syntax errors.",
      ],
      keyLearnings: [
        "Providing an MCP interface allows AI coding assistants like Claude or Cursor to leverage deterministic linting tools as first-class tools.",
      ],
      localDeploymentInstructions: [
        "pip install logicfalcon",
        "logicfalcon review ./src",
        "from logicfalcon import ReviewEngine",
        "engine = ReviewEngine()",
        "report = engine.review_workspace('./src')",
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
  const normalized = slug.toLowerCase().trim();
  return PROJECTS.find((p) => p.slug === normalized);
}

export function getAllProjectCategories(): string[] {
  return [
    "All Projects",
    "Published Packages (PyPI)",
    "LLM & RAG",
    "AI Security",
    "Reliability Engineering",
    "Machine Learning",
    "Computer Vision",
    "Developer Infrastructure",
    "Full Stack",
  ];
}

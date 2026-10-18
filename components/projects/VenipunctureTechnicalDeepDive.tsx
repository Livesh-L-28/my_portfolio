import React from "react";
import {
  Glasses,
  Cpu,
  Database,
  Mic,
  FileText,
  Server,
  CheckCircle2,
  Sparkles,
  Workflow,
} from "lucide-react";

export const VenipunctureTechnicalDeepDive: React.FC = () => {
  const pillars = [
    {
      id: "unity-vr-development",
      sectionNumber: "01",
      title: "Unity VR Development",
      shortTitle: "Unity VR Client",
      icon: <Glasses className="h-5 w-5 text-violet-600" />,
      accentColor: "border-violet-200 bg-violet-50 text-violet-700",
      badge: "OpenXR · C# · VRIF 3D",
      tagline: "High-fidelity clinical virtual room with tactile physics and 16-step procedural progression",
      overview:
        "Engineered an authentic hospital clinical room in Unity featuring a complete 16-step procedural state machine. The simulator supports both guided Training Mode (with visual guidance cues and real-time needle angle meters) and Test Mode (unassisted scenario assessment with automated error classification).",
      architectureComponents: [
        "Unity and C# runtime orchestrating real-time clinical physics and VR spatial interactions",
        "Structured 16-step venipuncture workflow tracking sequential progress from patient ID to sharps disposal",
        "Training and Test modes: visual assistance highlights vs blind evaluation",
        "Interactive medical objects: multi-sample needles, vacutainer tubes, tourniquet, antiseptic wipes, biohazard sharps bin",
        "Procedural progression and mistake detection: automated detection of technique violations and protocol skips",
      ],
      capabilities: [
        "Real-time needle insertion angle calculation enforcing 15°–30° clinical bevel orientation",
        "Tactile vein palpation simulation and blood flashback visualization upon successful vein entry",
        "Two-handed manipulation: stabilizing vein with non-dominant thumb while advancing needle",
        "Tube order-of-draw enforcement preventing additive cross-contamination across collection tubes",
        "OpenXR standard compliance supporting PCVR headsets and standalone wireless configurations",
      ],
      specifications: [
        { label: "Engine & Platform", value: "Unity 3D · OpenXR · PCVR" },
        { label: "Clinical Steps", value: "16 Sequentially Enforced Stages" },
        { label: "Insertion Angle", value: "15° to 30° Bevel Alignment" },
        { label: "Physics Library", value: "VR Interaction Framework (VRIF) + C#" },
      ],
    },
    {
      id: "custom-medical-transformer",
      sectionNumber: "02",
      title: "Custom MedicalTransformerLM",
      shortTitle: "MedicalTransformerLM (~110M)",
      icon: <Cpu className="h-5 w-5 text-emerald-600" />,
      accentColor: "border-emerald-200 bg-emerald-50 text-emerald-700",
      badge: "PyTorch · ~110M Params · OpenBioLLM · Llama 3.2",
      tagline: "Custom PyTorch autoregressive transformer paired with tiered multi-model clinical routing",
      overview:
        "Designed, pre-trained, and fine-tuned an approximately 110M-parameter autoregressive decoder transformer in PyTorch specialized for medical question answering and clinical procedure assistance. Operates in a hybrid routing pipeline alongside OpenBioLLM-8B and Llama 3.2 3B for complex queries.",
      architectureComponents: [
        "Approximately 110M-parameter MedicalTransformerLM built from scratch using PyTorch",
        "OpenBioLLM-8B integration for deep clinical reasoning and pharmacological differential queries",
        "Llama 3.2 3B integration providing lightweight conversational adaptation and fallback reasoning",
        "Medical question answering tailored to phlebotomy protocols, anatomy, and needle safety",
        "Tiered model router in FastAPI directing rapid procedural queries to the 110M model (<150ms)",
      ],
      capabilities: [
        "Autoregressive causal transformer architecture optimized for edge MPS and CUDA execution",
        "Domain-specialized tokenization preserving medical terminologies (e.g., K2-EDTA, median cubital, hematoma)",
        "Zero-hallucination constraint layer cross-referencing generated tokens against clinical literature",
        "Sub-150ms latency for real-time in-headset guidance without breaking procedural immersion",
        "Safety guardrails refusing unverified off-protocol clinical recommendations",
      ],
      specifications: [
        { label: "Architecture", value: "Autoregressive Decoder (~110M Params)" },
        { label: "Partner Models", value: "OpenBioLLM-8B · Llama 3.2 3B" },
        { label: "Inference Latency", value: "<150ms local MPS / GPU" },
        { label: "Training Standards", value: "CLSI GP41 (6th Ed) · WHO Guidelines" },
      ],
    },
    {
      id: "medical-rag-pipeline",
      sectionNumber: "03",
      title: "Medical RAG Pipeline",
      shortTitle: "Medical RAG",
      icon: <Database className="h-5 w-5 text-cyan-600" />,
      accentColor: "border-cyan-200 bg-cyan-50 text-cyan-800",
      badge: "BM25 + pgvector · PostgreSQL · Hybrid Search",
      tagline: "Dense semantic embeddings combined with sparse BM25 retrieval and strict grounding verification",
      overview:
        "Engineered a resilient medical retrieval-augmented generation pipeline that pairs lexical BM25 matching with PostgreSQL pgvector dense similarity embeddings, ensuring all answers generated for learners are grounded in authoritative clinical literature.",
      architectureComponents: [
        "Medical document processing parsing phlebotomy manuals, needle specs, and institutional guidelines",
        "BM25 retrieval engine capturing exact pharmacological identifiers, tube additive names, and needle gauges",
        "Dense vector embeddings capturing semantic nuances and conversational intent",
        "PostgreSQL with pgvector extension storing high-dimensional embeddings for low-latency similarity queries",
        "Context construction dynamically synthesizing top-k retrieved chunks into LLM prompt templates",
        "Medical response-grounding validation scoring claims before presentation to the learner",
      ],
      capabilities: [
        "Hybrid retrieval combining sparse lexical ranking with dense cosine similarity",
        "Sub-12ms round-trip vector search executed natively within PostgreSQL",
        "Order-of-draw strict rule verification preventing improper additive sequencing (e.g. EDTA before heparin)",
        "Fail-closed fallback: gracefully acknowledges ungrounded questions without fabricating medical advice",
        "Citation tracing linking each generated guidance snippet directly back to source reference chapters",
      ],
      specifications: [
        { label: "Vector Store", value: "PostgreSQL 16 + pgvector" },
        { label: "Lexical Engine", value: "BM25 Sparse Inverted Index" },
        { label: "Retrieval Latency", value: "<12ms hybrid query search" },
        { label: "Grounding Safety", value: "Threshold validation & citation check" },
      ],
    },
    {
      id: "voice-medical-assistant",
      sectionNumber: "04",
      title: "Voice-Based Medical Assistant",
      shortTitle: "Voice Assistant",
      icon: <Mic className="h-5 w-5 text-sky-600" />,
      accentColor: "border-sky-200 bg-sky-50 text-sky-700",
      badge: "Whisper STT · macOS Speech TTS · Hands-Free",
      tagline: "Sterile field-preserving voice interaction pipeline delivering real-time clinical answers",
      overview:
        "Built an interactive voice pipeline enabling medical trainees to speak natural clinical questions inside the virtual environment without releasing equipment or breaking sterile procedure. Audio captured by the headset microphone is converted to text, answered by the medical AI, and spoken aloud.",
      architectureComponents: [
        "Whisper speech-to-text (ASR) converting spoken trainee queries into structured text transcripts",
        "Medical Q&A routing queries through the hybrid RAG and MedicalTransformerLM pipeline",
        "Text-to-speech using the documented macOS speech engine synthesizing natural audio responses",
        "Unity audio streamer transmitting microphone buffers via asynchronous HTTP/WebSocket channels",
        "Hands-free operational model maintaining sterile field simulation integrity",
      ],
      capabilities: [
        "Zero-touch UI interaction: phlebotomist asks questions without releasing syringe or tourniquet",
        "Low-latency streaming audio pipeline providing spoken answers within 1.2 seconds",
        "Context-sensitive query resolution linking pronouns to active simulation step",
        "3D spatial audio playback in Unity positioning the mentor voice within the room",
        "Local execution compatibility running fully offline on workstation machines",
      ],
      specifications: [
        { label: "Speech-to-Text", value: "OpenAI Whisper ASR" },
        { label: "Text-to-Speech", value: "macOS Speech Engine (say / NSSpeechSynthesizer)" },
        { label: "Voice Loop Latency", value: "<1.2s end-to-end response time" },
        { label: "Headset Audio", value: "Microphone capture + 3D spatial playback" },
      ],
    },
    {
      id: "assessment-pdf-reporting",
      sectionNumber: "05",
      title: "Assessment and PDF Reporting",
      shortTitle: "Assessment & PDF Reports",
      icon: <FileText className="h-5 w-5 text-amber-600" />,
      accentColor: "border-amber-200 bg-amber-50 text-amber-800",
      badge: "Automated Rubrics · ReportLab · Audit Trail",
      tagline: "Automated objective grading with timestamped mistake detection and downloadable clinical PDF reports",
      overview:
        "Developed an objective clinical evaluation engine that records all trainee actions, calculates angle precision and procedural timing, detects clinical errors, and outputs a publication-quality training performance report in PDF format.",
      architectureComponents: [
        "Structured performance information capturing millisecond-level step timestamps and needle trajectory",
        "Assessment summaries evaluating speed, safety, sequence correctness, and asepsis",
        "Educational feedback detailing targeted corrective guidance for detected procedural errors",
        "PDF report generation utilizing Python ReportLab to generate official clinical transcripts",
        "Local session caching ensuring data is stored even if network connectivity is interrupted",
      ],
      capabilities: [
        "Automated grading based on 16-point standard phlebotomy clinical rubrics",
        "Zero-tolerance error detection: flags angles >30°, missing patient identification, and prolonged tourniquet application (>60s)",
        "Visual angle variance charts illustrating needle insertion compliance",
        "Institutional export for hospital nursing directors, university instructors, and certification boards",
        "Local storage backup in Unity synchronizing with PostgreSQL when online",
      ],
      specifications: [
        { label: "Report Engine", value: "Python ReportLab Clinical PDF Generator" },
        { label: "Evaluation Rubric", value: "16-point validated clinical protocol" },
        { label: "Mistake Tracking", value: "Timestamped critical & minor safety flags" },
        { label: "Data Persistence", value: "PostgreSQL database + local JSON cache" },
      ],
    },
    {
      id: "backend-integration-validation",
      sectionNumber: "06",
      title: "Backend Integration and Validation",
      shortTitle: "FastAPI Backend",
      icon: <Server className="h-5 w-5 text-rose-600" />,
      accentColor: "border-rose-200 bg-rose-50 text-rose-700",
      badge: "FastAPI · ASGI · Pydantic · pytest",
      tagline: "High-throughput asynchronous web services coordinating AI models, speech, and telemetry",
      overview:
        "Engineered an asynchronous FastAPI backend service that connects the Unity VR client to the AI inference engines, speech processors, RAG vector database, and reporting system into one cohesive platform.",
      architectureComponents: [
        "REST endpoints handling session creation, step progression, telemetry logging, and report generation",
        "Request orchestration managing asynchronous background tasks and model invocations",
        "Speech-processing endpoints accepting raw audio buffers for Whisper transcription",
        "Model routing directing queries to 110M transformer, OpenBioLLM-8B, or Llama 3.2 3B",
        "Session data and AI service integration managing PostgreSQL connection pools and pgvector queries",
      ],
      capabilities: [
        "Asynchronous FastAPI ASGI architecture with sub-10ms baseline API latency",
        "Pydantic v2 data models enforcing strict schema validation on all incoming telemetry events",
        "Comprehensive pytest test suite validating state machine progression and RAG grounding",
        "Connection pooling with asyncpg and SQLAlchemy for resilient database operations",
        "Docker containerization supporting institutional cloud or on-premises hospital laboratory deployments",
      ],
      specifications: [
        { label: "Backend Framework", value: "Python 3.11 · FastAPI · Uvicorn ASGI" },
        { label: "Data Validation", value: "Pydantic v2 schemas" },
        { label: "Testing Suite", value: "pytest unit & end-to-end integration tests" },
        { label: "Deployment", value: "Docker container · RESTful HTTP & WebSockets" },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 bg-indigo-50 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 bg-sky-50 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-mono text-indigo-800 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Integrated Clinical Architecture</span>
            <span className="text-indigo-400 font-bold">•</span>
            <span>6 Core Engineering Pillars</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            System Components & Technical Deep Dives
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
            A comprehensive breakdown of the integrated clinical architecture combining Unity VR simulation, custom PyTorch language modeling, hybrid RAG retrieval, hands-free voice assistance, and automated clinical evaluation.
          </p>
        </div>

        {/* Quick jump navigation chips */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-bold shrink-0 mr-1">Quick Jump:</span>
          {pillars.map((pillar) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors shrink-0 font-medium"
            >
              <span>{pillar.shortTitle}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 6 Individual Sequential Pillar Sections */}
      <div className="space-y-10">
        {pillars.map((pillar) => (
          <section
            key={pillar.id}
            id={pillar.id}
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${pillar.accentColor} shrink-0`}>
                  {pillar.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                      Pillar {pillar.sectionNumber} of 06
                    </span>
                    <span className="text-slate-400 dark:text-slate-600 font-mono text-xs">•</span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-200 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 font-medium">
                    {pillar.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Overview text */}
            <p className="mt-6 text-sm text-slate-800 dark:text-slate-200 font-medium font-sans leading-relaxed">
              {pillar.overview}
            </p>

            {/* Architecture Components */}
            <div className="mt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 mb-3 flex items-center gap-2">
                <Workflow className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                <span>Architecture Components & Subsystems</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {pillar.architectureComponents.map((comp, cIdx) => (
                  <div
                    key={cIdx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs text-slate-800 dark:text-slate-200 font-sans flex items-start gap-2.5 leading-relaxed font-medium"
                  >
                    <span className="text-sky-600 dark:text-sky-400 font-bold shrink-0 mt-0.5">›</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="mt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Key Procedural & Algorithmic Capabilities</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {pillar.capabilities.map((cap, capIdx) => (
                  <div
                    key={capIdx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs text-slate-800 dark:text-slate-200 font-sans flex items-start gap-2.5 leading-relaxed font-medium"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pillar.specifications.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-3 text-left"
                >
                  <span className="block text-[10px] font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider font-bold">
                    {spec.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-mono font-bold text-slate-950 dark:text-white mt-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

import React from "react";
import {
  Layers,
  Cpu,
  Database,
  Mic,
  Server,
  Terminal,
  Glasses,
} from "lucide-react";

interface TechGroup {
  category: string;
  icon: React.ReactNode;
  technologies: { name: string; detail: string }[];
}

export const VenipunctureTechStack: React.FC = () => {
  const techGroups: TechGroup[] = [
    {
      category: "VR & Simulation Runtime",
      icon: <Glasses className="h-4 w-4 text-violet-400" />,
      technologies: [
        { name: "Unity 3D", detail: "Clinical room simulation, scene lighting, and interactive medical assets" },
        { name: "C# (.NET)", detail: "16-step procedural state machine, physics grabbing, and angle tracking" },
        { name: "OpenXR", detail: "Cross-platform VR standard for PCVR & standalone headsets" },
        { name: "VRIF", detail: "VR Interaction Framework for snap zones, socketing, and hand poses" },
      ],
    },
    {
      category: "Medical AI & Language Models",
      icon: <Cpu className="h-4 w-4 text-emerald-400" />,
      technologies: [
        { name: "PyTorch", detail: "Custom causal decoder transformer architecture training & inference" },
        { name: "MedicalTransformerLM", detail: "~110M parameter specialized clinical assistant model" },
        { name: "OpenBioLLM-8B", detail: "Biomedical foundation model for advanced clinical differential reasoning" },
        { name: "Llama 3.2 3B", detail: "Lightweight conversational adaptation and edge reasoning" },
      ],
    },
    {
      category: "Retrieval & Vector Storage",
      icon: <Database className="h-4 w-4 text-cyan-400" />,
      technologies: [
        { name: "PostgreSQL 16", detail: "Primary relational database for sessions and clinical records" },
        { name: "pgvector", detail: "Vector similarity search extension for dense semantic embeddings" },
        { name: "BM25 Engine", detail: "Sparse lexical retrieval index for exact pharmacological terms" },
        { name: "Sentence-Transformers", detail: "Bi-encoder dense embedding generation for medical literature" },
      ],
    },
    {
      category: "Voice AI & Audio Systems",
      icon: <Mic className="h-4 w-4 text-sky-400" />,
      technologies: [
        { name: "OpenAI Whisper", detail: "Automatic speech recognition (ASR) converting VR mic audio to text" },
        { name: "macOS Speech Engine", detail: "Native speech synthesis (say / NSSpeechSynthesizer) for TTS answers" },
        { name: "WebSockets / HTTP", detail: "Low-latency bidirectional audio streaming between Unity and FastAPI" },
        { name: "3D Spatial Audio", detail: "Positional clinical instructor voice rendering inside Unity VR" },
      ],
    },
    {
      category: "Backend & Automated Reporting",
      icon: <Server className="h-4 w-4 text-amber-400" />,
      technologies: [
        { name: "FastAPI", detail: "High-throughput asynchronous Python ASGI server and REST router" },
        { name: "Pydantic v2", detail: "Strict data validation schemas for telemetry and assessment events" },
        { name: "ReportLab", detail: "Programmatic clinical PDF report generation with visual metrics" },
        { name: "asyncpg & SQLAlchemy", detail: "Asynchronous connection pooling and database ORM layer" },
      ],
    },
    {
      category: "Validation, DevOps & Quality",
      icon: <Terminal className="h-4 w-4 text-rose-400" />,
      technologies: [
        { name: "pytest", detail: "End-to-end integration test suites for state machines & RAG grounding" },
        { name: "Docker", detail: "Containerized deployment for hospital on-premise or cloud labs" },
        { name: "Git & CI/CD", detail: "Version control and automated regression testing workflows" },
        { name: "Ruff & Black", detail: "Python formatting, linting, and type consistency validation" },
      ],
    },
  ];

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="h-5 w-5 text-indigo-400" />
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
          Technology Stack
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
        An integrated engineering stack spanning real-time game engines, custom deep learning models, hybrid information retrieval, voice AI, and clinical-grade reporting services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-zinc-800">
                {group.icon}
                <h3 className="font-sans text-sm font-bold text-white tracking-tight">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-3">
                {group.technologies.map((t) => (
                  <div key={t.name} className="text-xs">
                    <span className="font-mono font-bold text-zinc-200 block">
                      {t.name}
                    </span>
                    <span className="text-zinc-400 font-sans leading-relaxed block mt-0.5">
                      {t.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

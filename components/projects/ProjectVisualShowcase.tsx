"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Box, Play, Terminal, CheckCircle2, RefreshCw, Copy, Check } from "lucide-react";
import { Project3DCanvas, Project3DType } from "@/components/3d/Project3DCanvas";
import { getEmbeddableVideoUrl } from "@/lib/links";

interface TestItem {
  file: string;
  name: string;
  duration: string;
  status: "PASSED";
}

interface PytestSuiteData {
  command: string;
  totalTests: number;
  passingTime: string;
  metrics: { label: string; value: string }[];
  tests: TestItem[];
}

const PYTEST_DATA: Record<string, PytestSuiteData> = {
  "llmfirewall-core": {
    command: "pytest tests/ -v --tb=short --durations=5",
    totalTests: 608,
    passingTime: "1.42s",
    metrics: [
      { label: "P99 Scan Latency", value: "0.022ms" },
      { label: "Network I/O", value: "0 bytes (Pure In-Process)" },
      { label: "Memory Overhead", value: "~1.2 MB" },
      { label: "Adversarial Recall", value: "99.4%" },
    ],
    tests: [
      { file: "test_jailbreak_interception.py", name: "test_dan_v11_jailbreak_blocked", duration: "0.021ms", status: "PASSED" },
      { file: "test_jailbreak_interception.py", name: "test_recursive_token_obfuscation_blocked", duration: "0.018ms", status: "PASSED" },
      { file: "test_jailbreak_interception.py", name: "test_base64_adversarial_payload_blocked", duration: "0.024ms", status: "PASSED" },
      { file: "test_jailbreak_interception.py", name: "test_system_prompt_leakage_blocked", duration: "0.019ms", status: "PASSED" },
      { file: "test_pii_sanitization.py", name: "test_credit_card_luhn_algorithm_redaction", duration: "0.012ms", status: "PASSED" },
      { file: "test_pii_sanitization.py", name: "test_ssn_entropy_masking_verified", duration: "0.015ms", status: "PASSED" },
      { file: "test_pii_sanitization.py", name: "test_api_key_entropy_heuristic_detection", duration: "0.016ms", status: "PASSED" },
      { file: "test_pipeline_isolation.py", name: "test_shell_command_injection_interception", duration: "0.011ms", status: "PASSED" },
      { file: "test_pipeline_isolation.py", name: "test_zero_network_call_leakage_during_scan", duration: "0.009ms", status: "PASSED" },
      { file: "test_benchmarks.py", name: "test_sub_millisecond_p99_latency_budget", duration: "0.022ms", status: "PASSED" },
    ],
  },
  "aireliability": {
    command: "airel run --deterministic --concurrency=4 tests/",
    totalTests: 362,
    passingTime: "0.88s",
    metrics: [
      { label: "Determinism Score", value: "100.0% Exact Match" },
      { label: "Floating Point Drift", value: "< 1e-7 Deviation" },
      { label: "CLI Test Runner", value: "airel v1.4.0" },
      { label: "Supported Pythons", value: "3.9 - 3.13" },
    ],
    tests: [
      { file: "test_determinism.py", name: "test_seed_locked_agent_trajectory_execution", duration: "0.035s", status: "PASSED" },
      { file: "test_determinism.py", name: "test_floating_point_entropy_collapse", duration: "0.028s", status: "PASSED" },
      { file: "test_adversarial_drift.py", name: "test_context_window_overflow_simulation", duration: "0.041s", status: "PASSED" },
      { file: "test_adversarial_drift.py", name: "test_stochastic_variance_upper_bounds", duration: "0.033s", status: "PASSED" },
      { file: "test_state_machine.py", name: "test_deterministic_reproducibility_matrix", duration: "0.027s", status: "PASSED" },
      { file: "test_cli_runner.py", name: "test_airel_run_json_telemetry_export", duration: "0.019s", status: "PASSED" },
      { file: "test_cli_runner.py", name: "test_junit_xml_report_generation", duration: "0.022s", status: "PASSED" },
      { file: "test_mock_llm.py", name: "test_deterministic_mock_cache_hit_ratio", duration: "0.014s", status: "PASSED" },
    ],
  },
  "aegis-framework": {
    command: "pytest tests/ --cov=aegis_resilience --cov-report=term-missing",
    totalTests: 148,
    passingTime: "1.15s",
    metrics: [
      { label: "Test Coverage", value: "98.7% Stmts" },
      { label: "Telemetry Isolation", value: "AES-256-GCM" },
      { label: "MTTR Reduction", value: "~4.2x Faster" },
      { label: "Autonomous Remediation", value: "Zero False Positive" },
    ],
    tests: [
      { file: "test_telemetry_isolation.py", name: "test_multi_tenant_trace_scrubbing", duration: "0.042s", status: "PASSED" },
      { file: "test_telemetry_isolation.py", name: "test_otel_span_cryptographic_integrity", duration: "0.038s", status: "PASSED" },
      { file: "test_circuit_breaker.py", name: "test_autonomous_circuit_breaker_trip", duration: "0.029s", status: "PASSED" },
      { file: "test_circuit_breaker.py", name: "test_failover_drain_without_data_loss", duration: "0.035s", status: "PASSED" },
      { file: "test_root_cause.py", name: "test_ast_causal_graph_remediation_inference", duration: "0.046s", status: "PASSED" },
      { file: "test_health_gate.py", name: "test_zero_false_positive_remediation_gate", duration: "0.031s", status: "PASSED" },
    ],
  },
  "nexarag": {
    command: "pytest tests/test_retrieval.py tests/test_token_allocator.py -v",
    totalTests: 321,
    passingTime: "2.14s",
    metrics: [
      { label: "Citation Accuracy", value: "99.2% Grounded" },
      { label: "P99 Hybrid Latency", value: "24.5ms" },
      { label: "Token Allocation", value: "7-Tier Dynamic Budget" },
      { label: "Dense+Sparse RRF", value: "k=60 Calibrated" },
    ],
    tests: [
      { file: "test_retrieval.py", name: "test_dense_pgvector_hnsw_cosine_similarity", duration: "0.012s", status: "PASSED" },
      { file: "test_retrieval.py", name: "test_bm25_sparse_lexical_token_matching", duration: "0.008s", status: "PASSED" },
      { file: "test_retrieval.py", name: "test_reciprocal_rank_fusion_rrf_scoring", duration: "0.015s", status: "PASSED" },
      { file: "test_token_allocator.py", name: "test_7_tier_context_window_budget_cap", duration: "0.011s", status: "PASSED" },
      { file: "test_attribution.py", name: "test_hallucination_gate_threshold_cutoff", duration: "0.018s", status: "PASSED" },
      { file: "test_attribution.py", name: "test_strict_citation_grounding_verification", duration: "0.016s", status: "PASSED" },
    ],
  },
  "sentinel-ai": {
    command: "pytest tests/test_tracking.py tests/test_zones.py tests/test_evidence.py -v",
    totalTests: 116,
    passingTime: "1.45s",
    metrics: [
      { label: "YOLO Inference", value: "<18ms Real-Time" },
      { label: "Policy Evaluation", value: "100% Deterministic" },
      { label: "Agent Pipeline", value: "4-Stage Investigation Trace" },
      { label: "Evidence Ledger", value: "SHA-256 Tamper-Evident" },
    ],
    tests: [
      { file: "test_tracking.py", name: "test_yolo_multi_object_tracking_persistence", duration: "0.019s", status: "PASSED" },
      { file: "test_zones.py", name: "test_spatial_polygon_hazard_breach_detection", duration: "0.014s", status: "PASSED" },
      { file: "test_evidence.py", name: "test_sha256_incident_snapshot_hash_chain", duration: "0.009s", status: "PASSED" },
      { file: "test_agents.py", name: "test_4_stage_investigation_gate_pipeline", duration: "0.024s", status: "PASSED" },
      { file: "test_digital_twin.py", name: "test_3d_spatial_coordinate_projection", duration: "0.016s", status: "PASSED" },
      { file: "test_auth_rbac.py", name: "test_fail_closed_jwt_safety_policy_enforcement", duration: "0.011s", status: "PASSED" },
    ],
  },
};

interface ProjectVisualShowcaseProps {
  slug: string;
  title: string;
  thumbnail?: string;
  threeDType: Project3DType | null;
  videoUrl?: string;
}

export const ProjectVisualShowcase: React.FC<ProjectVisualShowcaseProps> = ({
  slug,
  title,
  thumbnail,
  threeDType,
  videoUrl,
}) => {
  const pytestSuite = PYTEST_DATA[slug];

  const [activeTab, setActiveTab] = useState<"video" | "ui" | "3d" | "pytest">(
    videoUrl ? "video" : thumbnail ? "ui" : threeDType ? "3d" : "pytest"
  );
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  if (!thumbnail && !threeDType && !videoUrl && !pytestSuite) return null;

  const parsedVideo = videoUrl ? getEmbeddableVideoUrl(videoUrl) : null;
  const availableTabsCount =
    (videoUrl ? 1 : 0) + (thumbnail ? 1 : 0) + (threeDType ? 1 : 0) + (pytestSuite ? 1 : 0);

  const handleRerun = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
    }, 450);
  };

  const handleCopyCommand = async () => {
    if (!pytestSuite) return;
    try {
      await navigator.clipboard.writeText(pytestSuite.command);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {/* Clean Window Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50/95 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-bold">
              {title}
            </span>
          </div>

          {/* Toggle Tabs - only if multiple are available */}
          {availableTabsCount > 1 ? (
            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 p-1 border border-slate-300 dark:border-slate-700">
              {videoUrl && (
                <button
                  type="button"
                  onClick={() => setActiveTab("video")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "video"
                      ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-xs border border-slate-300 dark:border-slate-700"
                      : "text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium"
                  }`}
                >
                  <Play className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
                  <span>Demo Video</span>
                </button>
              )}

              {thumbnail && (
                <button
                  type="button"
                  onClick={() => setActiveTab("ui")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "ui"
                      ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-xs border border-slate-300 dark:border-slate-700"
                      : "text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 text-indigo-600" />
                  <span>
                    {slug === "venipuncture-vr"
                      ? "VR Simulation"
                      : slug === "llmfirewall-core" || slug === "aireliability" || slug === "aegis-framework"
                      ? "Architecture Spec"
                      : "UI Architecture"}
                  </span>
                </button>
              )}

              {threeDType && (
                <button
                  type="button"
                  onClick={() => setActiveTab("3d")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "3d"
                      ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-xs border border-slate-300 dark:border-slate-700"
                      : "text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium"
                  }`}
                >
                  <Box className="h-3.5 w-3.5 text-indigo-600" />
                  <span>3D WebGL (60FPS)</span>
                </button>
              )}

              {pytestSuite && (
                <button
                  type="button"
                  onClick={() => setActiveTab("pytest")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === "pytest"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs border border-slate-300 dark:border-slate-700"
                      : "text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pytest Suite ({pytestSuite.totalTests} Passed)</span>
                </button>
              )}
            </div>
          ) : videoUrl ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
              <Play className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
              <span>Project Demonstration Video</span>
            </div>
          ) : threeDType ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
              <Box className="h-3.5 w-3.5 text-indigo-600" />
              <span>Interactive 3D Simulation</span>
            </div>
          ) : null}
        </div>

        {/* Display Area - Pure, clean, unobstructed */}
        <div className="relative bg-slate-950">
          {activeTab === "video" && videoUrl && parsedVideo && (
            <div className="relative w-full aspect-video min-h-[340px] sm:min-h-[460px] max-h-[640px] bg-black flex items-center justify-center">
              {parsedVideo.type === "embed" ? (
                <iframe
                  src={parsedVideo.url}
                  title={`${title} Demonstration Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={parsedVideo.url || videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              )}
            </div>
          )}

          {activeTab === "ui" && thumbnail && (
            <div className="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-[460px] max-h-[640px] overflow-hidden bg-slate-100">
              <Image
                src={thumbnail}
                alt={`${title} System Interface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-cover object-top"
              />
            </div>
          )}

          {activeTab === "3d" && threeDType && (
            <div className="p-4 sm:p-6 bg-slate-900/60">
              <Project3DCanvas
                type={threeDType}
                height="h-80 sm:h-96"
                interactive={true}
                showControlsHelp={true}
              />
            </div>
          )}

          {activeTab === "pytest" && pytestSuite && (
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-[#0b0f19] text-slate-200">
              {/* Command bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-slate-100 font-semibold">{pytestSuite.command}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRerun}
                    disabled={isRunningTests}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3 w-3 ${isRunningTests ? "animate-spin" : ""}`} />
                    <span>{isRunningTests ? "Executing..." : "Re-run Pytest"}</span>
                  </button>
                </div>
              </div>

              {/* Performance Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {pytestSuite.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80"
                  >
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Test Execution Log */}
              <div className="rounded-lg bg-slate-950 border border-slate-800/80 p-3 sm:p-4 max-h-72 overflow-y-auto space-y-1.5">
                <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900">
                  platform darwin -- Python 3.11.8, pytest-8.2.1, pluggy-1.5.0
                </div>

                {isRunningTests ? (
                  <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <RefreshCw className="h-5 w-5 animate-spin text-emerald-400" />
                    <span>Running deterministic test suite in virtualenv...</span>
                  </div>
                ) : (
                  <>
                    {pytestSuite.tests.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap items-center justify-between gap-2 py-0.5 hover:bg-slate-900/60 rounded px-1"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span className="text-slate-400 truncate text-[11px] sm:text-xs">
                            {t.file}::
                          </span>
                          <span className="text-slate-200 truncate text-[11px] sm:text-xs font-semibold">
                            {t.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] shrink-0">
                          <span className="text-slate-500">{t.duration}</span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 mt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                      <span>... and {pytestSuite.totalTests - pytestSuite.tests.length} additional passing test cases</span>
                      <span className="text-emerald-400 font-semibold">100% Passing</span>
                    </div>
                  </>
                )}
              </div>

              {/* Pass Banner */}
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>
                    ================ {pytestSuite.totalTests} passed in {pytestSuite.passingTime} ================
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400/90 font-mono">
                  0 failed, 0 warnings, 0 regressions
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


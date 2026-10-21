"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  FileDown,
  Moon,
  Sun,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Navigation,
  Sparkles,
  Bot,
  Volume2,
  VolumeX,
  Package,
  Zap,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PROFILE_LINKS } from "@/lib/links";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useSoundEnabled, toggleSound, playClickSound, playThemeSwitchSound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "PyPI Packages" | "Projects" | "Navigation" | "Actions" | "AI Copilot";
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  badge?: string;
}

interface CopilotAnswer {
  title: string;
  badge: string;
  answer: string;
  actionUrl?: string;
  actionLabel?: string;
}

function getAICopilotAnswer(query: string): CopilotAnswer {
  const q = query.toLowerCase();
  if (q.includes("rag") || q.includes("retrieval") || q.includes("nexarag") || q.includes("vector")) {
    return {
      title: "NexaRAG Hybrid Retrieval & Token Engine",
      badge: "Flagship RAG",
      answer:
        "Livesh architected NexaRAG, featuring a 7-tier dynamic token allocation engine with 99.2% citation attribution accuracy. It fuses pgvector HNSW dense cosine search with BM25 sparse lexical indices via Reciprocal Rank Fusion (RRF) with ~24.5ms average latency across 321 automated tests.",
      actionUrl: "/projects/nexarag",
      actionLabel: "Inspect NexaRAG Case Study",
    };
  }
  if (q.includes("pypi") || q.includes("package") || q.includes("open source") || q.includes("pip")) {
    return {
      title: "Published PyPI Distributions",
      badge: "Open Source",
      answer:
        "Livesh has published 3 production packages on the Python Package Index (PyPI):\n1. llmfirewall-core: In-process prompt injection & PII defense (~0.02ms).\n2. aireliability: Deterministic test framework for AI agents with the airel CLI (362 tests).\n3. aegis-resilience: Autonomous incident root-cause remediation framework.",
      actionUrl: "/#opensource",
      actionLabel: "View Open Source Releases",
    };
  }
  if (q.includes("security") || q.includes("firewall") || q.includes("injection") || q.includes("jailbreak")) {
    return {
      title: "LLMFirewall In-Process Security",
      badge: "AI Security",
      answer:
        "LLMFirewall Core intercepts adversarial prompt injections, DAN jailbreaks, PII exfiltration (Luhn algorithm card masking), and shell pipeline injections in-process with ~0.02ms latency and zero external network calls across 608 passing test cases.",
      actionUrl: "/projects/llmfirewall-core",
      actionLabel: "View LLMFirewall Case Study",
    };
  }
  if (q.includes("vr") || q.includes("clinical") || q.includes("venipuncture") || q.includes("unity")) {
    return {
      title: "Venipuncture VR Clinical Training Platform",
      badge: "Computer Vision & XR",
      answer:
        "Engineered an immersive clinical VR training platform with Unity, OpenXR, and 6-DoF haptic force-feedback for catheter insertion training. Validated across 5 clinical procedural simulations with real-time biometric tracking.",
      actionUrl: "/projects/venipuncture-vr",
      actionLabel: "View Venipuncture VR & 5 Demos",
    };
  }
  if (q.includes("college") || q.includes("education") || q.includes("cgpa") || q.includes("school") || q.includes("degree")) {
    return {
      title: "Academic Standing & Degree",
      badge: "Prathyusha Engineering College",
      answer:
        "Livesh is currently in his final year pursuing a B.Tech in Artificial Intelligence & Data Science at Prathyusha Engineering College, maintaining a cumulative CGPA of 8.53/10 with zero backlogs (graduating May 2027).",
      actionUrl: "/about",
      actionLabel: "View Education Details",
    };
  }
  if (q.includes("experience") || q.includes("internship") || q.includes("work") || q.includes("job")) {
    return {
      title: "Industry Experience & History",
      badge: "4 Internships",
      answer:
        "Livesh has completed 4 software and machine learning internships across Prodigy InfoTech, Cognifyz Technologies, CodSoft, and Oasis Infobyte, specializing in full-stack AI engineering, data preprocessing pipelines, and automated agent reliability testing.",
      actionUrl: "/experience",
      actionLabel: "Explore Experience Timeline",
    };
  }
  return {
    title: "AI Systems Engineering Overview",
    badge: "Portfolio Copilot",
    answer:
      "Livesh L is an AI Developer specializing in production LLM applications, hybrid RAG (pgvector + BM25), in-process AI security firewalls, and deterministic agent reliability testing. Available for full-time AI roles starting 2026/2027.",
    actionUrl: "/projects",
    actionLabel: "Browse All Projects",
  };
}

const COPILOT_QUESTIONS = [
  "What is Livesh's RAG architecture?",
  "Which PyPI packages has he published?",
  "What is his academic standing & CGPA?",
  "Tell me about LLMFirewall security",
  "What VR clinical systems did he build?",
];

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const soundActive = useSoundEnabled();
  const [copilotAnswer, setCopilotAnswer] = useState<CopilotAnswer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Scroll active item into view during keyboard navigation
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
            setCopilotAnswer(null);
          }
          return !prev;
        });
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setCopilotAnswer(null);
      }
    };

    const handleCustomOpen = () => {
      setQuery("");
      setSelectedIndex(0);
      setCopilotAnswer(null);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTriggerCopilot = (question: string) => {
    playClickSound();
    setQuery(question);
    const ans = getAICopilotAnswer(question);
    setCopilotAnswer(ans);
  };

  const copyToClipboard = async (text: string, label: string) => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotification(label);
      setTimeout(() => {
        setCopiedNotification(null);
        setIsOpen(false);
      }, 1000);
    } catch {
      // fallback
    }
  };

  const items: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [];

    // PyPI Packages (Top Priority)
    list.push({
      id: "pypi-llmfirewall",
      title: "pip install llmfirewall-core",
      subtitle: "PyPI v1.1.0 · In-process prompt injection & PII firewall (~0.02ms)",
      category: "PyPI Packages",
      badge: "PyPI Distribution",
      icon: Package,
      perform: () => {
        copyToClipboard("pip install llmfirewall-core", "Copied: pip install llmfirewall-core");
      },
    });

    list.push({
      id: "pypi-aireliability",
      title: "pip install aireliability",
      subtitle: "PyPI v1.4.0 · Deterministic AI agent test framework & CLI",
      category: "PyPI Packages",
      badge: "PyPI Distribution",
      icon: Package,
      perform: () => {
        copyToClipboard("pip install aireliability", "Copied: pip install aireliability");
      },
    });

    list.push({
      id: "pypi-aegis",
      title: "pip install aegis-resilience",
      subtitle: "PyPI v0.1.0 · Telemetry isolation & root-cause remediation",
      category: "PyPI Packages",
      badge: "PyPI Distribution",
      icon: Package,
      perform: () => {
        copyToClipboard("pip install aegis-resilience", "Copied: pip install aegis-resilience");
      },
    });

    // Projects
    PROJECTS.forEach((p) => {
      list.push({
        id: `project-${p.slug}`,
        title: p.title,
        subtitle: p.tagline,
        category: "Projects",
        badge: p.category,
        icon: FolderGit2,
        perform: () => {
          playClickSound();
          setIsOpen(false);
          router.push(`/projects/${p.slug}`);
        },
      });
    });

    // Navigation
    const navItems = [
      { title: "Home / Overview", href: "/" },
      { title: "Published PyPI Showcase", href: "/#opensource" },
      { title: "All 10 AI Projects", href: "/projects" },
      { title: "Live Security & RAG Playground", href: "/#playground" },
      { title: "Professional Experience", href: "/experience" },
      { title: "Engineering Stack & Skills", href: "/skills" },
      { title: "About Background & Education", href: "/about" },
      { title: "Contact & Opportunities", href: "/contact" },
    ];

    navItems.forEach((n) => {
      list.push({
        id: `nav-${n.href}`,
        title: n.title,
        category: "Navigation",
        icon: Navigation,
        perform: () => {
          playClickSound();
          setIsOpen(false);
          router.push(n.href);
        },
      });
    });

    // Quick Actions
    list.push({
      id: "action-sandbox-test",
      title: "Test LLMFirewall Live in Sandbox",
      subtitle: "Executes in-process adversarial injection simulation",
      category: "Actions",
      badge: "Live Simulation",
      icon: Zap,
      perform: () => {
        playClickSound();
        setIsOpen(false);
        const elem = document.getElementById("playground");
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent("trigger-firewall-test"));
        } else {
          router.push("/#playground");
        }
      },
    });

    list.push({
      id: "action-sound",
      title: soundActive ? "Mute Sound Effects" : "Enable Sound Effects",
      subtitle: soundActive ? "Interactive Web Audio is ON" : "Interactive Web Audio is MUTED",
      category: "Actions",
      icon: soundActive ? Volume2 : VolumeX,
      perform: () => {
        toggleSound();
      },
    });

    list.push({
      id: "action-email",
      title: `Copy Email (${PROFILE_LINKS.email})`,
      category: "Actions",
      icon: Copy,
      perform: () => {
        copyToClipboard(PROFILE_LINKS.email, "Copied email address!");
      },
    });

    list.push({
      id: "action-resume",
      title: "Download Resume (PDF)",
      subtitle: "Livesh_L_Resume.pdf",
      category: "Actions",
      icon: FileDown,
      perform: () => {
        playClickSound();
        setIsOpen(false);
        const link = document.createElement("a");
        link.href = PROFILE_LINKS.resumePdf;
        link.download = "Livesh_L_Resume.pdf";
        link.click();
      },
    });

    list.push({
      id: "action-theme",
      title: `Switch to ${theme === "light" ? "Dark" : "Light"} Mode`,
      subtitle: theme === "light" ? "Midnight Obsidian" : "Porcelain Jewel",
      category: "Actions",
      icon: theme === "light" ? Moon : Sun,
      perform: () => {
        playThemeSwitchSound();
        toggleTheme();
        setIsOpen(false);
      },
    });

    list.push({
      id: "action-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/Livesh-L-28",
      category: "Actions",
      icon: ExternalLink,
      perform: () => {
        playClickSound();
        setIsOpen(false);
        window.open(PROFILE_LINKS.github, "_blank");
      },
    });

    list.push({
      id: "action-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/livesh-l-aa9821322",
      category: "Actions",
      icon: ExternalLink,
      perform: () => {
        playClickSound();
        setIsOpen(false);
        window.open(PROFILE_LINKS.linkedin, "_blank");
      },
    });

    return list;
  }, [router, soundActive, theme, toggleTheme]);

  // Filter based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Handle arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (copilotAnswer) {
      if (e.key === "Escape") {
        setCopilotAnswer(null);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim().endsWith("?") || query.toLowerCase().startsWith("what") || query.toLowerCase().startsWith("tell") || query.toLowerCase().startsWith("how")) {
        handleTriggerCopilot(query);
      } else if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].perform();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              setCopilotAnswer(null);
            }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0.05 } : { duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Top search bar */}
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 px-4 py-3.5">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  if (copilotAnswer) setCopilotAnswer(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or ask AI Copilot..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none font-sans"
              />
              <span className="keycap text-[9px] px-1.5 py-0.5">ESC</span>
            </div>

            {/* Copied Feedback Toast */}
            {copiedNotification && (
              <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <Check className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{copiedNotification}</span>
              </div>
            )}

            {/* AI Copilot Answer Display Mode */}
            {copilotAnswer ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-sans font-bold text-slate-900 dark:text-white text-sm">
                      {copilotAnswer.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold">
                    {copilotAnswer.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                  {copilotAnswer.answer}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => setCopilotAnswer(null)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ← Back to commands
                  </button>

                  {copilotAnswer.actionUrl && (
                    <button
                      onClick={() => {
                        playClickSound();
                        setIsOpen(false);
                        router.push(copilotAnswer.actionUrl!);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs cursor-pointer transition-all"
                    >
                      <span>{copilotAnswer.actionLabel || "Inspect Case Study"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* AI Copilot Quick Prompt Pills */}
                <div className="px-3 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                    <Sparkles className="h-3 w-3 text-indigo-500" />
                    <span>Ask AI Copilot:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {COPILOT_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleTriggerCopilot(q)}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 px-2 py-0.5 text-[11px] font-sans text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all cursor-pointer shadow-2xs active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results list */}
                <div className="max-h-72 overflow-y-auto p-2 scrollbar-none">
                  {filteredItems.length > 0 ? (
                    <div className="space-y-1">
                      {filteredItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isSelected = idx === selectedIndex;
                        const showCategoryHeader =
                          idx === 0 || filteredItems[idx - 1].category !== item.category;

                        return (
                          <React.Fragment key={item.id}>
                            {showCategoryHeader && (
                              <div className="px-3 pt-2.5 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {item.category}
                              </div>
                            )}
                            <button
                              ref={isSelected ? selectedItemRef : undefined}
                              onClick={item.perform}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all duration-150 cursor-pointer select-none border-l-2 ${
                                isSelected
                                  ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200 border-indigo-500 shadow-2xs translate-x-0.5"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`p-1.5 rounded-lg border shrink-0 ${
                                    isSelected
                                      ? "bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400"
                                  }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-900 dark:text-slate-100 truncate font-sans">
                                    {item.title}
                                  </p>
                                  {item.subtitle && (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans mt-0.5">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                {item.badge && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                                    {item.badge}
                                  </span>
                                )}
                                {isSelected && (
                                  <ArrowRight className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                )}
                              </div>
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                        No direct commands matching &ldquo;{query}&rdquo;.
                      </p>
                      <button
                        onClick={() => handleTriggerCopilot(query)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer shadow-xs"
                      >
                        <Bot className="h-3.5 w-3.5" />
                        <span>Ask AI Copilot &ldquo;{query}&rdquo;</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Footer shortcuts */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="keycap text-[9px] px-1.5 py-0.5">↑↓</span>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="keycap text-[9px] px-1.5 py-0.5">↵</span>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="keycap text-[9px] px-1.5 py-0.5">esc</span>
                  <span>Close</span>
                </span>
              </div>
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                <Sparkles className="h-3 w-3" />
                <span>AI Copilot Active</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

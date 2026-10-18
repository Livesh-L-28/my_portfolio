import { ImageResponse } from "next/og";

export const alt = "Livesh L — AI Developer | LLM Systems & AI Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#06070b",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.15)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(6, 182, 212, 0.12)",
            filter: "blur(120px)",
          }}
        />

        {/* Header Ribbon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              L
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px" }}>
                Livesh L
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>
                AI Systems Engineer · Available 2026/2027
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(51, 65, 85, 0.8)",
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#38bdf8",
              fontWeight: 700,
            }}
          >
            PEC · CGPA 8.53 / 10 · 1,291 Tests Passing
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            position: "relative",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              background: "linear-gradient(to right, #ffffff, #e2e8f0 70%, #94a3b8)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Architecting AI systems that operate beyond the demo.
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            Production LLM Applications · Hybrid RAG (pgvector + BM25) · In-Process Security Firewalls · 3 Published PyPI Packages
          </div>
        </div>

        {/* 4 Bottom Metric Tiles */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace", fontWeight: 700 }}>
              NexaRAG Engine
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
              321 Tests · ~24.5ms
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              pgvector + BM25 Hybrid
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#a855f7", fontFamily: "monospace", fontWeight: 700 }}>
              llmfirewall-core
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
              608 Tests · ~0.02ms
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              Published PyPI Distribution
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#34d399", fontFamily: "monospace", fontWeight: 700 }}>
              aireliability CLI
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
              362 Deterministic Tests
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              Agent Tooling & Seed Locks
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(51, 65, 85, 0.7)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#fbbf24", fontFamily: "monospace", fontWeight: 700 }}>
              Venipuncture VR
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
              OpenXR · 5 Demos
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              Clinical Simulation Suite
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

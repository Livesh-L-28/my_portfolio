import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { KeyboardShortcutsModal } from "@/components/ui/KeyboardShortcutsModal";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

import { getSiteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#fafbfc",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Livesh L — AI Developer & Systems Engineer | Official Portfolio",
    template: "%s | Livesh L",
  },
  description:
    "Official portfolio of Livesh L, AI Developer and Systems Engineer. Specializing in production LLM applications, hybrid RAG systems, in-process AI security firewalls, deterministic reliability testing, and published PyPI packages.",
  keywords: [
    "Livesh",
    "Livesh L",
    "Livesh-L-28",
    "Livesh AI",
    "Livesh Developer",
    "Livesh Portfolio",
    "Livesh AI Developer",
    "Livesh AI Systems Engineer",
    "Livesh Prathyusha",
    "AI Developer",
    "LLM Engineering",
    "RAG Systems",
    "NexaRAG",
    "LLMFirewall",
    "llmfirewall-core",
    "aireliability",
    "aegis-resilience",
    "LogicFalcon",
    "logicfalcon",
    "Sentinel AI",
    "AI Security",
    "Deterministic Testing",
    "PyPI Packages",
    "FastAPI",
    "pgvector",
  ],
  authors: [{ name: "Livesh L", url: "https://github.com/Livesh-L-28" }],
  creator: "Livesh L",
  publisher: "Livesh L",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Livesh L — AI Developer & Systems Engineer | Official Portfolio",
    description:
      "Official portfolio of Livesh L. Production LLM systems, hybrid RAG architectures, AI firewalls, and published PyPI packages.",
    siteName: "Livesh L — AI Engineering Portfolio",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Livesh L — AI Developer & Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Livesh L — AI Developer & Systems Engineer",
    description:
      "Production-oriented LLM applications, retrieval-augmented generation, AI security firewalls, and deterministic reliability engineering.",
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "935e2140f559c6e8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Livesh L",
      givenName: "Livesh",
      familyName: "L",
      alternateName: ["Livesh", "Livesh-L-28", "Livesh AI Developer", "Livesh Lakshmanan"],
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      jobTitle: "AI Systems Engineer & LLM Developer",
      email: "liveshjaidj@gmail.com",
      telephone: "+91 9345406612",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Prathyusha Engineering College",
        description: "B.Tech in Artificial Intelligence & Data Science, CGPA 8.53/10",
      },
      knowsAbout: [
        "Large Language Models",
        "Retrieval Augmented Generation",
        "AI Security Firewalls",
        "Deterministic Reliability Engineering",
        "FastAPI",
        "PyTorch",
        "PostgreSQL",
        "pgvector",
        "Unity VR & OpenXR",
      ],
      sameAs: [
        "https://github.com/Livesh-L-28",
        "https://linkedin.com/in/livesh-l-aa9821322",
        "https://pypi.org/user/Livesh-L-28/",
        "https://github.com/Livesh-L-28/my_portfolio",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Livesh L — Official AI Engineering Portfolio",
      description:
        "Official portfolio of Livesh L, AI Developer specializing in production LLM applications, RAG systems, and AI security.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      author: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Livesh L — Profile & Engineering Portfolio",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://pypi.org/project/llmfirewall-core/",
      name: "llmfirewall-core",
      version: "1.1.0",
      programmingLanguage: "Python",
      runtimePlatform: "Python 3.9+",
      codeRepository: "https://github.com/Livesh-L-28/llmfirewall-core",
      downloadUrl: "https://pypi.org/project/llmfirewall-core/",
      description:
        "High-performance, in-process prompt injection, DAN jailbreak interception, and PII masking firewall for LLMs (~0.02ms latency).",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://pypi.org/project/aireliability/",
      name: "aireliability",
      version: "1.4.0",
      programmingLanguage: "Python",
      runtimePlatform: "Python 3.9+",
      codeRepository: "https://github.com/Livesh-L-28/aireliability",
      downloadUrl: "https://pypi.org/project/aireliability/",
      description:
        "Deterministic reliability testing framework and CLI for AI agents and LLM production pipelines.",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://pypi.org/project/aegis-resilience/",
      name: "aegis-resilience",
      version: "0.1.0",
      programmingLanguage: "Python",
      runtimePlatform: "Python 3.9+",
      codeRepository: "https://github.com/Livesh-L-28/aegis-resilience",
      downloadUrl: "https://pypi.org/project/aegis-resilience/",
      description:
        "Autonomous telemetry isolation and resilient incident root-cause remediation framework.",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.removeItem('portfolio-theme');
                sessionStorage.removeItem('portfolio-theme');
                document.documentElement.classList.remove('dark');
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] dark:bg-[#06070b] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-indigo-500/30">
        <ThemeProvider>
          <CommandPalette />
          <KeyboardShortcutsModal />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#080A12",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Livesh L. — AI Developer | LLM Systems & AI Security",
  description:
    "Portfolio of Livesh L., AI Developer specializing in production LLM applications, RAG systems, AI security, reliability engineering, and Python/FastAPI services.",
  keywords: [
    "Livesh L",
    "AI Developer",
    "LLM Engineering",
    "RAG Systems",
    "NexaRAG",
    "LLMFirewall",
    "aireliability",
    "AEGIS Framework",
    "AI Security",
    "Deterministic Testing",
    "FastAPI",
    "pgvector",
  ],
  authors: [{ name: "Livesh L." }],
  creator: "Livesh L.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Livesh-L-28",
    title: "Livesh L. — AI Developer | LLM Systems & AI Security",
    description:
      "Production-oriented LLM applications, retrieval-augmented generation, AI security firewalls, and deterministic reliability engineering.",
    siteName: "Livesh L. AI Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Livesh L. — AI Developer | LLM Systems & AI Security",
    description:
      "Production-oriented LLM applications, retrieval-augmented generation, AI security firewalls, and deterministic reliability engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#060913] text-[#F8FAFC] selection:bg-indigo-500/30 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

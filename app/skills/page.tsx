import { Metadata } from "next";
import { CapabilityMap } from "@/components/home/CapabilityMap";

export const metadata: Metadata = {
  title: "Engineering Skills & Stack — Livesh L",
  description:
    "Comprehensive technical skills matrix spanning LLM systems, AI security, reliability engineering, computer vision, and backend infrastructure.",
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <CapabilityMap />
      </div>
    </div>
  );
}

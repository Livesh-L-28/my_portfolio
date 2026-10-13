import { Metadata } from "next";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Professional Experience — Livesh L",
  description:
    "Engineering internships and industry contributions at Chargebee, XARC, Femtosoft Technologies, and Cognifyz Technologies.",
};

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ExperienceTimeline />
      </div>
    </div>
  );
}

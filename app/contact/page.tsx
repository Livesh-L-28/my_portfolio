import { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Livesh L | AI Developer",
  description:
    "Get in touch with Livesh L for AI engineering inquiries, LLM systems collaboration, security consulting, or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ContactSection />
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Livesh L. | AI Developer",
  description:
    "Get in touch with Livesh L. for AI engineering inquiries, LLM systems collaboration, security consulting, or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen py-12 sm:py-16">
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ContactSection />
      </div>
    </div>
  );
}

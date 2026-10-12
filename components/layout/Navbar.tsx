"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown, ExternalLink } from "lucide-react";
import { PROFILE_LINKS } from "@/lib/links";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Engineering", href: "/#engineering" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-violet-500/20 bg-[#080A12]/90 backdrop-blur-xl shadow-lg shadow-black/40 py-3"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg p-1"
          aria-label="Livesh L. - AI Engineering Portfolio Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/40 bg-violet-600/20 text-white font-mono font-bold text-sm tracking-wider shadow-inner group-hover:border-violet-400 group-hover:bg-violet-600/30 transition-all">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-widest text-white group-hover:text-violet-300 transition-colors">
              LIVESH
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              AI DEVELOPER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0D1220]/80 px-4 py-1.5 backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1 text-xs font-mono transition-colors rounded-full ${
                  isActive
                    ? "text-white bg-violet-500/20 border border-violet-500/30 font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PROFILE_LINKS.resumePdf}
            download="Livesh_L_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-600/10 px-3.5 py-1.5 text-xs font-mono font-medium text-violet-200 hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <FileDown className="h-3.5 w-3.5 text-violet-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 md:hidden hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-violet-500/20 bg-[#090D1A]/95 px-5 py-5 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2 font-mono text-sm" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-violet-500/30 bg-violet-600/20 py-2.5 text-xs font-mono font-medium text-white hover:bg-violet-600/30 transition-colors"
              >
                <FileDown className="h-4 w-4 text-violet-300" />
                <span>Download Verified Resume</span>
              </a>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

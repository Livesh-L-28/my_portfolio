"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md py-3"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
          aria-label="Livesh L. Portfolio"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-white font-mono font-semibold text-xs group-hover:border-zinc-500 transition-colors">
            LL
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              Livesh L.
            </span>
            <span className="text-[11px] font-mono text-zinc-400 leading-none">
              AI & LLM Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons & Resume */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            aria-label="Email Livesh"
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
          >
            <Mail className="h-4 w-4" />
          </a>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

          <a
            href={PROFILE_LINKS.resumePdf}
            download="Livesh_L_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-700 hover:text-white transition-all shadow-sm"
          >
            <FileDown className="h-3.5 w-3.5 text-zinc-300" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 md:hidden hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b] px-5 py-4">
          <nav className="flex flex-col gap-2.5 text-sm" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-zinc-800 flex items-center justify-between">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="flex items-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-3.5 py-2 text-xs font-medium text-white"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown, Mail, Sparkles } from "lucide-react";
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-[#070a14]/85 backdrop-blur-xl py-3 shadow-xl shadow-black/30"
          : "border-b border-transparent bg-transparent py-4.5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity with portrait avatar */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
          aria-label="Livesh L. Portfolio"
        >
          <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-md group-hover:border-indigo-400 transition-colors">
            <Image
              src="/images/livesh-profile.jpg"
              alt="Livesh L."
              fill
              sizes="36px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-slate-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Livesh L.
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 leading-none">
              AI & Systems Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors relative py-1 group/item"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-500 transition-all duration-300 group-hover/item:w-full rounded-full" />
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
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/80"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 text-slate-400 hover:text-sky-400 transition-colors rounded-lg hover:bg-slate-800/80"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            aria-label="Email Livesh"
            className="p-1.5 text-slate-400 hover:text-indigo-300 transition-colors rounded-lg hover:bg-slate-800/80"
          >
            <Mail className="h-4 w-4" />
          </a>

          <div className="h-4 w-[1px] bg-slate-800 mx-1" />

          <a
            href={PROFILE_LINKS.resumePdf}
            download="Livesh_L_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-600/30 hover:text-white transition-all shadow-sm"
          >
            <FileDown className="h-3.5 w-3.5 text-indigo-300" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 md:hidden hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070a14] px-5 py-4 backdrop-blur-xl">
          <nav className="flex flex-col gap-3 text-sm" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="flex items-center gap-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 px-3.5 py-2 text-xs font-medium text-white"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white"
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

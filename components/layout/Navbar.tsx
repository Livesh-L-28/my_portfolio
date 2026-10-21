"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Mail, Search, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PROFILE_LINKS } from "@/lib/links";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useSoundEnabled, toggleSound, playThemeSwitchSound } from "@/lib/sound";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Packages", href: "/#packages", id: "packages" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const soundActive = useSoundEnabled();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = ["projects", "packages", "experience", "skills", "about", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 140;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            return;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    toggleSound();
  };

  const handleToggleTheme = () => {
    playThemeSwitchSound();
    toggleTheme();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)]"
          : "border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          aria-label="Livesh L Portfolio"
        >
          <ProfileAvatar size="sm" showStatus={true} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-sm tracking-tight text-slate-950 dark:text-white group-hover:text-indigo-600 transition-colors">
                Livesh L
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-800 font-bold hidden lg:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available 2027</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold leading-none">
              AI Systems Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 shadow-xs" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-3 py-1 text-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs border border-indigo-200/80 dark:border-indigo-800/80"
                    : "font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Resume */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Quick Command Palette Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-slate-950 dark:hover:text-white transition-all shadow-xs cursor-pointer group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="hidden xl:inline text-[11px] font-sans font-bold text-slate-800 dark:text-slate-200">Quick search</span>
            <span className="keycap">⌘K</span>
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={handleToggleSound}
            aria-label={soundActive ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
            title={soundActive ? "Sound FX: Enabled (Click to mute)" : "Sound FX: Muted (Click to enable)"}
            className={`p-1.5 transition-all rounded-xl border cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              soundActive
                ? "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 shadow-2xs font-bold"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            }`}
          >
            {soundActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="p-1.5 text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>

          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 text-slate-800 hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-400 transition-all rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            aria-label="Email Livesh"
            className="p-1.5 text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Mail className="h-4 w-4" />
          </a>

          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800 mx-1" />

          <a
            href={PROFILE_LINKS.resumePdf}
            download="Livesh_L_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-900 dark:border-indigo-600 bg-slate-900 dark:bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-sm hover:shadow-indigo-500/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <FileDown className="h-3.5 w-3.5 text-slate-300 dark:text-white" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle & Theme */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white shadow-xs"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 shadow-lg">
          <nav className="flex flex-col gap-2.5 text-sm" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white font-semibold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-sky-600"
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

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
      if (window.scrollY < 80) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Auto-close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSound = () => {
    toggleSound();
  };

  const handleToggleTheme = () => {
    playThemeSwitchSound();
    toggleTheme();
  };

  const handleOpenSearch = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? "border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)]"
          : "border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
        {/* Brand: Logo + Livesh L. on one line + Subtitle */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 group select-none"
          aria-label="Livesh L. Portfolio - Home"
        >
          <ProfileAvatar size="sm" showStatus={false} />
          <div className="flex flex-col justify-center leading-tight">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-sans font-bold text-sm tracking-tight text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">
                Livesh L.
              </span>
              {/* Compact Availability Indicator: Pill on wide desktop, live pulse dot on compact desktop */}
              <span
                className="hidden 2xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/80 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold leading-none shrink-0 whitespace-nowrap"
                title="Available for AI Systems Engineering opportunities"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden="true" />
                <span>Available</span>
              </span>
              <span
                className="inline-flex 2xl:hidden items-center justify-center h-2 w-2 rounded-full bg-emerald-500 relative shrink-0"
                title="Available for AI Systems Engineering opportunities"
              >
                <span className="h-full w-full rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap hidden sm:block">
              AI Systems Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links: Projects, Packages, Experience, Skills, About, Contact on one aligned row */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-1.5 xl:px-2.5 py-1 shadow-2xs whitespace-nowrap shrink-0"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-2 xl:px-2.5 py-1 text-xs whitespace-nowrap transition-all motion-reduce:transition-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs border border-indigo-200/80 dark:border-indigo-800/80"
                    : "font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Controls: Search, Utility Icons, Resume CTA */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0 whitespace-nowrap">
          {/* Search Button: strictly single-line with 'Search' and '⌘K' */}
          <button
            type="button"
            onClick={handleOpenSearch}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-slate-950 dark:hover:text-white transition-all shadow-2xs cursor-pointer group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Open search command palette (Press ⌘K)"
            title="Search command palette (Press ⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-sans font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Search</span>
            <span className="keycap text-[9px] px-1 py-0.5 leading-none shrink-0 whitespace-nowrap">⌘K</span>
          </button>

          {/* Sound FX Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={soundActive ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
            aria-pressed={soundActive}
            title={soundActive ? "Sound FX: Enabled (Click to mute)" : "Sound FX: Muted (Click to enable)"}
            className={`h-8 w-8 inline-flex items-center justify-center rounded-xl border transition-all cursor-pointer active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              soundActive
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
            }`}
          >
            {soundActive ? <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" /> : <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="h-8 w-8 inline-flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer active:scale-95 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {theme === "light" ? <Moon className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Sun className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />}
          </button>

          {/* GitHub Icon Link */}
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile (Livesh-L-28)"
            title="GitHub Profile (Livesh-L-28)"
            className="h-8 w-8 inline-flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 active:scale-95 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <GithubIcon className="h-4 w-4 shrink-0" />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile (Livesh L)"
            title="LinkedIn Profile (Livesh L)"
            className="h-8 w-8 inline-flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all rounded-xl hover:bg-sky-50/50 dark:hover:bg-sky-950/40 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 active:scale-95 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <LinkedinIcon className="h-4 w-4 shrink-0" />
          </a>

          {/* Email Icon Link */}
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            aria-label="Email Livesh L (liveshjaidj@gmail.com)"
            title="Email Livesh L (liveshjaidj@gmail.com)"
            className="h-8 w-8 inline-flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 active:scale-95 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5 shrink-0" aria-hidden="true" />

          {/* Primary High-Contrast Resume CTA Button */}
          <a
            href={PROFILE_LINKS.resumePdf}
            download="Livesh_L_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-950 dark:border-indigo-500 bg-slate-950 dark:bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-xs hover:shadow-indigo-500/20 active:scale-[0.97] shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Download Resume PDF"
          >
            <FileDown className="h-3.5 w-3.5 text-slate-300 dark:text-white shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">Resume</span>
          </a>
        </div>

        {/* Narrower Widths Header Controls (below lg: Brand + Search + Menu Button) */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0 whitespace-nowrap">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={handleOpenSearch}
            aria-label="Open search command palette"
            title="Search command palette (Press ⌘K)"
            className="h-8 px-2 sm:px-2.5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-2xs active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Search className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-sans font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline whitespace-nowrap">Search</span>
            <span className="keycap text-[9px] px-1 py-0.5 leading-none shrink-0 whitespace-nowrap">⌘K</span>
          </button>

          {/* Mobile Menu Hamburger / Close Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="h-8 w-8 inline-flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-2xs active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mobileMenuOpen ? <X className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Menu className="h-4 w-4 shrink-0" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 sm:px-6 py-4 shadow-xl transition-all duration-200 motion-reduce:transition-none"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {/* Search Trigger inside Drawer */}
            <button
              type="button"
              onClick={handleOpenSearch}
              className="flex items-center justify-between w-full rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Open search command palette"
            >
              <span className="flex items-center gap-2 font-medium">
                <Search className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <span>Search portfolio...</span>
              </span>
              <span className="keycap text-[9px] px-1 py-0.5">⌘K</span>
            </button>

            {/* Navigation Links */}
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/80"
                      : "text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Actions Drawer Footer */}
            <div className="pt-3 mt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2.5">
              {/* Primary Resume CTA */}
              <a
                href={PROFILE_LINKS.resumePdf}
                download="Livesh_L_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 dark:bg-indigo-600 border border-slate-950 dark:border-indigo-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>

              {/* Utility Controls inside Drawer: Sound, Theme, Socials */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {/* Sound Toggle */}
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    aria-label={soundActive ? "Mute audio feedback" : "Enable audio feedback"}
                    className="h-8 px-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {soundActive ? (
                      <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                    )}
                    <span>Sound: {soundActive ? "On" : "Off"}</span>
                  </button>

                  {/* Theme Toggle */}
                  <button
                    type="button"
                    onClick={handleToggleTheme}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    className="h-8 w-8 inline-flex items-center justify-center text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {theme === "light" ? <Moon className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Sun className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />}
                  </button>
                </div>

                {/* Socials: GitHub, LinkedIn, Email */}
                <div className="flex items-center gap-1.5">
                  <a
                    href={PROFILE_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile (Livesh-L-28)"
                    title="GitHub Profile (Livesh-L-28)"
                    className="h-8 w-8 inline-flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <GithubIcon className="h-4 w-4 shrink-0" />
                  </a>
                  <a
                    href={PROFILE_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile (Livesh L)"
                    title="LinkedIn Profile (Livesh L)"
                    className="h-8 w-8 inline-flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <LinkedinIcon className="h-4 w-4 shrink-0" />
                  </a>
                  <a
                    href={`mailto:${PROFILE_LINKS.email}`}
                    aria-label="Email Livesh L"
                    title="Email Livesh L"
                    className="h-8 w-8 inline-flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

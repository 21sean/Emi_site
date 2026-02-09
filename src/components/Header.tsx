"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSelect from "./LanguageSelect";
import { useLanguage } from "./LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Track scroll for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: ui.nav.home, href: "/" },
    { label: ui.nav.projects, href: "/projects" },
    { label: ui.nav.about, href: "/about" },
    { label: ui.nav.resume, href: "/resume" },
    { label: ui.nav.contact, href: "/contact" },
  ];

  return (
    <>
      <header
        className={`no-print sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-xl shadow-[0_1px_3px_var(--color-shadow)]"
            : "bg-[var(--color-background)]/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group relative text-lg font-bold tracking-tight"
          >
            <span className="relative z-10 transition-colors duration-200 group-hover:text-[var(--color-accent)]">
              {profile.name}
            </span>
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover-underline relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-ring ${
                    isActive
                      ? "text-[var(--color-accent)] nav-active"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent-light)]/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-1">
              <ThemeToggle />
              <LanguageSelect />
            </div>

            <Link
              href={profile.resumeUrl}
              className="ml-3 inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent-light)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/20 focus-ring"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {ui.common.downloadResume}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-accent-light)] focus-ring md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-overlay)] transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-over menu */}
      <div
        ref={mobileNavRef}
        className={`fixed top-0 right-0 z-40 flex h-full w-72 flex-col bg-[var(--color-background)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-20 pb-6">
          <nav aria-label="Mobile navigation" className="space-y-1">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-accent-light)]/50 hover:text-[var(--color-foreground)]"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(16px)",
                  }}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-[var(--color-border)] pt-6">
            <div className="flex items-center gap-3 px-4">
              <ThemeToggle />
              <LanguageSelect />
            </div>
            <Link
              href={profile.resumeUrl}
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-ring"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {ui.common.downloadResume}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

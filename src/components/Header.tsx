"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

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
    { label: ui.nav.about, href: "/about" },
    { label: ui.nav.projects, href: "/projects" },
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
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-accent-light)] focus-ring md:hidden"
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

      {/* ── Mobile fullscreen menu (md:hidden) ────────────────────
          Full-bleed glassy overlay with large tap targets and
          staggered fade-in. Desktop nav above is untouched. */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop — solid bg so the underlying page isn't readable */}
        <div
          className={`absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-2xl transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col px-6 pt-24 pb-10">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-2xl font-semibold tracking-tight transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                      : "text-[var(--color-foreground)] hover:bg-[var(--color-accent-light)]/40 active:bg-[var(--color-accent-light)]/60"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    )}
                    {item.label}
                  </span>
                  <svg
                    className="h-5 w-5 text-[var(--color-muted)] transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Resume CTA — anchored to bottom, big tappable */}
          <div
            className="mt-auto flex flex-col gap-4 pt-8"
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "300ms",
              transitionDelay: menuOpen ? `${80 + navItems.length * 60}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <Link
              href={profile.resumeUrl}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 active:scale-[0.98] focus-ring"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {ui.common.downloadResume}
            </Link>

            {/* Theme toggle — small, secondary */}
            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-[var(--color-muted)]">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

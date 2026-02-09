"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSelect from "./LanguageSelect";
import { useLanguage } from "./LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const navItems = [
    { label: ui.nav.home, href: "/" },
    { label: ui.nav.projects, href: "/projects" },
    { label: ui.nav.about, href: "/about" },
    { label: ui.nav.resume, href: "/resume" },
    { label: ui.nav.contact, href: "/contact" },
  ];

  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {profile.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                pathname === item.href
                  ? "font-medium text-[var(--color-accent)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />
          <LanguageSelect />

          <Link
            href={profile.resumeUrl}
            className="ml-2 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {ui.common.downloadResume}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-[var(--color-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="animate-fade-in-down border-t border-[var(--color-border)] px-6 pb-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm transition-colors hover:text-[var(--color-accent)] ${
                pathname === item.href
                  ? "font-medium text-[var(--color-accent)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <ThemeToggle />
            <LanguageSelect />
            <Link
              href={profile.resumeUrl}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--color-accent-light)]"
            >
              {ui.common.downloadResume}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

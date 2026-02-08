"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "@/data/profile";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const browserLanguage = navigator.languages?.[0] || navigator.language || "en";
    const normalized = browserLanguage.toLowerCase();

    if (normalized.startsWith("ja")) {
      setLanguage("ja");
      return;
    }

    if (normalized.startsWith("zh")) {
      setLanguage("zh");
      return;
    }

    setLanguage("en");
  }, []);

  const languageSelect = (
    <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
      <span className="sr-only">Language</span>
      <select
        className="rounded-md border border-[var(--color-border)] bg-transparent px-2 py-1 text-sm text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        aria-label="Select language"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="en">English</option>
        <option value="ja">Japanese</option>
        <option value="zh">Chinese</option>
      </select>
    </label>
  );

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
          {languageSelect}

          <Link
            href={profile.resumeUrl}
            className="ml-2 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Download Resume
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
            {languageSelect}
            <Link
              href={profile.resumeUrl}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--color-accent-light)]"
            >
              Download Resume
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

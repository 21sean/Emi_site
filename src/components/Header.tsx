"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "@/data/profile";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { languageOptions } from "@/lib/translations";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, copy } = useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      if (!languageMenuRef.current) {
        return;
      }

      if (!languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navItems = [
    { label: copy.nav.home, href: "/" },
    { label: copy.nav.projects, href: "/projects" },
    { label: copy.nav.about, href: "/about" },
    { label: copy.nav.resume, href: "/resume" },
    { label: copy.nav.contact, href: "/contact" },
  ];

  const selectedLanguage = languageOptions.find((option) => option.value === language);

  const languageSelect = (
    <div className="relative" ref={languageMenuRef}>
      <button
        type="button"
        onClick={() => setLanguageMenuOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={languageMenuOpen}
        className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/80 px-3 py-1.5 text-sm text-[var(--color-foreground)] shadow-sm transition-all duration-200 ease-out hover:border-[var(--color-accent)]/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        <span className="text-[var(--color-muted)]">{copy.languageLabel}</span>
        <span className="font-medium">{selectedLanguage?.label ?? "English"}</span>
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 text-[var(--color-muted)] transition-transform duration-200 ${
            languageMenuOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        role="listbox"
        aria-label={copy.languageLabel}
        className={`absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/95 p-1 shadow-lg backdrop-blur transition-all duration-200 ease-out ${
          languageMenuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {languageOptions.map((option) => {
          const isActive = option.value === language;
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isActive}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-accent-light)]/60"
              }`}
              onClick={() => {
                setLanguage(option.value);
                setLanguageMenuOpen(false);
              }}
            >
              <span>{option.label}</span>
              {isActive && (
                <span className="text-xs font-semibold uppercase tracking-wider">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
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
            {copy.actions.downloadResume}
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
              {copy.actions.downloadResume}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

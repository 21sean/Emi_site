"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { LANGUAGES } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

export default function LanguageSelect() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-[var(--color-muted)] transition-all duration-200 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-foreground)] focus-ring"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span className="hidden sm:inline">{currentLang?.nativeLabel}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="dropdown-enter absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1.5 shadow-xl shadow-[var(--color-shadow-lg)]"
          role="listbox"
          aria-label="Language options"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => {
                setLang(l.code as Lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                lang === l.code
                  ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-accent-light)]/50 hover:text-[var(--color-foreground)]"
              }`}
            >
              <span className="text-base">{l.code === "en" ? "🇺🇸" : l.code === "ja" ? "🇯🇵" : l.code === "zh" ? "🇨🇳" : "🌐"}</span>
              <span>{l.nativeLabel}</span>
              {lang === l.code && (
                <svg className="ml-auto h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

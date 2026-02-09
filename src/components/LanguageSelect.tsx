"use client";

import { useLanguage } from "./LanguageProvider";
import { LANGUAGES } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

export default function LanguageSelect() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      className="rounded-md border border-[var(--color-border)] bg-transparent px-2 py-1 text-sm text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      aria-label="Select language"
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.nativeLabel}
        </option>
      ))}
    </select>
  );
}

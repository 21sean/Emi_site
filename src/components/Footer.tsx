"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getProfile } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const profile = getProfile(lang);

  return (
    <footer className="no-print border-t border-[var(--color-border)] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {profile.name} &middot;{" "}
            {profile.location}
          </div>

          <div className="flex gap-3">
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="rounded-lg px-3 py-1.5 text-sm text-[var(--color-muted)] transition-all duration-200 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] focus-ring"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

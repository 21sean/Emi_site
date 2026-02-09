"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useReveal } from "@/lib/useReveal";

export default function Skills() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const sectionRef = useReveal();

  return (
    <section
      ref={sectionRef.ref}
      className="py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className={`mb-10 reveal ${sectionRef.revealed ? "revealed" : ""}`}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {ui.home.skills}
          </p>
          <h2 className="text-2xl font-bold tracking-tight">{ui.home.skills}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((group, gi) => (
            <div
              key={group.category}
              className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-md hover:-translate-y-0.5 reveal ${
                sectionRef.revealed ? "revealed" : ""
              }`}
              style={{ transitionDelay: `${(gi + 1) * 100}ms` }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)]">
                <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

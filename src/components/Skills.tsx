"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";

export default function Skills() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-8 text-xl font-semibold tracking-tight">{ui.home.skills}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-[var(--color-muted)]"
                  >
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

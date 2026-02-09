"use client";

import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";

export default function AboutContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath("/headshot.jpg")}
            alt={profile.name}
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-full border-2 border-[var(--color-border)] object-cover shadow-sm"
          />
          <h1 className="text-3xl font-bold tracking-tight">{ui.about.title}</h1>
        </div>

        {/* Bio */}
        <div className="mt-8 space-y-4">
          {profile.about.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[var(--color-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Focus Areas */}
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {ui.about.focusAreas}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {profile.about.focusAreas.map((area) => (
              <li
                key={area}
                className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Values */}
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {ui.about.values}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {profile.about.values.map((value) => (
              <li
                key={value}
                className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Interests */}
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {ui.about.interests}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.about.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-muted)]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {ui.about.languages}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.languages.map((lng) => (
              <div
                key={lng.name}
                className="flex items-baseline justify-between rounded-lg border border-[var(--color-border)] px-4 py-3"
              >
                <span className="text-sm font-medium">{lng.name}</span>
                <span className="text-xs text-[var(--color-muted)]">
                  {lng.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {ui.about.experience}
          </h2>
          <div className="space-y-6">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="border-l-2 border-[var(--color-border)] pl-4"
              >
                <h3 className="text-sm font-semibold">{exp.title}</h3>
                <p className="text-xs text-[var(--color-accent)]">
                  {exp.company}
                  {exp.type ? ` · ${exp.type}` : ""}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {exp.dates} · {exp.location}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

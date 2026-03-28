"use client";

import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useMounted, useReveal } from "@/lib/useReveal";
import SideNav from "@/components/SideNav";
import Link from "next/link";

export default function AboutContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const focusRef = useReveal();
  const valuesRef = useReveal();
  const interestsRef = useReveal();

  return (
    <section className="py-20">
      <SideNav
        items={[
          { id: "summary", label: "Summary" },
          { id: "focus-areas", label: ui.about.focusAreas },
          { id: "values", label: ui.about.values },
          { id: "interests", label: ui.about.interests },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6">
        {/* Header with headshot */}
        <div
          className={`flex flex-col items-start gap-6 sm:flex-row sm:items-center ${
            mounted ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent blur-sm" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/headshot.jpg")}
              alt={profile.name}
              width={120}
              height={120}
              className="relative h-[120px] w-[120px] rounded-full border-2 border-[var(--color-border)] object-cover shadow-lg ring-4 ring-[var(--color-background)]"
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{ui.about.title}</h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{profile.headline}</p>
          </div>
        </div>

        {/* Bio */}
        <div
          id="summary"
          className={`mt-10 scroll-mt-20 space-y-4 ${
            mounted ? "animate-fade-in-up stagger-3" : "opacity-0"
          }`}
        >
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
        <div
          id="focus-areas"
          ref={focusRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${focusRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.focusAreas}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.about.focusAreas.map((area, i) => (
              <li
                key={area}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Values */}
        <div
          id="values"
          ref={valuesRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${valuesRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.values}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.about.values.map((value, i) => (
              <li
                key={value}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Interests */}
        <div
          id="interests"
          ref={interestsRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${interestsRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.interests}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.about.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-sm text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)] hover:shadow-md"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Link to Resume */}
        <div className="mt-14 text-center">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:shadow-md"
          >
            {ui.common.downloadResume} →
          </Link>
        </div>
      </div>
    </section>
  );
}

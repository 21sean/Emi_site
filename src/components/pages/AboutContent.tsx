"use client";

import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useMounted, useReveal } from "@/lib/useReveal";
import SideNav from "@/components/SideNav";

export default function AboutContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const focusRef = useReveal();
  const certsRef = useReveal();
  const valuesRef = useReveal();
  const interestsRef = useReveal();
  const languagesRef = useReveal();
  const experienceRef = useReveal();

  return (
    <section className="py-20">
      <SideNav
        items={[
          { id: "summary", label: "Summary" },
          { id: "languages", label: ui.about.languages },
          { id: "focus-areas", label: ui.about.focusAreas },
          { id: "certifications", label: ui.about.certifications },
          { id: "values", label: ui.about.values },
          { id: "interests", label: ui.about.interests },
          { id: "experience", label: ui.about.experience },
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

        {/* Languages */}
        <div
          id="languages"
          ref={languagesRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${languagesRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.languages}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.languages.map((lng, i) => (
              <div
                key={lng.name}
                className="flex items-baseline justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <span className="text-sm font-semibold">{lng.name}</span>
                <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                  {lng.proficiency}
                </span>
              </div>
            ))}
          </div>
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

        {/* Certifications */}
        <div
          id="certifications"
          ref={certsRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${certsRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.certifications}
          </h2>
          <div className="grid gap-3">
            {profile.certifications.map((cert, i) => (
              <div
                key={cert.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold">{cert.name}</h3>
                  <span className="shrink-0 text-xs text-[var(--color-muted)]">{cert.date}</span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">{cert.issuer}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-muted)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
                  >
                    Show credential ↗
                  </a>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[var(--color-accent-light)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

        {/* Experience */}
        <div
          id="experience"
          ref={experienceRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${experienceRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.about.experience}
          </h2>
          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border)] to-transparent" />

            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-[14px] w-[14px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]" />
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md">
                  <div className="flex gap-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="h-10 w-10 shrink-0 rounded-lg object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-bold">{exp.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">
                        {exp.company}
                        {exp.type ? ` · ${exp.type}` : ""}
                      </p>
                      <p className="text-xs text-[var(--color-muted)]">
                        {exp.dates} · {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

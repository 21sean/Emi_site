"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useMounted, useReveal } from "@/lib/useReveal";

export default function ResumeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const expRef = useReveal();
  const projRef = useReveal();
  const skillsRef = useReveal();
  const langRef = useReveal();

  return (
    <section className="py-16 print:py-0">
      <div className="mx-auto max-w-3xl px-6 print:max-w-none print:px-8">
        {/* ── Header ────────────────────────────── */}
        <header
          className={`mb-10 border-b border-[var(--color-border)] pb-8 ${
            mounted ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl font-extrabold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-[var(--color-muted)]">
            {profile.headline}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </span>
            {profile.contactEmail && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.contactEmail}
              </span>
            )}
          </p>
        </header>

        {/* ── Summary ───────────────────────────── */}
        <div
          className={`mb-10 ${mounted ? "animate-fade-in-up stagger-2" : "opacity-0"}`}
        >
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.resume.summary}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            {profile.summary}
          </p>
        </div>

        {/* ── Experience ─────────────────────────── */}
        <div
          ref={expRef.ref}
          className={`mb-10 reveal ${expRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.resume.experience}
          </h2>
          <div className="space-y-6">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/20 hover:shadow-md print:border-0 print:p-0 print:shadow-none"
              >
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm font-bold">{exp.title}</h3>
                  <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-accent)] shrink-0 print:bg-transparent print:px-0">
                    {exp.dates}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                  {exp.company}
                  {exp.type ? ` · ${exp.type}` : ""} · {exp.location}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-4">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-xs leading-relaxed text-[var(--color-muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Projects ──────────────────────────── */}
        <div
          ref={projRef.ref}
          className={`mb-10 reveal ${projRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.resume.projects}
          </h2>
          <div className="space-y-6">
            {profile.projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/20 hover:shadow-md print:border-0 print:p-0 print:shadow-none"
              >
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm font-bold">{project.title}</h3>
                  <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-accent)] shrink-0 print:bg-transparent print:px-0">
                    {project.dates}
                  </span>
                </div>
                {project.org && (
                  <p className="text-xs text-[var(--color-muted)]">
                    {project.org}
                  </p>
                )}
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                  {project.summary}
                </p>
                <ul className="mt-2 list-disc space-y-0.5 pl-4">
                  {project.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-xs leading-relaxed text-[var(--color-muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skills ────────────────────────────── */}
        <div
          ref={skillsRef.ref}
          className={`mb-10 reveal ${skillsRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.resume.skills}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.skills.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-xs shadow-sm print:border-0 print:p-0 print:shadow-none"
              >
                <span className="font-bold text-[var(--color-accent)]">{group.category}</span>
                <p className="mt-1 text-[var(--color-muted)]">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Languages ─────────────────────────── */}
        <div
          ref={langRef.ref}
          className={`reveal ${langRef.revealed ? "revealed" : ""}`}
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
            {ui.resume.languages}
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.languages.map((lng) => (
              <div
                key={lng.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-xs shadow-sm print:border-0 print:p-0 print:shadow-none"
              >
                <span className="font-bold">{lng.name}</span>{" "}
                <span className="text-[var(--color-muted)]">
                  — {lng.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import { useMounted } from "@/lib/useReveal";
import { useReveal } from "@/lib/useReveal";

export default function HomeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const featuredProjects = profile.projects
    .filter((p) => p.featured)
    .slice(0, 3);

  const featuredRef = useReveal();
  const skillsRef = useReveal();
  const ctaRef = useReveal();

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Subtle background gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p
                className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] ${
                  mounted ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                {profile.location}
              </p>
              <h1
                className={`max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-6xl ${
                  mounted ? "animate-fade-in-up stagger-2" : "opacity-0"
                }`}
              >
                {profile.name}
              </h1>
              <p
                className={`mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] lg:text-xl ${
                  mounted ? "animate-fade-in-up stagger-3" : "opacity-0"
                }`}
              >
                {profile.headline}
              </p>

              {/* Specialties pills */}
              <div
                className={`mt-7 flex flex-wrap gap-2 ${
                  mounted ? "animate-fade-in-up stagger-4" : "opacity-0"
                }`}
              >
                {profile.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-sm font-medium text-[var(--color-foreground)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:shadow-md"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div
                className={`mt-9 flex flex-wrap gap-3 ${
                  mounted ? "animate-fade-in-up stagger-5" : "opacity-0"
                }`}
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring"
                >
                  {ui.home.viewProjects}
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:shadow-md hover:-translate-y-0.5 focus-ring"
                >
                  {ui.home.getInTouch}
                </Link>
              </div>
            </div>

            {/* Headshot */}
            <div
              className={`shrink-0 ${
                mounted ? "animate-scale-in stagger-3" : "opacity-0"
              }`}
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 blur-sm" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath("/headshot.jpg")}
                  alt={profile.name}
                  width={176}
                  height={176}
                  className="relative h-44 w-44 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Featured Projects ─────────────────── */}
      <section
        ref={featuredRef.ref}
        className={`py-20 ${featuredRef.revealed ? "" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`mb-10 flex items-end justify-between reveal ${
              featuredRef.revealed ? "revealed" : ""
            }`}
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {ui.home.featuredProjects}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                {ui.home.featuredProjects}
              </h2>
            </div>
            <Link
              href="/projects"
              className="group flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-ring"
            >
              {ui.common.viewAll}
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                className={`reveal ${featuredRef.revealed ? "revealed" : ""}`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <ProjectCard project={project} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Skills ────────────────────────────── */}
      <div
        ref={skillsRef.ref}
        className={`reveal ${skillsRef.revealed ? "revealed" : ""}`}
      >
        <Skills />
      </div>

      {/* ── CTA ───────────────────────────────── */}
      <section
        ref={ctaRef.ref}
        className={`py-20 reveal ${ctaRef.revealed ? "revealed" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-8 py-16 text-center shadow-sm">
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent)]/5" />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight">
                {ui.home.interestedTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
                {ui.home.interestedDesc}
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring"
              >
                {ui.home.contactMe}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import { useMounted, useReveal } from "@/lib/useReveal";

export default function HomeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const allProjects = profile.projects;

  const featuredRef = useReveal();
  const skillsRef = useReveal();
  const ctaRef = useReveal();

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-12 lg:py-16">
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
                {profile.headline.split(" | ").length >= 2 ? (
                  <>
                    {profile.headline.split(" | ")[0]}
                    <br />
                    {profile.headline.split(" | ").slice(1).join(" | ")}
                  </>
                ) : (
                  profile.headline
                )}
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
                  href="/resume"
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
              <div className="group/photo relative cursor-pointer" style={{ perspective: "600px" }}>
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 blur-sm" />
                <div className="relative h-56 w-56 transition-transform duration-500 [transform-style:preserve-3d] group-hover/photo:[transform:rotateY(180deg)]">
                  {/* Front — original headshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden]"
                  />
                  {/* Back — hover photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot-hover.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/emi-kobayashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
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
        className={`py-10 ${featuredRef.revealed ? "" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`mb-6 flex items-end justify-between reveal ${
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
        </div>
        {/* Auto-scrolling marquee */}
        <div className="marquee-wrapper relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent" />
          <div className="flex w-max animate-marquee">
            {/* Duplicate the list for seamless looping */}
            {[...allProjects, ...allProjects].map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                className="marquee-card w-[350px] shrink-0 px-3"
              >
                <ProjectCard project={project} featured compact />
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

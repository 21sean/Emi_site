"use client";

import Link from "next/link";
import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";

export default function HomeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const featuredProjects = profile.projects
    .filter((p) => p.featured)
    .slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
                {profile.location}
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {profile.headline}
              </p>

              {/* Specialties pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--color-border)] px-3.5 py-1 text-sm font-medium text-[var(--color-foreground)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {ui.home.viewProjects}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {ui.home.getInTouch}
                </Link>
              </div>
            </div>

            {/* Headshot */}
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/headshot.jpg")}
                alt={profile.name}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full border-2 border-[var(--color-border)] object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Featured Projects ─────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {ui.home.featuredProjects}
            </h2>
            <Link
              href="/projects"
              className="text-sm text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {ui.common.viewAll} &rarr;
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Skills ────────────────────────────── */}
      <Skills />

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            {ui.home.interestedTitle}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {ui.home.interestedDesc}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {ui.home.contactMe}
          </Link>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import { useMounted } from "@/lib/useReveal";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    profile.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [profile.projects]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? profile.projects.filter((p) => p.tags.includes(activeTag))
    : profile.projects;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className={mounted ? "animate-fade-in-up" : "opacity-0"}>
          <h1 className="text-3xl font-extrabold tracking-tight">{ui.projects.title}</h1>
          <p className="mt-2 text-[var(--color-muted)]">
            {ui.projects.description}
          </p>
        </div>

        {/* Tag filters */}
        <div className={`mt-10 flex flex-wrap gap-2 ${mounted ? "animate-fade-in-up stagger-2" : "opacity-0"}`}>
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-ring ${
              activeTag === null
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
            }`}
          >
            {ui.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-ring ${
                activeTag === tag
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              id={project.id}
              className={mounted ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent-light)]">
              <svg className="h-7 w-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">
              {ui.projects.noMatch}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

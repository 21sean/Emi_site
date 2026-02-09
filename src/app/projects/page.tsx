"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

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
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl font-bold tracking-tight">{ui.projects.title}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {ui.projects.description}
        </p>

        {/* Tag filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
              activeTag === null
                ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40"
            }`}
          >
            {ui.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                activeTag === tag
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {filtered.map((project) => (
            <div key={project.id} id={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-[var(--color-muted)]">
            {ui.projects.noMatch}
          </p>
        )}
      </div>
    </section>
  );
}

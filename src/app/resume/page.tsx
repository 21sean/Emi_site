import type { Metadata } from "next";
import profile from "@/data/profile";

export const metadata: Metadata = {
  title: `Resume – ${profile.name}`,
  description: `Resume for ${profile.name} – ${profile.headline}`,
};

export default function ResumePage() {
  return (
    <section className="py-12 print:py-0">
      <div className="mx-auto max-w-3xl px-6 print:max-w-none print:px-8">
        {/* ── Header ────────────────────────────── */}
        <header className="mb-8 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {profile.headline}
          </p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            {profile.location}
            {profile.contactEmail && ` · ${profile.contactEmail}`}
          </p>
        </header>

        {/* ── Summary ───────────────────────────── */}
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            {profile.summary}
          </p>
        </div>

        {/* ── Experience ─────────────────────────── */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Experience
          </h2>
          <div className="space-y-6">
            {profile.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm font-semibold">{exp.title}</h3>
                  <span className="text-xs text-[var(--color-muted)] shrink-0">
                    {exp.dates}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  {exp.company}{exp.type ? ` · ${exp.type}` : ""} · {exp.location}
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
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
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Projects
          </h2>
          <div className="space-y-6">
            {profile.projects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm font-semibold">{project.title}</h3>
                  <span className="text-xs text-[var(--color-muted)] shrink-0">
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
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
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
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Skills
          </h2>
          <div className="space-y-2">
            {profile.skills.map((group) => (
              <div key={group.category} className="text-xs">
                <span className="font-medium">{group.category}:</span>{" "}
                <span className="text-[var(--color-muted)]">
                  {group.items.join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Languages ─────────────────────────── */}
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {profile.languages.map((lang) => (
              <div key={lang.name} className="text-xs">
                <span className="font-medium">{lang.name}</span>{" "}
                <span className="text-[var(--color-muted)]">
                  — {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

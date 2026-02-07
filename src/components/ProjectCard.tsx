import Link from "next/link";
import type { Project } from "@/data/profile";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`group rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-accent)]/40 hover:shadow-sm ${
        featured ? "lg:p-8" : ""
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex flex-col gap-1">
        {project.org && (
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]">
            {project.org}
          </span>
        )}
        <h3 className="text-lg font-semibold leading-snug tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
          <Link href={`/projects#${project.id}`}>{project.title}</Link>
        </h3>
        <span className="text-xs text-[var(--color-muted)]">{project.dates}</span>
      </div>

      {/* Summary */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
        {project.summary}
      </p>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

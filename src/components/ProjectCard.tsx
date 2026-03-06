import Link from "next/link";
import dynamic from "next/dynamic";
import type { Project } from "@/data/profile";

const PDFSlideViewer = dynamic(() => import("@/components/PDFSlideViewer"), {
  ssr: false,
});

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-shadow-lg)] hover:-translate-y-1 ${
        featured ? "p-7 lg:p-8" : "p-6"
      }`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 transition-all duration-300 group-hover:from-[var(--color-accent)]/[0.02] group-hover:to-[var(--color-accent)]/[0.06]" />

      <div className="relative">
        {/* Header */}
        <div className="mb-3 flex flex-col gap-1.5">
          {project.org && (
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
              {project.org}
            </span>
          )}
          <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-[var(--color-accent)]">
            <Link href={`/projects#${project.id}`} className="focus-ring rounded-sm">
              {project.title}
            </Link>
          </h3>
          <span className="text-xs font-medium text-[var(--color-muted)]">{project.dates}</span>
        </div>

        {/* Summary */}
        <p className="mb-5 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.summary}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="rounded-lg bg-[var(--color-accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent)]"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Artifacts */}
        {project.artifacts && project.artifacts.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.artifacts
              .filter((a) => a.url !== "#")
              .map((a) => (
                <a
                  key={a.label}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent-light)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {a.label}
                </a>
              ))}
          </div>
        )}

        {/* PDF Slide Preview */}
        {project.artifacts && project.artifacts.some((a) => a.url !== "#" && a.url.endsWith(".pdf")) && (
          <div className="mb-4">
            {project.artifacts
              .filter((a) => a.url !== "#" && a.url.endsWith(".pdf"))
              .map((a) => (
                <PDFSlideViewer key={a.url} url={a.url} />
              ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted)] transition-colors duration-150 group-hover:border-[var(--color-accent)]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

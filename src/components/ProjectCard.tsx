"use client";

import { useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/basePath";
import type { Project } from "@/data/profile";

export default function ProjectCard({
  project,
  featured = false,
  compact = false,
}: {
  project: Project;
  featured?: boolean;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const pdfArtifact = project.artifacts?.find(
    (a) => a.url !== "#" && a.url.endsWith(".pdf")
  );
  const thumbUrl = pdfArtifact
    ? assetPath(
        `/thumbnails/${pdfArtifact.url.replace(/^\//, "").replace(".pdf", ".png")}`
      )
    : null;

  return (
    <article
      className={`group glass-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        featured ? "" : ""
      }`}
    >
      {/* External-link icon — top-right indicator that the PDF opens in a new tab */}
      {pdfArtifact && (
        <a
          href={pdfArtifact.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} in new tab`}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/90 text-[var(--color-muted)] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card)] hover:text-[var(--color-accent)] focus-ring"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}

      {/* Thumbnail — fixed aspect-ratio so every card's image aligns horizontally */}
      {thumbUrl ? (
        <a
          href={pdfArtifact!.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/thumb relative block aspect-[16/10] w-full overflow-hidden bg-[var(--color-card)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/thumb:bg-black/40">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[var(--color-accent)] shadow-lg opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Project
            </span>
          </div>
        </a>
      ) : (
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-[var(--color-accent)]/10 via-[var(--color-card)] to-[var(--color-accent)]/5" />
      )}

      {/* Body */}
      <div className={`flex flex-1 flex-col ${compact ? "p-5" : featured ? "p-7 lg:p-8" : "p-6"}`}>
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
        <div className="mb-4">
          <p
            className={`text-sm leading-relaxed text-[var(--color-muted)] ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {project.summary}
          </p>
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-1 text-xs font-semibold text-[var(--color-accent)] hover:underline"
            >
              Read more
            </button>
          )}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
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

        {/* Tags — push to bottom */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)]/60 px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted)] transition-colors duration-150 group-hover:border-[var(--color-accent)]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

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

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-300 ${
        compact
          ? "hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card-hover)]"
          : "hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-shadow-lg)] hover:-translate-y-1"
      } ${featured ? "p-7 lg:p-8" : "p-6"}`}
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
        <div className="mb-5">
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

        {/* PDF Thumbnail Preview */}
        {project.artifacts && project.artifacts.some((a) => a.url !== "#" && a.url.endsWith(".pdf")) && (
          <div className="mb-4">
            {project.artifacts
              .filter((a) => a.url !== "#" && a.url.endsWith(".pdf"))
              .map((a) => {
                const thumbUrl = assetPath(`/thumbnails/${a.url.replace(/^\//, "").replace(".pdf", ".png")}`);
                return (
                  <a
                    key={a.url}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/thumb relative mt-3 block overflow-hidden rounded-xl border border-[var(--color-border)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbUrl}
                      alt={`${project.title} preview`}
                      className="w-full object-cover transition-transform duration-300 group-hover/thumb:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/thumb:bg-black/40">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-accent)] shadow-lg opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Project
                      </span>
                    </div>
                  </a>
                );
              })}
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

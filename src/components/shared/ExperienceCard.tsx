"use client";

import { useState } from "react";
import { Experience } from "@/data/profile";

interface ExperienceCardProps {
  exp: Experience;
  variant?: "about" | "resume" | "timeline";
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ExperienceCard({
  exp,
  variant = "about",
  isFirst = false,
  isLast = false,
}: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  if (variant === "timeline") {
    // Extract start and end years
    const years = exp.dates.match(/\d{4}/g) ?? [];
    const startYear = years[0] ?? "";
    const endYear = years[1] ?? "Present";
    const yearLabel = `${startYear} – ${endYear}`;

    return (
      <div className="group relative flex items-stretch">
        {/* Left: vertical line + dot + year range */}
        <div className="relative flex flex-col items-center w-4 shrink-0">
          {/* Vertical line */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[var(--color-border)] ${isFirst ? "top-2.5" : "top-0"} ${isLast ? "h-2.5" : "bottom-0"}`} />
          {/* Dot */}
          <div className="relative z-10 mt-3.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-background)] transition-transform duration-200 group-hover:scale-125" />
        </div>
        {/* Year label */}
        <div className="flex items-start pt-2 pl-3 pr-2 shrink-0 w-28">
          <span className="text-[11px] font-semibold uppercase text-[var(--color-accent)] leading-tight whitespace-nowrap">
            {yearLabel}
          </span>
        </div>
        {/* Card content */}
        <div
          className="flex-1 mb-6 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md"
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-3">
            {exp.logo && (
              <img
                src={exp.logo}
                alt={exp.company}
                className="h-9 w-9 shrink-0 rounded-lg object-contain"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold">{exp.title}</h3>
                <svg
                  className={`h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                {exp.company}
                {exp.type ? ` · ${exp.type}` : ""} · {exp.location}
              </p>
            </div>
          </div>
          {/* Expandable bullets */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open ? "mt-3 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-disc space-y-1 pl-4">
              {exp.bullets.map((b, j) => (
                <li key={j} className="text-xs leading-relaxed text-[var(--color-muted)]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const hoverOpacity = variant === "about" ? "hover:border-[var(--color-accent)]/30" : "hover:border-[var(--color-accent)]/20";
  const printClasses = variant === "resume" ? "print:border-0 print:p-0 print:shadow-none" : "";
  const bulletSize = variant === "resume" ? "text-xs" : "text-sm";

  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-200 ${hoverOpacity} hover:shadow-md ${printClasses}`}
    >
      <div className="flex gap-4">
        {exp.logo && (
          <img
            src={exp.logo}
            alt={exp.company}
            className="h-10 w-10 shrink-0 rounded-lg object-contain"
          />
        )}
        <div className="flex-1">
          {variant === "resume" ? (
            <>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-sm font-bold">{exp.title}</h3>
                <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-accent)] shrink-0 print:bg-transparent print:px-0">
                  {exp.dates}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                {exp.company}
                {exp.type ? ` · ${exp.type}` : ""} · {exp.location}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-sm font-bold">{exp.title}</h3>
              <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">
                {exp.company}
                {exp.type ? ` · ${exp.type}` : ""}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                {exp.dates} · {exp.location}
              </p>
            </>
          )}
        </div>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-4">
        {exp.bullets.map((b, j) => (
          <li key={j} className={`${bulletSize} leading-relaxed text-[var(--color-muted)]`}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

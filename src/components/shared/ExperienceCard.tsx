"use client";

import { useState } from "react";
import { Experience } from "@/data/profile";

interface ExperienceCardProps {
  exp: Experience;
  variant?: "about" | "resume" | "timeline";
}

export default function ExperienceCard({
  exp,
  variant = "about",
}: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  if (variant === "timeline") {
    return (
      <div className="group relative flex gap-4 pb-8 last:pb-0">
        {/* Timeline line */}
        <div className="flex flex-col items-center">
          <div className="h-3 w-3 shrink-0 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)] transition-colors group-hover:bg-[var(--color-accent)]" />
          <div className="w-0.5 flex-1 bg-[var(--color-border)] group-last:hidden" />
        </div>
        {/* Content */}
        <div
          className="-mt-0.5 flex-1 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md"
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
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-sm font-bold">{exp.title}</h3>
                <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-accent)] shrink-0">
                  {exp.dates}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                {exp.company}
                {exp.type ? ` · ${exp.type}` : ""} · {exp.location}
              </p>
            </div>
            {/* Expand indicator */}
            <svg
              className={`h-4 w-4 shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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

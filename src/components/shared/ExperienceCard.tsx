import { Experience } from "@/data/profile";

interface ExperienceCardProps {
  exp: Experience;
  variant?: "about" | "resume";
}

export default function ExperienceCard({
  exp,
  variant = "about",
}: ExperienceCardProps) {
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

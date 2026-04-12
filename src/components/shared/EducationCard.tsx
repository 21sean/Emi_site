import { Education } from "@/data/profile";

interface EducationCardProps {
  edu: Education;
  index?: number;
  variant?: "about" | "resume" | "timeline";
  isFirst?: boolean;
  isLast?: boolean;
}

export default function EducationCard({
  edu,
  index = 0,
  variant = "about",
  isFirst = false,
  isLast = false,
}: EducationCardProps) {
  if (variant === "timeline") {
    const years = edu.dates.match(/\d{4}/g) ?? [];
    const startYear = years[0] ?? "";
    const endYear = years[1] ?? "Present";
    const yearLabel = `${startYear} –\n${endYear}`;

    return (
      <div className="group relative flex items-stretch">
        {/* Left: vertical line + dot */}
        <div className="relative flex flex-col items-center w-4 shrink-0">
          <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[var(--color-border)] ${isFirst ? "top-2.5" : "top-0"} ${isLast ? "h-2.5" : "bottom-0"}`} />
          <div className="relative z-10 mt-3.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-background)] transition-transform duration-200 group-hover:scale-125" />
        </div>
        {/* Year label */}
        <div className="flex items-start pt-2 pl-3 pr-1 shrink-0 w-20">
          <span className="text-[11px] font-semibold uppercase text-[var(--color-accent)] leading-tight whitespace-pre-line">
            {yearLabel}
          </span>
        </div>
        {/* Card content */}
        <div className="flex-1 mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/60 backdrop-blur-sm p-4 transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card)]/80 hover:shadow-md">
          <div className="flex gap-3">
            {edu.logo && (
              <img
                src={edu.logo}
                alt={edu.school}
                className="h-9 w-9 shrink-0 rounded-lg object-contain"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold">{edu.school}</h3>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">{edu.degree}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const printClasses = variant === "resume" ? "print:border-0 print:p-0 print:shadow-none" : "";
  const hoverOpacity = variant === "about" ? "hover:border-[var(--color-accent)]/30" : "hover:border-[var(--color-accent)]/20";

  return (
    <div
      className={`flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-200 ${hoverOpacity} hover:shadow-md ${printClasses}`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      {edu.logo && (
        <img
          src={edu.logo}
          alt={edu.school}
          className="h-10 w-10 shrink-0 rounded-lg object-contain"
        />
      )}
      <div className="flex-1">
        {variant === "resume" ? (
          <>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-bold">{edu.school}</h3>
              <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-accent)] shrink-0 print:bg-transparent print:px-0">
                {edu.dates}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">{edu.degree}</p>
          </>
        ) : (
          <>
            <h3 className="text-sm font-bold">{edu.school}</h3>
            <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">{edu.degree}</p>
            <p className="text-xs text-[var(--color-muted)]">{edu.dates}</p>
          </>
        )}
      </div>
    </div>
  );
}

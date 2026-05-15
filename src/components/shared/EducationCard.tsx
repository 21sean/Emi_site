import { Education } from "@/data/profile";

interface EducationCardProps {
  edu: Education;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function EducationCard({
  edu,
  isFirst = false,
  isLast = false,
}: EducationCardProps) {
  const years = edu.dates.match(/\d{4}/g) ?? [];
  const startYear = years[0] ?? "";
  const endYear = years[1] ?? "Present";
  const yearLabel = `${startYear} – ${endYear}`;

  return (
    <div className="group relative flex items-stretch">
      {/* Left: vertical line + dot */}
      <div className="relative flex flex-col items-center w-4 shrink-0">
        <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[var(--color-border)] ${isFirst ? "top-2.5" : "top-0"} ${isLast ? "h-2.5" : "bottom-0"}`} />
        <div className="relative z-10 mt-3.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-background)] transition-transform duration-200 group-hover:scale-125" />
      </div>
      {/* Year label */}
      <div className="flex items-start pt-2 pl-3 pr-2 shrink-0 w-28">
        <span className="text-[11px] font-semibold uppercase text-[var(--color-accent)] leading-tight whitespace-nowrap">
          {yearLabel}
        </span>
      </div>
      {/* Card content */}
      <div className="flex-1 mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md">
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

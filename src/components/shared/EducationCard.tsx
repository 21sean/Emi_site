import { Education } from "@/data/profile";

interface EducationCardProps {
  edu: Education;
  index?: number;
  variant?: "about" | "resume";
}

export default function EducationCard({
  edu,
  index = 0,
  variant = "about",
}: EducationCardProps) {
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

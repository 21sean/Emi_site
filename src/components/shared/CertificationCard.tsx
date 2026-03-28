import { Certification } from "@/data/profile";

interface CertificationCardProps {
  cert: Certification;
  index?: number;
  variant?: "about" | "resume";
}

export default function CertificationCard({
  cert,
  index = 0,
  variant = "about",
}: CertificationCardProps) {
  const hoverOpacity = variant === "about" ? "hover:border-[var(--color-accent)]/30" : "hover:border-[var(--color-accent)]/20";
  const printClasses = variant === "resume" ? "print:border-0 print:p-0 print:shadow-none" : "";

  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-200 ${hoverOpacity} hover:shadow-md ${printClasses}`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">{cert.name}</h3>
        <span className="shrink-0 text-xs text-[var(--color-muted)]">{cert.date}</span>
      </div>
      <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">{cert.issuer}</p>
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-muted)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
        >
          Show credential ↗
        </a>
      )}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-[var(--color-accent-light)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

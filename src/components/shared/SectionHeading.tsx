import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  variant?: "about" | "resume";
  className?: string;
}

export default function SectionHeading({
  children,
  variant = "about",
  className = "",
}: SectionHeadingProps) {
  if (variant === "resume") {
    return (
      <h2
        className={`mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent)] ${className}`}
      >
        <span className="inline-block h-4 w-1 rounded-full bg-[var(--color-accent)]" />
        {children}
      </h2>
    );
  }

  return (
    <h2
      className={`mb-5 flex items-center gap-2 text-lg font-bold tracking-tight ${className}`}
    >
      <span className="inline-block h-5 w-1 rounded-full bg-[var(--color-accent)]" />
      {children}
    </h2>
  );
}

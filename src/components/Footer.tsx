import profile from "@/data/profile";

export default function Footer() {
  return (
    <footer className="no-print border-t border-[var(--color-border)] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {profile.name} &middot;{" "}
            {profile.location}
          </div>

          <div className="flex gap-4">
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

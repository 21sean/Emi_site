import type { Metadata } from "next";
import profile from "@/data/profile";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact – ${profile.name}`,
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Interested in consulting, research collaboration, or strategic
          advisory? Send a message below or connect on social media.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Social / Links */}
          <aside className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Connect
            </h2>
            <ul className="space-y-3">
              {profile.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  Download Resume
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">
                Location
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                {profile.location}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

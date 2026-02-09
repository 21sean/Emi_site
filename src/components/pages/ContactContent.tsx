"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ContactForm from "@/components/ContactForm";
import { useMounted, useReveal } from "@/lib/useReveal";

export default function ContactContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();
  const asideRef = useReveal();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className={mounted ? "animate-fade-in-up" : "opacity-0"}>
          <h1 className="text-3xl font-extrabold tracking-tight">{ui.contact.title}</h1>
          <p className="mt-3 text-[var(--color-muted)]">
            {ui.contact.description}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className={`lg:col-span-3 ${mounted ? "animate-fade-in-up stagger-2" : "opacity-0"}`}>
            <ContactForm />
          </div>

          {/* Social / Links */}
          <aside
            ref={asideRef.ref}
            className={`lg:col-span-2 reveal ${asideRef.revealed ? "revealed" : ""}`}
          >
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold tracking-tight">
                {ui.contact.connect}
              </h2>
              <ul className="space-y-3">
                {profile.socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-muted)] transition-all duration-200 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] focus-ring"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </span>
                      <span className="font-medium">{link.label}</span>
                      <svg className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resumeUrl}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-muted)] transition-all duration-200 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] focus-ring"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    <span className="font-medium">{ui.common.downloadResume}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-bold tracking-tight">
                {ui.contact.location}
              </h2>
              <p className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

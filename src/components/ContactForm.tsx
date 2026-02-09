"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI } from "@/lib/translations";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const ui = getUI(lang);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="animate-scale-in flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
          <svg className="h-7 w-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-bold">{ui.contact.thankYou}</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {ui.contact.notSent}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-lg bg-[var(--color-accent-light)] px-5 py-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-white focus-ring"
        >
          {ui.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl bg-[var(--color-accent-light)] px-4 py-3 text-sm text-[var(--color-muted)]">
        <div className="flex items-start gap-2">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {ui.contact.formNotice}
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:shadow-lg focus:shadow-[var(--color-accent)]/5"
          placeholder={ui.contact.namePlaceholder}
        />
      </div>

      <div className="group">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:shadow-lg focus:shadow-[var(--color-accent)]/5"
          placeholder={ui.contact.emailPlaceholder}
        />
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:shadow-lg focus:shadow-[var(--color-accent)]/5"
          placeholder={ui.contact.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring"
      >
        {ui.contact.sendMessage}
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  );
}

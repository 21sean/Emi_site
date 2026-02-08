"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { copy } = useLanguage();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
        <p className="text-lg font-medium">{copy.contactForm.thankYou}</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {copy.contactForm.notSent}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          {copy.contactForm.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="rounded-md bg-[var(--color-accent-light)] px-4 py-2.5 text-sm text-[var(--color-muted)]">
        {copy.contactForm.banner}
      </p>

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium"
        >
          {copy.contactForm.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder={copy.contactForm.placeholderName}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium"
        >
          {copy.contactForm.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder={copy.contactForm.placeholderEmail}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium"
        >
          {copy.contactForm.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder={copy.contactForm.placeholderMessage}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        {copy.contactForm.sendMessage}
      </button>
    </form>
  );
}

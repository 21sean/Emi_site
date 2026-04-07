"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI } from "@/lib/translations";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const RECAPTCHA_SITE_KEY = "6Lf8DYMsAAAAAAwVXa0OfqHsKMyfttw6zCOqruV2";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [message, setMessage] = useState("");
  const { lang } = useLanguage();
  const ui = getUI(lang);

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
  const overLimit = wordCount > 200;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (overLimit) return;
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/emi.kobayashi.work@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
      setCaptchaToken(null);
      setCaptchaKey((k) => k + 1);
    }
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
          Your message has been sent successfully.
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
      {/* Honeypot for spam prevention */}
      <input type="text" name="_honey" className="hidden" />
      {/* Disable captcha page */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New message from emikoba.com" />

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try again or email directly at emi.kobayashi.work@gmail.com.
        </div>
      )}

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
          minLength={2}
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
          pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address"
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
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full resize-none rounded-xl border bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-muted)]/60 focus:ring-2 focus:shadow-lg focus:shadow-[var(--color-accent)]/5 ${overLimit ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"}`}
          placeholder={ui.contact.messagePlaceholder}
        />
        <div className={`mt-1.5 text-right text-xs ${overLimit ? "text-red-500 font-medium" : "text-[var(--color-muted)]"}`}>
          {wordCount} / 200 words
        </div>
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          key={captchaKey}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(token: string | null) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />
      </div>

      <button
        type="submit"
        disabled={sending || !captchaToken || overLimit}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring disabled:opacity-60 disabled:pointer-events-none"
      >
        {sending ? "Sending..." : ui.contact.sendMessage}
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  );
}

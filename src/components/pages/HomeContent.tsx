"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import CountUp from "@/components/CountUp";
import SkyScene from "@/components/SkyScene";
import SakuraPetals from "@/components/SakuraPetals";
import FooterScene from "@/components/FooterScene";
import { useMounted, useReveal } from "@/lib/useReveal";

// Hero headline: single quantifiable sentence with one inline animated number.
const HERO_HEADLINE: Record<"en" | "ja" | "zh", { value: number; suffix: string; prefix: string; before: string; after: string }> = {
  en: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "Driving ",
    after: " revenue growth across global B2B markets in semiconductors, life sciences & AI.",
  },
  ja: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "半導体・ライフサイエンス・AI分野のグローバルB2B市場で、",
    after: " の売上成長を牽引。",
  },
  zh: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "在半导体、生命科学与人工智能的全球B2B市场，推动",
    after: " 的营收增长。",
  },
};

// Phrases for the hero flip animation. Last entry duplicates the first so the
// CSS keyframe loops seamlessly.
const FLIP_PHRASES: Record<"en" | "ja" | "zh", { prefix: string; words: string[] }> = {
  en: {
    prefix: "I market & scale",
    words: [
      "Semiconductor B2B campaigns",
      "Life sciences SaaS launches",
      "AI & advanced manufacturing",
      "Cross-border GTM strategy",
      "Deep-tech brand stories",
      "Semiconductor B2B campaigns",
    ],
  },
  ja: {
    prefix: "私が手がけるのは",
    words: [
      "半導体B2Bキャンペーン",
      "ライフサイエンスSaaSローンチ",
      "AI & 先進製造",
      "国境を越えるGTM戦略",
      "ディープテックのブランド戦略",
      "半導体B2Bキャンペーン",
    ],
  },
  zh: {
    prefix: "我策划与扩展",
    words: [
      "半导体B2B营销",
      "生命科学SaaS发布",
      "AI 与先进制造",
      "跨境市场进入策略",
      "深科技品牌叙事",
      "半导体B2B营销",
    ],
  },
};

export default function HomeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();
  const flip = FLIP_PHRASES[lang];
  const headline = HERO_HEADLINE[lang];

  const allProjects = profile.projects;

  const featuredRef = useReveal();
  const ctaRef = useReveal();

  // ── Carousel state ─────────────────────────
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        {/* Subtle background gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/3 blur-3xl" />
        </div>

        {/* Ambient scene from kenta.page: drifting clouds + falling sakura.
            Celestial body omitted here so nothing collides with the headshot. */}
        <SkyScene celestial={false} />
        <SakuraPetals count={12} />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {profile.location}
              </p>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-6xl">
                {profile.name}
              </h1>
              {/* Quantifiable headline with one inline animated number */}
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[var(--color-foreground)] lg:text-2xl font-medium">
                {headline.before}
                <span className="font-extrabold text-[var(--color-accent)] tabular-nums">
                  {mounted ? (
                    <CountUp
                      end={headline.value}
                      prefix={headline.prefix}
                      suffix={headline.suffix}
                      durationMs={1800}
                    />
                  ) : (
                    <span>
                      {headline.prefix}0{headline.suffix}
                    </span>
                  )}
                </span>
                {headline.after}
              </p>

              {/* Flip animation: prefix + rotating phrase */}
              <div className="mt-3 text-lg leading-[1.4] text-[var(--color-muted)] lg:text-xl">
                <span>{flip.prefix} </span>
                <span
                  className="inline-flex h-[1.4em] overflow-hidden align-bottom font-semibold text-[var(--color-accent)]"
                  aria-label={flip.words.slice(0, -1).join(", ")}
                >
                  <span className="flex flex-col animate-text-flip">
                    {flip.words.map((word, i) => (
                      <span key={i} className="block whitespace-nowrap">
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* Specialties pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {profile.specialties.map((s) => (
                  <span
                    key={s}
                    className="glass-card glass-card-hover !rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-foreground)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring"
                >
                  {ui.home.viewProjects}
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:shadow-md hover:-translate-y-0.5 focus-ring"
                >
                  {ui.home.getInTouch}
                </Link>
              </div>
            </div>

            {/* Headshot */}
            <div className="shrink-0 self-center sm:self-auto">
              <div className="group/photo relative cursor-pointer" style={{ perspective: "600px" }}>
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 blur-sm" />
                <div className="relative h-56 w-56 transition-transform duration-500 [transform-style:preserve-3d] group-hover/photo:[transform:rotateY(180deg)]">
                  {/* Front — original headshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden]"
                  />
                  {/* Back — hover photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot-hover.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/emi-kobayashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Featured Projects ─────────────────── */}
      <section
        ref={featuredRef.ref}
        className="py-10"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`mb-6 flex items-end justify-between reveal ${
              featuredRef.revealed ? "revealed" : ""
            }`}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                {ui.home.featuredProjects}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous projects"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)] disabled:hover:shadow-sm focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  disabled={!canScrollRight}
                  aria-label="Next projects"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)] disabled:hover:shadow-sm focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link
                href="/projects"
                className="group flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-ring"
              >
                {ui.common.viewAll}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        {/* Snap-scroll carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="carousel-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 [scroll-padding-left:max(1.5rem,calc((100%-64rem)/2))] px-[max(1.5rem,calc((100%-64rem)/2))]"
          >
            {allProjects.map((project) => (
              <div
                key={project.id}
                data-carousel-card
                className="flex w-[340px] shrink-0 snap-start"
              >
                <ProjectCard project={project} featured compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-[var(--color-border)]" />
      </div>

      {/* ── Skills ──────────────────────────────
          Note: cannot wrap in .reveal — its CSS transform breaks
          GSAP ScrollTrigger pinning inside Skills. */}
      <Skills />

      {/* ── CTA ───────────────────────────────── */}
      <section
        ref={ctaRef.ref}
        className={`pt-4 pb-16 sm:pt-6 sm:pb-20 reveal ${ctaRef.revealed ? "revealed" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="skills-card relative overflow-hidden px-8 py-16 text-center">
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/8 via-transparent to-[var(--color-accent)]/8" />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight">
                {ui.home.interestedTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
                {ui.home.interestedDesc}
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 focus-ring"
              >
                {ui.home.contactMe}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Twilight landscape (assets from kenta.page) ──────────
          Silhouette scene + dusk sky, grounding the page before the footer. */}
      <FooterScene />
    </>
  );
}

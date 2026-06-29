"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import { useReveal } from "@/lib/useReveal";

export default function FeaturedProjects() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const allProjects = profile.projects;

  const featuredRef = useReveal();

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
    <section ref={featuredRef.ref} className="py-10">
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
  );
}

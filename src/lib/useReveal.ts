"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook that triggers a CSS class when an element enters the viewport.
 * Uses IntersectionObserver for performant scroll-based animations.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, revealed };
}

/**
 * Hook that reveals multiple children with staggered delays.
 * Attach the returned ref to the parent container.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, revealed };
}

/**
 * Returns a className string for staggered child animations.
 * Use on each child: className={staggerClass(index)}
 */
export function staggerClass(index: number, revealed: boolean, base = "reveal") {
  return `${base} ${revealed ? "revealed" : ""} stagger-${Math.min(index + 1, 10)}`;
}

/**
 * Simple hook that sets `mounted` to true after hydration for entrance animations.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

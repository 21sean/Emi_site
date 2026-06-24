"use client";

import { useEffect, useState } from "react";
import SakuraBlossom from "@/components/SakuraBlossom";

/**
 * Falling cherry-blossom petals — the "pink particles" effect from kenta.page.
 *
 * The source site spawns its petals at runtime (framer-motion), so there is no
 * static animation asset to lift. This rebuilds the motion with CSS keyframes
 * (see `globals.css`: petal-fall / petal-sway) using the genuine blossom shape
 * extracted from the site's favicon. Purely decorative and pointer-transparent;
 * respects `prefers-reduced-motion`.
 */

// Sakura tints — soft pinks through the site's deeper blossom red (#f3574d).
const TINTS = ["#ffd6e3", "#ffc1d6", "#ffb7c5", "#ff9bb6", "#f3574d"];

type Petal = {
  left: number;        // vw start position
  size: number;        // px
  duration: number;    // fall seconds
  delay: number;       // negative -> mid-flight on first paint
  swayDuration: number;
  color: string;
  startRotate: number;
};

function makePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    duration: 9 + Math.random() * 8,
    delay: -Math.random() * 15,
    swayDuration: 3 + Math.random() * 3,
    color: TINTS[i % TINTS.length],
    startRotate: Math.random() * 360,
  }));
}

export default function SakuraPetals({ count = 18 }: { count?: number }) {
  // Randomized only on the client to avoid SSR/hydration mismatch.
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    setPetals(makePetals(count));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="sakura-fall absolute top-0 block"
          style={{
            left: `${p.left}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            color: p.color,
          }}
        >
          <span
            className="sakura-sway block h-full w-full"
            style={{
              animationDuration: `${p.swayDuration}s`,
              ["--start-rotate" as string]: `${p.startRotate}deg`,
            }}
          >
            <SakuraBlossom className="h-full w-full opacity-70 drop-shadow-sm" />
          </span>
        </span>
      ))}
    </div>
  );
}

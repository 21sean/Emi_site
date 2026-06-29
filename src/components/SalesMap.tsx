"use client";

import { useEffect, useRef, useState } from "react";

// ── Region data ──────────────────────────────────────────────
// Placeholder sales figures. Paths are stylized (not survey-accurate)
// continent silhouettes drawn on a 1000×540 equirectangular-ish canvas.
type Region = {
  id: string;
  name: string;
  value: number;
  path: string;
  labelX: number;
  labelY: number;
};

const REGIONS: Region[] = [
  {
    id: "us",
    name: "United States",
    value: 48200,
    path:
      "M70,170 L120,150 L190,148 L250,150 L300,168 L292,196 L262,210 L250,238 L238,262 L226,250 L214,236 L196,224 L150,224 L108,214 L80,196 Z",
    labelX: 182,
    labelY: 196,
  },
  {
    id: "eu",
    name: "Europe",
    value: 36500,
    path:
      "M486,165 L512,150 L528,162 L548,156 L560,172 L548,188 L560,200 L546,214 L526,210 L516,226 L504,212 L516,198 L498,190 L510,176 L490,178 Z",
    labelX: 524,
    labelY: 186,
  },
  {
    id: "cn",
    name: "China",
    value: 51800,
    path:
      "M664,196 L706,182 L748,186 L784,202 L796,226 L786,256 L750,278 L706,280 L674,262 L658,236 L654,212 Z",
    labelX: 718,
    labelY: 234,
  },
  {
    id: "jp",
    name: "Japan",
    value: 27400,
    path:
      "M828,206 C838,200 848,210 846,224 C844,240 832,254 822,262 C818,248 816,230 822,216 C824,212 826,208 828,206 Z " +
      "M842,192 C848,188 854,194 850,200 C846,206 838,204 838,198 Z " +
      "M812,266 C818,262 824,268 820,274 C814,280 806,276 808,270 Z",
    labelX: 868,
    labelY: 232,
  },
];

// Faint background landmasses + a UK nub, purely for map context.
const GHOSTS: string[] = [
  // South America
  "M250,318 L300,310 L322,332 L312,372 L300,420 L286,470 L272,452 L268,408 L256,372 L246,344 Z",
  // Africa
  "M486,280 L548,272 L588,290 L592,330 L572,372 L556,420 L536,452 L520,430 L512,388 L496,352 L482,318 Z",
  // Russia / northern Asia
  "M566,150 L700,118 L840,120 L884,150 L860,178 L760,180 L660,184 L600,182 Z",
  // India
  "M648,288 L692,290 L700,316 L680,352 L664,330 L652,308 Z",
  // Southeast Asia / Indonesia
  "M724,330 L772,326 L812,340 L800,360 L760,360 L730,350 Z",
  // Australia
  "M812,392 L884,386 L908,414 L892,452 L840,462 L808,436 L806,410 Z",
  // UK
  "M452,170 L466,166 L470,182 L460,196 L450,186 Z",
];

// ── Count-up hook ────────────────────────────────────────────
// Animates 0 → target whenever `trigger` changes (mount + each highlight).
function useCountUp(target: number, trigger: number, durationMs = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, durationMs]);

  return value;
}

function RegionLabel({
  region,
  active,
  trigger,
}: {
  region: Region;
  active: boolean;
  trigger: number;
}) {
  const value = useCountUp(region.value, trigger);
  return (
    <g transform={`translate(${region.labelX} ${region.labelY})`} style={{ pointerEvents: "none" }}>
      <g className={`sales-label${active ? " is-active" : ""}`}>
        <text className="sales-label__name" textAnchor="middle" y={-7}>
          {region.name}
        </text>
        <text className="sales-label__value" textAnchor="middle" y={16}>
          ${Math.round(value).toLocaleString()}
        </text>
      </g>
    </g>
  );
}

export default function SalesMap() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [triggers, setTriggers] = useState<Record<string, number>>({});
  const startedRef = useRef(false);

  // Kick the load-in once the section scrolls into view (covers both the
  // landing page, where it's near the top, and any lower placement).
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnter = (id: string) => {
    setHovered(id);
    setTriggers((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
  };

  return (
    <section ref={sectionRef} className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Global Sales
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            A snapshot of revenue across our key markets — hover a region to highlight it.
          </p>
        </div>

        <div className={`sales-map${mounted ? " is-mounted" : ""}`}>
          <svg
            viewBox="0 0 1000 540"
            className="block h-auto w-full"
            role="img"
            aria-label="2D map of sales by region: United States, Europe, China and Japan"
          >
            {/* Graticule — subtle map grid */}
            <g className="sales-map__grid">
              {[120, 240, 360, 480].map((y) => (
                <line key={`h${y}`} x1={20} y1={y} x2={980} y2={y} />
              ))}
              {[200, 400, 600, 800].map((x) => (
                <line key={`v${x}`} x1={x} y1={40} x2={x} y2={500} />
              ))}
            </g>

            {/* Context continents */}
            {GHOSTS.map((d, i) => (
              <path key={i} className="sales-ghost" d={d} />
            ))}

            {/* Highlighted sales regions */}
            {REGIONS.map((region, i) => {
              const active = hovered === region.id;
              return (
                <path
                  key={region.id}
                  className="sales-region"
                  d={region.path}
                  pathLength={1}
                  style={
                    {
                      "--reveal-delay": `${i * 0.18}s`,
                      fill: active ? "var(--color-accent)" : undefined,
                      transform: active ? "scale(1.04)" : undefined,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => handleEnter(region.id)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            {/* Numbers over each country */}
            {REGIONS.map((region) => (
              <RegionLabel
                key={region.id}
                region={region}
                active={hovered === region.id}
                trigger={triggers[region.id] ?? 0}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

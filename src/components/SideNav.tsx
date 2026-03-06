"use client";

import { useEffect, useState } from "react";

interface SideNavItem {
  id: string;
  label: string;
}

export default function SideNav({ items }: { items: SideNavItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden xl:block fixed left-[max(1rem,calc((100vw-48rem)/2-12rem))] top-24 w-40">
      <ul className="space-y-1 border-l border-[var(--color-border)]">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className={`block w-full pl-3 py-1.5 text-left text-xs transition-all duration-200 ${
                activeId === item.id
                  ? "border-l-2 -ml-px border-[var(--color-accent)] font-semibold text-[var(--color-accent)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

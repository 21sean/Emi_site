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
    <nav className="hidden lg:block fixed left-[max(1rem,calc((100vw-48rem)/2-13rem))] top-28 w-44 print:hidden">
      <ul className="space-y-0.5 border-l-2 border-[var(--color-border)]">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className={`block w-full pl-3 py-1.5 text-left text-[11px] leading-snug transition-all duration-200 rounded-r-md ${
                activeId === item.id
                  ? "-ml-[2px] border-l-2 border-[var(--color-accent)] font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/5"
                  : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent)]/5"
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

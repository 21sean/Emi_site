"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  SiGit,
  SiJavascript,
  SiR,
  SiGithubcopilot,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  PiMicrosoftExcelLogo,
  PiMicrosoftPowerpointLogo,
  PiMicrosoftOutlookLogoFill,
} from "react-icons/pi";
import { TbMathFunction, TbChartBar } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useLanguage } from "@/components/LanguageProvider";
import { getProfile, getUI } from "@/lib/translations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, IconType> = {
  "VS Code": VscCode,
  "GitHub Copilot": SiGithubcopilot,
  Git: SiGit,
  Excel: PiMicrosoftExcelLogo,
  "Office 365": PiMicrosoftOutlookLogoFill,
  PowerPoint: PiMicrosoftPowerpointLogo,
  Tableau: TbChartBar,
  JavaScript: SiJavascript,
  "CRM Systems": HiOutlineUserGroup,
  "R Studio": SiR,
  MATLAB: TbMathFunction,
};

const SPACER = 52;
const HEADER_CLEAR = 80; // sticky header (62px) + breathing room

export default function Skills() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const panelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = profile.skills.filter(
    (s) => !s.category.toLowerCase().includes("collab")
  );

  useEffect(() => {
    const panel = panelRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panel || cards.length === 0) return;

    // iOS Safari only: position:fixed pinning jitters during momentum scroll.
    // Detect WebKit-on-iOS specifically so desktop/Android pinning stays on
    // its (working) fixed-pin path.
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOSSafari =
      /iP(hone|ad|od)/.test(ua) &&
      /WebKit/.test(ua) &&
      !/CriOS|FxiOS|EdgiOS/.test(ua);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top-=${index * SPACER} top+=${HEADER_CLEAR}`,
          endTrigger: panel,
          end: `bottom top+=${HEADER_CLEAR + 60 + cards.length * SPACER}`,
          pin: true,
          pinSpacing: false,
          ...(isIOSSafari ? { pinType: "transform" as const } : {}),
          invalidateOnRefresh: true,
        });
      });
    });

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, [categories.length, lang]);

  return (
    <section id="skills" className="w-full px-4 sm:px-6 pt-12 pb-4 sm:pt-20 sm:pb-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {ui.home.skills}
          </h2>
        </div>

        <div ref={panelRef} className="skills-pin-panel relative">
          {categories.map((cat, i) => (
            <div
              key={cat.category}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="skills-card mb-6 w-full"
            >
              <div className="skills-card-title">{cat.category}</div>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((tag) => {
                  const Icon = iconMap[tag];
                  return (
                    <span key={tag} className="skills-tag">
                      {Icon && <Icon />}
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Scroll runway inside the panel so the last card has room to pin
              and dwell before the whole stack unpins. */}
          <div className="h-[60vh] md:h-[55vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

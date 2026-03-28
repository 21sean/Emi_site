"use client";

import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useMounted, useReveal } from "@/lib/useReveal";
import SideNav from "@/components/SideNav";
import SectionHeading from "@/components/shared/SectionHeading";
import CertificationCard from "@/components/shared/CertificationCard";
import EducationCard from "@/components/shared/EducationCard";
import ExperienceCard from "@/components/shared/ExperienceCard";

export default function AboutContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();

  const focusRef = useReveal();
  const certsRef = useReveal();
  const valuesRef = useReveal();
  const interestsRef = useReveal();
  const languagesRef = useReveal();
  const educationRef = useReveal();
  const experienceRef = useReveal();

  return (
    <section className="py-20">
      <SideNav
        items={[
          { id: "summary", label: "Summary" },
          { id: "languages", label: ui.about.languages },
          { id: "focus-areas", label: ui.about.focusAreas },
          { id: "certifications", label: ui.about.certifications },
          { id: "values", label: ui.about.values },
          { id: "interests", label: ui.about.interests },
          { id: "education", label: ui.about.education },
          { id: "experience", label: ui.about.experience },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6">
        {/* Header with headshot */}
        <div
          className={`flex flex-col items-start gap-6 sm:flex-row sm:items-center ${
            mounted ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent blur-sm" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/headshot.jpg")}
              alt={profile.name}
              width={120}
              height={120}
              className="relative h-[120px] w-[120px] rounded-full border-2 border-[var(--color-border)] object-cover shadow-lg ring-4 ring-[var(--color-background)]"
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{ui.about.title}</h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{profile.headline}</p>
          </div>
        </div>

        {/* Bio */}
        <div
          id="summary"
          className={`mt-10 scroll-mt-20 space-y-4 ${
            mounted ? "animate-fade-in-up stagger-3" : "opacity-0"
          }`}
        >
          {profile.about.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[var(--color-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Languages */}
        <div
          id="languages"
          ref={languagesRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${languagesRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.about.languages}</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.languages.map((lng, i) => (
              <div
                key={lng.name}
                className="flex items-baseline justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-md"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <span className="text-sm font-semibold">{lng.name}</span>
                <span className="rounded-full bg-[var(--color-accent-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                  {lng.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div
          id="focus-areas"
          ref={focusRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${focusRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.about.focusAreas}</SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.about.focusAreas.map((area, i) => (
              <li
                key={area}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div
          id="certifications"
          ref={certsRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${certsRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.about.certifications}</SectionHeading>
          <div className="grid gap-3">
            {profile.certifications.map((cert, i) => (
              <CertificationCard key={cert.name} cert={cert} index={i} variant="about" />
            ))}
          </div>
        </div>

        {/* Values */}
        <div
          id="values"
          ref={valuesRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${valuesRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.about.values}</SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.about.values.map((value, i) => (
              <li
                key={value}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)]/30 hover:shadow-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Interests */}
        <div
          id="interests"
          ref={interestsRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${interestsRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.about.interests}</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {profile.about.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-sm text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)] hover:shadow-md"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div
          id="education"
          ref={educationRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${educationRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading className="mb-6">{ui.about.education}</SectionHeading>
          <div className="space-y-4">
            {profile.education.map((edu, i) => (
              <EducationCard key={i} edu={edu} index={i} variant="about" />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div
          id="experience"
          ref={experienceRef.ref}
          className={`mt-14 scroll-mt-20 reveal ${experienceRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading className="mb-6">{ui.about.experience}</SectionHeading>
          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border)] to-transparent" />

            {profile.experience.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-[14px] w-[14px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]" />
                <ExperienceCard exp={exp} variant="about" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

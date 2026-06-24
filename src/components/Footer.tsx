"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getProfile } from "@/lib/translations";
import { assetPath } from "@/lib/basePath";

/**
 * Site footer — styled as the deep "ground" the twilight FooterScene fades
 * into, echoing kenta.page where the footer content sits on the dark
 * underwater band rather than a separate plain strip. The indigo (#1e3e67)
 * matches the silhouette foreground in `public/footer-scene.svg`, so the
 * scene flows seamlessly into the footer with no seam or border.
 */
export default function Footer() {
  const { lang } = useLanguage();
  const profile = getProfile(lang);

  return (
    <footer className="no-print relative -mt-px overflow-hidden bg-gradient-to-b from-[#1e3e67] to-[#15294a] text-[#e7d9ec]">
      {/* Soft waterline highlight where the scene meets the ground */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9aa6d4]/25 to-transparent" />

      {/* Drifting bubbles — faint underwater polish */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[12%] top-8 h-1.5 w-1.5 rounded-full bg-[#f5cce9]/20" />
        <span className="absolute left-[18%] bottom-6 h-1 w-1 rounded-full bg-[#f5cce9]/15" />
        <span className="absolute right-[14%] top-10 h-2 w-2 rounded-full bg-[#f5cce9]/15" />
        <span className="absolute right-[22%] bottom-8 h-1 w-1 rounded-full bg-[#f5cce9]/20" />
      </div>

      {/* Cream seaweed + boulder + koi silhouettes (assets from kenta.page)
          rising from the seabed. Arranged to echo kenta.page: a kelp cluster
          on the left, a koi drifting through the centre, and a leaping koi
          beside a boulder on the right. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 select-none">
        {/* Left kelp cluster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/seaweed-large.svg")}
          alt=""
          className="absolute bottom-0 left-[2%] h-24 w-auto opacity-70 sm:h-32"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/seaplant.svg")}
          alt=""
          className="absolute bottom-0 left-[9%] hidden h-20 w-auto opacity-65 sm:block sm:h-24"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/seaweed-small.svg")}
          alt=""
          className="absolute bottom-0 left-[16%] hidden h-14 w-auto opacity-55 sm:block sm:h-16"
        />
        {/* Koi drifting through the centre of the seabed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/koi-b.svg")}
          alt=""
          className="koi-drift-slow absolute left-[42%] bottom-6 hidden h-10 w-auto opacity-50 sm:block"
        />
        {/* Leaping koi + boulder on the right. The koi stays visible on mobile
            (scaled down) so the seabed isn't bare once the kelp cluster and
            boulder drop away. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/koi-a.svg")}
          alt=""
          className="koi-drift absolute right-[6%] bottom-4 h-11 w-auto opacity-55 sm:bottom-8 sm:h-16"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/rock.svg")}
          alt=""
          className="absolute bottom-3 right-[18%] hidden h-[4.5rem] w-auto opacity-65 sm:block sm:h-20"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-14">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-[#cbb6dd]">
            &copy; {new Date().getFullYear()} {profile.name} &middot;{" "}
            {profile.location}
          </div>

          <div className="flex gap-2">
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#f5cce9]/80 transition-all duration-200 hover:bg-[#f5cce9]/10 hover:text-white focus-ring"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

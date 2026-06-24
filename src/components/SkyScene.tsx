import { assetPath } from "@/lib/basePath";

/**
 * Decorative sky band — assets extracted from https://kenta.page.
 *
 * The sun shows in light mode and the pale full moon in dark mode (driven by
 * the site's `.dark` theme class); two Japanese curly clouds drift across at
 * different speeds. Purely decorative — anchored top, behind page content.
 */
export default function SkyScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 select-none overflow-hidden"
    >
      {/* Sun (light) / Moon (dark) — top-right celestial body */}
      <div className="absolute right-6 top-6 h-28 w-28 sm:right-16 sm:h-36 sm:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/sun.svg")}
          alt=""
          className="h-full w-full opacity-80 dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/moon.svg")}
          alt=""
          className="hidden h-full w-full opacity-90 dark:block"
        />
      </div>

      {/* Drifting clouds */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/cloud.svg")}
        alt=""
        className="cloud-drift absolute top-10 w-64 opacity-50 dark:opacity-25 sm:w-80"
        style={{ animationDuration: "70s" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/cloud.svg")}
        alt=""
        className="cloud-drift-slow absolute top-32 w-48 opacity-40 dark:opacity-20 sm:w-56"
        style={{ animationDuration: "110s" }}
      />
    </div>
  );
}

import { assetPath } from "@/lib/basePath";

/**
 * Twilight landscape band — the footer scene from https://kenta.page.
 *
 * Two assets are composed here:
 *  - `public/footer-scene.svg` — the silhouette of Japanese mountain scenery
 *    (pine tree, grass, flowers, torii gate and a distant Mount Fuji), lifted
 *    from the site's inline React/SVG asset via a createElement shim. Its hills
 *    carry the source's pink (#f5cce9) gradient; the foreground is deep
 *    indigo (#1e3e67).
 *  - the dusk sky gradient — recreated to seat the silhouette in the same
 *    twilight the source fades to (lavender → blossom pink in light, indigo →
 *    mauve in dark), so the horizon meets the pink hills seamlessly.
 *
 * Curly clouds drift across the sky. Purely decorative; anchored at the very
 * bottom of the page, behind the footer.
 */
export default function FooterScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-0 -mb-px select-none overflow-hidden pt-28 sm:pt-36 lg:pt-44"
    >
      {/* Dusk sky — fades from the page background into the source's twilight. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#cbb6dd]/35 to-[#f5cce9]/75 dark:via-[#43426b]/45 dark:to-[#9a7bb0]/55" />

      {/* Drifting clouds */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/cloud.svg")}
        alt=""
        className="cloud-drift absolute top-8 w-56 opacity-55 dark:opacity-25 sm:w-72"
        style={{ animationDuration: "85s" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/cloud.svg")}
        alt=""
        className="cloud-drift-slow absolute top-20 w-40 opacity-45 dark:opacity-20 sm:w-52"
        style={{ animationDuration: "125s" }}
      />

      {/* Silhouette landscape on the horizon (full-bleed) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/footer-scene.svg")}
        alt=""
        className="relative block w-full"
      />
    </div>
  );
}

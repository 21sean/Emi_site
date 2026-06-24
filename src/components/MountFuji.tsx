import { assetPath } from "@/lib/basePath";

/**
 * Decorative Mount Fuji band (after Hokusai's "Mount Fuji near Ejiri").
 *
 * The artwork was extracted from the inline React/SVG asset on
 * https://kenta.page and saved to `public/mount-fuji.svg`. It is purely
 * decorative — anchored to the bottom of its nearest positioned ancestor and
 * kept out of the tab/pointer flow.
 */
export default function MountFuji({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/mount-fuji.svg")}
        alt=""
        className="mx-auto w-full max-w-5xl opacity-60 dark:opacity-40"
      />
    </div>
  );
}

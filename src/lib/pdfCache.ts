"use client";

// Global cache: keep loaded PDF data so re-renders / page navigations don't re-fetch
const pdfCache = new Map<string, { data: ArrayBuffer }>();
const inflight = new Map<string, Promise<void>>();

export async function prefetchPdf(url: string) {
  if (pdfCache.has(url)) return;
  if (inflight.has(url)) return inflight.get(url);

  const promise = (async () => {
    try {
      const res = await fetch(url, { priority: "high" } as RequestInit);
      const data = await res.arrayBuffer();
      pdfCache.set(url, { data });
    } catch {
      // silently fail – Document component will handle the error
    } finally {
      inflight.delete(url);
    }
  })();

  inflight.set(url, promise);
  return promise;
}

export function preloadPdfs(urls: string[]) {
  // Start all fetches concurrently
  urls.forEach((u) => prefetchPdf(u));
}

export function getCachedPdf(url: string) {
  return pdfCache.get(url) ?? null;
}

"use client";

// Global cache: keep loaded PDF data so re-renders / page navigations don't re-fetch
const pdfCache = new Map<string, { data: ArrayBuffer }>();

export async function prefetchPdf(url: string) {
  if (pdfCache.has(url)) return;
  try {
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    pdfCache.set(url, { data });
  } catch {
    // silently fail – Document component will handle the error
  }
}

export function preloadPdfs(urls: string[]) {
  urls.forEach((u) => prefetchPdf(u));
}

export function getCachedPdf(url: string) {
  return pdfCache.get(url) ?? null;
}

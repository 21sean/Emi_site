"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { getCachedPdf, prefetchPdf } from "@/lib/pdfCache";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFSlideViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [hovered, setHovered] = useState(false);
  const [pdfData, setPdfData] = useState<{ data: ArrayBuffer } | null>(
    getCachedPdf(url),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch & cache if not already cached
  useEffect(() => {
    if (pdfData) return;
    prefetchPdf(url).then(() => {
      const cached = getCachedPdf(url);
      if (cached) setPdfData(cached);
    });
  }, [url, pdfData]);

  const file = useMemo(
    () => (pdfData ? { data: pdfData.data.slice(0) } : url),
    [pdfData, url],
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mt-3 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]">
      {/* Slide */}
      <div
        className="relative flex items-center justify-center bg-black/5 dark:bg-white/5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover overlay with View Project link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 z-10 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-accent)] shadow-lg transition-transform duration-200 hover:scale-105">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Project
          </span>
        </a>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex h-48 items-center justify-center text-xs text-[var(--color-muted)]">
              Loading...
            </div>
          }
          error={
            <div className="flex h-48 items-center justify-center text-xs text-[var(--color-muted)]">
              Failed to load PDF
            </div>
          }
        >
          {containerWidth > 0 && (
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
        </Document>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 border-t border-[var(--color-border)] px-4 py-2">
        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--color-muted)]"
        >
          ← Prev
        </button>
        <span className="text-xs font-medium text-[var(--color-muted)]">
          {pageNumber} / {numPages}
        </span>
        <button
          onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          disabled={pageNumber >= numPages}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--color-muted)]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

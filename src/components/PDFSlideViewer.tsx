"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFSlideViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [],
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Preview Slides
      </button>
    );
  }

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]">
      {/* Slide */}
      <div className="flex items-center justify-center bg-black/5 dark:bg-white/5">
        <Document
          file={url}
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
          <Page
            pageNumber={pageNumber}
            width={480}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2">
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
        <button
          onClick={() => {
            setIsOpen(false);
            setPageNumber(1);
          }}
          className="ml-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}

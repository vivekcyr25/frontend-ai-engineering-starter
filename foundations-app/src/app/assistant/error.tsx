"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AssistantErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to client-side diagnostics if needed, without exposing raw stacks to end-users
    console.error("Assistant Route Error Caught:", error.message);
  }, [error]);

  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
      <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-mono uppercase tracking-wider text-amber-800">
          <span>⚠️ Route Recovery Boundary</span>
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Technical Assistant Temporarily Unavailable
        </h1>

        <p className="mt-2 max-w-xl text-sm text-muted">
          The assistant interface encountered an unexpected rendering or connection issue.
          Your existing portfolio navigation is preserved and no data was lost.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md bg-accent-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-md border border-line bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Return to Home
          </Link>
          <Link
            href="/work"
            className="rounded-md border border-line bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}

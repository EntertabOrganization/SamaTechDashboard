import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  /** Open when the page loads. */
  defaultOpen?: boolean;
  /** Anything small at the end of the header, e.g. a status pill. */
  badge?: ReactNode;
  children: ReactNode;
}

/** Collapsible card built on <details>: it opens and closes with no JS. */
export default function SectionCard({
  title,
  description,
  defaultOpen,
  badge,
  children,
}: SectionCardProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-3xl border border-ink-100 bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h2 className="font-heading text-sm font-bold text-ink-900">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-ink-500">{description}</p>}
        </div>
        <span className="flex shrink-0 items-center gap-3">
          {badge}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-ink-500 transition-transform duration-200 group-open:rotate-180"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="space-y-4 border-t border-ink-100 px-5 py-5">{children}</div>
    </details>
  );
}

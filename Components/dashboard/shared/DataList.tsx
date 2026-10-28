import type { ReactNode } from "react";

interface DataListProps {
  /** Accessible name of the list. */
  label: string;
  /**
   * Grid columns for md and up, e.g. "md:grid-cols-[2fr_8rem_1.25rem]".
   * Use the same string on every row so the columns line up.
   */
  gridClass: string;
  /** Column headings (hidden on mobile). Use "" for a blank column. */
  headings: Array<{ text: string; className?: string }>;
  /** The rows: <li> elements. */
  children: ReactNode;
}

/** White card with a heading row and divided rows. Used by messages and users. */
export default function DataList({
  label,
  gridClass,
  headings,
  children,
}: DataListProps) {
  return (
    <section
      aria-label={label}
      className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm"
    >
      <div
        aria-hidden="true"
        className={`hidden gap-4 border-b border-ink-100 bg-ink-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-ink-500 md:grid ${gridClass}`}
      >
        {headings.map((h, i) => (
          <span key={i} className={h.className}>
            {h.text}
          </span>
        ))}
      </div>

      <ul className="divide-y divide-ink-100">{children}</ul>
    </section>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

interface OverviewPanelProps {
  title: string;
  /** Where "View all" goes. */
  href: string;
  /** The rows: <li> elements. */
  children: ReactNode;
}

/** White card with a title, a "View all" link and a divided list of rows. */
export default function OverviewPanel({ title, href, children }: OverviewPanelProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="font-heading text-sm font-bold text-ink-900">{title}</h2>
        <Link
          href={href}
          className="text-xs font-semibold text-blue-sovereign transition-colors hover:text-blue-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse"
        >
          View all →
        </Link>
      </header>
      <ul className="divide-y divide-ink-100 border-t border-ink-100">{children}</ul>
    </section>
  );
}

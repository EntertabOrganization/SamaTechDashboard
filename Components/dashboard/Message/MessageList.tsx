import type { ReactNode } from "react";

/** Shared by the header row and every MessageRow, so the columns line up. */
export const messageGrid = "md:grid-cols-[1.2fr_2fr_9rem_1.25rem]";

export default function MessageList({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="Contact messages"
      className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm"
    >
      <div
        aria-hidden="true"
        className={`hidden gap-4 border-b border-ink-100 bg-ink-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-ink-500 md:grid ${messageGrid}`}
      >
        <span>Sender</span>
        <span>Message</span>
        <span className="text-right">Received</span>
        <span />
      </div>

      <ul className="divide-y divide-ink-100">{children}</ul>
    </section>
  );
}

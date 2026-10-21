import Link from "next/link";
import type { MessageFilter } from "./MessageFilters";

interface MessagePaginationProps {
  /** Current page, 1-based (API `page`). */
  page: number;
  /** Total number of pages, e.g. Math.ceil(total / limit). */
  totalPages: number;
  /** Keeps the active status filter when changing page. */
  status?: MessageFilter;
}

/** Page numbers live in the URL (`?page=2&status=NEW`), same idea as the filters. */
export default function MessagePagination({
  page,
  totalPages,
  status = "all",
}: MessagePaginationProps) {
  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (target > 1) params.set("page", String(target));
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  const button =
    "inline-flex h-9 items-center rounded-full border border-ink-100 bg-white px-4 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse";
  const disabled =
    "inline-flex h-9 items-center rounded-full border border-ink-100 bg-white px-4 text-sm font-semibold text-ink-300";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3"
    >
      <p className="text-sm text-ink-500">
        Page <span className="font-semibold text-ink-900">{page}</span> of{" "}
        {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link href={href(page - 1)} rel="prev" className={button}>
            Previous
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled}>
            Previous
          </span>
        )}

        {page < totalPages ? (
          <Link href={href(page + 1)} rel="next" className={button}>
            Next
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled}>
            Next
          </span>
        )}
      </div>
    </nav>
  );
}

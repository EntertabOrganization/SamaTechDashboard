import Link from "next/link";
import { actionButtonClass } from "./ActionButton";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Builds the link for a page, e.g. (p) => `?status=PENDING&page=${p}`. */
  hrefFor: (page: number) => string;
}

const disabled = `${actionButtonClass("light")} cursor-not-allowed opacity-50`;

/** Previous / next links. The page lives in the URL (`?page=2`), so there is no client JS. */
export default function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-3">
      <p className="text-xs font-medium text-ink-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link href={hrefFor(page - 1)} className={actionButtonClass("light")}>
            ← Previous
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled}>
            ← Previous
          </span>
        )}
        {page < totalPages ? (
          <Link href={hrefFor(page + 1)} className={actionButtonClass("light")}>
            Next →
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled}>
            Next →
          </span>
        )}
      </div>
    </nav>
  );
}

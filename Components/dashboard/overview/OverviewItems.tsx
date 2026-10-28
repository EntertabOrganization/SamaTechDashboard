import Link from "next/link";
import { CalendarIcon } from "@/Components/dashboard/Layout/icons";
import Avatar from "@/Components/dashboard/shared/Avatar";

const row =
  "flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-pulse";

/** A pending consultation request. */
export function PendingRequestItem({
  href,
  organization,
  requesterName,
  slot,
}: {
  href: string;
  organization: string;
  requesterName: string;
  /** Already formatted, e.g. "Sun, 18 Oct · 09:30". */
  slot: string;
}) {
  return (
    <li>
      <Link href={href} className={row}>
        <Avatar name={organization} size="sm" shape="square" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink-900">{requesterName}</p>
          <p className="truncate text-xs text-ink-500">{organization}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-ink-500">
          <CalendarIcon width={13} height={13} />
          {slot}
        </span>
      </Link>
    </li>
  );
}

/** A contact message. Unread ones get a dot and a bolder name. */
export function MessageItem({
  href,
  name,
  preview,
  receivedAt,
  unread,
}: {
  href: string;
  name: string;
  preview: string;
  /** Already formatted, e.g. "2h ago". */
  receivedAt: string;
  unread?: boolean;
}) {
  return (
    <li>
      <Link href={href} className={row}>
        <Avatar name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-sm text-ink-900 ${unread ? "font-bold" : "font-semibold"}`}
          >
            {name}
          </p>
          <p className="truncate text-xs text-ink-500">{preview}</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-ink-500">
          {unread && (
            <span
              role="img"
              aria-label="Unread"
              className="h-1.5 w-1.5 rounded-full bg-blue-pulse"
            />
          )}
          {receivedAt}
        </span>
      </Link>
    </li>
  );
}

/** A confirmed consultation coming up: date block + who and when. */
export function UpcomingItem({
  href,
  day,
  month,
  requesterName,
  time,
}: {
  href: string;
  /** Day of the month, e.g. "18". */
  day: string;
  /** Short month, e.g. "Oct". */
  month: string;
  requesterName: string;
  /** e.g. "09:30". */
  time: string;
}) {
  return (
    <li>
      <Link href={href} className={row}>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-ink-50 leading-none"
        >
          <span className="font-heading text-base font-bold text-ink-900">{day}</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-500">
            {month}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink-900">{requesterName}</p>
          <p className="text-xs text-ink-500">{time}</p>
        </div>
      </Link>
    </li>
  );
}

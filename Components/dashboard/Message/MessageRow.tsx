import Link from "next/link";
import { messageGrid } from "./MessageList";
import StatusBadge, { type MessageStatus } from "./StatusBadge";

export interface MessageRowProps {
  /** Detail page, e.g. `/dashboard/messages/${id}` (id from GET /contact). */
  href: string;
  name: string;
  email: string;
  organization?: string;
  jobTitle?: string;
  /** "Area of interest" chosen in the contact form. */
  area?: string;
  /** First lines of the message. */
  preview: string;
  /** Already formatted for display, e.g. "2h ago". */
  receivedAt: string;
  /** Same value the API returns: "NEW" | "READ" | "RESPONDED". */
  status: MessageStatus;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function MessageRow({
  href,
  name,
  email,
  organization,
  jobTitle,
  area,
  preview,
  receivedAt,
  status,
}: MessageRowProps) {
  const unread = status === "new";
  const subtitle = [organization, jobTitle].filter(Boolean).join(" · ");

  return (
    <li>
      <Link
        href={href}
        className={`grid gap-3 px-5 py-4 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-pulse md:items-center md:gap-4 ${messageGrid}`}
      >
        {/* Sender */}
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-mist text-xs font-bold text-blue-sovereign"
          >
            {initials(name)}
          </span>
          <div className="min-w-0">
            <p
              className={`truncate text-sm text-ink-900 ${unread ? "font-bold" : "font-semibold"}`}
            >
              {name}
            </p>
            {subtitle && <p className="truncate text-xs text-ink-500">{subtitle}</p>}
            <p className="truncate text-xs text-ink-500">{email}</p>
          </div>
        </div>

        {/* Message */}
        <div className="min-w-0">
          {area && (
            <span className="mb-1.5 inline-flex rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-[10px] font-semibold text-ink-500">
              {area}
            </span>
          )}
          <p
            className={`line-clamp-2 text-sm leading-relaxed ${unread ? "font-medium text-ink-900" : "text-ink-500"}`}
          >
            {preview}
          </p>
        </div>

        {/* Time + status */}
        <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-center md:gap-1.5">
          <span className="text-xs font-medium text-ink-500">{receivedAt}</span>
          <StatusBadge status={status} />
        </div>

        {/* Chevron */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hidden h-4 w-4 text-ink-300 md:block"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </li>
  );
}

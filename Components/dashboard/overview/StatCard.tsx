import Link from "next/link";
import type { ReactNode } from "react";

interface StatCardProps {
  /** Where "View all" goes, e.g. `/dashboard/messages?status=new`. */
  href: string;
  icon: ReactNode;
  label: string;
  /** The number. The backend fills it in. */
  value: ReactNode;
  linkLabel: string;
  /** Dark card for the number that needs action. Use it on one card only. */
  highlight?: boolean;
}

export default function StatCard({
  href,
  icon,
  label,
  value,
  linkLabel,
  highlight,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-5 rounded-3xl border p-5 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse focus-visible:ring-offset-2 ${
        highlight
          ? "border-transparent bg-gradient-navy text-white shadow-[0px_16px_32px_-16px_#121A2380]"
          : "border-ink-100 bg-white text-ink-900 shadow-sm hover:shadow-[0px_12px_24px_-12px_#121A2333]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight ? "bg-white/10 text-white" : "bg-blue-mist text-blue-sovereign"
        }`}
      >
        {icon}
      </span>

      <div>
        <p className={`text-xs font-medium ${highlight ? "text-ink-200" : "text-ink-500"}`}>
          {label}
        </p>
        <p className="mt-1 font-heading text-3xl font-bold tracking-tight">{value}</p>
      </div>

      <span
        className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold ${
          highlight ? "text-blue-precision" : "text-blue-sovereign"
        }`}
      >
        {linkLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

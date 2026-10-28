import Link from "next/link";
import type { ReactNode } from "react";

interface ContentAreaCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

/** One card on the Pages screen: where an editor goes to change something. */
export default function ContentAreaCard({
  href,
  icon,
  title,
  description,
}: ContentAreaCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0px_12px_24px_-12px_#121A2333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-mist text-blue-sovereign"
      >
        {icon}
      </span>
      <div>
        <h3 className="font-heading text-base font-bold text-ink-900">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-500">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-sovereign">
        Edit
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

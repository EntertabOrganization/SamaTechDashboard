import Link from "next/link";
import type { ReactNode } from "react";
import { WEBSITE_URL } from "@/lib/api";

/** Same glass recipe as the website navbar: translucent white, 1px border, soft shadow, blur. */
export default function Topbar({ mobileNav }: { mobileNav: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-ink-100 bg-white/86 px-4 shadow-sm backdrop-blur-[7px] sm:px-6 lg:px-8">
      {/* Same 2px brand line as the website navbar */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-blue-pulse" />
      {mobileNav}
      <div className="flex-1" />
      <Link
        href={WEBSITE_URL}
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-ink-500 transition-colors hover:text-ink-900"
      >
        View website ↗
      </Link>
    </header>
  );
}

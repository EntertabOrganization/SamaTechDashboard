import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AuthBackLinkProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
};

export function AuthBackLink({
  href,
  children,
  showArrow = true,
}: AuthBackLinkProps) {
  return (
    <Link
      href={href}
      className="mt-6 flex items-center justify-center gap-1.5 rounded text-sm text-ink-500 outline-none transition hover:text-ink-700 focus-visible:ring-2 focus-visible:ring-blue-pulse/40"
    >
      {showArrow && <ArrowLeft className="h-4 w-4" />}
      {children}
    </Link>
  );
}

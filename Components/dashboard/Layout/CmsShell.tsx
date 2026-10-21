import type { ReactNode } from "react";
import MobileNav from "./MobileNav";
import SidebarContent, { type CmsUser } from "./SideBarContent";
import Topbar from "./Topbar";
import Link from "next/link";

interface CmsShellProps {
  user: CmsUser;
  /** Logo for the sidebar (e.g. your white <Image />). */
  brand?: ReactNode;
  children: ReactNode;
}

export default function CmsShell({ user, brand, children }: CmsShellProps) {
  const sidebar = <SidebarContent user={user} brand={brand} />;

  return (
    <div className="min-h-screen bg-ink-50 lg:grid lg:grid-cols-[16rem_1fr]">
      <Link
        href="#cms-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-900 focus:shadow-lg"
      >
        Skip to content
      </Link>

      {/* Desktop: fixed sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <Topbar mobileNav={<MobileNav>{sidebar}</MobileNav>} />
        <main
          id="cms-main"
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

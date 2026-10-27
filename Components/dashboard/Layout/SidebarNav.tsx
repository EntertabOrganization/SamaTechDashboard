"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/Components/dashboard/ui";
// import { NavIcon } from "@/Components/dashboard/Layout/icons";
import { cmsNav } from "@/Components/dashboard/Layout/nav";
import { useSessionUser } from "@/Components/dashboard/Layout/SessionShell";
import { canManage } from "@/lib/api";

// "/" is the parent of every other page, so it must match exactly.
const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function SidebarNav() {
  const pathname = usePathname();
  const role = useSessionUser()?.role;
  const groups = cmsNav
    .map((group) => ({ ...group, items: group.items.filter((item) => !item.area || canManage(role, item.area)) }))
    .filter((group) => group.items.length > 0);

  return (
    <nav aria-label="CMS" className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {group.label}
          </p>
          <ul className="mt-2 space-y-1">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                      active
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-precision"
                      />
                    )}
                    {/* <NavIcon name={item.icon} /> */}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

import type { ReactNode } from "react";
import { IconButton } from "@/Components/dashboard/ui";
import { LogOutIcon } from "@/Components/dashboard/Layout/icons";
import SidebarNav from "@/Components/dashboard/Layout/SidebarNav";

export interface CmsUser {
  name: string;
  email: string;
}

interface SidebarContentProps {
  user: CmsUser;
  /** Logo. Falls back to a text wordmark. */
  brand?: ReactNode;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Same navy gradient as the website footer. Used in the desktop sidebar and the mobile drawer. */
export default function SidebarContent({ user, brand }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-linear-to-b from-[#0E1823] to-[#1A2736]">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-5">
        {brand ?? (
          <span className="text-lg font-bold tracking-tight text-white">samatechs</span>
        )}
        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-300">
          CMS
        </span>
      </div>

      <SidebarNav />

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-pulse text-xs font-semibold text-white"
          >
            {initials(user.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-[11px] text-slate-400">{user.email}</p>
          </div>
          {/* TODO: point this at your real logout endpoint. */}
          <form action="/api/auth/logout" method="post">
            <IconButton
              type="submit"
              label="Log out"
              variant="inverse"
              size="sm"
              icon={<LogOutIcon width={14} height={14} />}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

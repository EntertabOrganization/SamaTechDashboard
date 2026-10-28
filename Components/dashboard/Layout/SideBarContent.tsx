import type { ReactNode } from "react";
import { IconButton } from "@/Components/dashboard/ui";
import { LogOutIcon } from "@/Components/dashboard/Layout/icons";
import SidebarNav from "@/Components/dashboard/Layout/SidebarNav";
import { BrandLogo } from "@/Components/dashboard/auth/BrandLogo";

export interface CmsUser {
  name: string;
  email: string;
  /** The role's label, e.g. "Booking". */
  role?: string;
}

interface SidebarContentProps {
  user: CmsUser;
  /** Logo. Falls back to the white SAMATECHS logo. */
  brand?: ReactNode;
  /** Signs out (POST /auth/logout on the backend). */
  logoutAction?: () => void | Promise<void>;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Same navy gradient as the website footer. Used in the desktop sidebar and the mobile drawer. */
export default function SidebarContent({ user, brand, logoutAction }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-gradient-navy">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-5">
        {brand ?? <BrandLogo variant="light" width={124} />}
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
            <p className="truncate text-[11px] text-ink-300">
              {user.role && <span className="font-semibold text-blue-precision">{user.role} · </span>}
              {user.email}
            </p>
          </div>
          <form action={logoutAction}>
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

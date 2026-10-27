"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { canManage, getCurrentUser, logout, type SessionUser } from "@/lib/api";
import { actionButtonClass } from "@/Components/dashboard/shared/ActionButton";
import CmsShell from "./CmsShell";
import { cmsNav } from "./nav";

const SessionContext = createContext<SessionUser | null>(null);

/** The signed-in user, inside the dashboard pages. */
export const useSessionUser = () => useContext(SessionContext);

/** The area a dashboard path belongs to, from the nav ("/messages/123" -> "contact"). */
const areaFor = (pathname: string) =>
  cmsNav
    .flatMap((group) => group.items)
    .find((item) => item.href !== "/" && pathname.startsWith(item.href))?.area;

function NoAccess() {
  return (
    <section className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-sm">
      <h1 className="font-heading text-lg font-bold text-ink-900">You don&apos;t have access to this page</h1>
      <p className="mt-2 text-sm text-ink-500">Your role doesn&apos;t include this area. Ask an admin if you need it.</p>
      <Link href="/" className={actionButtonClass("dark", "mt-6")}>
        Back to overview
      </Link>
    </section>
  );
}

/**
 * Checks the session with GET /auth/me before showing the dashboard,
 * sends signed-out visitors to /login, and hides pages the user's role
 * can't manage (the API refuses them too).
 */
export default function SessionShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((me) => active && setUser(me))
      .catch(() => active && router.replace("/login"));
    return () => {
      active = false;
    };
  }, [router]);

  const logoutAction = async () => {
    await logout().catch(() => undefined);
    router.replace("/login");
  };

  if (!user) return null;

  const area = areaFor(pathname);
  const allowed = !area || canManage(user.role, area);

  return (
    <SessionContext.Provider value={user}>
      <CmsShell user={{ name: user.name || user.email, email: user.email }} logoutAction={logoutAction}>
        {allowed ? children : <NoAccess />}
      </CmsShell>
    </SessionContext.Provider>
  );
}

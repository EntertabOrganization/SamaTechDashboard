"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, type SessionUser } from "@/lib/api";
import CmsShell from "./CmsShell";

const SessionContext = createContext<SessionUser | null>(null);

/** The signed-in user, inside the dashboard pages. */
export const useSessionUser = () => useContext(SessionContext);

/**
 * Checks the session with GET /auth/me before showing the dashboard,
 * and sends signed-out visitors to /login.
 */
export default function SessionShell({ children }: { children: ReactNode }) {
  const router = useRouter();
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

  return (
    <SessionContext.Provider value={user}>
      <CmsShell user={{ name: user.name || user.email, email: user.email }} logoutAction={logoutAction}>
        {children}
      </CmsShell>
    </SessionContext.Provider>
  );
}

import { Suspense } from "react";
import SessionShell from "@/Components/dashboard/Layout/SessionShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <SessionShell>{children}</SessionShell>
    </Suspense>
  );
}

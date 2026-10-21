import SessionShell from "@/Components/dashboard/Layout/SessionShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionShell>{children}</SessionShell>;
}

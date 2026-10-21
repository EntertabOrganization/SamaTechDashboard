import CmsShell from "@/Components/dashboard/Layout/CmsShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CmsShell user={{ name: "Admin User", email: "email" }}>{children}</CmsShell>;
}
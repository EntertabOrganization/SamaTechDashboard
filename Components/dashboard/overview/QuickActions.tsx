import Link from "next/link";
import { ClockIcon, MailIcon } from "@/Components/dashboard/Layout/icons";
import { UsersIcon } from "@/Components/dashboard/content/icons";
import { canManage, type UserRole } from "@/lib/api";

// Fixed shortcuts: these are links to pages, not data.
const allActions = [
  { href: "/messages?status=new", label: "Answer new messages", icon: <MailIcon width={16} height={16} />, area: "messages" },
  { href: "/availability", label: "Update availability", icon: <ClockIcon width={16} height={16} />, area: "booking" },
  { href: "/users", label: "Invite a user", icon: <UsersIcon width={16} height={16} />, area: "users" },
] as const;

/** Only the shortcuts the signed-in role can open. */
export default function QuickActions({ role }: { role?: UserRole }) {
  const actions = allActions.filter((a) => canManage(role, a.area));
  if (actions.length === 0) return null;
  return (
    <section className="rounded-3xl border border-ink-100 bg-white shadow-sm">
      <h2 className="px-5 py-4 font-heading text-sm font-bold text-ink-900">Quick actions</h2>
      <ul className="divide-y divide-ink-100 border-t border-ink-100">
        {actions.map((a) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="group flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-pulse"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-mist text-blue-sovereign"
              >
                {a.icon}
              </span>
              <span className="flex-1">{a.label}</span>
              <span
                aria-hidden="true"
                className="text-ink-300 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

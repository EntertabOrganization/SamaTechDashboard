"use client";

import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import { CalendarIcon, ClockIcon, MailIcon } from "@/Components/dashboard/Layout/icons";
import { UsersIcon } from "@/Components/dashboard/content/icons";
import {
  MessageItem,
  PendingRequestItem,
  UpcomingItem,
} from "@/Components/dashboard/overview/OverviewItems";
import OverviewPanel from "@/Components/dashboard/overview/OverviewPanel";
import QuickActions from "@/Components/dashboard/overview/QuickActions";
import StatCard from "@/Components/dashboard/overview/StatCard";
import { useSessionUser } from "@/Components/dashboard/Layout/SessionShell";
import { canManage, listConsultations, listContactMessages, listUsers, type Paginated, type UserRole } from "@/lib/api";
import { consultationToday, dayAndMonth, formatSlot, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/useApi";

const ROWS = 3;

// Stands in for a list the signed-in role may not read, so nothing is requested for it.
const none = <T,>(): Promise<Paginated<T>> =>
  Promise.resolve({ data: [], meta: { total: 0, page: 1, limit: 0, totalPages: 0 } });

async function loadOverview(role: UserRole | undefined) {
  const booking = canManage(role, "booking");
  const contact = canManage(role, "contact");
  const [pending, newMessages, latestMessages, confirmed, users] = await Promise.all([
    booking ? listConsultations({ status: "PENDING", limit: ROWS }) : none<never>(),
    contact ? listContactMessages({ status: "NEW", limit: 1 }) : none<never>(),
    contact ? listContactMessages({ limit: ROWS }) : none<never>(),
    // The API sorts by when the booking was made, so take a wide page and pick the next dates here.
    booking ? listConsultations({ status: "CONFIRMED", limit: 100 }) : none<never>(),
    canManage(role, "users") ? listUsers({ limit: 1 }) : none<never>(),
  ]);

  const today = consultationToday();
  const upcoming = confirmed.data
    .filter((c) => c.date.slice(0, 10) >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, ROWS);

  return {
    pendingCount: pending.meta.total,
    pending: pending.data,
    newMessagesCount: newMessages.meta.total,
    latestMessages: latestMessages.data,
    confirmedCount: confirmed.meta.total,
    upcoming,
    usersCount: users.meta.total,
  };
}

export default function Page() {
  const role = useSessionUser()?.role;
  const { data } = useApi(() => loadOverview(role), `overview:${role}`);
  const booking = canManage(role, "booking");
  const contact = canManage(role, "contact");
  const admin = canManage(role, "users");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="What needs your attention on the website."
      />

      <section aria-label="Key numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {booking && (
          <StatCard
            highlight
            href="/consultations?status=PENDING"
            icon={<CalendarIcon />}
            label="Pending requests"
            value={data?.pendingCount ?? "—"}
            linkLabel="Review requests"
          />
        )}
        {contact && (
          <StatCard
            href="/messages?status=new"
            icon={<MailIcon />}
            label="New messages"
            value={data?.newMessagesCount ?? "—"}
            linkLabel="Open inbox"
          />
        )}
        {booking && (
          <StatCard
            href="/consultations?status=CONFIRMED"
            icon={<ClockIcon />}
            label="Confirmed consultations"
            value={data?.confirmedCount ?? "—"}
            linkLabel="See schedule"
          />
        )}
        {admin && (
          <StatCard
            href="/users"
            icon={<UsersIcon />}
            label="Active users"
            value={data?.usersCount ?? "—"}
            linkLabel="Manage users"
          />
        )}
      </section>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-4">
          {booking && (
            <OverviewPanel
              title="Pending consultation requests"
              href="/consultations?status=PENDING"
            >
              {data?.pending.map((request) => (
                <PendingRequestItem
                  key={request.id}
                  href="/consultations?status=PENDING"
                  organization={request.company || request.name}
                  requesterName={request.name}
                  slot={formatSlot(request.date, request.time)}
                />
              ))}
            </OverviewPanel>
          )}

          {contact && (
            <OverviewPanel title="Latest messages" href="/messages">
              {data?.latestMessages.map((message) => (
                <MessageItem
                  key={message.id}
                  href={`/messages/${message.id}`}
                  name={message.name}
                  preview={message.message}
                  receivedAt={timeAgo(message.createdAt)}
                  unread={message.status === "NEW"}
                />
              ))}
            </OverviewPanel>
          )}
        </div>

        <div className="min-w-0 space-y-4">
          {booking && (
            <OverviewPanel
              title="Upcoming consultations"
              href="/consultations?status=CONFIRMED"
            >
              {data?.upcoming.map((consultation) => (
                <UpcomingItem
                  key={consultation.id}
                  href="/consultations?status=CONFIRMED"
                  {...dayAndMonth(consultation.date)}
                  requesterName={consultation.name}
                  time={consultation.time}
                />
              ))}
            </OverviewPanel>
          )}

          <QuickActions role={role} />
        </div>
      </div>
    </div>
  );
}

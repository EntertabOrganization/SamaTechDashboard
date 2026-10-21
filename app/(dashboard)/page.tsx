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
// import { redirect } from "next/navigation";

export default function Page() {
  //  redirect("/dashboard/login");
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="What needs your attention on the website."
      />

      {/* TODO(backend): replace each "—" with the real number */}
      <section aria-label="Key numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          highlight
          href="/consultations?status=pending"
          icon={<CalendarIcon />}
          label="Pending requests"
          value="—"
          linkLabel="Review requests"
        />
        <StatCard
          href="/messages?status=new"
          icon={<MailIcon />}
          label="New messages"
          value="—"
          linkLabel="Open inbox"
        />
        <StatCard
          href="/consultations?status=confirmed"
          icon={<ClockIcon />}
          label="Confirmed consultations"
          value="—"
          linkLabel="See schedule"
        />
        <StatCard
          href="/dashboard/users"
          icon={<UsersIcon />}
          label="Active users"
          value="—"
          linkLabel="Manage users"
        />
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <OverviewPanel
            title="Pending consultation requests"
            href="/consultations?status=pending"
          >
            {/* TODO(backend): replace these placeholder rows with the latest pending requests */}
            <PendingRequestItem
              href="#"
              organization="Organization"
              requesterName="Requester name"
              slot="Requested slot"
            />
            <PendingRequestItem
              href="#"
              organization="Organization"
              requesterName="Requester name"
              slot="Requested slot"
            />
          </OverviewPanel>

          <OverviewPanel title="Latest messages" href="/dashboard/messages">
            {/* TODO(backend): replace these placeholder rows with the latest messages */}
            <MessageItem
              href="#"
              name="Sender name"
              preview="The first line of the message appears here."
              receivedAt="Received"
              unread
            />
            <MessageItem
              href="#"
              name="Sender name"
              preview="The first line of the message appears here."
              receivedAt="Received"
            />
          </OverviewPanel>
        </div>

        <div className="space-y-4">
          <OverviewPanel
            title="Upcoming consultations"
            href="/consultations?status=confirmed"
          >
            {/* TODO(backend): replace these placeholder rows with the next confirmed consultations */}
            <UpcomingItem href="#" day="--" month="---" requesterName="Requester name" time="--:--" />
            <UpcomingItem href="#" day="--" month="---" requesterName="Requester name" time="--:--" />
          </OverviewPanel>

          <QuickActions />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import MessageFilters from "@/Components/dashboard/Message/MessageFilters";
import MessageList from "@/Components/dashboard/Message/MessageList";
import MessagePagination from "@/Components/dashboard/Message/MessagePagination";
import MessageRow from "@/Components/dashboard/Message/MessageRow";
import { isMessageStatus, type MessageStatus } from "@/Components/dashboard/Message/StatusBadge";
import { listContactMessages, type ContactStatus } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/useApi";

const LIMIT = 20;

function Messages() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get("status")?.toLowerCase();
  const status: MessageStatus | undefined = isMessageStatus(rawStatus) ? rawStatus : undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data } = useApi(
    () => listContactMessages({ status: status?.toUpperCase() as ContactStatus | undefined, page, limit: LIMIT }),
    `${status}:${page}`,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description="Messages sent from the website contact form."
      />

      <MessageFilters activeStatus={status ?? "all"} />

      <MessageList>
        {data?.data.map((message) => (
          <MessageRow
            key={message.id}
            href={`/messages/${message.id}`}
            name={message.name}
            email={message.email}
            organization={message.organization ?? undefined}
            jobTitle={message.jobTitle ?? undefined}
            area={message.service ?? undefined}
            preview={message.message}
            receivedAt={timeAgo(message.createdAt)}
            status={message.status.toLowerCase() as MessageStatus}
          />
        ))}
      </MessageList>

      <MessagePagination page={page} totalPages={data?.meta.totalPages ?? 1} status={status ?? "all"} />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense>
      <Messages />
    </Suspense>
  );
}

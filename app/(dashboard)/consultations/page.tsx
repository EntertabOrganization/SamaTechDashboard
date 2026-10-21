"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import RequestCard from "@/Components/dashboard/consultations/RequestCard";
import Pagination from "@/Components/dashboard/shared/Pagination";
import StatusTabs from "@/Components/dashboard/shared/StatusTabs";
import {
  deleteConsultation,
  listConsultations,
  updateConsultation,
  type ConsultationStatus,
} from "@/lib/api";
import { formatSlot, timeAgo } from "@/lib/format";
import { useAction, useApi } from "@/lib/useApi";

const LIMIT = 20;
const STATUSES: ConsultationStatus[] = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

const isStatus = (value: string | null): value is ConsultationStatus =>
  STATUSES.includes(value as ConsultationStatus);

async function loadRequests(status: ConsultationStatus | undefined, page: number) {
  const [list, ...counts] = await Promise.all([
    listConsultations({ status, page, limit: LIMIT }),
    // One-row requests just to read each tab's total.
    listConsultations({ limit: 1 }),
    ...STATUSES.map((s) => listConsultations({ status: s, limit: 1 })),
  ]);
  return {
    list,
    counts: Object.fromEntries([["all", counts[0].meta.total], ...STATUSES.map((s, i) => [s, counts[i + 1].meta.total])]),
  };
}

function ConsultationRequests() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get("status")?.toUpperCase() ?? null;
  const status = isStatus(rawStatus) ? rawStatus : undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, reload } = useApi(() => loadRequests(status, page), `${status}:${page}`);
  const action = useAction(reload);

  const updateStatusAction = action((formData) =>
    updateConsultation(String(formData.get("id")), formData.get("status") as ConsultationStatus),
  );
  const deleteAction = action((formData) => deleteConsultation(String(formData.get("id"))));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title="Consultation requests"
        description="Bookings made from the website. Confirm, complete or cancel each one."
      />

      <StatusTabs
        label="Filter by status"
        active={status ?? "all"}
        tabs={[
          { id: "all", label: "All requests", count: data?.counts.all },
          { id: "PENDING", label: "Pending", count: data?.counts.PENDING },
          { id: "CONFIRMED", label: "Confirmed", count: data?.counts.CONFIRMED },
          { id: "COMPLETED", label: "Completed", count: data?.counts.COMPLETED },
          { id: "CANCELLED", label: "Cancelled", count: data?.counts.CANCELLED },
        ]}
      />

      <section
        aria-label="Consultation requests"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {data?.list.data.map((request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            requesterName={request.name}
            email={request.email}
            organization={request.company ?? undefined}
            topic={request.notes ?? undefined}
            slot={formatSlot(request.date, request.time)}
            receivedAt={timeAgo(request.createdAt)}
            status={request.status}
            updateStatusAction={updateStatusAction}
            deleteAction={deleteAction}
          />
        ))}
      </section>

      <Pagination
        page={page}
        totalPages={data?.list.meta.totalPages ?? 1}
        hrefFor={(p) => `?${new URLSearchParams({ ...(status ? { status } : {}), page: String(p) })}`}
      />
    </div>
  );
}

export default function ConsultationRequestsPage() {
  return (
    <Suspense>
      <ConsultationRequests />
    </Suspense>
  );
}

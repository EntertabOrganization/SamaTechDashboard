import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import RequestCard from "@/Components/dashboard/consultations/RequestCard";
import Pagination from "@/Components/dashboard/shared/Pagination";
import StatusTabs from "@/Components/dashboard/shared/StatusTabs";

export default function ConsultationRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title="Consultation requests"
        description="Bookings made from the website. Confirm, complete or cancel each one."
      />

      {/* TODO(backend): active from ?status=, and add count to each tab.
          The ids are the API's status values (GET /consultations?status=PENDING). */}
      <StatusTabs
        label="Filter by status"
        active="all"
        tabs={[
          { id: "all", label: "All requests" },
          { id: "PENDING", label: "Pending" },
          { id: "CONFIRMED", label: "Confirmed" },
          { id: "COMPLETED", label: "Completed" },
          { id: "CANCELLED", label: "Cancelled" },
        ]}
      />

      <section
        aria-label="Consultation requests"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {/* TODO(backend): replace these two placeholder cards with requests.map(...) */}
        <RequestCard
          requesterName="Requester name"
          email="name@organization.com"
          organization="Organization"
          topic="What the requester wants to discuss appears here, up to two lines, then it is cut."
          slot="Requested slot"
          receivedAt="Received"
          status="PENDING"
        />
        <RequestCard
          requesterName="Requester name"
          email="name@organization.com"
          organization="Organization"
          topic="What the requester wants to discuss appears here, up to two lines, then it is cut."
          slot="Requested slot"
          receivedAt="Received"
          status="CONFIRMED"
        />
      </section>

      {/* TODO(backend): page from ?page=, totalPages from the API (default limit is 20) */}
      <Pagination page={1} totalPages={1} hrefFor={(p) => `?page=${p}`} />
    </div>
  );
}

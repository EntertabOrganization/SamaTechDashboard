import StatusPill from "@/Components/dashboard/shared/StatusPill";
import { CheckIcon, CloseIcon } from "@/Components/dashboard/shared/icons";

/** Same values as the API: PENDING, CONFIRMED, CANCELLED, COMPLETED. */
export type RequestStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export default function RequestStatusPill({ status }: { status: RequestStatus }) {
  switch (status) {
    case "PENDING":
      return (
        <StatusPill tone="warning" dot>
          Pending
        </StatusPill>
      );
    case "CONFIRMED":
      return (
        <StatusPill tone="success" icon={<CheckIcon width={11} height={11} />}>
          Confirmed
        </StatusPill>
      );
    case "COMPLETED":
      return (
        <StatusPill tone="info" icon={<CheckIcon width={11} height={11} />}>
          Completed
        </StatusPill>
      );
    case "CANCELLED":
      return (
        <StatusPill tone="danger" icon={<CloseIcon width={11} height={11} />}>
          Cancelled
        </StatusPill>
      );
  }
}

import StatusTabs from "@/Components/dashboard/shared/StatusTabs";
import type { MessageStatus } from "./StatusBadge";

/** "all" is UI-only: it means "send no `status` param to the API". */
export type MessageFilter = "all" | MessageStatus;

const tabs: Array<{ id: MessageFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "read", label: "Read" },
  { id: "responded", label: "Responded" },
];

interface MessageFiltersProps {
  /** Which tab looks selected. The page decides it from `?status=` in the URL. */
  activeStatus?: MessageFilter;
  /** Optional chips on the tabs. The API has no counts endpoint, so leave out unless one is added. */
  counts?: Partial<Record<MessageFilter, number>>;
}

/**
 * Filtering is just `?status=NEW` in the URL (links), so there is no state
 * and no client JS. The page reads the param on the server and passes it to
 * `GET /contact?status=…`.
 *
 * The API has no search param, so there is no search box here.
 */
export default function MessageFilters({
  activeStatus = "all",
  counts,
}: MessageFiltersProps) {
  return (
    <StatusTabs
      label="Filter by status"
      active={activeStatus}
      tabs={tabs.map((t) => ({ ...t, count: counts?.[t.id] }))}
    />
  );
}

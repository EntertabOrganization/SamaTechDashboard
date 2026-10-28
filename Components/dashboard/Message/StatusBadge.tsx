/** Same values the API uses for `status` (GET /contact?status=…, PATCH /contact/{id}). */
export const MESSAGE_STATUSES = ["new",
  "read",
  "responded",] as const;

export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

/** Use on `searchParams.status` before sending it to the API. */
export const isMessageStatus = (value: unknown): value is MessageStatus =>
  typeof value === "string" &&
  (MESSAGE_STATUSES as readonly string[]).includes(value);

const styles: Record<MessageStatus, { label: string; box: string; dot?: string }> = {
  new: {
    label: "New",
    box: "border-blue-haze bg-blue-mist text-blue-sovereign",
    dot: "bg-blue-pulse",
  },
  read: {
    label: "Read",
    box: "border-ink-100 bg-white text-ink-500",
  },
  responded: {
    label: "Responded",
    box: "border-[#BFE5CF] bg-[#E6F6EE] text-[#1B7F4B]",
  },
};

export default function StatusBadge({ status }: { status: MessageStatus }) {
  const s = styles[status];
console.log("Message status:", status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none ${s.box}`}
    >
      {s.dot && (
        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      )}
      {s.label}
    </span>
  );
}

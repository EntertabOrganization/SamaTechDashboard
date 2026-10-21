import { CalendarIcon, ClockIcon } from "@/Components/dashboard/Layout/icons";
import ActionButton from "@/Components/dashboard/shared/ActionButton";
import Avatar from "@/Components/dashboard/shared/Avatar";
import ConfirmDialog from "@/Components/dashboard/shared/ConfirmDialog";
import DetailsDialog from "@/Components/dashboard/shared/DetailsDialog";
import InfoTile from "@/Components/dashboard/shared/InfoTile";
import { CheckIcon, InfoIcon, TrashIcon } from "@/Components/dashboard/shared/icons";
import RequestStatusPill, { type RequestStatus } from "./RequestStatus";

type ServerAction = (formData: FormData) => void | Promise<void>;

export interface RequestCardProps {
  /** Sent to the actions as the hidden field `id`. */
  id?: string;
  requesterName: string;
  email: string;
  organization?: string;
  topic?: string;
  slot: string;
  receivedAt: string;
  status: RequestStatus;
  updateStatusAction?: ServerAction;
  deleteAction?: ServerAction;
}

/** PATCH can only change the status. These are the moves the buttons offer. */
const nextStatus: Partial<
  Record<RequestStatus, { status: RequestStatus; label: string; canCancel: boolean }>
> = {
  PENDING: { status: "CONFIRMED", label: "Confirm", canCancel: true },
  CONFIRMED: { status: "COMPLETED", label: "Mark completed", canCancel: true },
};

function HiddenFields({ id, status }: { id?: string; status?: RequestStatus }) {
  return (
    <>
      {id && <input type="hidden" name="id" value={id} />}
      {status && <input type="hidden" name="status" value={status} />}
    </>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{label}</dt>
      <dd className="mt-1 text-sm text-ink-900">{children}</dd>
    </div>
  );
}

export default function RequestCard({
  id,
  requesterName,
  email,
  organization,
  topic,
  slot,
  receivedAt,
  status,
  updateStatusAction,
  deleteAction,
}: RequestCardProps) {
  const move = nextStatus[status];

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white p-4 shadow-sm">
      {/* Header: organization + status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name={organization ?? requesterName} size="sm" shape="square" />
          <p
            className={`truncate text-sm font-semibold ${organization ? "text-ink-900" : "text-ink-500"}`}
          >
            {organization ?? "No organization"}
          </p>
        </div>
        <RequestStatusPill status={status} />
      </div>

      {/* Slot + received */}
      <div className="grid grid-cols-2 gap-2">
        <InfoTile
          icon={<CalendarIcon width={14} height={14} />}
          label="Requested slot"
          value={slot}
        />
        <InfoTile
          icon={<ClockIcon width={14} height={14} />}
          label="Received"
          value={receivedAt}
        />
      </div>

      {/* Requester + topic */}
      <div className="min-w-0">
        <h3 className="font-heading text-base font-bold text-ink-900">{requesterName}</h3>
        <p className="truncate text-xs text-ink-500">{email}</p>
        {topic && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-500">{topic}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <div className="grid auto-cols-fr grid-flow-col gap-2">
          {/* No "get one" endpoint exists, so details open in a dialog from the data on the page. */}
          <DetailsDialog
            triggerLabel="View details"
            triggerIcon={<InfoIcon />}
            title="Consultation request"
          >
            <dl className="space-y-4">
              <DetailRow label="Status">
                <RequestStatusPill status={status} />
              </DetailRow>
              <DetailRow label="Requester">{requesterName}</DetailRow>
              <DetailRow label="Email">
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-blue-sovereign hover:text-blue-pulse"
                >
                  {email}
                </a>
              </DetailRow>
              {organization && <DetailRow label="Organization">{organization}</DetailRow>}
              <DetailRow label="Requested slot">{slot}</DetailRow>
              <DetailRow label="Received">{receivedAt}</DetailRow>
              {topic && (
                <DetailRow label="What they want to discuss">
                  <span className="whitespace-pre-wrap leading-relaxed">{topic}</span>
                </DetailRow>
              )}
            </dl>
          </DetailsDialog>

          {move && (
            <form action={updateStatusAction} className="contents">
              <HiddenFields id={id} status={move.status} />
              <ActionButton type="submit" variant="dark" icon={<CheckIcon />} className="w-full">
                {move.label}
              </ActionButton>
            </form>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 pt-3">
          <div>
            {move?.canCancel && (
              <ConfirmDialog
                triggerLabel="Cancel request"
                triggerStyle="ghost"
                title={`Cancel ${requesterName}'s request?`}
                description="The request is marked as cancelled. It stays in the list until you delete it."
                confirmLabel="Cancel request"
                dismissLabel="Keep request"
                tone="danger"
                action={updateStatusAction}
              >
                <HiddenFields id={id} status="CANCELLED" />
              </ConfirmDialog>
            )}
          </div>
          <ConfirmDialog
            triggerLabel={`Delete ${requesterName}'s request`}
            triggerIcon={<TrashIcon />}
            triggerStyle="icon-danger"
            title="Delete this request?"
            description="This permanently removes the booking and can't be undone."
            confirmLabel="Delete"
            tone="danger"
            action={deleteAction}
          >
            <HiddenFields id={id} />
          </ConfirmDialog>
        </div>
      </div>
    </article>
  );
}

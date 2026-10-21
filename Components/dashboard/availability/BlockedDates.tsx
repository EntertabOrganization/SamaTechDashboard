import type { ReactNode } from "react";
import ActionButton from "@/Components/dashboard/shared/ActionButton";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";
import { CloseIcon } from "@/Components/dashboard/shared/icons";

/** One blocked date. The backend renders these as children of <BlockedDates>. */
export function BlockedDateChip({
  label,
  removeAction,
}: {
  label: string;
  removeAction?: ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white py-1.5 pl-3.5 pr-2 text-xs font-medium text-ink-900">
      {label}
      {removeAction ?? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className="flex h-5 w-5 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-[#EEF3FA] hover:text-ink-900"
        >
          <CloseIcon width={10} height={10} />
        </button>
      )}
    </li>
  );
}

export default function BlockedDates({ children }: { children?: ReactNode }) {
  return (
    <SettingsCard
      title="Blocked dates"
      description="Days when nobody can book, such as holidays."
    >
      <div className="space-y-4 px-5 pb-5 pt-4">
        <div className="flex gap-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Date to block</span>
            <input
              type="date"
              name="blockedDate"
              className="h-10 w-full rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:border-blue-pulse focus:outline-none focus:ring-2 focus:ring-blue-pulse/20"
            />
          </label>
          <ActionButton variant="light" className="shrink-0">
            Block date
          </ActionButton>
        </div>

        {children ? (
          <ul className="flex flex-wrap gap-2">{children}</ul>
        ) : (
          <p className="rounded-xl bg-[#EEF3FA] px-3 py-3 text-center text-xs text-ink-500">
            No blocked dates.
          </p>
        )}
      </div>
    </SettingsCard>
  );
}

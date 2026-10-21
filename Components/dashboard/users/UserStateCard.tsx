import InfoTile from "@/Components/dashboard/shared/InfoTile";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";
import { ClockIcon, CalendarIcon } from "@/Components/dashboard/Layout/icons";
import { StatusToggle } from "./UserActions";
// import UserStatusPill from "./UserStatus";

interface UserStatusCardProps {
  userId?: string;
  userName: string;
  status: "active" | "deactivated";
  isSelf?: boolean;
  /** Server action, provided by the backend. */
  action?: (formData: FormData) => void | Promise<void>;
}

/** Edit screen: the account's status and the activate / deactivate control. */
export default function UserStatusCard({
  userId,
  userName,
  status,
  isSelf,
  action,
}: UserStatusCardProps) {
  return (
    <SettingsCard title="Account status" description="Control whether this person can sign in.">
      <div className="space-y-4 px-5 pb-5 pt-4">
        <div className="flex items-center gap-3">
          {/* <UserStatusPill status={status} /> */}
          <p className="text-xs text-ink-500">
            {status === "active"
              ? "Can sign in to the dashboard."
              : "Cannot sign in to the dashboard."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InfoTile icon={<CalendarIcon width={14} height={14} />} label="Created" value="—" />
          <InfoTile icon={<ClockIcon width={14} height={14} />} label="Last active" value="—" />
        </div>

        <StatusToggle
          appearance="button"
          userId={userId}
          userName={userName}
          status={status}
          isSelf={isSelf}
          action={action}
        />
        {isSelf && status === "active" && (
          <p className="text-[11px] text-ink-500">You can &apos; t deactivate your own account.</p>
        )}
      </div>
    </SettingsCard>
  );
}

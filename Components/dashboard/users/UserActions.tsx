import ConfirmDialog from "@/Components/dashboard/shared/ConfirmDialog";
import { BanIcon, CheckIcon, TrashIcon } from "@/Components/dashboard/shared/icons";

type Appearance = "icon" | "button";

interface BaseProps {
  /** Sent to the action as a hidden `userId`. */
  userId?: string;
  userName: string;
  /** icon = small round button (list rows), button = labelled button (edit screen). */
  appearance?: Appearance;
  /** Server action, provided by the backend. */
  action?: (formData: FormData) => void | Promise<void>;
  /** The signed-in user. Nobody can deactivate or delete their own account here. */
  isSelf?: boolean;
}

/** Deactivate an active user, or activate a deactivated one. Both ask first. */
export function StatusToggle({
  userId,
  userName,
  status,
  appearance = "icon",
  action,
  isSelf,
}: BaseProps & { status: "active" | "deactivated" }) {
  const activate = status === "deactivated";
  const label = activate ? "Activate" : "Deactivate";
  const icon = activate ? <CheckIcon /> : <BanIcon />;

  return (
    <ConfirmDialog
      triggerLabel={appearance === "icon" ? `${label} ${userName}` : `${label} user`}
      triggerIcon={icon}
      triggerStyle={appearance === "icon" ? "icon" : "light"}
      disabled={!activate && isSelf}
      disabledReason="You can't deactivate your own account."
      title={`${label} ${userName}?`}
      description={
        activate
          ? "They will be able to sign in to the dashboard again."
          : "They will no longer be able to sign in. You can activate the account again at any time."
      }
      confirmLabel={label}
      action={action}
    >
      {userId && <input type="hidden" name="userId" value={userId} />}
    </ConfirmDialog>
  );
}

/** Delete a user. Only authorized users can, and it always asks first. */
export function DeleteUser({
  userId,
  userName,
  appearance = "icon",
  action,
  isSelf,
  canDelete = true,
}: BaseProps & {
  /** False when the signed-in user is not allowed to delete accounts. */
  canDelete?: boolean;
}) {
  const reason = isSelf
    ? "You can't delete your own account."
    : "Only authorized users can delete accounts.";

  return (
    <ConfirmDialog
      triggerLabel={appearance === "icon" ? `Delete ${userName}` : "Delete user"}
      triggerIcon={<TrashIcon />}
      triggerStyle={appearance === "icon" ? "icon-danger" : "danger"}
      disabled={!canDelete || isSelf}
      disabledReason={reason}
      title={`Delete ${userName}?`}
      description="This permanently removes the account and can't be undone. To keep the account but block access, deactivate it instead."
      confirmLabel="Delete user"
      tone="danger"
      action={action}
    >
      {userId && <input type="hidden" name="userId" value={userId} />}
    </ConfirmDialog>
  );
}

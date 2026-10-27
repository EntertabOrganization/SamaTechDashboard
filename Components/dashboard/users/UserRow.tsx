import { Field, TextInput } from "@/Components/dashboard/shared/fields";
import FormDialog from "@/Components/dashboard/shared/FormDialog";
import type { UserRole } from "@/lib/api";
import { DeleteUser } from "./UserActions";
import { userGrid } from "./UserList";
import RoleField, { RolePill } from "./RoleField";

type ServerAction = (formData: FormData) => void | Promise<void>;

export interface UserRowProps {
  id: string;
  /** The saved name, or null; the row shows the email when there is none. */
  name: string | null;
  email: string;
  role: UserRole;
  /** Already formatted, e.g. "12 Mar 2026". */
  createdAt?: string;
  /** The signed-in user: they can't delete themselves or drop their own admin role. */
  isSelf?: boolean;
  /** PATCH /users/{id}; gets the form fields and a hidden `id`. */
  editAction?: ServerAction;
  /** DELETE /users/{id}; gets a hidden `userId`. */
  deleteAction?: ServerAction;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function UserRow({ id, name, email, role, createdAt, isSelf, editAction, deleteAction }: UserRowProps) {
  const displayName = name || email;

  return (
    <li className={`grid gap-2 px-5 py-4 md:items-center md:gap-4 ${userGrid}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3ECF9] text-xs font-bold text-blue-sovereign"
        >
          {initials(displayName)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">
            {displayName}
            {isSelf && <span className="ml-1.5 text-xs font-medium text-ink-500">(you)</span>}
          </p>
          <p className="truncate text-xs text-ink-500">{email}</p>
        </div>
      </div>

      <div className="pl-13 md:pl-0">
        <RolePill role={role} />
      </div>

      <span className="pl-13 text-xs font-medium text-ink-500 md:pl-0">{createdAt ?? "—"}</span>

      <div className="flex items-center gap-1 pl-13 md:justify-end md:pl-0">
        {editAction && (
          <FormDialog
            triggerLabel={`Edit ${displayName}`}
            triggerStyle="icon"
            title={`Edit ${displayName}`}
            description="Leave the password empty to keep the current one."
            action={editAction}
          >
            <input type="hidden" name="id" value={id} />
            <Field label="Name">
              <TextInput name="name" defaultValue={name ?? ""} autoComplete="off" placeholder="Full name" />
            </Field>
            <Field label="Email">
              <TextInput name="email" type="email" required defaultValue={email} autoComplete="off" />
            </Field>
            <Field label="New password" hint="At least 8 characters. Leave empty to keep it.">
              <TextInput name="password" type="password" minLength={8} autoComplete="new-password" />
            </Field>
            {isSelf ? (
              // An admin can't drop their own admin role, so the field is fixed.
              <input type="hidden" name="role" value={role} />
            ) : (
              <RoleField defaultValue={role} />
            )}
          </FormDialog>
        )}
        <DeleteUser userId={id} userName={displayName} isSelf={isSelf} action={deleteAction} />
      </div>
    </li>
  );
}

import { Field, SelectInput } from "@/Components/dashboard/shared/fields";
import StatusPill, { type PillTone } from "@/Components/dashboard/shared/StatusPill";
import { USER_ROLES, type UserRole } from "@/lib/api";

const tones: Record<UserRole, PillTone> = { ADMIN: "info", MESSAGES: "success", BOOKING: "warning" };

export function RolePill({ role }: { role: UserRole }) {
  return <StatusPill tone={tones[role]}>{USER_ROLES.find((r) => r.value === role)?.label ?? role}</StatusPill>;
}

/** The `role` select used when adding and editing a user. */
export default function RoleField({ defaultValue }: { defaultValue?: UserRole }) {
  return (
    <Field label="Role">
      <SelectInput name="role" required defaultValue={defaultValue ?? ""}>
        <option value="" disabled>
          Choose a role
        </option>
        {USER_ROLES.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label} — {role.description}
          </option>
        ))}
      </SelectInput>
    </Field>
  );
}

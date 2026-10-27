import ActionButton from "@/Components/dashboard/shared/ActionButton";
import { Field, TextInput } from "@/Components/dashboard/shared/fields";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";
import RoleField from "./RoleField";

/** Gives another person dashboard access (POST /api/users). */
export default function AddUserCard({ action }: { action: (formData: FormData) => void | Promise<void> }) {
  return (
    <SettingsCard title="Add a user" description="They sign in with this email and password, and see only what their role allows.">
      <form action={action} className="space-y-3 px-5 pb-5 pt-4">
        <Field label="Name">
          <TextInput name="name" autoComplete="off" placeholder="Full name" />
        </Field>
        <Field label="Email">
          <TextInput name="email" type="email" required autoComplete="off" placeholder="name@organization.com" />
        </Field>
        <Field label="Password" hint="At least 8 characters.">
          <TextInput name="password" type="password" required minLength={8} autoComplete="new-password" />
        </Field>
        <RoleField />
        <ActionButton type="submit" variant="dark" className="w-full">
          Add user
        </ActionButton>
      </form>
    </SettingsCard>
  );
}

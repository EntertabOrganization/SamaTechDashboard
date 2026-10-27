"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import { useSessionUser } from "@/Components/dashboard/Layout/SessionShell";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";
import AddUserCard from "@/Components/dashboard/users/AddUserCard";
import Pagination from "@/Components/dashboard/users/Pagination";
import { RolePill } from "@/Components/dashboard/users/RoleField";
import UserList from "@/Components/dashboard/users/UserList";
import UserRow from "@/Components/dashboard/users/UserRow";
import { USER_ROLES, createUser, deleteUser, listUsers, updateUser, type UserRole } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useAction, useApi } from "@/lib/useApi";

const LIMIT = 20;

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UsersContent />
    </Suspense>
  );
}

function UsersContent() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const me = useSessionUser();

  const { data, reload } = useApi(() => listUsers({ page, limit: LIMIT }), String(page));
  const act = useAction(reload);
  const addUser = act((form) =>
    createUser({
      email: String(form.get("email")),
      password: String(form.get("password")),
      name: String(form.get("name") || "") || undefined,
      role: form.get("role") as UserRole,
    }),
  );
  const editUser = act((form) =>
    updateUser(String(form.get("id")), {
      email: String(form.get("email")),
      // An empty name clears it; an empty password keeps the current one.
      name: String(form.get("name") ?? ""),
      password: String(form.get("password") || "") || undefined,
      role: form.get("role") as UserRole,
    }),
  );
  const removeUser = act((form) => deleteUser(String(form.get("userId"))));
  const totalPages = data?.meta.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Users"
        description="People who can sign in to this dashboard, and what each one can manage."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <UserList>
            {data?.data.map((user) => (
              <UserRow
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
                createdAt={formatDate(user.createdAt)}
                isSelf={user.id === me?.id}
                editAction={editUser}
                deleteAction={removeUser}
              />
            ))}
          </UserList>

          <Pagination page={page} totalPages={totalPages} />
        </div>

        <div className="space-y-4">
          <AddUserCard action={addUser} />

          <SettingsCard title="Roles" description="What each role can open and change.">
            <ul className="space-y-3 px-5 pb-5 pt-4">
              {USER_ROLES.map((role) => (
                <li key={role.value} className="flex items-center justify-between gap-3">
                  <RolePill role={role.value} />
                  <span className="text-right text-xs text-ink-500">{role.description}</span>
                </li>
              ))}
            </ul>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import { useSessionUser } from "@/Components/dashboard/Layout/SessionShell";
import AddUserCard from "@/Components/dashboard/users/AddUserCard";
import Pagination from "@/Components/dashboard/users/Pagination";
import UserList from "@/Components/dashboard/users/UserList";
import UserRow from "@/Components/dashboard/users/UserRow";
import UserStatusCard from "@/Components/dashboard/users/UserStateCard";
import { createUser, listUsers } from "@/lib/api";
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
    }),
  );
  const totalPages = data?.meta.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Users"
        description="People who can sign in to this dashboard."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <UserList>
            {data?.data.map((user) => (
              <UserRow
                key={user.id}
                name={user.name || user.email}
                email={user.email}
                createdAt={formatDate(user.createdAt)}
              />
            ))}
          </UserList>

          <Pagination page={page} totalPages={totalPages} />
        </div>

        <div className="space-y-4">
          <AddUserCard action={addUser} />

          {/* The API has no per-user status, so the card shows the signed-in account. */}
          <UserStatusCard
            userId={me?.id}
            userName={me?.name || me?.email || ""}
            status="active"
            isSelf
          />
        </div>
      </div>
    </div>
  );
}

import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import Pagination from "@/Components/dashboard/users/Pagination";
// import UserStateCard from "@/Components/dashboard/users/UserStateCard";
import UserList from "@/Components/dashboard/users/UserList";
import UserRow from "@/Components/dashboard/users/UserRow";
import UserStatusCard from "@/Components/dashboard/users/UserStateCard";

import { Suspense } from "react";

type UsersPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default function UsersPage(props: UsersPageProps) {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UsersContent {...props} />
    </Suspense>
  );
}

async function UsersContent({
  searchParams,
}: UsersPageProps) {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number(rawPage) || 1);

  // TODO(backend): GET /users?page=${page}&limit=20
  // then totalPages = Math.ceil(total / limit)
  const totalPages = 1;

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
            {/* TODO(backend): replace these two placeholder rows with users.map(...) */}
            <UserRow
              name="User name"
              email="name@organization.com"
              createdAt="Added on"
            />
            <UserRow name="User name" email="name@organization.com" />
          </UserList>

          <Pagination page={page} totalPages={totalPages} />
        </div>

        <UserStatusCard
          userId="{user.id}"
          userName="{user.name}"
          status="active"
        />
      </div>
    </div>
  );
}

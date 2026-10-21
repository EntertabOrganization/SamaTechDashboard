import { userGrid } from "./UserList";

export interface UserRowProps {
  name: string;
  email: string;
  /** Already formatted, e.g. "12 Mar 2026". Leave out if the API does not return it. */
  createdAt?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Not a link: the API only has list + create for users
 * (no GET/PATCH/DELETE /users/{id}), so there is no page to open.
 */
export default function UserRow({ name, email, createdAt }: UserRowProps) {
  return (
    <li className={`grid gap-1 px-5 py-4 md:items-center md:gap-4 ${userGrid}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3ECF9] text-xs font-bold text-blue-sovereign"
        >
          {initials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">{name}</p>
          <p className="truncate text-xs text-ink-500">{email}</p>
        </div>
      </div>

      <span className="pl-13 text-xs font-medium text-ink-500 md:pl-0">
        {createdAt ?? "—"}
      </span>
    </li>
  );
}

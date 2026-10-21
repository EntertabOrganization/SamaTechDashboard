import type { ReactNode } from "react";
import DataList from "@/Components/dashboard/shared/DataList";

/** Shared by the heading row and every UserRow, so the columns line up. */
export const userGrid = "md:grid-cols-[2fr_8rem]";

export default function UserList({ children }: { children: ReactNode }) {
  return (
    <DataList
      label="Users"
      gridClass={userGrid}
      headings={[{ text: "User" }, { text: "Added" }]}
    >
      {children}
    </DataList>
  );
}

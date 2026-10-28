export type CmsIconKey =
  | "dashboard"
  | "content"
  | "consultations"
  | "availability"
  | "messages"
  | "users";

export interface CmsNavItem {
  label: string;
  href: string;
  icon: CmsIconKey;
  /** Hidden unless the signed-in role may manage this area (see `canManage`). */
  area?: "users" | "messages" | "booking";
}

export interface CmsNavGroup {
  label: string;
  items: CmsNavItem[];
}

/** One entry per page in the "02 — CMS Dashboard" task list. */
export const cmsNav: CmsNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/", icon: "dashboard" }],
  },
  {
    label: "Inbox",
    items: [
      { label: "Consultation requests", href: "/consultations", icon: "consultations", area: "booking" },
      { label: "Contact messages", href: "/messages", icon: "messages", area: "messages" },
    ],
  },
  {
    label: "Website",
    items: [{ label: "Content", href: "/content", icon: "content", area: "users" }],
  },
  {
    label: "Settings",
    items: [
      { label: "Availability", href: "/availability", icon: "availability", area: "booking" },
      { label: "Users", href: "/users", icon: "users", area: "users" },
    ],
  },
];

import Link from "next/link";

export type ContentTabId = "pages" | "home" | "services" | "about" | "seo" | "settings";

const tabs: Array<{ id: ContentTabId; label: string; href: string }> = [
  { id: "pages", label: "Pages", href: "/content" },
  { id: "home", label: "Homepage", href: "/content/home" },
  { id: "services", label: "Services", href: "/content/services" },
  { id: "about", label: "About", href: "/content/about" },
  { id: "seo", label: "SEO", href: "/content/seo" },
  { id: "settings", label: "Site settings", href: "/content/settings" },
];

/** Links between the content screens. Each page says which one is active. */
export default function ContentTabs({ active }: { active: ContentTabId }) {
  return (
    <nav aria-label="Content sections" className="overflow-x-auto border-b border-ink-100">
      <ul className="flex gap-6">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                aria-current={selected ? "page" : undefined}
                className={`-mb-px block whitespace-nowrap border-b-2 pb-3 pt-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse ${
                  selected
                    ? "border-blue-pulse text-ink-900"
                    : "border-transparent text-ink-500 hover:text-ink-900"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

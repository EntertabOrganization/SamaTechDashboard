import Link from "next/link";

export interface StatusTab {
  id: string;
  label: string;
  /** Shown in a small chip. Leave it out until the backend provides counts. */
  count?: number;
}

interface StatusTabsProps {
  tabs: StatusTab[];
  /** id of the selected tab. */
  active: string;
  /** Accessible name of the navigation. */
  label: string;
  /** URL param the tabs write to. The first tab is "all" and clears it. */
  param?: string;
  className?: string;
}

/** Filter pills that are plain links (`?status=pending`): no state, no client JS. */
export default function StatusTabs({
  tabs,
  active,
  label,
  param = "status",
  className,
}: StatusTabsProps) {
  return (
    <nav aria-label={label} className={`max-w-full overflow-x-auto ${className ?? ""}`}>
      <ul className="inline-flex gap-1.5">
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <li key={tab.id}>
              <Link
                href={i === 0 ? "?" : `?${param}=${tab.id}`}
                aria-current={selected ? "true" : undefined}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse ${
                  selected
                    ? "bg-ink-900 text-white"
                    : "border border-ink-100 bg-white text-ink-500 hover:text-ink-900"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                      selected ? "bg-white/15 text-white" : "bg-ink-50 text-ink-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

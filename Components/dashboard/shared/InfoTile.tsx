import type { ReactNode } from "react";

interface InfoTileProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  className?: string;
}

/** Small tinted tile: icon + label + value. */
export default function InfoTile({ icon, label, value, className }: InfoTileProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl bg-[#EEF3FA] px-3 py-2.5 ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-ink-500"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-ink-500">{label}</p>
        <p className="truncate text-xs font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}

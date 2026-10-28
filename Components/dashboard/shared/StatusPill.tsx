import type { ReactNode } from "react";

export type PillTone = "info" | "neutral" | "success" | "warning" | "danger";

const tones: Record<PillTone, string> = {
  info: "border-blue-haze bg-blue-mist text-blue-sovereign",
  neutral: "border-ink-100 bg-white text-ink-500",
  success: "border-[#BFE5CF] bg-[#E6F6EE] text-[#1B7F4B]",
  warning: "border-[#F5D9A6] bg-[#FFF4E0] text-[#A15C00]",
  danger: "border-[#F5C2C0] bg-[#FDECEC] text-[#B42318]",
};

interface StatusPillProps {
  tone: PillTone;
  /** Small filled dot before the text. */
  dot?: boolean;
  /** Icon before the text (use a ~11px icon). Wins over `dot`. */
  icon?: ReactNode;
  children: ReactNode;
}

/** The one pill every dashboard status uses (messages, requests, users). */
export default function StatusPill({ tone, dot, icon, children }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none ${tones[tone]}`}
    >
      {icon ??
        (dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />)}
      {children}
    </span>
  );
}

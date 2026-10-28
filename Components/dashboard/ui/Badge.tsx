import { Trans } from "@/lib/i18n/LanguageProvider";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/**
 * Functional tones (success / warning / danger) carry real status only,
 * never decoration. Use brand / neutral / gold / teal for everything else.
 */
export type BadgeTone =
  | "brand"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "gold"
  | "teal"
  | "inverse";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Leading icon (use a 12px icon). */
  icon?: ReactNode;
  /** Status dot. On by default for success / warning / danger. */
  dot?: boolean;
}

const tones: Record<BadgeTone, { box: string; dot: string }> = {
  brand: { box: "border-blue-haze bg-blue-mist text-blue-sovereign", dot: "bg-blue-pulse" },
  neutral: { box: "border-ink-100 bg-white text-ink-500", dot: "bg-ink-300" },
  success: { box: "border-[#BFE5CF] bg-[#E6F6EE] text-[#1B7F4B]", dot: "bg-[#1B9A5B]" },
  warning: { box: "border-[#F5D9A6] bg-[#FFF4E0] text-[#A15C00]", dot: "bg-[#E08A00]" },
  danger: { box: "border-[#F5C2C0] bg-[#FDECEC] text-[#B42318]", dot: "bg-[#E5484D]" },
  gold: { box: "border-[#EBD39A] bg-[#FBF1D9] text-[#8A6A12]", dot: "bg-[#C9A227]" },
  teal: { box: "border-[#B3E3E0] bg-[#E0F5F4] text-[#0F766E]", dot: "bg-[#14A59A]" },
  inverse: { box: "border-white/20 bg-white/10 text-ink-100", dot: "bg-ink-200" },
};

const statusTones: BadgeTone[] = ["success", "warning", "danger"];

export function Badge({
  tone = "brand",
  icon,
  dot,
  className,
  children,
  ...rest
}: BadgeProps) {
  const showDot = dot ?? statusTones.includes(tone);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none [&_svg]:h-3 [&_svg]:w-3",
        tones[tone].box,
        className,
      )}
      {...rest}
    >
      {showDot && (
        <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", tones[tone].dot)} />
      )}
      <Trans>{icon}</Trans>
      <Trans>{children}</Trans>
    </span>
  );
}

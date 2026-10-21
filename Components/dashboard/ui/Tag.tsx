"use client";

import { Trans, useLanguage } from "@/lib/i18n/LanguageProvider";
import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
// import { Close } from "./Icons";

export interface TagProps {
  children: ReactNode;
  /** Filled dark state. */
  selected?: boolean;
  /** Makes the label a toggle button (aria-pressed follows `selected`). */
  onClick?: () => void;
  /** Shows a × button that calls this handler. */
  onRemove?: () => void;
  /** Accessible name for the × button. Defaults to "Remove <label>". */
  removeLabel?: string;
  className?: string;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0078FF] focus-visible:ring-offset-2";

export function Tag({
  children,
  selected = false,
  onClick,
  onRemove,
  removeLabel,
  className,
}: TagProps) {
  const { t: translateText } = useLanguage();

  const labelClasses = "rounded-full";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        selected
          ? "border-[#121A23] bg-[#121A23] text-white"
          : "border-[#DCE4EE] bg-white text-slate-700",
        onClick && !selected && "hover:border-[#C9D8EE] hover:bg-slate-50",
        className,
      )}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-pressed={selected}
          className={cn(labelClasses, focusRing)}
        >
          <Trans>{children}</Trans>
        </button>
      ) : (
        <span><Trans>{children}</Trans></span>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={translateText(removeLabel ?? (typeof children === "string" ? `Remove ${children}` : "Remove"))}
          className={cn(
            "-me-1 flex h-4 w-4 items-center justify-center rounded-full transition-colors [&_svg]:h-2.5 [&_svg]:w-2.5",
            selected ? "hover:bg-white/20" : "hover:bg-slate-100",
            focusRing,
          )}
        >
          {/* <Close /> */}
        </button>
      )}
    </span>
  );
}

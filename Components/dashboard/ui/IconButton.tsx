"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { Spinner } from "./Icons";

export type IconButtonVariant = "solid" | "outline" | "ghost" | "inverse";
export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonShape = "round" | "square";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Required: icon-only buttons need an accessible name. */
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  loading?: boolean;
}

const base =
  "inline-flex shrink-0 items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<IconButtonVariant, string> = {
  solid:
    "border-transparent bg-[#0078FF] text-white hover:bg-[#005BC2] focus-visible:ring-[#0078FF]",
  outline:
    "border-[#DCE4EE] bg-white text-[#0F1B2D] hover:border-[#C9D8EE] hover:bg-slate-50 focus-visible:ring-[#0078FF]",
  ghost:
    "border-transparent bg-transparent text-slate-500 hover:bg-slate-100 hover:text-[#0F1B2D] focus-visible:ring-[#0078FF]",
  // For dark surfaces
  inverse:
    "border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/70 focus-visible:ring-offset-[#121A23]",
};

const sizes: Record<IconButtonSize, string> = {
  sm: "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5",
};

const shapes: Record<IconButtonShape, string> = {
  round: "rounded-full",
  square: "rounded-xl",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = "outline",
      size = "md",
      shape = "round",
      loading = false,
      disabled,
      className,
      type = "button",
      ...rest
    },
    ref,
  ) {
    const { t: translateText } = useLanguage();

    return (
      <button
        ref={ref}
        type={type}
        aria-label={translateText(label)}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], shapes[shape], className)}
        {...rest}
      >
        {loading ? <Spinner /> : icon}
      </button>
    );
  },
);

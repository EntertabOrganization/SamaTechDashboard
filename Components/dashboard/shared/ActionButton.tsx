import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ActionVariant = "light" | "dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ActionVariant, string> = {
  light: "bg-ink-50 text-ink-900 hover:bg-blue-mist",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  ghost: "text-ink-500 hover:bg-ink-50 hover:text-ink-900",
};

/** Same look for <button> and <Link>: `<Link className={actionButtonClass("light")}>`. */
export function actionButtonClass(variant: ActionVariant = "light", extra?: string) {
  return [base, variants[variant], extra].filter(Boolean).join(" ");
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionVariant;
  icon?: ReactNode;
}

export default function ActionButton({
  variant = "light",
  icon,
  className,
  children,
  type = "button",
  ...rest
}: ActionButtonProps) {
  return (
    <button type={type} className={actionButtonClass(variant, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

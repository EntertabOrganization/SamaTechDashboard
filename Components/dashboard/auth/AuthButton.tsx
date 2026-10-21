import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "h-11 w-full rounded-lg text-sm font-semibold outline-none transition";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0e1824] text-white hover:bg-[#1a2536] focus-visible:ring-4 focus-visible:ring-blue-500/30 active:scale-[0.99]",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-blue-500/20",
};

/** Use this on a <Link> when you need a link that looks like a button. */
export function authButtonStyles(variant: Variant = "primary") {
  return `${base} ${variants[variant]}`;
}

type AuthButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
};

export function AuthButton({
  variant = "primary",
  type = "button",
  ...props
}: AuthButtonProps) {
  return <button type={type} className={authButtonStyles(variant)} {...props} />;
}

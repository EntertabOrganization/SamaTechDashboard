import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "h-11 w-full rounded-lg text-sm font-semibold outline-none transition";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-white hover:bg-ink-700 focus-visible:ring-4 focus-visible:ring-blue-pulse/30 active:scale-[0.99]",
  secondary:
    "border border-ink-100 bg-white text-ink-700 hover:bg-ink-50 focus-visible:ring-4 focus-visible:ring-blue-pulse/20",
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

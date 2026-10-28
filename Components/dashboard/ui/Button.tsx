import { Trans } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverse" | "fullWidth";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-blue-pulse text-white hover:bg-blue-sovereign",

  secondary:
    "bg-ink-900 text-white",

  outline:
    "border border-ink-200 text-ink-500 bg-white",

  ghost:
    "text-ink-700 hover:bg-ink-50",
  inverse:
    "border border-black-0 bg-white text-ink-900",
  fullWidth:
    "w-full border border-black-0 shadow-brand",
};

const sizes = {
  sm: `
    h-9
    px-4 //16
    text-sm
  `,

  md: `
    h-[46px]
    px-6 //24
    text-sm
  `,

  lg: `
    h-14
    px-8 //32
    gap-2
    text-base
  `,
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "rounded-full font-bold flex items-center justify-center transition-all duration-200",
        
        variants[variant],

        sizes[size],

        disabled && "opacity-45 cursor-not-allowed",

        className
      )}
      {...props}
    >
      <Trans>{children}</Trans>
    </button>
  );
}
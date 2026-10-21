import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type AuthFieldProps = Omit<ComponentProps<"input">, "className" | "id"> & {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Shown on the right side of the label row (e.g. "Forgot password?") */
  labelAddon?: ReactNode;
  /** Shown inside the input on the right (e.g. a show/hide button) */
  trailing?: ReactNode;
};

export function AuthField({
  id,
  label,
  icon: Icon,
  labelAddon,
  trailing,
  ...inputProps
}: AuthFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        {labelAddon}
      </div>

      <div className="relative">
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"
        />
        <input
          id={id}
          className={`h-11 w-full rounded-lg border border-slate-200 bg-[#f8fafc] pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            trailing ? "pr-11" : "pr-3.5"
          }`}
          {...inputProps}
        />
        {trailing}
      </div>
    </div>
  );
}

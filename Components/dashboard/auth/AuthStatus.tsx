import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Tone = "info" | "success";

const tones: Record<Tone, string> = {
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
};

type AuthStatusProps = {
  icon: LucideIcon;
  tone?: Tone;
  title: string;
  description: string;
  /** Action area under the text (buttons / links) */
  children?: ReactNode;
};

export function AuthStatus({
  icon: Icon,
  tone = "info",
  title,
  description,
  children,
}: AuthStatusProps) {
  return (
    <div aria-live="polite">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-[#0e1824]">
        {title}
      </h1>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

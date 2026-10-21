import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** White rounded card with a title block. Reusable for any settings-style panel. */
export default function SettingsCard({
  title,
  description,
  children,
  className,
}: SettingsCardProps) {
  return (
    <section
      className={`rounded-3xl border border-ink-100 bg-white shadow-sm ${className ?? ""}`}
    >
      <header className="px-5 pt-5">
        <h2 className="font-heading text-sm font-bold text-ink-900">{title}</h2>
        {description && <p className="mt-1 text-xs text-ink-500">{description}</p>}
      </header>
      {children}
    </section>
  );
}

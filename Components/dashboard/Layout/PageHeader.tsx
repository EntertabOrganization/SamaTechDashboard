import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Small blue label with the line, same as the website sections. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Buttons on the right, e.g. "Add user". */
  actions?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="flex items-center gap-3 font-body text-eyebrow font-bold uppercase tracking-eyebrow text-blue-sovereign">
            <span aria-hidden="true" className="h-px w-8 bg-blue-sovereign" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-bold font-heading tracking-tight text-ink-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-xl text-sm text-ink-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

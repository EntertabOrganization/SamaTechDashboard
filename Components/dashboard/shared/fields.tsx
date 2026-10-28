import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const control =
  "w-full rounded-xl border border-ink-100 bg-white text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-blue-pulse focus:outline-none focus:ring-2 focus:ring-blue-pulse/20 disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-500";

/** Label + control + optional hint. The control sits inside the <label>, so no ids are needed. */
export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-[11px] font-semibold text-ink-900">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-ink-500">{hint}</span>}
    </label>
  );
}

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${control} h-10 px-3 ${className ?? ""}`} {...rest} />;
}

export function TextArea({
  className,
  rows = 4,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={`${control} resize-y px-3 py-2.5 leading-relaxed ${className ?? ""}`}
      {...rest}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${control} h-10 px-3 ${className ?? ""}`} {...rest}>
      {children}
    </select>
  );
}

/** On/off switch. A hidden checkbox + CSS only, so it needs no JS. */
export function Toggle({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  const id = `${name}-toggle`;
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-blue-haze transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-blue-pulse peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-pulse peer-focus-visible:ring-offset-2"
      >
        <span className="sr-only">{label}</span>
      </label>
      <div>
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-500">{description}</p>}
      </div>
    </div>
  );
}

/** Current image (if any) + an upload button. The backend handles the file. */
export function ImageField({
  name,
  label,
  hint,
  currentSrc,
}: {
  name: string;
  label: string;
  hint?: string;
  /** URL of the image already saved, if there is one. */
  currentSrc?: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold text-ink-900">{label}</p>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-blue-haze bg-ink-50 text-ink-300">
          {currentSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="M21 16l-5-5-8 8" />
            </svg>
          )}
        </div>
        <div>
          <label className="inline-flex cursor-pointer items-center rounded-full bg-ink-50 px-4 py-2.5 text-xs font-semibold text-ink-900 transition-colors hover:bg-blue-mist has-focus-visible:ring-2 has-focus-visible:ring-blue-pulse has-focus-visible:ring-offset-2">
            {currentSrc ? "Replace image" : "Upload image"}
            <input type="file" name={name} accept="image/*" className="sr-only" />
          </label>
          {hint && <p className="mt-1.5 text-[11px] text-ink-500">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { actionButtonClass } from "./ActionButton";

interface RepeaterField {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
}

interface RepeaterProps {
  /**
   * Field name prefix. Each input is sent as `name[rowId][field]`,
   * or as `name[rowId]` when there is a single field.
   * The row ids are unique but not always consecutive.
   */
  name: string;
  /** Title of the whole group. */
  label: string;
  fields: RepeaterField[];
  /** Singular name of one row, e.g. "Question". */
  itemLabel: string;
  /** Empty rows shown at first. */
  initialRows?: number;
}

const control =
  "w-full rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-blue-pulse focus:outline-none focus:ring-2 focus:ring-blue-pulse/20";

/**
 * A list the editor can add rows to and remove rows from.
 * The only part of the content screens that needs client state.
 */
export default function Repeater({
  name,
  label,
  fields,
  itemLabel,
  initialRows = 1,
}: RepeaterProps) {
  const next = useRef(initialRows);
  const [rows, setRows] = useState<number[]>(() =>
    Array.from({ length: initialRows }, (_, i) => i),
  );
  const single = fields.length === 1;

  const add = () => {
    const id = next.current++;
    setRows((current) => [...current, id]);
  };
  const remove = (id: number) => setRows((current) => current.filter((r) => r !== id));

  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-[11px] font-semibold text-ink-900">{label}</legend>

      <ol className="space-y-3">
        {rows.map((id, index) => (
          <li key={id} className="rounded-2xl border border-ink-100 bg-[#FAFCFF] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                {itemLabel} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(id)}
                aria-label={`Remove ${itemLabel} ${index + 1}`}
                className="flex h-6 w-6 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-[#EEF3FA] hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-3 w-3"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-2.5">
              {fields.map((f) => {
                const fieldName = single ? `${name}[${id}]` : `${name}[${id}][${f.name}]`;
                return (
                  <label key={f.name} className="block">
                    <span
                      className={
                        single ? "sr-only" : "mb-1 block text-[10px] font-medium text-ink-500"
                      }
                    >
                      {f.label}
                    </span>
                    {f.type === "textarea" ? (
                      <textarea
                        name={fieldName}
                        rows={2}
                        placeholder={f.placeholder}
                        className={`${control} resize-y py-2.5 leading-relaxed`}
                      />
                    ) : (
                      <input
                        name={fieldName}
                        placeholder={f.placeholder ?? f.label}
                        className={`${control} h-10`}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <button type="button" onClick={add} className={actionButtonClass("light")}>
        + Add {itemLabel.toLowerCase()}
      </button>
    </fieldset>
  );
}

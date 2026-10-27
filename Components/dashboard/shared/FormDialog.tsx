"use client";

import { useId, useRef, type ReactNode } from "react";
import { actionButtonClass } from "./ActionButton";
import { EditIcon } from "./icons";

const iconTrigger =
  "flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-[#EEF3FA] hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse disabled:cursor-not-allowed disabled:opacity-40";

interface FormDialogProps {
  /** Button text. For the icon style it becomes the accessible name. */
  triggerLabel: string;
  triggerStyle?: "icon" | "light" | "dark";
  title: string;
  description?: ReactNode;
  submitLabel?: string;
  /** Called with the form's fields on submit; the dialog closes first. */
  action: (formData: FormData) => void | Promise<void>;
  /** The form fields. */
  children: ReactNode;
}

/**
 * A button that opens an edit form in a native <dialog>, the editable
 * counterpart of DetailsDialog. Escape and the backdrop close it.
 */
export default function FormDialog({
  triggerLabel,
  triggerStyle = "light",
  title,
  description,
  submitLabel = "Save changes",
  action,
  children,
}: FormDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId().replace(/:/g, "");
  const iconOnly = triggerStyle === "icon";

  return (
    <>
      <button
        type="button"
        title={iconOnly ? triggerLabel : undefined}
        aria-label={iconOnly ? triggerLabel : undefined}
        onClick={() => {
          // Start from the saved values every time it opens.
          formRef.current?.reset();
          ref.current?.showModal();
        }}
        className={iconOnly ? iconTrigger : actionButtonClass(triggerStyle, "w-full")}
      >
        <EditIcon />
        {!iconOnly && triggerLabel}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={`${uid}-title`}
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
        className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-0 text-left shadow-[0px_30px_80px_-20px_#0E182366] backdrop:bg-[#0E1823]/60 backdrop:backdrop-blur-[6px]"
      >
        <form ref={formRef} action={action} onSubmit={() => ref.current?.close()} className="p-6">
          <h2 id={`${uid}-title`} className="font-heading text-lg font-bold text-ink-900">
            {title}
          </h2>
          {description && <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>}

          <div className="mt-5 space-y-3">{children}</div>

          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={() => ref.current?.close()} className={actionButtonClass("light")}>
              Cancel
            </button>
            <button type="submit" className={actionButtonClass("dark")}>
              {submitLabel}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

"use client";

import { useId, useRef, type ReactNode } from "react";
import { actionButtonClass } from "./ActionButton";

type TriggerStyle = "icon" | "icon-danger" | "light" | "ghost" | "danger";

const iconBase =
  "flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse disabled:cursor-not-allowed disabled:opacity-40";

const triggerClasses: Record<TriggerStyle, string> = {
  icon: `${iconBase} hover:bg-ink-50 hover:text-ink-900`,
  "icon-danger": `${iconBase} hover:bg-[#FDECEC] hover:text-[#B42318]`,
  light: `${actionButtonClass("light")}`,
  ghost: `${actionButtonClass("ghost")}`,
  danger:
    "inline-flex items-center justify-center gap-2 rounded-full border border-[#F5C2C0] bg-white px-4 py-2.5 text-xs font-semibold text-[#B42318] transition-colors hover:bg-[#FDECEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
};

interface ConfirmDialogProps {
  /** Button text. For the icon styles it becomes the accessible name. */
  triggerLabel: string;
  triggerIcon?: ReactNode;
  triggerStyle?: TriggerStyle;
  /** Shown as a tooltip when the button is disabled, e.g. "Only admins can delete users". */
  disabled?: boolean;
  disabledReason?: string;

  title: string;
  description: ReactNode;
  confirmLabel: string;
  /** Text of the button that closes the dialog without doing anything. Default "Cancel". */
  dismissLabel?: string;
  /** danger = red confirm button. */
  tone?: "default" | "danger";

  /** Server action called on confirm. Leave it out until the backend provides it. */
  action?: (formData: FormData) => void | Promise<void>;
  /** Hidden inputs sent with the action, e.g. the user id. */
  children?: ReactNode;
}

/**
 * A button that opens a confirmation dialog. Built on the native <dialog>:
 * focus is trapped, Escape and the backdrop close it. Confirming submits the form inside it.
 * The only client part of the activate / deactivate / delete controls.
 */
export default function ConfirmDialog({
  triggerLabel,
  triggerIcon,
  triggerStyle = "light",
  disabled,
  disabledReason,
  title,
  description,
  confirmLabel,
  dismissLabel = "Cancel",
  tone = "default",
  action,
  children,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId().replace(/:/g, "");
  const iconOnly = triggerStyle === "icon" || triggerStyle === "icon-danger";

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        title={disabled ? disabledReason : iconOnly ? triggerLabel : undefined}
        aria-label={iconOnly ? triggerLabel : undefined}
        onClick={() => ref.current?.showModal()}
        className={triggerClasses[triggerStyle]}
      >
        {triggerIcon}
        {!iconOnly && triggerLabel}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={`${uid}-title`}
        aria-describedby={`${uid}-desc`}
        onClick={(event) => {
          // The form fills the dialog, so a click on the <dialog> itself is a click on the backdrop.
          if (event.target === ref.current) ref.current?.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border-0 bg-white p-0 text-left shadow-[0px_30px_80px_-20px_#121A2366] backdrop:bg-ink-900/60 backdrop:backdrop-blur-[6px]"
      >
        <form action={action} onSubmit={() => ref.current?.close()} className="p-6">
          {children}
          <h2 id={`${uid}-title`} className="font-heading text-lg font-bold text-ink-900">
            {title}
          </h2>
          <p id={`${uid}-desc`} className="mt-2 text-sm leading-relaxed text-ink-500">
            {description}
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className={actionButtonClass("light")}
            >
              {dismissLabel}
            </button>
            <button
              type="submit"
              className={
                tone === "danger"
                  ? "inline-flex items-center justify-center gap-2 rounded-full bg-[#B42318] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#912018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
                  : actionButtonClass("dark")
              }
            >
              {confirmLabel}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

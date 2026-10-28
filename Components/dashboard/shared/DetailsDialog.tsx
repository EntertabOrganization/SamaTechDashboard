"use client";

import { useId, useRef, type ReactNode } from "react";
import { actionButtonClass } from "./ActionButton";

interface DetailsDialogProps {
  triggerLabel: string;
  triggerIcon?: ReactNode;
  title: string;
  /** The content. It can be a server component: it is rendered on the server. */
  children: ReactNode;
}

/**
 * A button that opens a read-only details dialog (native <dialog>).
 * Use it when everything to show is already on the page, so no extra page or request is needed.
 */
export default function DetailsDialog({
  triggerLabel,
  triggerIcon,
  title,
  children,
}: DetailsDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId().replace(/:/g, "");

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className={actionButtonClass("light", "w-full")}
      >
        {triggerIcon}
        {triggerLabel}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={`${uid}-title`}
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-0 text-left shadow-[0px_30px_80px_-20px_#121A2366] backdrop:bg-ink-900/60 backdrop:backdrop-blur-[6px]"
      >
        <div className="p-6">
          <h2 id={`${uid}-title`} className="font-heading text-lg font-bold text-ink-900">
            {title}
          </h2>
          <div className="mt-4">{children}</div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className={actionButtonClass("dark")}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

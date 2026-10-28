"use client";

import { Trans, useLanguage } from "@/lib/i18n/LanguageProvider";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../../lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  /** Optional panel content. Omit when the tabs only drive state elsewhere. */
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** pill = enclosed segmented control, underline = in-page sections. */
  variant?: "pill" | "underline";
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. Default: the first enabled tab. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  /** Pill only: stretch the control and share the width between tabs. */
  fullWidth?: boolean;
  className?: string;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pulse focus-visible:ring-offset-2";

export function Tabs({
  items,
  variant = "pill",
  value,
  defaultValue,
  onValueChange,
  label,
  fullWidth = false,
  className,
}: TabsProps) {
  const { t: translateText, language } = useLanguage();

  const uid = useId().replace(/:/g, "");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstEnabled = items.find((i) => !i.disabled)?.id ?? items[0]?.id ?? "";
  const [inner, setInner] = useState<string>(defaultValue ?? firstEnabled);
  const current = value ?? inner;

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onValueChange?.(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled);
    const position = enabled.findIndex(({ item }) => item.id === current);
    let next = position;

    const forward = language === "ar" ? "ArrowLeft" : "ArrowRight";
    const backward = language === "ar" ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward) next = (position + 1) % enabled.length;
    else if (event.key === backward) next = (position - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = enabled.length - 1;
    else return;

    event.preventDefault();
    const target = enabled[next];
    select(target.item.id);
    refs.current[target.index]?.focus();
  };

  const hasPanels = items.some((i) => i.content !== undefined);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={translateText(label)}
        onKeyDown={onKeyDown}
        className={cn(
          variant === "pill"
            ? "flex gap-1 rounded-full border border-ink-100 bg-ink-50 p-1"
            : "flex gap-6 border-b border-ink-100",
          variant === "pill" && !fullWidth && "inline-flex",
        )}
      >
        {items.map((item, index) => {
          const selected = item.id === current;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={hasPanels ? `${uid}-panel-${item.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.id)}
              className={cn(
                "text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                focusRing,
                variant === "pill"
                  ? cn(
                      "whitespace-nowrap rounded-full px-4 py-2",
                      fullWidth && "flex-1",
                      selected
                        ? "bg-ink-900 text-white"
                        : "text-ink-500 hover:text-ink-900",
                    )
                  : cn(
                      "-mb-px whitespace-nowrap border-b-2 pb-2.5 pt-1",
                      selected
                        ? "border-blue-pulse text-ink-900"
                        : "border-transparent text-ink-500 hover:text-ink-900",
                    ),
              )}
            >
              <Trans>{item.label}</Trans>
            </button>
          );
        })}
      </div>

      {hasPanels &&
        items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`${uid}-panel-${item.id}`}
            aria-labelledby={`${uid}-tab-${item.id}`}
            hidden={item.id !== current}
            tabIndex={0}
            className={cn("mt-5", focusRing)}
          >
            <Trans>{item.content}</Trans>
          </div>
        ))}
    </div>
  );
}

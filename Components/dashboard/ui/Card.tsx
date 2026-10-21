import { Trans } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type CardSurface = "plain" | "tint" | "ink" | "brand";

export interface CardProps {
  surface?: CardSurface;
  /** Icon shown in a small rounded tile (use a 16px icon). */
  icon?: ReactNode;
  /** Small uppercase label above the title, e.g. "Pillar 01". */
  kicker?: string;
  title: string;
  /** Heading level for the title, so the page outline stays correct. */
  headingLevel?: 2 | 3 | 4;
  /** Description text. */
  children?: ReactNode;
  /** Makes the whole card a link. */
  href?: string;
  className?: string;
}

interface SurfaceStyle {
  box: string;
  iconTile: string;
  kicker: string;
  title: string;
  body: string;
  style?: React.CSSProperties;
}

const surfaces: Record<CardSurface, SurfaceStyle> = {
  plain: {
    box: "border-ink-100 bg-white shadow-sm",
    iconTile: "border-ink-100 bg-blue-mist text-blue-sovereign",
    kicker: "text-ink-300",
    title: "text-ink-900",
    body: "text-ink-700",
  },
  tint: {
    box: "border-blue-haze bg-blue-mist",
    iconTile: "border-blue-haze bg-white text-blue-sovereign",
    kicker: "text-ink-300",
    title: "text-ink-900",
    body: "text-ink-700",
  },
  ink: {
    box: "border-white/10 bg-gradient-navy",
    iconTile: "border-white/15 bg-white/10 text-white",
    kicker: "text-slate-400",
    title: "text-white",
    body: "text-[#FFFFFFB8]",
  },
  brand: {
    box: "border-transparent bg-gradient-mark shadow-sm",
    iconTile: "border-white/25 bg-white/15 text-white",
    kicker: "text-white/70",
    title: "text-white",
    body: "text-white/80",
  },
};

export function Card({
  surface = "plain",
  icon,
  kicker,
  title,
  headingLevel = 3,
  children,
  href,
  className,
}: CardProps) {
  const s = surfaces[surface];
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  const classes = cn(
    "flex flex-col rounded-2xl border p-5 text-start",
    s.box,
    href &&
      "transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0078FF] focus-visible:ring-offset-2",
    className,
  );

  const content = (
    <>
      {icon && (
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border [&_svg]:h-4 [&_svg]:w-4",
            s.iconTile,
          )}
        >
          <Trans>{icon}</Trans>
        </span>
      )}
      {kicker && (
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-wider",
            icon ? "mt-5" : "",
            s.kicker,
          )}
        >
          <Trans>{kicker}</Trans>
        </span>
      )}
      <Heading className={cn("text-sm font-semibold leading-snug", kicker ? "mt-1.5" : icon ? "mt-5" : "", s.title)}>
        <Trans>{title}</Trans>
      </Heading>
      {children && (
        <p className={cn("mt-2 text-xs leading-relaxed", s.body)}><Trans>{children}</Trans></p>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={s.style}>
        <Trans>{content}</Trans>
      </Link>
    );
  }

  return (
    <div className={classes} style={s.style}>
      <Trans>{content}</Trans>
    </div>
  );
}

import type { ComponentType, ReactNode, SVGProps } from "react";


export type IconProps = SVGProps<SVGSVGElement>;

/** Base wrapper: 24x24 grid, inherits color from the parent via currentColor. */
function Svg({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- Individual icons ---------- */

export const Search = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.2-4.2" />
  </Svg>
);

export const Network = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 11l8-4M8 13l8 4" />
  </Svg>
);

export const Lightbulb = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
  </Svg>
);

export const Gauge = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 17a8 8 0 1 1 16 0" />
    <path d="M12 17l4-5" />
    <path d="M3 17h2M19 17h2" />
  </Svg>
);


export const Globe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </Svg>
);

export const Shield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
  </Svg>
);


export const Users = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.2" />
    <path d="M17 14c2.2 0 4 1.8 4 4" />
  </Svg>
);

export const Presentation = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M12 16v4M8 20h8" />
    <path d="M7 12l3-3 2 2 4-4" />
  </Svg>
);

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const CheckCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </Svg>
);

export const ChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const Minus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);



export const TrendingUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Svg>
);

export const Insight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19v-6M12 19V5M19 19v-9" />
  </Svg>
);

export const Spinner = ({ className, ...p }: IconProps) => (
  <Svg className={className ? `animate-spin ${className}` : "animate-spin"} {...p}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </Svg>
);

/* ---------- Name-based <Icon /> ---------- */

const registry = {
  search: Search,
  network: Network,
  lightbulb: Lightbulb,
  gauge: Gauge,
  globe: Globe,
  shield: Shield,
  users: Users,
  presentation: Presentation,
  "arrow-right": ArrowRight,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  plus: Plus,
  minus: Minus,
  "trending-up": TrendingUp,
  insight: Insight,
  spinner: Spinner,
} satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof registry;

export const iconNames = Object.keys(registry) as IconName[];

export interface NamedIconProps extends Omit<IconProps, "name"> {
  name: IconName;
  /** Pixel size (width and height). Default 16. */
  size?: number;
  /** Solid weight: adds a soft fill. Meant for dark surfaces. */
  solid?: boolean;
  /** Provide when the icon carries meaning on its own; otherwise it is decorative. */
  title?: string;
}

export function Icon({ name, size = 16, solid = false, title, ...rest }: NamedIconProps) {
  const Component = registry[name];
  const a11y = title
    ? { role: "img" as const, "aria-label": title, "aria-hidden": undefined }
    : {};
  const solidProps = solid ? { fill: "currentColor", fillOpacity: 0.2 } : {};

  return <Component className={name === "arrow-right" ? "directional-arrow" : undefined} width={size} height={size} {...solidProps} {...a11y} {...rest} />;
}

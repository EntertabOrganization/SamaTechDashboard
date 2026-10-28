const sizes = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
};

const tones = {
  brand: "bg-blue-mist text-blue-sovereign",
  muted: "bg-ink-100 text-ink-500",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

interface AvatarProps {
  /** The initials are taken from this. */
  name: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  shape?: "round" | "square";
}

/** Initials in a tinted circle (or rounded square, for organizations). */
export default function Avatar({
  name,
  size = "md",
  tone = "brand",
  shape = "round",
}: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-bold ${sizes[size]} ${tones[tone]} ${
        shape === "round" ? "rounded-full" : "rounded-lg"
      }`}
    >
      {initials(name)}
    </span>
  );
}

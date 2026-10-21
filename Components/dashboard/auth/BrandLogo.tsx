type BrandLogoProps = {
  /** "light" for dark backgrounds, "dark" for light backgrounds */
  variant?: "light" | "dark";
};

export function BrandLogo({ variant = "light" }: BrandLogoProps) {
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`text-2xl font-bold tracking-tight ${
          isLight ? "" : "text-[#0e1824]"
        }`}
      >
        samatechs
      </span>
      <span
        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-200 ${
          isLight ? "bg-white/10" : "bg-[#0e1824]"
        }`}
      >
        CMS
      </span>
    </div>
  );
}

import Image from "next/image";
import LogoDark from "@/public/samatechs-logo.svg";
import LogoWhite from "@/public/samatechs-logo-white.svg";

type BrandLogoProps = {
  /** "light" for dark backgrounds, "dark" for light backgrounds */
  variant?: "light" | "dark";
  /** Logo width in px; the height follows the artwork. */
  width?: number;
};

/** The website's SAMATECHS logo with a small CMS tag. */
export function BrandLogo({ variant = "light", width = 150 }: BrandLogoProps) {
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-2.5">
      <Image src={isLight ? LogoWhite : LogoDark} alt="SAMATECHS" width={width} priority />
      <span
        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
          isLight ? "bg-white/10 text-slate-200" : "bg-blue-mist text-blue-sovereign"
        }`}
      >
        CMS
      </span>
    </div>
  );
}

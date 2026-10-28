import type { ReactNode } from "react";
import Image from "next/image";
import BrandRays from "@/public/images/footer-vector.png";
import { BrandLogo } from "./BrandLogo";

type AuthShellProps = {
  /** Headline shown on the dark brand panel (desktop only) */
  brandTitle: string;
  brandDescription: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({
  brandTitle,
  brandDescription,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="grid min-h-screen bg-ink-50 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-navy p-12 text-white lg:flex">
        {/* Faint brand rays, bottom-left — the same artwork as the website footer */}
        <Image
          src={BrandRays}
          alt=""
          aria-hidden="true"
          sizes="440px"
          className="pointer-events-none absolute -bottom-35 -left-30 h-[431.02px] w-110 max-w-none opacity-5"
        />

        <div className="relative">
          <BrandLogo variant="light" width={201} />
        </div>

        <div className="relative max-w-md">
          <p className="font-body text-eyebrow font-bold uppercase tracking-eyebrow text-blue-precision">
            Strategic advisory &amp; analytics
          </p>
          <h2 className="mt-4 text-h2 font-bold leading-h2 tracking-tight">
            {brandTitle}
          </h2>
          <p className="mt-4 text-body leading-body text-white/72">
            {brandDescription}
          </p>
        </div>

        <p className="relative text-xs text-white/50">
          © {new Date().getFullYear()} SAMATECHS. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-100">
          {/* Mobile brand */}
          <div className="mb-10 lg:hidden">
            <BrandLogo variant="dark" />
          </div>

          <div className="rounded-card border border-ink-100 bg-white p-8 shadow-md sm:p-9">
            {children}
          </div>

          {footer}
        </div>
      </section>
    </main>
  );
}

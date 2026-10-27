import type { ReactNode } from "react";
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
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-b from-[#0e1824] to-[#1a2536] p-12 text-white lg:flex">
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at 20% 100%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 100%, black 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <BrandLogo variant="light" />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            {brandTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {brandDescription}
          </p>
        </div>

        <p className="relative text-xs text-slate-500">
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

          <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-[0_1px_2px_rgba(15,26,39,0.04),0_12px_32px_-12px_rgba(15,26,39,0.12)] sm:p-9">
            {children}
          </div>

          {footer}
        </div>
      </section>
    </main>
  );
}

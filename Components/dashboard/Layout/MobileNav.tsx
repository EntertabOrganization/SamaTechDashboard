
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IconButton, cn } from "@/Components/dashboard/ui";
import { MenuIcon } from "@/Components/dashboard/Layout/icons";

export default function MobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [openedPathname, setOpenedPathname] = useState<string | null>(null);

  const isOpen = open && openedPathname === pathname;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <IconButton
        label="Open menu"
        icon={<MenuIcon />}
        aria-expanded={isOpen}
        aria-controls="cms-drawer"
        onClick={() => {
          setOpenedPathname(pathname);
          setOpen(true);
        }}
      />

   
<div
  className={cn(
    "fixed inset-0 z-50 h-dvh w-screen",
    isOpen ? "visible" : "invisible",
  )}
  aria-hidden={!isOpen}
>
  {/* Background blur */}
  <button
    type="button"
    tabIndex={isOpen ? 0 : -1}
    aria-label="Close menu"
    onClick={() => setOpen(false)}
    className={cn(
      "absolute inset-0 h-full w-full bg-ink-900/60 backdrop-blur-[6px] transition-opacity duration-200",
      isOpen ? "opacity-100" : "opacity-0",
    )}
  />

  {/* Sidebar drawer */}
  <div
    id="cms-drawer"
    className={cn(
      "fixed inset-y-0 left-0 z-10 h-dvh w-72 max-w-[85vw] overflow-y-auto bg-white shadow-[0px_30px_80px_-20px_#121A2366] transition-transform duration-200",
      isOpen ? "translate-x-0" : "-translate-x-full",
    )}
  >
    {children}
  </div>
</div>

    </div>
  );
}

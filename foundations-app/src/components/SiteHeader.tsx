"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-[min(1120px,calc(100%-2rem))] items-center justify-between gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <button
          type="button"
          className="border border-line bg-surface px-4 py-2 text-sm font-semibold md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg active:scale-95 transition"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-nav"
          className={`${open ? "flex" : "hidden"} absolute inset-x-4 top-16 flex-col gap-1 border border-line bg-surface p-3 shadow-lg rounded-xl z-30 md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`min-h-[44px] px-3 rounded-lg inline-flex items-center text-sm font-semibold transition ${active ? "text-foreground bg-background md:bg-transparent underline decoration-accent decoration-2 underline-offset-8" : "text-muted hover:text-foreground hover:bg-background/50 md:hover:bg-transparent"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

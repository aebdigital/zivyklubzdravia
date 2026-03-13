"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { NavigationItem } from "@/lib/content";

type SiteHeaderProps = {
  navigation: NavigationItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(251,247,239,0.85)] backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <div className="relative h-14 w-24 overflow-hidden">
            <img
              src="/mirror/site/wp-content/uploads/2025/03/cropped-logo_zivyklub_png-1.png"
              alt="Živý Klub Zdravia"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/80 text-[color:var(--forest)] md:hidden"
          aria-expanded={isOpen}
          aria-label="Otvoriť navigáciu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="text-xl">{isOpen ? "×" : "☰"}</span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => {
            const itemPath =
              item.href.endsWith("/") && item.href !== "/" ? item.href.slice(0, -1) : item.href;
            const isActive = currentPath === itemPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[color:var(--forest)] text-white"
                    : "text-[color:var(--forest)] hover:bg-white hover:text-[color:var(--clay)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-[color:var(--line)] bg-[rgba(255,255,255,0.94)] md:hidden">
          <nav className="section-wrap flex flex-col gap-2 py-4">
            {navigation.map((item) => {
              const itemPath =
                item.href.endsWith("/") && item.href !== "/" ? item.href.slice(0, -1) : item.href;
              const isActive = currentPath === itemPath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[color:var(--forest)] text-white"
                      : "bg-white/70 text-[color:var(--forest)]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { NavigationItem } from "@/lib/content";

type SiteHeaderProps = {
  navigation: NavigationItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(251,247,239,0.85)] backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <div className="relative h-14 w-24 overflow-hidden md:h-18 md:w-32">
            <img
              src="/mirror/site/wp-content/uploads/2025/03/cropped-logo_zivyklub_png-1.png"
              alt="Živý Klub Zdravia"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center p-0 text-[color:var(--forest)] md:hidden"
          aria-expanded={isOpen}
          aria-label="Otvoriť navigáciu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="text-[1.75rem] leading-none">{isOpen ? "×" : "☰"}</span>
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
        <div className="fixed inset-0 z-[200] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(17,27,20,0.3)]"
            aria-label="Zavrieť navigáciu"
            onClick={() => setIsOpen(false)}
          />

          <aside className="mobile-nav-drawer fixed inset-y-0 left-0 flex h-screen min-h-screen w-screen flex-col overflow-y-auto bg-[linear-gradient(135deg,#315433,#4d6f38)] px-6 pb-8 pt-6 text-white shadow-[0_30px_90px_rgba(17,27,20,0.45)]">
            <div className="flex items-center justify-between">
              <div className="flex h-16 w-28 items-center justify-center rounded-[1.5rem] bg-white px-3 py-2 shadow-[0_16px_40px_rgba(17,27,20,0.16)]">
                <img
                  src="/mirror/site/wp-content/uploads/2025/03/cropped-logo_zivyklub_png-1.png"
                  alt="Živý Klub Zdravia"
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center p-0 text-3xl leading-none text-white"
                aria-label="Zavrieť navigáciu"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-3">
              {navigation.map((item) => {
                const itemPath =
                  item.href.endsWith("/") && item.href !== "/" ? item.href.slice(0, -1) : item.href;
                const isActive = currentPath === itemPath;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`display-face rounded-[1.5rem] px-5 py-4 text-2xl tracking-[0.01em] text-white transition ${
                      isActive
                        ? "bg-[color:var(--clay)] text-white shadow-[0_16px_38px_rgba(216,112,67,0.26)]"
                        : "bg-white/8 hover:bg-white/12"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <p className="mt-6 text-sm leading-7 text-white/72">
              Pokojnejšie tempo, vedomé varenie a starostlivosť o telo na jednom mieste.
            </p>
          </aside>
        </div>
      ) : null}
    </header>
  );
}

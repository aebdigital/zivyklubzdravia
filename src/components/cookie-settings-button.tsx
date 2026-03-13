"use client";

import type { ReactNode } from "react";

type CookieSettingsButtonProps = {
  className?: string;
  children: ReactNode;
};

export function CookieSettingsButton({ className, children }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      {children}
    </button>
  );
}

"use client";

import { useState } from "react";

type InteractiveMapEmbedProps = {
  src: string;
  title: string;
};

export function InteractiveMapEmbed({ src, title }: InteractiveMapEmbedProps) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[1.5rem]">
      <iframe
        title={title}
        src={src}
        className={`h-[360px] w-full border-0 transition ${
          isInteractive ? "pointer-events-auto" : "pointer-events-none"
        }`}
        loading="lazy"
      />

      {!isInteractive ? (
        <button
          type="button"
          className="absolute inset-0 cursor-pointer bg-transparent"
          aria-label="Aktivovať interakciu s mapou"
          onClick={() => setIsInteractive(true)}
        >
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/78 px-3 py-1 text-[12px] leading-none text-[color:var(--ink)] shadow-[0_10px_24px_rgba(38,49,39,0.12)]">
            Kliknite pre interakciu s mapou
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full bg-[rgba(26,38,29,0.72)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          onClick={() => setIsInteractive(false)}
        >
          Zavrieť mapu
        </button>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "zivy-klub-cookie-consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setPreferences(JSON.parse(saved) as CookiePreferences);
      } catch {
        setPreferences(defaultPreferences);
      }
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setIsReady(true);

    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener("open-cookie-settings", handleOpen);

    return () => {
      window.removeEventListener("open-cookie-settings", handleOpen);
    };
  }, []);

  if (!isReady) {
    return null;
  }

  const savePreferences = (nextPreferences: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {isVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
          <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/20 bg-[linear-gradient(135deg,#315433,#4d6f38)] p-6 text-white shadow-[0_30px_80px_rgba(26,38,29,0.35)] backdrop-blur-xl xl:w-[80vw] xl:max-w-[110rem]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="display-face text-2xl">Používame cookies</p>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Používame nevyhnutné, analytické a marketingové cookies, aby stránka
                  fungovala správne a aby sme vedeli zlepšovať jej obsah.{" "}
                  <Link
                    href="/ochrana-osobnych-udajov/"
                    className="font-semibold text-white underline underline-offset-4"
                  >
                    Viac o ochrane osobných údajov
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--forest)] transition hover:bg-[color:var(--mist)]"
                  onClick={() => savePreferences(defaultPreferences)}
                >
                  Len nevyhnutné
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  onClick={() => setIsModalOpen(true)}
                >
                  Nastavenia cookies
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[color:var(--clay)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-105"
                  onClick={() =>
                    savePreferences({
                      necessary: true,
                      analytics: true,
                      marketing: true,
                    })
                  }
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isModalOpen ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(17,27,20,0.45)] p-4">
          <div className="w-full max-w-2xl rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper)] p-7 shadow-[0_30px_80px_rgba(26,38,29,0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="display-face text-3xl text-[color:var(--forest)]">
                  Nastavenia cookies
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  Vyberte si, s ktorými typmi cookies súhlasíte. Nevyhnutné cookies sú
                  vždy zapnuté.
                </p>
              </div>

              <button
                type="button"
                className="rounded-full border border-[color:var(--line)] px-3 py-2 text-sm text-[color:var(--forest)]"
                onClick={() => setIsModalOpen(false)}
              >
                Zavrieť
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  key: "necessary" as const,
                  title: "Nevyhnutné cookies",
                  text: "Zabezpečujú základnú funkčnosť stránky a kontaktných formulárov.",
                  locked: true,
                },
                {
                  key: "analytics" as const,
                  title: "Analytické cookies",
                  text: "Pomáhajú nám pochopiť, ako návštevníci stránku používajú.",
                  locked: false,
                },
                {
                  key: "marketing" as const,
                  title: "Marketingové cookies",
                  text: "Umožňujú merať kampane a zobrazovať relevantnejší obsah.",
                  locked: false,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 px-5 py-4"
                >
                  <div>
                    <p className="font-semibold text-[color:var(--forest)]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                      {item.text}
                    </p>
                  </div>

                  <label className="inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={preferences[item.key]}
                      disabled={item.locked}
                      onChange={(event) => {
                        setPreferences((current) => ({
                          ...current,
                          [item.key]: event.target.checked,
                        }));
                      }}
                    />
                    <span className="relative h-7 w-13 rounded-full bg-[rgba(49,71,51,0.22)] transition peer-checked:bg-[color:var(--sage)] peer-disabled:bg-[color:var(--forest)]">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-6" />
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-[color:var(--line)] px-5 py-3 text-sm font-semibold text-[color:var(--forest)]"
                onClick={() => savePreferences(defaultPreferences)}
              >
                Len nevyhnutné
              </button>
              <button
                type="button"
                className="rounded-full bg-[color:var(--forest)] px-5 py-3 text-sm font-semibold text-white"
                onClick={() => savePreferences(preferences)}
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

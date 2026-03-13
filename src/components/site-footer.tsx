import Link from "next/link";

import { contactDetails, navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--line)] bg-[color:var(--forest)] text-white">
      <div className="section-wrap grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="display-face text-3xl">Živý Klub Zdravia</p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/72">
            Miesto pre pokojnejšie tempo, vedomé varenie, shiatsu terapiu a praktické
            kroky k lepšiemu zdraviu.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Navigácia
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/82">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Kontakt
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/82">
            <p>{contactDetails.company}</p>
            <p>{contactDetails.address}</p>
            <p>
              <a href={`mailto:${contactDetails.email}`} className="transition hover:text-white">
                {contactDetails.email}
              </a>
            </p>
            <p>
              <a href={`tel:${contactDetails.phoneLink}`} className="transition hover:text-white">
                {contactDetails.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-wrap flex flex-col gap-3 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2025 Živý Klub Zdravia s.r.o.</p>
          <p>
            Tvorba stránky{" "}
            <a
              href="https://aebdigital.sk/"
              className="text-white/80 transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              AEB Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

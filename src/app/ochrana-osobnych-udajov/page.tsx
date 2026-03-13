import type { Metadata } from "next";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactDetails, getPage, navigation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description: "Zásady ochrany osobných údajov a informácie o cookies.",
};

export default function PrivacyPolicyPage() {
  const contactPage = getPage(["kontakt"]);
  const companyInfo = contactPage?.kind === "contact" ? contactPage.companyInfo : [];

  return (
    <div className="shell">
      <SiteHeader navigation={navigation} />
      <main className="section-wrap py-10 lg:py-16">
        <div data-reveal className="soft-card rounded-[2rem] p-8 lg:p-10">
          <span className="divider-title">GDPR</span>
          <h1 className="display-face mt-5 text-5xl text-[color:var(--forest)] sm:text-6xl">
            Zásady ochrany osobných údajov
          </h1>

          <div className="mt-8 rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 p-6 text-base leading-8 text-[color:var(--muted)]">
            {companyInfo.map((line, index) => (
              <p
                key={line}
                className={index === 0 ? "font-semibold text-[color:var(--forest)]" : undefined}
              >
                {line}
              </p>
            ))}
            <p>E-mail: {contactDetails.email}</p>
            <p>Tel.: {contactDetails.phone}</p>
          </div>

          <div className="copy-flow mt-8 text-base leading-8 text-[color:var(--muted)]">
            <p>
              Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké
              osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a
              kontaktných formulárov.
            </p>

            <h2 className="display-face text-3xl text-[color:var(--forest)]">I. Kontaktný formulár</h2>
            <p>
              Na stránke prevádzkujeme kontaktný formulár na viacerých samostatných
              stránkach, ktorého účelom je umožniť vám:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Položiť otázku k našim produktom a službám</li>
              <li>Požiadať o cenovú ponuku</li>
            </ul>
            <p>Rozsah spracúvaných údajov:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Meno a priezvisko</li>
              <li>E-mailová adresa</li>
              <li>Telefónne číslo, ak ho uvediete v správe alebo pri komunikácii</li>
              <li>Obsah správy</li>
            </ul>
            <p>
              <strong>Účel spracovania:</strong> Spracúvame uvedené údaje, aby sme vás mohli
              kontaktovať a reagovať na váš dopyt.
            </p>
            <p>
              <strong>Právny základ:</strong> Článok 6 ods. 1 písm. b) GDPR – plnenie
              opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
            </p>
            <p>
              <strong>Doba uchovávania:</strong> Osobné údaje budeme uchovávať maximálne 10
              rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
            </p>

            <h2 className="display-face text-3xl text-[color:var(--forest)]">II. Súbory cookies</h2>
            <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr.
                ukladanie relácie a nastavení prehliadača).
              </li>
              <li>
                Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako
                návštevníci stránku používajú.
              </li>
              <li>
                Marketingové cookies – umožňujú merať kampane a prispôsobiť obsah podľa
                preferencií používateľa.
              </li>
            </ul>
            <p>
              <strong>Správa súhlasov:</strong> Používateľ môže kedykoľvek odvolať súhlas s
              využívaním voliteľných cookies prostredníctvom nastavení cookie lišty alebo
              priamo v prehliadači.
            </p>
            <p>
              <CookieSettingsButton className="font-semibold text-[color:var(--forest)] underline underline-offset-4">
                Otvoriť nastavenia cookies
              </CookieSettingsButton>
            </p>

            <h2 className="display-face text-3xl text-[color:var(--forest)]">
              III. Práva dotknutej osoby
            </h2>
            <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Prístup k osobným údajom, ktoré spracúvame</li>
              <li>Oprava nepresných alebo neúplných údajov</li>
              <li>Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ</li>
              <li>Obmedzenie spracovania</li>
              <li>Prenosnosť údajov</li>
              <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
              <li>
                Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12,
                820 07 Bratislava, www.dataprotection.gov.sk)
              </li>
            </ul>
            <p>
              V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na
              {" "}
              {contactDetails.email} alebo telefónnom čísle {contactDetails.phone}.
            </p>
            <p>Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

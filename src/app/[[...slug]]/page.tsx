import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InquiryForm } from "@/components/inquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  contactDetails,
  getAllSlugs,
  getPage,
  navigation,
  type SitePage,
} from "@/lib/content";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug: slug ? slug.split("/") : [],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return {};
  }

  const canonical = page.slug ? `/${page.slug}/` : "/";

  return {
    title: page.slug ? page.title : { absolute: page.title },
    description: page.description,
    alternates: {
      canonical,
    },
  };
}

function HomeView({ page }: { page: Extract<SitePage, { kind: "home" }> }) {
  return (
    <>
      <section
        data-reveal
        className="section-wrap grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16"
      >
        <div className="flex flex-col justify-center">
          <span className="divider-title">{page.hero.eyebrow}</span>
          <h1 className="display-face mt-6 max-w-3xl text-5xl leading-[0.95] text-[color:var(--forest)] sm:text-6xl lg:text-7xl">
            {page.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {page.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt/" className="button-primary">
              Kontakt
            </Link>
            <Link href="/kurzy-varenia/" className="button-secondary">
              Naše služby
            </Link>
          </div>

          {page.highlights.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-[color:var(--line)] bg-white/85 px-4 py-2 text-sm text-[color:var(--forest)]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="soft-card relative overflow-hidden rounded-[2rem] p-3">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[1.5rem]">
            <Image
              src={page.hero.image}
              alt={page.hero.imageAlt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(26,38,29,0.68)] via-[rgba(26,38,29,0.2)] to-transparent" />
          </div>
        </div>
      </section>

      <section data-reveal className="section-wrap py-10 lg:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="divider-title">Čo u nás nájdete?</span>
            <h2 className="display-face mt-5 text-4xl text-[color:var(--forest)] sm:text-5xl">
              Služby pre zdravšie telo, viac energie a pokojnejšie tempo
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
            Kurzy, terapie a konzultácie sme vyskladali tak, aby ste si vedeli vybrať
            praktickú podporu presne podľa toho, čo teraz vaše telo a rytmus potrebujú.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {page.features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="soft-card group overflow-hidden rounded-[2rem]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-72 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between p-7">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--sage)]">
                      0{index + 1}
                    </p>
                    <h3 className="display-face mt-4 text-3xl text-[color:var(--forest)]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                      {feature.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--clay)]">
                    Zistiť viac <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section data-reveal className="section-wrap py-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="soft-card relative overflow-hidden rounded-[2rem] p-3">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] bg-[color:var(--mist)] lg:min-h-[30rem]">
              <Image
                src={page.story.image}
                alt={page.story.title}
                fill
                className="object-contain object-top p-4"
              />
            </div>
          </div>

          <div className="soft-card rounded-[2rem] p-8 lg:p-10">
            <span className="divider-title">Môj príbeh</span>
            <h2 className="display-face mt-5 text-4xl text-[color:var(--forest)] sm:text-5xl">
              {page.story.title}
            </h2>
            <div className="copy-flow mt-6 text-base leading-8 text-[color:var(--muted)]">
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="soft-card rounded-[2rem] p-8 text-center">
            <span className="divider-title justify-center">Príďte nás navštíviť</span>
            <p className="display-face mt-5 text-3xl text-[color:var(--forest)] sm:text-4xl">
              {contactDetails.address}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 p-5 text-left transition hover:border-[rgba(216,112,67,0.4)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage)]">
                  Email
                </p>
                <p className="mt-3 text-base text-[color:var(--forest)]">
                  {contactDetails.email}
                </p>
              </a>
              <a
                href={`tel:${contactDetails.phoneLink}`}
                className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 p-5 text-left transition hover:border-[rgba(216,112,67,0.4)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage)]">
                  Telefón
                </p>
                <p className="mt-3 text-base text-[color:var(--forest)]">
                  {contactDetails.phone}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="section-wrap py-10 lg:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="divider-title">Galéria</span>
            <h2 className="display-face mt-5 text-4xl text-[color:var(--forest)] sm:text-5xl">
              Atmosféra, ktorú si viete predstaviť ešte pred návštevou
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {page.gallery.map((image, index) => (
            <div
              key={image}
              className={`soft-card relative overflow-hidden rounded-[2rem] p-3 ${
                index === 0 ? "md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-[1.5rem] ${
                  index === 0 ? "min-h-[34rem]" : "min-h-[16rem]"
                }`}
              >
                <Image src={image} alt={`Galéria ${index + 1}`} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ServiceView({ page }: { page: Extract<SitePage, { kind: "service" }> }) {
  return (
    <>
      <section
        data-reveal
        className="section-wrap grid gap-10 py-10 lg:grid-cols-[1fr_0.9fr] lg:py-16"
      >
        <div className="flex flex-col justify-center">
          <span className="divider-title">{page.hero.eyebrow}</span>
          <h1 className="display-face mt-5 text-5xl leading-[0.97] text-[color:var(--forest)] sm:text-6xl">
            {page.title}
          </h1>
          {page.hero.title ? (
            <p className="display-face mt-5 text-3xl leading-[1.08] text-[color:var(--forest)] sm:text-4xl">
              {page.hero.title}
            </p>
          ) : null}
          {page.hero.description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              {page.hero.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {page.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[color:var(--line)] bg-white/85 px-4 py-2 text-sm text-[color:var(--forest)]"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt/" className="button-primary">
              Chcem termín
            </Link>
            <Link href="/" className="button-secondary">
              Späť na domov
            </Link>
          </div>
        </div>

        <div className="soft-card relative overflow-hidden rounded-[2rem] p-3">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem]">
            <Image src={page.hero.image} alt={page.hero.imageAlt} fill className="object-cover" />
          </div>
        </div>
      </section>

      {page.intro ? (
        <section data-reveal className="section-wrap py-4 lg:py-8">
          <div className="soft-card rounded-[2rem] p-8 text-base leading-8 text-[color:var(--muted)]">
            {page.intro}
          </div>
        </section>
      ) : null}

      <section data-reveal className="section-wrap py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} data-reveal className="soft-card rounded-[2rem] p-8">
              <h2 className="display-face text-3xl text-[color:var(--forest)]">{section.title}</h2>

              {section.text ? (
                <div className="copy-flow mt-5 text-base leading-8 text-[color:var(--muted)]">
                  {section.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.bullets ? (
                <ul className="copy-flow mt-5 text-base leading-8 text-[color:var(--muted)]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[color:var(--clay)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.note ? (
                <p className="mt-5 rounded-[1.25rem] bg-[color:var(--mist)] px-4 py-4 text-sm leading-7 text-[color:var(--forest)]">
                  {section.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {page.testimonials?.length ? (
        <section data-reveal className="section-wrap py-10 lg:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="divider-title">Recenzie</span>
              <h2 className="display-face mt-5 text-4xl text-[color:var(--forest)] sm:text-5xl">
                Skúsenosti ľudí, ktorí shiatsu už zažili na vlastnom tele
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {page.testimonials.map((review) => (
              <article
                key={`${review.name}-${review.quote}`}
                data-reveal
                className="soft-card rounded-[2rem] p-7"
              >
                <p className="text-base leading-8 text-[color:var(--muted)]">“{review.quote}”</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--sage)]">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section data-reveal className="section-wrap py-10 lg:py-16">
        <div className="soft-card overflow-hidden rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[20rem]">
              <Image src={page.hero.image} alt={page.hero.imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,38,29,0.6)] to-transparent" />
            </div>

            <div className="p-8 lg:p-10">
              <span className="divider-title">Objednanie termínu</span>
              <h2 className="display-face mt-5 text-4xl text-[color:var(--forest)]">
                Máte záujem o naše služby?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
                Napíšte nám a ozveme sa Vám do 24 hodín ohľadom voľných termínov.
              </p>

              <div className="mt-8">
                <InquiryForm subject={page.formSubject} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactView({ page }: { page: Extract<SitePage, { kind: "contact" }> }) {
  return (
    <>
      <section
        data-reveal
        className="section-wrap grid gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16"
      >
        <div className="flex flex-col justify-center">
          <span className="divider-title">{page.hero.eyebrow}</span>
          <h1 className="display-face mt-5 text-5xl leading-[0.97] text-[color:var(--forest)] sm:text-6xl">
            {page.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {page.hero.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Email", value: contactDetails.email },
              { label: "Telefón", value: contactDetails.phone },
              { label: "IČO", value: contactDetails.ico },
              { label: "DIČ", value: contactDetails.dic },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage)]">
                  {item.label}
                </p>
                <p className="mt-2 text-base text-[color:var(--forest)]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="soft-card relative overflow-hidden rounded-[2rem] p-3">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem]">
            <Image src={page.hero.image} alt={page.hero.imageAlt} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section data-reveal className="section-wrap py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal className="soft-card rounded-[2rem] p-8">
            <h2 className="display-face text-3xl text-[color:var(--forest)]">Adresa a údaje</h2>
            <div className="copy-flow mt-5 text-base leading-8 text-[color:var(--muted)]">
              {page.companyInfo.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--mist)] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage)]">
                Priamy kontakt
              </p>
              <div className="mt-3 space-y-3 text-base text-[color:var(--forest)]">
                <p>
                  <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                </p>
                <p>
                  <a href={`tel:${contactDetails.phoneLink}`}>{contactDetails.phone}</a>
                </p>
              </div>
            </div>
          </div>

          <div data-reveal className="soft-card rounded-[2rem] p-8">
            <h2 className="display-face text-3xl text-[color:var(--forest)]">Formulár</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              Jednoducho napíšte krátku správu s čím by ste potrebovali poradiť a my sa Vám
              za okamih ozveme.
            </p>

            <div className="mt-8">
              <InquiryForm subject={page.formSubject} />
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="section-wrap py-10 lg:py-14">
        <div className="soft-card overflow-hidden rounded-[2rem] p-3">
          <div className="overflow-hidden rounded-[1.5rem]">
            <iframe
              title="Mapa Živý Klub Zdravia"
              src="https://maps.google.com/maps?q=Kuku%C4%8D%C3%ADnova+142%2F88%2C+901+01+Malacky&t=m&z=14&output=embed&iwloc=near"
              className="h-[360px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="shell">
      <SiteHeader navigation={navigation} />
      <main>
        {page.kind === "home" ? <HomeView page={page} /> : null}
        {page.kind === "service" ? <ServiceView page={page} /> : null}
        {page.kind === "contact" ? <ContactView page={page} /> : null}
      </main>
      {page.kind === "home" ? null : <SiteFooter />}
    </div>
  );
}

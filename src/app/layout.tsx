import type { Metadata } from "next";

import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SmoothExperience } from "@/components/smooth-experience";
import { contactDetails } from "@/lib/content";
import { siteData } from "@/lib/site-data";

const fontStylesheets = siteData.sharedStylesheets.filter((href) =>
  href.includes("/fonts-google/")
);
const siteUrl = "https://www.zivyklubzdravia.sk";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: contactDetails.company,
  url: siteUrl,
  email: contactDetails.email,
  telephone: contactDetails.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kukučínova 142/88",
    addressLocality: "Malacky",
    postalCode: "901 01",
    addressCountry: "SK",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Živý Klub Zdravia",
    template: "%s | Živý Klub Zdravia",
  },
  description:
    "Kurzy varenia, shiatsu, diagnostika zdravia a pravidelné očisty.",
  applicationName: "Živý Klub Zdravia",
  category: "health",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName: "Živý Klub Zdravia",
    title: "Živý Klub Zdravia",
    description:
      "Kurzy varenia, shiatsu, diagnostika zdravia a pravidelné očisty.",
    images: [
      {
        url: "/mirror/site/wp-content/uploads/2025/03/1A2A3734-scaled-1.jpg",
        width: 2048,
        height: 1366,
        alt: "Živý Klub Zdravia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Živý Klub Zdravia",
    description:
      "Kurzy varenia, shiatsu, diagnostika zdravia a pravidelné očisty.",
    images: ["/mirror/site/wp-content/uploads/2025/03/1A2A3734-scaled-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        {fontStylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <SmoothExperience />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SmoothExperience } from "@/components/smooth-experience";
import { siteData } from "@/lib/site-data";

const fontStylesheets = siteData.sharedStylesheets.filter((href) =>
  href.includes("/fonts-google/")
);

export const metadata: Metadata = {
  title: {
    default: "Živý Klub Zdravia",
    template: "%s | Živý Klub Zdravia",
  },
  description:
    "Kurzy varenia, shiatsu, diagnostika zdravia a pravidelné očisty.",
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
      </head>
      <body>
        <SmoothExperience />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

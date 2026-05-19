import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Montisoro | Absence Management & Re-integratie 3.0",
  description:
    "B2B website for Montisoro: verzuimbeheer, sustainable reintegration, KB Re-integratie 3.0 support and absence cost insight for Belgian employers.",
  keywords: [
    "Montisoro",
    "verzuimbeheer",
    "re-integratie",
    "KB Re-integratie 3.0",
    "absence management Belgium",
    "werkbaar werk",
  ],
  openGraph: {
    title: "Montisoro | Verzuimbeheer & Re-integratie",
    description:
      "Professional support for Belgian employers managing absence, reintegration and KB Re-integratie 3.0 obligations.",
    type: "website",
    locale: "nl_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://help.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Help — Therapy & Counselling",
    template: "%s | Help",
  },
  description:
    "Find a therapist and book a consultation session with Google Meet.",
  openGraph: {
    type: "website",
    siteName: "Help",
    locale: "de_DE",
    alternateLocale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

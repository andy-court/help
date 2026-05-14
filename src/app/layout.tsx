import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Help — Therapy & Counselling",
  description:
    "Find a therapist and book a consultation session with Google Meet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

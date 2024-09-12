import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Kaizen",
  description: "Make consistent progress",
};

const fontHeading = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/kaizen-logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          "antialiased font-sans",
          fontHeading.variable,
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}

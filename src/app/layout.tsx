import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
  };
};

const siteConfig: SiteConfig = {
  name: "My Kaizen",
  description:
    "We provide mentorship and community to help entrepreneurs reach their goals faster.",
  url: "https://mykaizen.life/",
  ogImage: "https://mykaizen.life/images/ikigai-chart.jpg",
  links: {
    twitter: "https://x.com/mykaizen_life",
  },
};

export const metadata: Metadata = {
  title: `${siteConfig.name} - Helping entrepreneurs do meaningful work`,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@_reweb",
  },
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

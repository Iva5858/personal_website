import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteUrl } from "@/lib/site";
import { personJsonLd } from "@/lib/person";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Isaac Velez | AI & Robotics",
    template: "%s | Isaac Velez",
  },
  description:
    "Isaac Velez – MS in AI (Robotics & Perception) student at Columbia University. Portfolio, projects in AI, LLMs, and machine learning. New York, NY.",
  keywords: [
    "Isaac Velez",
    "Isaac Vélez",
    "Isaac Velez Aguirre",
    "Isaac Vélez Aguirre",
    "Isaac Aguirre",
    "Data Science",
    "Robotics",
    "Columbia University",
    "University of London",
    "Forward College",
    "machine learning",
    "AI",
    "LLM",
    "portfolio",
    "New York",
  ],
  authors: [{ name: "Isaac Velez", url: siteUrl }],
  creator: "Isaac Velez",
  applicationName: "Isaac Velez",
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Isaac Velez",
    title: "Isaac Velez | AI & Robotics",
    description:
      "Portfolio of Isaac Velez – MSAI student at Columbia University. Projects in AI, LLMs, robotics, and machine learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Velez | AI & Robotics",
    description: "Portfolio – AI, robotics, LLMs, machine learning. MSAI @ Columbia University.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

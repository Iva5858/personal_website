import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Isaac Vélez Aguirre | Data Science & Business Analytics",
    template: "%s | Isaac Vélez Aguirre",
  },
  description:
    "Isaac Vélez Aguirre – Colombian-Spanish student studying Data Science & Business Analytics at the University of London. Portfolio, projects in AI, LLMs, and machine learning. Berlin, Germany.",
  keywords: [
    "Isaac Vélez Aguirre",
    "Isaac Velez Aguirre",
    "Data Science",
    "Business Analytics",
    "University of London",
    "Forward College",
    "machine learning",
    "AI",
    "LLM",
    "portfolio",
    "Berlin",
    "Isaac Velez",
    "Isaac Aguirre",
  ],
  authors: [{ name: "Isaac Vélez Aguirre", url: siteUrl }],
  creator: "Isaac Vélez Aguirre",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Isaac Vélez Aguirre",
    title: "Isaac Vélez Aguirre | Data Science & Business Analytics",
    description:
      "Portfolio of Isaac Vélez Aguirre – Data Science & Business Analytics student. Projects in AI, LLMs, and machine learning.",
    images: [
      {
        url: "/images/isaac_icon.png",
        width: 512,
        height: 512,
        alt: "Isaac Vélez Aguirre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Vélez Aguirre | Data Science & Business Analytics",
    description: "Portfolio – Data Science, AI, LLMs, machine learning. University of London & Forward College.",
    images: ["/images/isaac_icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Isaac Vélez Aguirre",
  alternateName: "Isaac Velez Aguirre",
  url: siteUrl,
  jobTitle: "Data Science & Business Analytics Student",
  description:
    "Colombian-Spanish student at University of London and Forward College. Software Engineer and Data Scientist with experience in AI, ML, and Large Language Models.",
  alumniOf: [
    { "@type": "Organization", name: "University of London" },
    { "@type": "Organization", name: "Forward College" },
  ],
  knowsAbout: ["Data Science", "Machine Learning", "Artificial Intelligence", "Large Language Models", "Business Analytics"],
  image: `${siteUrl}/images/isaac_icon.png`,
  sameAs: [
    "https://linkedin.com/in/isaac-velez",
    "https://github.com/Iva5858",
  ],
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

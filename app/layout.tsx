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
    default: "Isaac Vélez Aguirre | AI & Robotics",
    template: "%s | Isaac Vélez Aguirre",
  },
  description:
    "Isaac Vélez Aguirre – MS in AI (Robotics & Perception) student at Columbia University. Portfolio, projects in AI, LLMs, and machine learning. New York, NY.",
  keywords: [
    "Isaac Vélez Aguirre",
    "Isaac Velez Aguirre",
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
    title: "Isaac Vélez Aguirre | AI & Robotics",
    description:
      "Portfolio of Isaac Vélez Aguirre – MSAI student at Columbia University. Projects in AI, LLMs, robotics, and machine learning.",
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
    title: "Isaac Vélez Aguirre | AI & Robotics",
    description: "Portfolio – AI, robotics, LLMs, machine learning. MSAI @ Columbia University.",
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
  jobTitle: "MS in Artificial Intelligence Student, Robotics & Perception",
  description:
    "Data scientist pursuing an MS in AI at Columbia University, focused on robotics and perception. Experience in software engineering, data science, and AI/LLMs.",
  alumniOf: [
    { "@type": "Organization", name: "University of London" },
    { "@type": "Organization", name: "Forward College" },
  ],
  knowsAbout: ["Artificial Intelligence", "Robotics", "Perception", "Data Science", "Machine Learning", "Large Language Models"],
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

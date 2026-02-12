import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Isaac Vélez Aguirre – Get in touch for opportunities in data science, AI, and machine learning. Berlin, Germany.",
  openGraph: {
    title: "Contact Isaac Vélez Aguirre",
    description: "Contact form and links for Isaac Vélez Aguirre.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

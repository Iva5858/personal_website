import { siteUrl } from "./site";

export const personSchema = {
  "@type": "Person",
  name: "Isaac Velez",
  alternateName: ["Isaac Vélez Aguirre", "Isaac Velez Aguirre", "Isaac Vélez", "Isaac Aguirre"],
  url: siteUrl,
  jobTitle: "MS in Artificial Intelligence Student, Robotics & Perception",
  description:
    "Data scientist pursuing an MS in AI at Columbia University, focused on robotics and perception. Experience in software engineering, data science, and AI/LLMs.",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Columbia University" },
    { "@type": "CollegeOrUniversity", name: "University of London" },
    { "@type": "CollegeOrUniversity", name: "Forward College" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Robotics",
    "Perception",
    "Data Science",
    "Machine Learning",
    "Large Language Models",
    "Software Engineering",
  ],
  image: `${siteUrl}/images/isaac_icon.png`,
  sameAs: [
    "https://linkedin.com/in/isaac-velez",
    "https://github.com/Iva5858",
  ],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  ...personSchema,
};

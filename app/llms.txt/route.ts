import { projects } from "@/app/projects/data";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://isaac-velez.com");

export const dynamic = "force-static";

export function GET() {
  const projectEntries = projects
    .map((p) => {
      const link = p.githubUrl
        ? `[GitHub](${p.githubUrl})`
        : p.externalLink
        ? `[Link](${p.externalLink})`
        : null;

      const status = p.current
        ? "Status: Active / currently being developed"
        : p.timeframe.includes("Present")
        ? "Status: Ongoing"
        : `Status: Completed (${p.timeframe})`;

      const techs = p.technologies.join(", ");

      return [
        `### ${p.title}`,
        `- URL: ${baseUrl}/projects/${p.id}`,
        link ? `- ${link}` : null,
        `- Category: ${p.category}`,
        `- Timeframe: ${p.timeframe}`,
        `- ${status}`,
        `- Technologies: ${techs}`,
        ``,
        p.description,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n---\n\n");

  const body = `# Isaac Vélez Aguirre – Portfolio

> MS in Artificial Intelligence student (Columbia University, Robotics & Perception). Based in New York, NY.
> Interests: robotics, perception, machine learning, statistical computing, LLMs.

- Homepage: ${baseUrl}
- Projects: ${baseUrl}/projects
- Résumé: ${baseUrl}/resume
- Contact: ${baseUrl}/contact
- Sitemap: ${baseUrl}/sitemap.xml

## About

Isaac Vélez Aguirre is an MS in Artificial Intelligence student at Columbia University, focused on robotics and perception, currently based in New York, NY. He holds a BSc in Data Science & Business Analytics from the University of London and has interned at Opplane and Autsai. He works across Python, R, and machine learning. His portfolio spans personal ML research frameworks, university coursework projects, and applied AI products.

## Projects

${projectEntries}

## Technical profile

- Languages: Python, R, TypeScript
- ML / Stats: scikit-learn, XGBoost, LightGBM, CatBoost, tidymodels, ggplot2
- Web: Next.js, React, Tailwind CSS
- Tools: Optuna, SHAP, Pandas, NumPy, Selenium
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}

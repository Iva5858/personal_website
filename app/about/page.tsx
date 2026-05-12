import type { Metadata } from "next";
import { AnimateIn } from "@/app/components/AnimateIn";
import { TimelineSection } from "@/app/components/TimelineSection";
import type { TimelineEntry } from "@/app/components/TimelineSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Isaac Vélez Aguirre – Data Science & Business Analytics student at University of London and Forward College. Education, experience, and background. Berlin, Germany.",
  openGraph: {
    title: "About Isaac Vélez Aguirre",
    description:
      "Bio, education, and experience of Isaac Vélez Aguirre – Data Science, AI, and Business Analytics.",
  },
};

const education: TimelineEntry[] = [
  {
    title: "BSc, Data Science and Business Analytics",
    subtitle: "University of London / London School of Economics (LSE)",
    period: "Sep 2023 – Jul 2026",
    note: "Studying data science methodologies, statistical analysis, and business analytics.",
  },
  {
    title: "Bachelor's in Social Sciences & Technology, Business & Leadership",
    subtitle: "Forward College",
    period: "Sep 2023 – Jul 2026",
    note: "Combining business leadership with technological innovation.",
  },
  {
    title: "European Innovation Academy",
    period: "Jul 2024 – Aug 2024",
  },
  {
    title: "Y Combinator Startup School Europe 2024",
    period: "Nov 2024",
  },
];

const experience: TimelineEntry[] = [
  {
    title: "AI / Data Science Intern",
    subtitle: "Opplane",
    period: "Jun 2025 – Sep 2025 · 4 months",
    location: "Medellín, Colombia",
  },
  {
    title: "Founding Data Scientist & Software Developer",
    subtitle: "Autsai",
    period: "Sep 2024 – Apr 2025 · 8 months",
    location: "Paris, France",
  },
  {
    title: "AI / Data Science Intern",
    subtitle: "Opplane",
    period: "Jun 2024 – Aug 2024 · 3 months",
    location: "Lisbon, Portugal",
    note: "Gained hands-on experience with LLMs and prompt engineering.",
  },
  {
    title: "Web Summit Scholar",
    subtitle: "Web Summit",
    period: "Nov 2023",
    location: "Lisbon, Portugal",
    note: "Attended as part of the scholarship program. Explored tech startups, AI/ML, and SaaS.",
  },
  {
    title: "Junior Software Engineer",
    subtitle: "Bonnett Analytics",
    period: "Nov 2022 – May 2023 · 7 months",
    location: "Medellín, Colombia",
  },
  {
    title: "Intern",
    subtitle: "Auteco",
    period: "Jun 2022 – Apr 2023 · 11 months",
    location: "Medellín, Colombia",
    note: "Built a demo chatbot for remote motorcycle theft-prevention using Trakku's services.",
  },
];

const modules = [
  "Machine Learning",
  "Business Analytics, Applied Modelling and Prediction",
  "Statistical Methods for Market Research",
  "Strategy",
  "Advanced Statistics: Distribution Theory",
  "Advanced Statistics: Statistical Inference",
  "Programming for Data Science",
  "Elements of Econometrics",
  "Core Management Concepts",
  "Mathematical Methods",
  "Introduction to Mathematical Statistics",
  "Introduction to Economics",
  "Business and Management in a Global Context",
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="-mt-20 pt-20 relative pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
              About Me
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-slate-900 dark:text-slate-100">
              Hello, I&apos;m Isaac!
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Colombian-Spanish student passionate about data science, AI, and turning insights into action
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Bio + Modules ────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            <AnimateIn delay={0.05}>
              <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-slate-100">Background</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  I&apos;m a Colombian-Spanish third-year student studying Data Science &amp; Business Analytics
                  at the University of London and Business &amp; Leadership at Forward College.
                  I am passionate and curious, constantly seeking opportunities for personal growth and learning.
                </p>
                <p>
                  Currently applying to master&apos;s programs for Fall 2026 to expand my skills. I have experience
                  as a Software Engineer and Data Scientist, working with AI/ML technologies and Large Language Models.
                </p>
                <p>
                  I am always open to new opportunities that allow me to learn and grow. My journey in tech has been
                  driven by curiosity and a desire to make meaningful contributions through data-driven solutions.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold mb-1 text-slate-900 dark:text-slate-100">
                  Data Science &amp; Business Analytics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Degree designed &amp; evaluated by the London School of Economics and Political Science (LSE)
                </p>
                <ul className="space-y-1.5">
                  {modules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            <div>
              <AnimateIn>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
                  Academic
                </span>
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">Education</h2>
              </AnimateIn>
              <TimelineSection entries={education} />
            </div>

            <div>
              <AnimateIn delay={0.05}>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
                  Professional
                </span>
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">Experience</h2>
              </AnimateIn>
              <TimelineSection entries={experience} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

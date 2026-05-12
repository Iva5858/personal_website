import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "./data";
import { AnimateIn } from "@/app/components/AnimateIn";
import { ProjectsGrid } from "@/app/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Isaac Vélez Aguirre – Data science, machine learning, AI, and LLM portfolio. Wordle solver, MNIST, statistical computing, and more.",
  openGraph: {
    title: "Projects | Isaac Vélez Aguirre",
    description: "Portfolio of data science and ML projects by Isaac Vélez Aguirre.",
  },
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="-mt-20 pt-20 relative pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-slate-900 dark:text-slate-100">
              My Projects
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Data science, machine learning, and AI projects built across my studies and internships
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimateIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900 dark:text-slate-100">
              Interested in collaborating?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              Get In Touch
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}

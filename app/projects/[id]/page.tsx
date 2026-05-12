import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "../data";
import { AnimateIn } from "@/app/components/AnimateIn";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id.toString() }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(parseInt(id, 10));
  if (!project) return { title: "Project" };
  const shortDesc = project.description.length > 160
    ? project.description.slice(0, 157) + "..."
    : project.description;
  return {
    title: project.title,
    description: shortDesc,
    openGraph: {
      title: `${project.title} | Isaac Vélez Aguirre`,
      description: shortDesc,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(parseInt(id, 10));
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="-mt-20 pt-20 relative pb-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <AnimateIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 mb-6 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg">
                {project.category}
              </span>
              {project.interactive && (
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Interactive
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
              {project.title}
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500">{project.timeframe}</p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Main — 2/3 */}
            <div className="md:col-span-2 space-y-8">
              <AnimateIn delay={0.05}>
                <h2 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">About This Project</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
              </AnimateIn>

              {project.details && (
                <AnimateIn delay={0.1}>
                  <h2 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">Project Details</h2>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                      {project.details}
                    </p>
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* Sidebar — 1/3 */}
            <div className="space-y-5">
              <AnimateIn from="right" delay={0.08}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold mb-3 text-slate-900 dark:text-slate-100">Technologies</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn from="right" delay={0.14}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold mb-3 text-slate-900 dark:text-slate-100">Project Info</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5 uppercase tracking-wide">Category</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5 uppercase tracking-wide">Timeframe</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{project.timeframe}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn from="right" delay={0.2}>
                <div className="space-y-2">
                  {project.githubUrl && !project.externalLink && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-700 dark:hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {!project.interactive && project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Link
                    </a>
                  )}
                  {project.demoUrl && project.interactive && (
                    <Link
                      href={project.demoUrl}
                      className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      Try Demo
                    </Link>
                  )}
                  <Link
                    href="/projects"
                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 text-center block cursor-pointer"
                  >
                    ← Back to Projects
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

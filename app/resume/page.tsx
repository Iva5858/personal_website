import type { Metadata } from "next";
import { AnimateIn } from "@/app/components/AnimateIn";

// Bump this whenever public/Velez_Isaac_Resume_Website.pdf is replaced with a new version.
const RESUME_LAST_UPDATED = "September 14, 2026";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Isaac Vélez Aguirre.",
  openGraph: {
    title: "Résumé of Isaac Vélez Aguirre",
    description: "Résumé of Isaac Vélez Aguirre.",
  },
};

export default function Resume() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="-mt-20 pt-20 relative pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
              Résumé
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-slate-900 dark:text-slate-100">
              My Résumé
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
              Last updated {RESUME_LAST_UPDATED}
            </p>
            <a
              href="/Velez_Isaac_Resume_Website.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* ── PDF viewer ───────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn delay={0.05}>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/10 dark:shadow-black/40 bg-slate-50 dark:bg-slate-900">
              <object
                data="/Velez_Isaac_Resume_Website.pdf"
                type="application/pdf"
                className="w-full h-[80vh]"
                aria-label="Isaac Vélez Aguirre's résumé"
              >
                <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  Your browser can&apos;t display the PDF inline.{' '}
                  <a
                    href="/Velez_Isaac_Resume_Website.pdf"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Open it directly
                  </a>
                  {' '}instead.
                </div>
              </object>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}

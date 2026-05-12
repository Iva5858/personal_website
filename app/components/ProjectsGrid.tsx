'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/app/projects/data';

/* ─── Per-card 3-D tilt wrapper ──────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const cfg = { stiffness: 280, damping: 28, mass: 0.5 };
  const rotateX = useSpring(rawX, cfg);
  const rotateY = useSpring(rawY, cfg);

  // Glare highlight position
  const glareX = useTransform(rawY, [-8, 8], ['30%', '70%']);
  const glareY = useTransform(rawX, [8, -8], ['20%', '80%']);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;   // −0.5 … 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rawX.set(-ny * 9);   // tilt around X (vertical drag → rotateX)
    rawY.set(nx * 9);    // tilt around Y (horizontal drag → rotateY)
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className ?? ''}`}
    >
      {children}

      {/* Glare layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]: (string | number)[]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 55%)`
          ),
        }}
      />
    </motion.div>
  );
}

/* ─── Card entrance variants ──────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Grid ────────────────────────────────────────────── */
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <TiltCard className="group h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/8 transition-[border-color,box-shadow] duration-300 flex flex-col cursor-pointer">

            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  project.id === 4 || project.id === 5 ? 'object-contain p-4' : 'object-cover'
                }`}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-lg leading-none">
                  {project.category}
                </span>
                {project.interactive && (
                  <span className="px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1 leading-none">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    Live
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow" style={{ transform: 'translateZ(20px)' }}>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">{project.timeframe}</p>
              <h3 className="text-sm font-bold mb-2 text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs rounded-md">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex-1 px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-700 dark:hover:bg-white transition-colors duration-200 text-center"
                  >
                    View Details
                  </Link>
                  {project.githubUrl && !project.externalLink && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
                {!project.interactive && project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors duration-200 text-center flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Link
                  </a>
                )}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}

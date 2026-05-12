'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import isaacIcon from '../public/images/isaac_icon.png';
import { projects } from './projects/data';
import { ParticleField } from './components/ParticleField';
import { ScrambleText } from './components/ScrambleText';
import { ProjectsGrid } from './components/ProjectsGrid';

/* ─── Typewriter ─────────────────────────────────────── */
const ROLES = ['Data Scientist (Almost...)', 'Aspiring AI/ML Engineer', 'Self Taught Software Developer'];

function useTypewriter(words: string[]) {
  const [state, setState] = useState({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    const { wi, ci, del } = state;
    const word = words[wi];
    const delay = !del && ci < word.length ? 70 : !del ? 1800 : ci > 0 ? 40 : 120;

    const t = setTimeout(() => {
      setState((s) => {
        const { wi, ci, del } = s;
        const w = words[wi];
        if (!del && ci < w.length) return { ...s, ci: ci + 1 };
        if (!del)                  return { ...s, del: true };
        if (del && ci > 0)         return { ...s, ci: ci - 1 };
        return { wi: (wi + 1) % words.length, ci: 0, del: false };
      });
    }, delay);

    return () => clearTimeout(t);
  }, [state, words]);

  return words[state.wi].slice(0, state.ci);
}

/* ─── Animated counter ───────────────────────────────── */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1400;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(to);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Hero stagger ───────────────────────────────────── */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─── Scroll reveal ──────────────────────────────────── */
function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  const typed = useTypewriter(ROLES);

  const stats = [
    { value: 5,  suffix: '',  label: 'Projects' },
    { value: 3,  suffix: '+', label: 'Years Working in the Field' },
    { value: 4,  suffix: '',  label: 'Internships' },
    { value: 2,  suffix: '',  label: 'Universities' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="-mt-20 pt-20 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950">

        {/* Interactive particle network */}
        <ParticleField />

        {/* Ambient orbs behind particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[110px]" />
          <div className="orb-2 absolute top-1/2 -right-32 w-[440px] h-[440px] rounded-full bg-cyan-500/8 dark:bg-cyan-500/6 blur-[110px]" />
          <div className="orb-3 absolute -bottom-24 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/8 dark:bg-violet-500/6 blur-[110px]" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >

          {/* Photo with spinning ring */}
          <motion.div variants={heroItem} className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div
                className="animate-spin-slow absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #6366f1, #22d3ee, #a855f7, #6366f1)' }}
              />
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-full blur-lg bg-indigo-500/25 dark:bg-indigo-500/18 scale-110" />
              {/* Photo */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900">
                <Image src={isaacIcon} alt="Isaac Vélez Aguirre" fill sizes="128px" className="object-cover rounded-full" priority />
              </div>
            </div>
          </motion.div>

          {/* Name — scramble decode effect */}
          <motion.div variants={heroItem}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 tracking-tight">
              <span className="text-slate-900 dark:text-slate-100">
                <ScrambleText text="Isaac" delay={0.2} />
              </span>
              {' '}
              <ScrambleText
                text="Vélez Aguirre"
                className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 gradient-shift"
                delay={0.5}
              />
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.p
            variants={heroItem}
            className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2 h-8"
          >
            <span className="text-indigo-600 dark:text-indigo-400">{typed}</span>
            <span className="animate-blink text-indigo-400">|</span>
          </motion.p>

          {/* Location */}
          <motion.p variants={heroItem} className="text-sm text-slate-400 dark:text-slate-500 mb-9">
            University of London &amp; Forward College &middot; Berlin, Germany
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
            <Link
              href="/projects"
              className="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social */}
          <motion.div variants={heroItem} className="flex gap-2 justify-center">
            <a
              href="https://github.com/Iva5858"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 text-sm font-medium cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/isaac-velez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 text-sm font-medium cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600 text-xs select-none pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span>scroll</span>
          <svg className="w-4 h-4 animate-bounce-y" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS ROW
      ══════════════════════════════════════════════════ */}

      {/*}

      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, suffix, label }, i) => (
              <SectionReveal key={label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    <CountUp to={value} suffix={suffix} />
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      */}

      {/* ══════════════════════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SectionReveal delay={0.05}>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-slate-900 dark:text-slate-100 leading-tight">
                Colombian-Spanish student<br className="hidden sm:block" /> exploring AI &amp; data
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                I&apos;m a third-year student at the University of London studying Data Science &amp; Business Analytics,
                passionate about AI, machine learning, and turning data into meaningful insight.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-7 leading-relaxed">
                Currently applying to master&apos;s programs for Fall 2026. I have hands-on experience as a
                Software Engineer and Data Scientist, working with AI/ML technologies and Large Language Models.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-white transition-colors duration-200 cursor-pointer text-sm"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </SectionReveal>

            <SectionReveal
              delay={0.15}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40"
            >
              <Image src={isaacIcon} alt="Isaac Vélez Aguirre" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200 cursor-pointer"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </SectionReveal>

          <ProjectsGrid projects={projects.slice(0, 3)} />

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-white transition-colors duration-200 cursor-pointer text-sm"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900 dark:text-slate-100">
              Open to opportunities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              I&apos;m always interested in discussing new projects, research collaborations, or internship opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

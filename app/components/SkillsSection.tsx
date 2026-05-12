'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  {
    label: 'Languages',
    items: ['Python', 'R', 'TypeScript', 'JavaScript'],
  },
  {
    label: 'Data Science',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Statistical Analysis', 'Econometrics'],
  },
  {
    label: 'ML & AI',
    items: ['Machine Learning', 'Neural Networks', 'Information Theory', 'Optimization', 'LLMs', 'Prompt Engineering'],
  },
  {
    label: 'Tools & Frameworks',
    items: ['Next.js', 'React', 'Selenium', 'CrewAI', 'Jupyter', 'Git'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 350, damping: 20 },
  },
};

function SkillCard({ group, index }: { group: (typeof skills)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="bg-white dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors duration-200"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
        {group.label}
      </p>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: index * 0.08 + 0.2 } },
        }}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {group.items.map((item) => (
          <motion.span
            key={item}
            variants={badgeVariants}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((group, i) => (
        <SkillCard key={group.label} group={group} index={i} />
      ))}
    </div>
  );
}

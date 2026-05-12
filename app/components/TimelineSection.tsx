'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  period: string;
  location?: string;
  note?: string;
}

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-indigo-400"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.09 + 0.15, type: 'spring', stiffness: 400, damping: 15 }}
      />

      <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400 mb-1">{entry.period}</p>
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-0.5">{entry.title}</h3>
      {entry.subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          {entry.subtitle}
          {entry.location && <> &middot; {entry.location}</>}
        </p>
      )}
      {entry.note && (
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{entry.note}</p>
      )}
    </motion.div>
  );
}

export function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
      {entries.map((entry, i) => (
        <TimelineItem key={i} entry={entry} index={i} />
      ))}
    </div>
  );
}

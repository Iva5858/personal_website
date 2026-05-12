'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right' | 'top' | 'none';
  blur?: boolean;
  once?: boolean;
}

const offsets = {
  bottom: { y: 44, x: 0 },
  top:    { y: -44, x: 0 },
  left:   { y: 0, x: -44 },
  right:  { y: 0, x: 44 },
  none:   { y: 0, x: 0 },
};

export function AnimateIn({
  children,
  className = '',
  delay = 0,
  from = 'bottom',
  blur = true,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...offsets[from],
        ...(blur ? { filter: 'blur(6px)' } : {}),
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
          : {}
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

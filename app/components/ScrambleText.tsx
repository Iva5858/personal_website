'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|';
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function ScrambleText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const hasRun = useRef(false);

  // Initialize with the real text so server and client agree — no hydration mismatch.
  // The scramble starts client-side inside useEffect after hydration is done.
  const [output, setOutput] = useState<string[]>(() => text.split(''));

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const chars = text.split('');
    const totalFrames = Math.max(30, chars.length * 2.2);
    let frame = 0;
    let stepTimeout: ReturnType<typeof setTimeout>;

    // Immediately jump to fully scrambled before the animation starts
    setOutput(chars.map((c) => (c === ' ' ? ' ' : rand())));

    const step = () => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * chars.length);

      setOutput(
        chars.map((c, i) => {
          if (c === ' ') return ' ';
          if (i < revealed) return c;          // lock-in left-to-right
          return rand();                        // still scrambled
        })
      );

      if (frame < totalFrames) {
        // Slow down slightly toward the end for a satisfying lock-in
        const interval = 16 + Math.max(0, 28 - (frame / totalFrames) * 28);
        stepTimeout = setTimeout(step, interval);
      } else {
        setOutput(chars);
      }
    };

    const startTimeout = setTimeout(step, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(stepTimeout);
    };
  }, [isInView, text, delay]);

  return (
    // Outer span is inline-block so it can be measured; width is set by the
    // invisible ghost (final text), keeping layout stable while characters scramble.
    <span ref={ref} className="inline-block relative whitespace-nowrap" aria-label={text}>
      {/* Ghost — invisible but still takes up space, locks the width */}
      <span className={`${className} invisible select-none`} aria-hidden="true">
        {text}
      </span>
      {/* Scrambled output — sits on top of the ghost */}
      <span className={`${className} absolute inset-0`} aria-hidden="true">
        {output.join('')}
      </span>
    </span>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let raf: number;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        visible = true;
        el.style.opacity = '1';
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    const tick = () => {
      // Lerp — smooth lag behind cursor
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      el.style.transform = `translate(${currentX - 320}px, ${currentY - 320}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 w-[640px] h-[640px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(99,102,241,0.055) 0%, rgba(139,92,246,0.025) 35%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}

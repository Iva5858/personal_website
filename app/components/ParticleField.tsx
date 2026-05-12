'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  opacity: number;
}

const REPEL_RADIUS = 170;   // px — zone of influence
const REPEL_FORCE  = 0.11;  // strength (quadratic, so very punchy near cursor)
const SPEED_CAP    = 9;     // max px / frame when repelled
const DRIFT_BACK   = 0.022; // how fast particles return (lower = lingers longer)
const MAX_DIST     = 115;   // max px for drawing connection lines

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef<number>(0);
  const isDark = useRef(false);

  const spawn = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 12000), 100);
    particles.current = Array.from({ length: count }, () => {
      const baseVx = (Math.random() - 0.5) * 0.4;
      const baseVy = (Math.random() - 0.5) * 0.4;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radius: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.4 + 0.4,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDark.current = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      spawn(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999, active: false };
    };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const rgb     = isDark.current ? '139,92,246' : '99,102,241';
      const mx      = mouse.current.x;
      const my      = mouse.current.y;
      const active  = mouse.current.active;
      const ps      = particles.current;

      /* ── update & draw particles ── */
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        if (active) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const md  = Math.sqrt(mdx * mdx + mdy * mdy);

          if (md < REPEL_RADIUS && md > 0) {
            // Quadratic falloff: force is much stronger close to cursor
            const t = (REPEL_RADIUS - md) / REPEL_RADIUS;  // 0 → 1 as md → 0
            const f = t * t * REPEL_FORCE;
            p.vx += (mdx / md) * f;
            p.vy += (mdy / md) * f;
          }
        }

        // Drift back toward ambient velocity (slow, so effect lingers)
        p.vx += (p.baseVx - p.vx) * DRIFT_BACK;
        p.vy += (p.baseVy - p.vy) * DRIFT_BACK;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > SPEED_CAP) { p.vx *= SPEED_CAP / spd; p.vy *= SPEED_CAP / spd; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;  if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;  if (p.y > h) p.y = 0;

        // Scale up dot & boost opacity when near cursor
        let drawRadius  = p.radius;
        let drawOpacity = p.opacity;
        if (active) {
          const dd = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
          if (dd < REPEL_RADIUS) {
            const boost = 1 - dd / REPEL_RADIUS;
            drawRadius  = p.radius  * (1 + boost * 1.4);
            drawOpacity = Math.min(1, p.opacity + boost * 0.55);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${drawOpacity})`;
        ctx.fill();
      }

      /* ── connection lines ── */
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${rgb},${0.2 * (1 - d / MAX_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }


      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [spawn]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
    />
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div
        className={`max-w-5xl mx-auto rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-slate-200/80 dark:border-slate-700/50 shadow-md shadow-black/8 dark:shadow-black/40'
            : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/40 shadow-sm shadow-black/5 dark:shadow-black/20'
        }`}
      >
        <div className="px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 tracking-tight"
          >
            Isaac Vélez
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={isOpen ? 'open' : 'closed'}
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mt-1 ${
                      pathname === item.href
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

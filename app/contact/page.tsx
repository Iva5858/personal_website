'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fieldVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const infoVariants = {
  hidden: { opacity: 0, x: 28 },
  show: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, delay: i * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

    if (!accessKey) {
      setSubmitStatus({
        type: 'error',
        message: 'Form configuration error. Please contact me directly via email.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Personal Website Contact Form',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Thank you! I will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Failed to send. Please try again or reach out via email.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20';

  const contactItems = [
    {
      label: 'Email',
      value: 'isaacvelezaguirre@gmail.com',
      href: 'mailto:isaacvelezaguirre@gmail.com',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    {
      label: 'Location',
      value: 'Berlin, Germany',
      href: null,
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ),
    },
    {
      label: 'Response Time',
      value: 'Usually within 24 hours',
      href: null,
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
  ];

  const fields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="-mt-20 pt-20 relative pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 block">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-slate-900 dark:text-slate-100">
              Get In Touch
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Form */}
            <div>
              <motion.h2
                className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Send a Message
              </motion.h2>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-5 p-4 rounded-xl border text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {fields.map((field, i) => (
                  <motion.div
                    key={field.id}
                    custom={i}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <label htmlFor={field.id} className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={inputBase}
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="show">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    disabled={isSubmitting}
                    className={`${inputBase} resize-none`}
                    placeholder="Your message…"
                  />
                </motion.div>

                <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="show">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>

            {/* Info */}
            <div>
              <motion.h2
                className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Contact Info
              </motion.h2>

              <div className="space-y-5 mb-8">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={infoVariants}
                    initial="hidden"
                    animate="show"
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 dark:text-slate-300">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Social</p>
                <div className="flex gap-2">
                  <motion.a
                    href="https://linkedin.com/in/isaac-velez"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://github.com/Iva5858"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// components/sections/Contact.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    /* Mailto fallback — replace with your preferred API/form service */
    await new Promise((res) => setTimeout(res, 1000));
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\n\n${data.message}`)}`;
    window.location.href = mailtoLink;
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  const socials = [
    { icon: Github,   label: 'GitHub',   href: personalInfo.github,   color: '#00f3ff' },
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin, color: '#0077B5' },
    { icon: Mail,     label: 'Email',    href: `mailto:${personalInfo.email}`, color: '#00ff88' },
  ];

  return (
    <SectionWrapper id="contact" label="contact" className="bg-[#050508]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            Get In <span className="gradient-text-cyber">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-jetbrains text-sm max-w-md mx-auto"
          >
            Open to opportunities, collaborations, and interesting projects.
            Let&apos;s build something remarkable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Location */}
            <div className="glass rounded-xl border border-white/[0.07] p-5">
              <div className="flex items-center gap-2 text-[#00f3ff] font-orbitron font-semibold text-sm mb-3">
                <MapPin size={16} /> Location
              </div>
              <p className="text-slate-300 font-jetbrains text-sm">{personalInfo.location}</p>
              <p className="text-slate-500 font-jetbrains text-xs mt-1">IST (UTC+5:30)</p>
            </div>

            {/* Availability */}
            <div className="glass rounded-xl border border-[#00ff88]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-orbitron font-semibold text-sm text-[#00ff88]">Available</span>
              </div>
              <p className="text-slate-300 text-sm">
                Open to full-time roles, internships, and freelance projects.
              </p>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-2">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 glass rounded-lg border border-white/[0.06] hover:border-white/[0.15] transition-all duration-200 group"
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs font-jetbrains text-slate-500 group-hover:text-slate-300 transition-colors">
                      {href.replace('https://', '').replace('mailto:', '')}
                    </p>
                  </div>
                  <span className="ml-auto text-slate-600 group-hover:text-slate-300 transition-colors">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-xl border border-white/[0.07] p-6 sm:p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-jetbrains text-slate-400 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Your name"
                    className={cn(
                      'w-full bg-white/[0.04] border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 font-jetbrains outline-none transition-all duration-200 focus:border-[#00f3ff]/60 focus:shadow-[0_0_15px_rgba(0,243,255,0.15)]',
                      errors.name ? 'border-red-500/50' : 'border-white/[0.08]'
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1 font-jetbrains flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-jetbrains text-slate-400 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={cn(
                      'w-full bg-white/[0.04] border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 font-jetbrains outline-none transition-all duration-200 focus:border-[#00f3ff]/60 focus:shadow-[0_0_15px_rgba(0,243,255,0.15)]',
                      errors.email ? 'border-red-500/50' : 'border-white/[0.08]'
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 font-jetbrains flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-jetbrains text-slate-400 mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  placeholder="What's this about?"
                  className={cn(
                    'w-full bg-white/[0.04] border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 font-jetbrains outline-none transition-all duration-200 focus:border-[#00f3ff]/60 focus:shadow-[0_0_15px_rgba(0,243,255,0.15)]',
                    errors.subject ? 'border-red-500/50' : 'border-white/[0.08]'
                  )}
                />
                {errors.subject && (
                  <p className="text-xs text-red-400 mt-1 font-jetbrains flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-jetbrains text-slate-400 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className={cn(
                    'w-full bg-white/[0.04] border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 font-jetbrains outline-none transition-all duration-200 resize-none focus:border-[#00f3ff]/60 focus:shadow-[0_0_15px_rgba(0,243,255,0.15)]',
                    errors.message ? 'border-red-500/50' : 'border-white/[0.08]'
                  )}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1 font-jetbrains flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold font-jetbrains text-sm text-black bg-[#00f3ff] hover:bg-[#00d4e0] disabled:opacity-60 transition-all duration-200 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
              >
                {status === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-sm font-jetbrains"
                  >
                    <CheckCircle size={16} />
                    Opening your email client. Message ready to send!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jetbrains text-slate-600"
        >
          <span>© 2026 Aditya Agarwal. Built with Next.js + R3F + GSAP.</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            All systems operational
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

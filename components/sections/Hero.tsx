// components/sections/Hero.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import HUDCard from '@/components/ui/HUDCard';
import GlowButton from '@/components/ui/GlowButton';
import { personalInfo } from '@/lib/data';
import { isWebGLAvailable } from '@/lib/utils';

/* ─── Dynamic WebGL import (ssr: false) ────────────────────────── */
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#050508] cyber-grid" />
  ),
});

/* ─── Terminal Typing Hook ─────────────────────────────────────── */
const LINES = [
  '> Initialising aditya.exe...',
  '> Loading skills: React, Next.js, Node, AWS',
  '> Running CI/CD pipeline... ✓ ZERO BUGS',
  '> Connecting to OpenAI API... ✓ ONLINE',
  '> System ready. Welcome.',
];

function useTerminalTyping() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= LINES.length) { setDone(true); return; }
    const target = LINES[lineIdx];
    if (charIdx < target.length) {
      const t = setTimeout(() => {
        setCurrent(target.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, target]);
        setCurrent('');
        setCharIdx(0);
        setLineIdx(l => l + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  return { lines, current, done };
}

/* ─── Hero Section ─────────────────────────────────────────────── */
export default function Hero() {
  const [webgl, setWebgl] = useState(true);
  const { lines, current, done } = useTerminalTyping();

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── WebGL Background ── */}
      {webgl ? (
        <HeroCanvas />
      ) : (
        <div className="absolute inset-0 bg-[#050508] cyber-grid" />
      )}

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-transparent to-[#050508] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/50 via-transparent to-[#050508]/50 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 pt-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left — Main Text */}
        <div className="flex-1 max-w-2xl">
          {/* Location chip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-jetbrains text-slate-400 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            {personalInfo.location} · Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-orbitron text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.1] mb-4"
          >
            <span className="block text-white">ADITYA</span>
            <span className="block gradient-text-cyber text-glow-cyan">AGARWAL</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-jetbrains text-[#00f3ff] text-lg mb-2 flex items-center gap-2"
          >
            <Terminal size={16} />
            <span>Full-Stack Engineer</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">AI Integrations</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
          >
            Building at the intersection of{' '}
            <span className="text-[#00f3ff]">systems</span>,{' '}
            <span className="text-[#a855f7]">AI</span> &{' '}
            <span className="text-[#00ff88]">the web</span>.
            Transforming ideas into scalable, production-grade products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <GlowButton href="#projects" variant="cyan">
              View Projects
            </GlowButton>
            <GlowButton href="#contact" variant="outline">
              Get In Touch
            </GlowButton>
            <GlowButton href="mailto:agarwaladitya9634@gmail.com" variant="purple" external>
              <Mail size={15} /> Email Me
            </GlowButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-4"
          >
            {[
              { icon: Github,   href: personalInfo.github,   label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail,     href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded glass border border-white/10 text-slate-400 hover:text-[#00f3ff] hover:border-[#00f3ff]/40 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — Terminal + HUD Cards */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 max-w-lg w-full flex flex-col gap-4"
        >
          {/* Terminal Box */}
          <div className="glass rounded-xl border border-white/[0.07] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-jetbrains text-slate-500 ml-2">aditya@portfolio ~ bash</span>
            </div>
            {/* Terminal body */}
            <div className="p-4 font-jetbrains text-xs sm:text-sm text-[#00f3ff] min-h-[180px]">
              {lines.map((line, i) => (
                <div key={i} className="mb-1">
                  <span className="text-[#8a2be2]">$</span>{' '}
                  <span className="text-slate-300">{line.slice(2)}</span>
                </div>
              ))}
              {!done && (
                <div>
                  <span className="text-[#8a2be2]">$</span>{' '}
                  <span className="text-slate-300">{current.slice(2)}</span>
                  <span className="terminal-cursor" />
                </div>
              )}
              {done && (
                <div className="mt-2 text-[#00ff88]">
                  ✓ All systems operational
                </div>
              )}
            </div>
          </div>

          {/* HUD Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <HUDCard value="60 FPS"  label="Physics Engine" icon="🎮" color="cyan"   delay={0.6} />
            <HUDCard value="B.Tech"  label="CSE ('27)"     icon="🎓" color="purple" delay={0.7} />
            <HUDCard value="Full-Stack" label="Systems & AI" icon="⚙" color="emerald" delay={0.8} />
            <HUDCard value="AWS ✓"   label="Certified"     icon="☁" color="cyan"    delay={0.9} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-jetbrains">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#00f3ff] to-transparent"
        />
      </motion.div>
    </section>
  );
}

// components/ui/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-strong border-b border-white/[0.06] shadow-lg shadow-black/40'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-orbitron text-lg font-bold gradient-text-cyber cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNav('#hero')}
        >
          AA<span className="text-[#00f3ff]">.</span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium font-jetbrains transition-colors rounded',
                  active === link.href
                    ? 'text-[#00f3ff]'
                    : 'text-slate-400 hover:text-[#00f3ff]'
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded bg-[#00f3ff]/10 border border-[#00f3ff]/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:agarwaladitya9634@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-[#00f3ff] rounded hover:bg-[#00d4e0] transition-all glow-cyan font-jetbrains"
        >
          Hire Me
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-[#00f3ff] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/[0.06]"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-3 py-2 text-sm font-jetbrains text-slate-300 hover:text-[#00f3ff] hover:bg-[#00f3ff]/10 rounded transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:agarwaladitya9634@gmail.com"
                  className="block text-center px-4 py-2 text-sm font-semibold text-black bg-[#00f3ff] rounded hover:bg-[#00d4e0] transition-all font-jetbrains"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

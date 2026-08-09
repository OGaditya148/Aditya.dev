// components/ui/GlowButton.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'cyan' | 'purple' | 'emerald' | 'outline';
  className?: string;
  external?: boolean;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'cyan',
  className,
  external,
}: GlowButtonProps) {
  const variants = {
    cyan: 'bg-[#00f3ff] text-black hover:bg-[#00d4e0] shadow-[0_0_20px_rgba(0,243,255,0.5)]',
    purple: 'bg-[#8a2be2] text-white hover:bg-[#7c3aed] shadow-[0_0_20px_rgba(138,43,226,0.5)]',
    emerald: 'bg-[#00ff88] text-black hover:bg-[#00e87a] shadow-[0_0_20px_rgba(0,255,136,0.5)]',
    outline:
      'bg-transparent text-[#00f3ff] border border-[#00f3ff] hover:bg-[#00f3ff]/10 shadow-[0_0_15px_rgba(0,243,255,0.2)]',
  };

  const baseClass = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded font-semibold font-jetbrains text-sm transition-all duration-200 active:scale-95',
    variants[variant],
    className
  );

  const content = (
    <motion.span
      className={baseClass}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return <button onClick={onClick}>{content}</button>;
}

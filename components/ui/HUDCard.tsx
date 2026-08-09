// components/ui/HUDCard.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HUDCardProps {
  value: string;
  label: string;
  icon?: string;
  color?: 'cyan' | 'purple' | 'emerald';
  delay?: number;
  className?: string;
}

const colorMap = {
  cyan:   { text: 'text-[#00f3ff]', border: 'border-[#00f3ff]/30', glow: '0 0 20px rgba(0,243,255,0.3)' },
  purple: { text: 'text-[#a855f7]', border: 'border-[#8a2be2]/30', glow: '0 0 20px rgba(138,43,226,0.3)' },
  emerald:{ text: 'text-[#00ff88]', border: 'border-[#00ff88]/30', glow: '0 0 20px rgba(0,255,136,0.3)' },
};

export default function HUDCard({
  value,
  label,
  icon,
  color = 'cyan',
  delay = 0,
  className,
}: HUDCardProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={cn(
        'glass hud-card rounded-lg px-4 py-3 border',
        c.border,
        'animate-float',
        className
      )}
      style={{ boxShadow: c.glow, animationDelay: `${delay * 1000}ms` }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-base">{icon}</span>}
        <span className={cn('font-orbitron font-bold text-xl', c.text)}>{value}</span>
      </div>
      <p className="text-xs text-slate-400 font-jetbrains uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

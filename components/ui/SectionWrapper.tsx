// components/ui/SectionWrapper.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  labelColor?: 'cyan' | 'purple' | 'emerald';
}

const labelColors = {
  cyan:    'text-[#00f3ff] border-[#00f3ff]/30',
  purple:  'text-[#a855f7] border-[#8a2be2]/30',
  emerald: 'text-[#00ff88] border-[#00ff88]/30',
};

export default function SectionWrapper({
  id,
  children,
  className,
  label,
  labelColor = 'cyan',
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id={id}
      ref={ref}
      className={cn('relative py-24 overflow-hidden', className)}
    >
      {/* Section chip label */}
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className={cn(
            'absolute top-8 left-4 sm:left-8 text-xs font-jetbrains font-medium px-3 py-1 rounded-full border',
            labelColors[labelColor]
          )}
        >
          &lt;{label} /&gt;
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}

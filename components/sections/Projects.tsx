// components/sections/Projects.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import type { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

type FilterTag = 'All' | Project['tag'];

const FILTERS: FilterTag[] = ['All', 'Full-Stack', 'AI', '3D/Graphics'];

const filterStyles: Record<FilterTag, string> = {
  All:          'text-white border-white/20 hover:border-white/40',
  'Full-Stack': 'text-[#00f3ff] border-[#00f3ff]/30 hover:border-[#00f3ff]/60 data-[active=true]:bg-[#00f3ff]/10 data-[active=true]:border-[#00f3ff]/60',
  AI:           'text-[#00ff88] border-[#00ff88]/30 hover:border-[#00ff88]/60 data-[active=true]:bg-[#00ff88]/10 data-[active=true]:border-[#00ff88]/60',
  '3D/Graphics':'text-[#a855f7] border-[#8a2be2]/30 hover:border-[#8a2be2]/60 data-[active=true]:bg-[#8a2be2]/10 data-[active=true]:border-[#8a2be2]/60',
};

export default function Projects() {
  const [filter, setFilter] = useState<FilterTag>('All');

  const visible = filter === 'All' ? projects : projects.filter((p) => p.tag === filter);

  return (
    <SectionWrapper id="projects" label="projects" labelColor="emerald" className="bg-[#0a0a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            Featured <span className="gradient-text-cyber">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-jetbrains text-sm"
          >
            {projects.length} projects shipped · hover for 3D perspective
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              data-active={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 text-xs font-jetbrains rounded-full border transition-all duration-200',
                filterStyles[f],
                filter === f ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              )}
            >
              {f}
              {f !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({projects.filter((p) => p.tag === f).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/OGaditya148"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-jetbrains text-[#00f3ff] hover:text-white transition-colors group"
          >
            <span>View all repositories on GitHub</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// components/ui/ProjectCard.tsx
'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Zap } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data';

const tagStyles: Record<Project['tag'], string> = {
  AI:           'tag-ai border',
  '3D/Graphics':'tag-graphics border',
  'Full-Stack':  'tag-fullstack border',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const tagColorMap: Record<Project['tag'], string> = {
    AI: '#00ff88',
    '3D/Graphics': '#8a2be2',
    'Full-Stack': '#00f3ff',
  };
  const accentColor = tagColorMap[project.tag];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group relative cursor-pointer"
    >
      {/* Glow background */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${accentColor}25, transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative glass rounded-xl p-6 border border-white/[0.07] group-hover:border-white/[0.15] transition-all duration-300 h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}30, transparent 70%)`,
          }}
        />

        {/* Tag */}
        <span className={cn('text-xs font-jetbrains px-2 py-0.5 rounded-full', tagStyles[project.tag])}>
          {project.tag}
        </span>

        {/* Name */}
        <h3
          className="mt-3 text-lg font-bold font-orbitron text-white group-hover:transition-colors duration-300"
          style={{ transform: 'translateZ(20px)' }}
        >
          {project.name}
        </h3>

        {/* Highlight */}
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {project.highlight}
        </p>

        {/* Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-jetbrains px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Separator */}
        <div
          className="mt-4 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }}
        />

        {/* Links */}
        <div className="mt-4 flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-jetbrains text-slate-300 hover:text-white transition-colors"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-jetbrains text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
          <span className="flex items-center gap-1 text-xs font-jetbrains text-slate-500 ml-auto">
            <Zap size={11} style={{ color: accentColor }} />
            {index + 1}/{projects.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

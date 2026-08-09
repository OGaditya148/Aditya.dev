// components/sections/SkillUniverse.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '@/lib/data';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

export default function SkillUniverse() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <SectionWrapper id="skills" label="skills" labelColor="purple" className="bg-[#0a0a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            <span className="gradient-text-cyber">Skill</span> Universe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-jetbrains text-sm"
          >
            Hover a category to explore the tech stack
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.07 }}
              onHoverStart={() => setActiveCategory(cat.label)}
              onHoverEnd={() => setActiveCategory(null)}
              className={cn(
                'glass rounded-xl border transition-all duration-300 cursor-default overflow-hidden',
                activeCategory === cat.label
                  ? 'border-opacity-50 scale-[1.02]'
                  : 'border-white/[0.06] hover:border-white/[0.12]'
              )}
              style={{
                borderColor: activeCategory === cat.label ? `${cat.color}60` : undefined,
                boxShadow: activeCategory === cat.label ? `0 0 30px ${cat.color}20` : undefined,
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-3 p-4 border-b border-white/[0.06]"
                style={{
                  background: activeCategory === cat.label
                    ? `linear-gradient(135deg, ${cat.color}15, transparent)`
                    : undefined,
                }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3
                    className="font-orbitron font-semibold text-sm"
                    style={{ color: activeCategory === cat.label ? cat.color : '#e2e8f0' }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-xs font-jetbrains text-slate-500">
                    {cat.skills.length} technologies
                  </p>
                </div>
                {/* Accent dot */}
                <div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
              </div>

              {/* Skills list */}
              <div className="p-4 flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.07 + skillIdx * 0.03 }}
                    className={cn(
                      'text-xs font-jetbrains px-2.5 py-1 rounded-full border transition-all duration-200',
                      activeCategory === cat.label
                        ? 'text-white border-opacity-50'
                        : 'text-slate-400 border-white/10 bg-white/[0.03]'
                    )}
                    style={
                      activeCategory === cat.label
                        ? {
                            color: cat.color,
                            borderColor: `${cat.color}50`,
                            background: `${cat.color}10`,
                          }
                        : undefined
                    }
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 12px ${cat.color}40`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating particle hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-8 text-xs font-jetbrains text-slate-600">
            {[
              { color: '#00f3ff', label: 'Languages & Frontend' },
              { color: '#8a2be2', label: 'Backend & DevOps' },
              { color: '#00ff88', label: 'AI & Core CS' },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

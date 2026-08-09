// components/sections/Timeline.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { experience } from '@/lib/data';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <SectionWrapper id="timeline" label="experience" className="bg-[#050508]">
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            Work <span className="gradient-text-cyan-purple">Experience</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />
          <motion.div
            className="absolute left-8 sm:left-1/2 top-0 w-px bg-gradient-to-b from-[#00f3ff] to-[#8a2be2] -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative flex flex-col sm:flex-row gap-8 mb-16 pl-20 sm:pl-0"
            >
              {/* Timeline node */}
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#00f3ff] bg-[#050508] shadow-[0_0_15px_rgba(0,243,255,0.6)] z-10" />

              {/* Card — full width on mobile, alternating on desktop */}
              <div className="w-full sm:w-[calc(50%-2rem)] sm:ml-auto glass rounded-xl border border-white/[0.07] hover:border-[#00f3ff]/30 transition-all duration-300 p-6 group">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-[#00f3ff] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-sm font-semibold text-[#a855f7]">
                        <Briefcase size={13} /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-jetbrains">
                        <MapPin size={11} /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-jetbrains">
                        <Calendar size={11} /> {exp.period}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 text-xs font-jetbrains text-[#00ff88] border border-[#00ff88]/30 rounded-full bg-[#00ff88]/08">
                    Active
                  </span>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {exp.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center"
                    >
                      <div className="text-base mb-0.5">{m.icon}</div>
                      <div className="font-orbitron font-bold text-sm text-[#00f3ff]">{m.value}</div>
                      <div className="text-[10px] font-jetbrains text-slate-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: bi * 0.1 }}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <TrendingUp size={13} className="shrink-0 mt-0.5 text-[#00f3ff]" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="mt-5 h-px w-full bg-gradient-to-r from-[#00f3ff]/40 via-[#8a2be2]/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

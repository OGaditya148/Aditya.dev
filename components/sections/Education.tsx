// components/sections/Education.tsx
'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Star } from 'lucide-react';
import { education, certificates } from '@/lib/data';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function Education() {
  return (
    <SectionWrapper id="education" label="education" labelColor="purple" className="bg-[#0a0a12]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            Education &{' '}
            <span className="gradient-text-cyan-purple">Credentials</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-lg font-orbitron font-semibold text-[#00f3ff] mb-6"
            >
              <GraduationCap size={20} /> Academic
            </motion.h3>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl border border-white/[0.07] hover:border-[#00f3ff]/30 transition-all duration-300 p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{edu.icon}</div>
                  <div>
                    <h4 className="font-orbitron font-bold text-base text-white group-hover:text-[#00f3ff] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-slate-400 font-jetbrains mt-1">{edu.institution}</p>

                    {/* Status bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-jetbrains text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>~75%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '75%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-[#00f3ff] to-[#8a2be2] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-lg font-orbitron font-semibold text-[#a855f7] mb-6"
            >
              <Award size={20} /> Certifications
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass rounded-xl border border-white/[0.07] p-4 group cursor-default relative overflow-hidden"
                  style={{
                    borderColor: `${cert.color}25`,
                  }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${cert.color}25, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{cert.icon}</div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <Star size={10} style={{ color: cert.color }} fill={cert.color} />
                        <span className="text-[10px] font-jetbrains" style={{ color: cert.color }}>
                          CERTIFIED
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white font-orbitron leading-tight group-hover:text-opacity-90 transition-colors">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-jetbrains mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

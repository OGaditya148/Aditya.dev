// types/index.ts
export interface Project {
  id: string;
  name: string;
  stack: string[];
  highlight: string;
  tag: 'AI' | '3D/Graphics' | 'Full-Stack';
  github?: string;
  live?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

export interface SkillCategory {
  label: string;
  icon: string;
  color: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  metrics: { label: string; value: string; icon: string }[];
  bullets: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  icon: string;
  color: string;
}

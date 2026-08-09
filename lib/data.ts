// lib/data.ts
import type { Project, SkillCategory, Experience, Certificate } from '@/types';

export const personalInfo = {
  name: 'Aditya Agarwal',
  location: 'Agra, India',
  github: 'https://github.com/OGaditya148',
  linkedin: 'https://www.linkedin.com/in/aditya-agarwal-34868b335',
  email: 'agarwaladitya9634@gmail.com',
  title: 'Full-Stack Engineer',
  tagline: 'Building at the intersection of systems, AI & the web.',
};

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    icon: '⌨',
    color: '#00f3ff',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'C', 'C++', 'SQL', 'Go'],
  },
  {
    label: 'Frontend',
    icon: '🖥',
    color: '#8a2be2',
    skills: ['React', 'Next.js', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'SASS', 'Three.js'],
  },
  {
    label: 'Backend',
    icon: '⚙',
    color: '#00ff88',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'JWT'],
  },
  {
    label: 'Databases',
    icon: '🗄',
    color: '#00f3ff',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    label: 'Cloud / DevOps',
    icon: '☁',
    color: '#8a2be2',
    skills: ['AWS (EC2, S3)', 'Docker', 'Jenkins', 'CI/CD', 'Prometheus', 'Grafana'],
  },
  {
    label: 'AI / Automation',
    icon: '🤖',
    color: '#00ff88',
    skills: ['OpenAI API', 'Agentic AI', 'Vapi', 'Make.com', 'Prompt Engineering'],
  },
  {
    label: 'Core CS',
    icon: '🧠',
    color: '#00f3ff',
    skills: ['DSA', 'OOP', 'System Design', 'Operating Systems', 'OpenGL'],
  },
];

export const projects: Project[] = [
  {
    id: 'sim-engine',
    name: 'Interactive 2D/3D Sim Engine',
    stack: ['C++', 'OpenGL'],
    highlight: 'Custom physics engine with collision detection, running at a stable 60 FPS.',
    tag: '3D/Graphics',
  },
  {
    id: 'imagen',
    name: 'ImaGen',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    highlight: 'Async image generation queue with JWT auth and OpenAI integration.',
    tag: 'AI',
  },
  {
    id: 'taskify',
    name: 'Taskify',
    stack: ['React', 'Tailwind', 'SCSS', 'Context API'],
    highlight: 'Modular SCSS architecture with persistent local storage state management.',
    tag: 'Full-Stack',
  },
  {
    id: 'food-delivery',
    name: 'Enterprise Food Delivery',
    stack: ['Microservices', 'Node.js', 'Redis', 'MongoDB'],
    highlight: 'Real-time cart sync, geo-based filtering, and sub-120ms API response times.',
    tag: 'Full-Stack',
  },
  {
    id: 'emp-mgmt',
    name: 'Employee Mgmt Portal',
    stack: ['React', 'Node.js', 'PostgreSQL', 'RBAC'],
    highlight: 'Automated timesheet generation; reduced query time by 40% with RBAC.',
    tag: 'Full-Stack',
  },
  {
    id: 'support-copilot',
    name: 'SupportCopilot',
    stack: ['Next.js', 'Supabase', 'Prisma', 'pgvector', 'Anthropic API'],
    highlight: 'RAG-based AI support ticket assistant with semantic search over past tickets.',
    tag: 'AI',
    github: 'https://github.com/OGaditya148/SupportCopilot',
  },
];

export const experience: Experience[] = [
  {
    company: 'Soilherb',
    role: 'Software Development Engineer Intern',
    period: 'June 2026 – Present',
    location: 'Remote',
    metrics: [
      { label: 'Reliability', value: '+25%', icon: '🛡' },
      { label: 'API Latency', value: '-35%', icon: '⚡' },
      { label: 'Hours Saved/mo', value: '40hrs', icon: '🤖' },
      { label: 'Bugs in CI/CD', value: 'Zero', icon: '✅' },
    ],
    bullets: [
      'Increased system reliability by 25% through optimised service architecture.',
      'Reduced API latency by 35% via strategic MongoDB indexing and query optimisation.',
      'Automated 40 hrs/month of manual workflows using AI-driven pipelines.',
      'Deployed a zero-bug CI/CD pipeline with Jenkins and Docker.',
    ],
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Expected 2027',
    icon: '🎓',
    color: '#00f3ff',
  },
];

export const certificates: Certificate[] = [
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: '☁',
    color: '#FF9900',
  },
  {
    name: 'Google AI Essentials',
    issuer: 'Google',
    icon: '🤖',
    color: '#4285F4',
  },
  {
    name: 'Advanced React Developer',
    issuer: 'Certification Body',
    icon: '⚛',
    color: '#61DAFB',
  },
  {
    name: 'Data Analyst Certificate',
    issuer: 'Certification Body',
    icon: '📊',
    color: '#00ff88',
  },
];

export const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Lab', href: '#playground' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

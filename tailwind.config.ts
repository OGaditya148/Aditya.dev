import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00f3ff',
          400: '#00f3ff',
          500: '#00d8e8',
          600: '#00b5c4',
        },
        purple: {
          DEFAULT: '#8a2be2',
          400: '#a855f7',
          500: '#8a2be2',
          600: '#7c3aed',
        },
        emerald: {
          DEFAULT: '#00ff88',
          400: '#00ff88',
          500: '#00e87a',
          600: '#00cc6a',
        },
        bg: {
          DEFAULT: '#050508',
          secondary: '#0a0a12',
          tertiary: '#0f0f1a',
          card: '#12121f',
        },
        glass: 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,243,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.03) 1px, transparent 1px)",
        'glow-cyan': 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)',
        'glow-emerald': 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,243,255,0.4), 0 0 60px rgba(0,243,255,0.1)',
        'glow-purple': '0 0 20px rgba(138,43,226,0.4), 0 0 60px rgba(138,43,226,0.1)',
        'glow-emerald': '0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.1)',
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0,243,255,0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(0,243,255,0.8)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '75%': { transform: 'translate(-1px, 1px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config

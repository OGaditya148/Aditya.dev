# Aditya Agarwal — Production-Grade 3D Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000?logo=three.js)](https://threejs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

> Cybernetic dark/neo-brutalist portfolio with R3F particle clouds, GSAP animations, and glassmorphism UI.

---

## Stack

| Layer        | Tech |
|---|---|
| Framework    | Next.js 14 (App Router, TypeScript, RSC) |
| 3D / WebGL   | React Three Fiber + Three.js (dynamic, ssr:false) |
| Animation    | Framer Motion + GSAP |
| Styling      | Tailwind CSS v3 + custom design tokens |
| Forms        | React Hook Form + Zod |
| Icons        | Lucide React |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

The easiest deployment path:

1. Push this repo to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no configuration needed.
4. Click **Deploy**.

All WebGL components use `dynamic(() => import(...), { ssr: false })` so there are zero server-rendering issues. The `next.config.js` transpiles Three.js and R3F for Edge compatibility.

> **Environment variables**: Copy `.env.example` to `.env.local` and fill in any `NEXT_PUBLIC_*` values before deploying. Add the same vars in the Vercel dashboard under **Project → Settings → Environment Variables**.

---

## Deploy to Netlify

1. Push this repo to GitHub.
2. In the Netlify dashboard, click **Add new site → Import an existing project**.
3. Connect your GitHub repository.
4. Install the Next.js plugin:
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```
5. The included `netlify.toml` configures:
   - **Build command**: `npm run build` (i.e. `next build`)
   - **Publish directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs` for full SSR/RSC support
6. Add environment variables in **Site configuration → Environment variables**.
7. Click **Deploy site**.

> **Note**: Netlify requires the `@netlify/plugin-nextjs` plugin to support Next.js 14 App Router features (SSR, Server Components, Route Handlers). Without it, only static exports work.

---

## Project Structure

```
Personal_portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page (RSC)
│   └── globals.css         # Design system, glow utils, animations
├── components/
│   ├── three/
│   │   └── HeroCanvas.tsx  # R3F particle + mesh scene (ssr:false)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SkillUniverse.tsx
│   │   ├── Timeline.tsx
│   │   ├── Projects.tsx
│   │   ├── AIPlayground.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Navbar.tsx
│       ├── ProjectCard.tsx
│       ├── HUDCard.tsx
│       ├── GlowButton.tsx
│       └── SectionWrapper.tsx
├── lib/
│   ├── data.ts             # All portfolio data
│   └── utils.ts            # cn(), WebGL detection
├── types/
│   └── index.ts            # Shared TS interfaces
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── netlify.toml
└── .env.example
```

---

## Performance

- **WebGL fallback**: `isWebGLAvailable()` detects GPU capability; low-end devices get a CSS cyber-grid background.
- **Adaptive DPR**: `<AdaptiveDpr>` from `@react-three/drei` reduces pixel ratio under load.
- **Dynamic imports**: Heavy 3D and animation components load after interactive.
- **Font optimisation**: Google Fonts loaded via `<link rel="preconnect">` in the root layout.

---

Made with ⚡ by **Aditya Agarwal** · [github.com/OGaditya148](https://github.com/OGaditya148)

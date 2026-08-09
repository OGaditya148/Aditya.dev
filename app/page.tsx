// app/page.tsx
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import SkillUniverse from '@/components/sections/SkillUniverse';
import Timeline from '@/components/sections/Timeline';
import Projects from '@/components/sections/Projects';
import AIPlayground from '@/components/sections/AIPlayground';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

/**
 * Main portfolio page.
 * All WebGL/Canvas components are dynamically imported with { ssr: false }
 * inside their respective section components to avoid "window is not defined"
 * during Next.js server rendering.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillUniverse />
        <Timeline />
        <Projects />
        <AIPlayground />
        <Education />
        <Contact />
      </main>
    </>
  );
}

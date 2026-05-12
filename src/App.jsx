import { memo } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/effects/ScrollProgress";
import { CustomCursor } from "./components/effects/CustomCursor";
import { IntroAnimation } from "./components/effects/IntroAnimation";
import { BackToTop } from "./components/effects/BackToTop";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import OpenSource from "./components/sections/OpenSource";
import Contact from "./components/sections/Contact";

const SECTIONS = ["hero", "about", "experience", "skills", "projects", "opensource", "contact"];

/* SVG fractal-noise grain — renders once, sits fixed above everything */
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E";

const Divider = () => (
  <div
    className="h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-white/[0.05]"
    aria-hidden="true"
  />
);

function App() {
  const activeSection = useActiveSection(SECTIONS, { threshold: 0.3 });
  const { theme, toggle, isDark } = useTheme();

  return (
    <>
      {/* Effects */}
      <IntroAnimation />
      <CustomCursor />
      <ScrollProgress />

      {/* Film grain overlay — very subtle premium texture */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9985]"
        style={{
          opacity: 0.038,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      <Navbar activeSection={activeSection} toggle={toggle} isDark={isDark} theme={theme} />

      <main id="main-content">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <OpenSource />
        <Divider />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default memo(App);

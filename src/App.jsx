import { memo } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/effects/ScrollProgress";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import OpenSource from "./components/sections/OpenSource";
import Contact from "./components/sections/Contact";

const SECTIONS = ["hero", "about", "experience", "skills", "projects", "opensource", "contact"];

const Divider = () => (
  <div
    className="h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-white/[0.05]"
    aria-hidden="true"
  />
);

function App() {
  const activeSection = useActiveSection(SECTIONS, { threshold: 0.3 });
  const { toggle, isDark } = useTheme();

  return (
    <>
      <ScrollProgress />
      <Navbar activeSection={activeSection} toggle={toggle} isDark={isDark} />

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
    </>
  );
}

export default memo(App);

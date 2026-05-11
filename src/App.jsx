import { memo } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
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
    className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
    aria-hidden="true"
  />
);

function App() {
  const activeSection = useActiveSection(SECTIONS, { threshold: 0.3 });

  return (
    <>
      <ScrollProgress />
      <Navbar activeSection={activeSection} />

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

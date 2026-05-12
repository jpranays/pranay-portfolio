import { memo, useState, useEffect, useCallback } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";
import { useKonamiCode } from "./hooks/useKonamiCode";
import { useTabTitle } from "./hooks/useTabTitle";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/effects/ScrollProgress";
import { CustomCursor } from "./components/effects/CustomCursor";
import { IntroAnimation } from "./components/effects/IntroAnimation";
import { BackToTop } from "./components/effects/BackToTop";
import CommandPalette from "./components/effects/CommandPalette";
import { ToastProvider, useToast } from "./components/effects/Toast";
import { EasterEgg } from "./components/effects/EasterEgg";
import { CursorSpotlight } from "./components/effects/CursorSpotlight";
import SectionDots from "./components/effects/SectionDots";
import { MusicPlayer } from "./components/effects/MusicPlayer";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import { ShortcutsModal } from "./components/effects/ShortcutsModal";
import { ClickBurst } from "./components/effects/ClickBurst";
import { ContextMenu } from "./components/effects/ContextMenu";
import { MouseTrail } from "./components/effects/MouseTrail";
import { AccentPicker } from "./components/effects/AccentPicker";
import { useIdle } from "./hooks/useIdle";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
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

function AppInner() {
  const activeSection = useActiveSection(SECTIONS, { threshold: 0.3 });
  const { theme, toggle, isDark } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [eggActive, setEggActive] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const toast = useToast();
  const { playing: musicPlaying, toggle: toggleMusic } = useMusicPlayer();

  /* Scroll-speed tilt */
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const rawTilt = useTransform(scrollVelocity, [-2500, 0, 2500], [1.8, 0, -1.8]);
  const tilt = useSpring(rawTilt, { stiffness: 120, damping: 28 });

  useTabTitle();

  /* Idle nudge — after 35s of no interaction */
  useIdle(useCallback(() => {
    toast.info("Still exploring? Try pressing ? for keyboard shortcuts or ⌘K to jump anywhere.");
  }, [toast]), 35000);

  useKonamiCode(useCallback(() => {
    setEggActive(true);
    toast.easter("🎮 Cheat code activated! You found the easter egg!", 4000);
  }, [toast]));

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        setShortcutsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = () => setEggActive(true);
    window.addEventListener("portfolio:confetti", handler);
    return () => window.removeEventListener("portfolio:confetti", handler);
  }, []);

  return (
    <>
      <IntroAnimation />
      <CustomCursor />
      <ScrollProgress />
      <CursorSpotlight />
      <EasterEgg active={eggActive} onDone={() => setEggActive(false)} />
      <SectionDots activeSection={activeSection} />

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

      <Navbar activeSection={activeSection} toggle={toggle} isDark={isDark} theme={theme} onOpenPalette={() => setPaletteOpen(true)} musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} theme={theme} toggleTheme={toggle} musicPlaying={musicPlaying} toggleMusic={toggleMusic} onOpenShortcuts={() => setShortcutsOpen(true)} />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <ClickBurst />
      <ContextMenu />
      <MouseTrail />

      <motion.main id="main-content" style={{ rotateX: tilt }} className="transform-gpu">
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
      </motion.main>

      <Footer />
      <BackToTop />
      <MusicPlayer playing={musicPlaying} onToggle={toggleMusic} />
      <AccentPicker />
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}

export default memo(App);

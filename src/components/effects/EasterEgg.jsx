import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#f97316","#fb923c","#fbbf24","#34d399",
  "#60a5fa","#a78bfa","#f472b6","#e2e8f0",
];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function generateParticles(count = 60) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),        // vw %
    delay: randomBetween(0, 0.8),
    duration: randomBetween(2.2, 3.6),
    size: randomBetween(6, 14),
    rotation: randomBetween(-180, 180),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.random() > 0.4 ? "square" : "circle",
  }));
}

function Particle({ p }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: "-5vh", x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: "105vh",
        x: [0, randomBetween(-40, 40), randomBetween(-20, 20)],
        opacity: [1, 1, 0],
        rotate: p.rotation * 3,
        scale: [1, 0.85],
      }}
      transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
      style={{
        position: "fixed",
        left: `${p.x}vw`,
        top: 0,
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        borderRadius: p.shape === "circle" ? "50%" : "2px",
        pointerEvents: "none",
        zIndex: 9997,
      }}
    />
  );
}

export function EasterEgg({ active, onDone }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;
    setParticles(generateParticles(60));
    const t = setTimeout(() => { setParticles([]); onDone(); }, 4000);
    return () => clearTimeout(t);
  }, [active, onDone]);

  return (
    <AnimatePresence>
      {particles.map((p) => <Particle key={p.id} p={p} />)}
    </AnimatePresence>
  );
}

export default memo(EasterEgg);

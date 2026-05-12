import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const COLORS = ["#f97316", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];
const PARTICLE_COUNT = 8;

function Burst({ id, x, y, onDone }) {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * 360;
    const dist = 40 + Math.random() * 30;
    const rad = (angle * Math.PI) / 180;
    const tx = Math.cos(rad) * dist;
    const ty = Math.sin(rad) * dist;
    const color = COLORS[i % COLORS.length];
    return { tx, ty, color, size: 4 + Math.random() * 4 };
  });

  return (
    <div
      className="fixed pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)", zIndex: 9999 }}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={i === 0 ? onDone : undefined}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

export function ClickBurst() {
  const [bursts, setBursts] = useState([]);
  const reduced = useReducedMotion();
  const counterRef = useRef(0);

  const handleDblClick = useCallback((e) => {
    if (reduced) return;
    const id = counterRef.current++;
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
  }, [reduced]);

  useEffect(() => {
    window.addEventListener("dblclick", handleDblClick);
    return () => window.removeEventListener("dblclick", handleDblClick);
  }, [handleDblClick]);

  const removeBurst = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {bursts.map((b) => (
        <Burst key={b.id} {...b} onDone={() => removeBurst(b.id)} />
      ))}
    </AnimatePresence>
  );
}

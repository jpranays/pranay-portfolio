import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";

export function useTilt(intensity = 7) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const cfg = { stiffness: 200, damping: 28 };
  const rotateY = useSpring(useTransform(x, [0, 1], reduced ? [0, 0] : [-intensity, intensity]), cfg);
  const rotateX = useSpring(useTransform(y, [0, 1], reduced ? [0, 0] : [intensity, -intensity]), cfg);

  const gx = useTransform(x, v => `${v * 100}%`);
  const gy = useTransform(y, v => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.08) 0%, transparent 72%)`;

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { x.set(0.5); y.set(0.5); };

  return { ref, rotateX, rotateY, glare, onMove, onLeave };
}

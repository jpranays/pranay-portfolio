import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const TRAIL_LENGTH = 20;
const COLORS = ["#f97316", "#fb923c", "#fbbf24", "#f97316", "#fb923c"];

export function MouseTrail() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const points = [];
    let animId;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.length > TRAIL_LENGTH) points.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;
        const ratio = i / points.length;
        const alpha = ratio * 0.55;
        const r = 2 + ratio * 3.5;
        const color = COLORS[Math.floor(ratio * COLORS.length)];
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9980]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

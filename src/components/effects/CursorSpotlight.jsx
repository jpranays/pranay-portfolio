import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function CursorSpotlight() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const handler = (e) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[31]"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, -9999px) var(--y, -9999px), rgba(249,115,22,0.055), transparent 80%)",
      }}
    />
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const isFine = useRef(
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [isPointer, setIsPointer] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot snaps immediately
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 50 });

  // Glow blob lags for depth
  const glowX = useSpring(mouseX, { stiffness: 160, damping: 26 });
  const glowY = useSpring(mouseY, { stiffness: 160, damping: 26 });

  useEffect(() => {
    if (!isFine.current) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    const onOver = (e) => {
      const hit = e.target.closest(
        "a, button, [role='tab'], [role='button'], input, textarea, select, label"
      );
      setIsPointer(!!hit);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [hasMoved]);

  if (!isFine.current) return null;

  return (
    <>
      {/* Lagging glow blob */}
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hasMoved ? 1 : 0,
          width: isPointer ? 56 : 28,
          height: isPointer ? 56 : 28,
          backgroundColor: isPointer
            ? "rgba(167, 139, 250, 0.18)"
            : "rgba(251, 146, 60, 0.2)",
        }}
        transition={{
          opacity: { duration: 0.3 },
          width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          backgroundColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9990] blur-md"
      />

      {/* Dot (hidden while pointing) */}
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hasMoved && !isPointer ? 1 : 0, scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full pointer-events-none z-[9991] bg-orange-400"
      />

      {/* Ring (shown while pointing) */}
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hasMoved && isPointer ? 1 : 0, scale: isPointer ? 1 : 0.4 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9991] border border-violet-400/70"
      />
    </>
  );
}

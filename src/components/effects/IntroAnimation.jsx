import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function IntroAnimation() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("pj-intro-done");
  });

  useEffect(() => {
    if (!visible) return;
    // Reduced motion: dismiss immediately with no animation
    const delay = reduced ? 0 : 1900;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("pj-intro-done", "1");
    }, delay);
    return () => clearTimeout(t);
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, ...(reduced ? {} : { y: "-100%" }), transition: { duration: reduced ? 0.15 : 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--color-base)" }}
          aria-hidden="true"
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-orange-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/6 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative text-center px-8">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xl sm:text-2xl font-bold text-orange-400 tracking-tight">
                {"<jpranays />"}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-4 h-px w-48 mx-auto bg-slate-200 dark:bg-white/[0.06] overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-orange-500 via-violet-500 to-cyan-400 rounded-full"
              />
            </div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-3 text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

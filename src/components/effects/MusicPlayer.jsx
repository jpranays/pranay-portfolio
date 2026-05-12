import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";

export function EqualizerBars({ count = 5 }) {
  return (
    <span className="flex items-end gap-[2.5px]" style={{ height: 14 }} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const peak = [1, 0.45, 0.75, 0.3, 0.65][i % 5];
        return (
          <motion.span
            key={i}
            className="w-[2.5px] rounded-full bg-orange-400"
            animate={{ scaleY: [peak, 0.15, peak] }}
            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" }}
            style={{ height: 14, originY: 1, display: "block" }}
          />
        );
      })}
    </span>
  );
}

export function MusicPlayer({ playing, onToggle }) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="relative group">
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5
                         px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap
                         text-slate-600 dark:text-slate-300
                         bg-white dark:bg-[#0d1117]
                         border border-slate-200 dark:border-white/[0.08] shadow-sm
                         opacity-0 group-hover:opacity-100 pointer-events-none
                         transition-opacity duration-150"
            >
              {playing ? "Pause ambient" : "Play ambient"}
            </span>

            <button
              onClick={onToggle}
              aria-label={playing ? "Pause ambient music" : "Play ambient music"}
              className={`flex items-center justify-center w-10 h-10 rounded-full border
                         shadow-sm backdrop-blur-sm transition-all duration-200
                         ${playing
                           ? "bg-orange-500/12 border-orange-500/30 text-orange-400 hover:bg-orange-500/18"
                           : "bg-white/80 dark:bg-white/[0.05] border-slate-200 dark:border-white/[0.1] text-slate-400 hover:text-orange-400 hover:border-orange-500/30"
                         }`}
            >
              {playing && !reduced ? <EqualizerBars /> : <Music className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

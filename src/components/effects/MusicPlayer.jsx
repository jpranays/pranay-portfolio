import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";

// Procedural ambient drone — no audio file required.
// Layered sine/triangle oscillators + slow amplitude LFO = lo-fi chill hum.
function buildAmbient(ctx) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, ctx.currentTime);
  master.connect(ctx.destination);

  // Harmonic layers: root (A1=55Hz) + overtones
  [
    { freq: 55,  gain: 0.50, type: "sine"     },
    { freq: 110, gain: 0.25, type: "sine"     },
    { freq: 165, gain: 0.09, type: "sine"     },
    { freq: 220, gain: 0.05, type: "triangle" },
    { freq: 330, gain: 0.02, type: "triangle" },
  ].forEach(({ freq, gain, type }) => {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type            = type;
    osc.frequency.value = freq;
    osc.detune.value    = (Math.random() - 0.5) * 12; // slight warmth
    g.gain.value        = gain;
    osc.connect(g);
    g.connect(master);
    osc.start();
  });

  // Slow breathing LFO (~14s per cycle) modulates master volume
  const lfo  = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoG.gain.value     = 0.07;
  lfo.connect(lfoG);
  lfoG.connect(master.gain);
  lfo.start();

  return master;
}

function EqualizerBars() {
  return (
    <span className="flex items-end gap-[2.5px]" style={{ height: 14 }} aria-hidden="true">
      {[1, 0.45, 0.75, 0.3, 0.65].map((peak, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-orange-400"
          animate={{ scaleY: [peak, 0.15, peak] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" }}
          style={{ height: 14, originY: 1, display: "block" }}
        />
      ))}
    </span>
  );
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const ctxRef    = useRef(null);
  const masterRef = useRef(null);
  const reduced   = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    if (!playing) {
      // Lazily create AudioContext on first user gesture (browser policy)
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        ctxRef.current  = ctx;
        masterRef.current = buildAmbient(ctx);
      } else if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume();
      }
      const now = ctxRef.current.currentTime;
      const g   = masterRef.current.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0.38, now + 1.8); // gentle fade-in
      setPlaying(true);
    } else {
      const ctx = ctxRef.current;
      const g   = masterRef.current.gain;
      const now = ctx.currentTime;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0.001, now + 1.2); // gentle fade-out
      setTimeout(() => ctx.suspend(), 1300);
      setPlaying(false);
    }
  };

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
            {/* Tooltip */}
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
              onClick={toggle}
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

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

const ACCENTS = [
  { name: "orange", label: "Orange", swatch: "#f97316", c400: "#fb923c", c500: "#f97316", c600: "#ea580c" },
  { name: "blue",   label: "Blue",   swatch: "#3b82f6", c400: "#60a5fa", c500: "#3b82f6", c600: "#2563eb" },
  { name: "violet", label: "Violet", swatch: "#8b5cf6", c400: "#a78bfa", c500: "#8b5cf6", c600: "#7c3aed" },
  { name: "green",  label: "Green",  swatch: "#22c55e", c400: "#4ade80", c500: "#22c55e", c600: "#16a34a" },
  { name: "rose",   label: "Rose",   swatch: "#f43f5e", c400: "#fb7185", c500: "#f43f5e", c600: "#e11d48" },
];

/* Heatmap colour ramp per accent — 5 levels: empty → light → mid → accent → deep */
export const ACCENT_HEATMAP = {
  orange: {
    light: ["#f1f5f9", "#fed7aa", "#fb923c", "#f97316", "#ea580c"],
    dark:  ["#1e293b", "#431407", "#9a3412", "#f97316", "#fb923c"],
  },
  blue: {
    light: ["#f1f5f9", "#bfdbfe", "#93c5fd", "#3b82f6", "#1d4ed8"],
    dark:  ["#1e293b", "#1e3a5f", "#1e40af", "#3b82f6", "#60a5fa"],
  },
  violet: {
    light: ["#f1f5f9", "#ddd6fe", "#c4b5fd", "#8b5cf6", "#6d28d9"],
    dark:  ["#1e293b", "#2e1065", "#4c1d95", "#8b5cf6", "#a78bfa"],
  },
  green: {
    light: ["#f1f5f9", "#bbf7d0", "#86efac", "#22c55e", "#15803d"],
    dark:  ["#1e293b", "#052e16", "#14532d", "#22c55e", "#4ade80"],
  },
  rose: {
    light: ["#f1f5f9", "#fecdd3", "#fda4af", "#f43f5e", "#be123c"],
    dark:  ["#1e293b", "#4c0519", "#881337", "#f43f5e", "#fb7185"],
  },
};

const CYCLE_MS = 5000;
const TRANSITION_MS = 900;
const STORAGE_KEY = "portfolio-accent";

function hex2rgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");
}

/* Inject static CSS that maps Tailwind's orange classes → CSS variables.
   Only injected once; color changes happen by updating the vars on :root. */
function injectBaseStyle() {
  if (document.getElementById("ap-style")) return;
  const s = document.createElement("style");
  s.id = "ap-style";
  s.textContent = `
    .text-orange-400, .hover\\:text-orange-400:hover, .dark\\:text-orange-400 { color: var(--ap-400) !important; }
    .text-orange-500, .dark\\:text-orange-400 { color: var(--ap-500) !important; }
    .text-orange-300, .hover\\:text-orange-300:hover { color: var(--ap-400) !important; }
    .bg-orange-400 { background-color: var(--ap-400) !important; }
    .bg-orange-500 { background-color: var(--ap-500) !important; }
    .from-orange-400 { --tw-gradient-from: var(--ap-400) !important; }
    .to-orange-400   { --tw-gradient-to:   var(--ap-400) !important; }
    .via-amber-200   { --tw-gradient-via:  var(--ap-400) !important; }
    .border-orange-500\\/25 { border-color: color-mix(in srgb, var(--ap-500) 25%, transparent) !important; }
    .border-orange-500\\/30 { border-color: color-mix(in srgb, var(--ap-500) 30%, transparent) !important; }
    .focus\\:border-orange-500\\/50:focus { border-color: color-mix(in srgb, var(--ap-500) 50%, transparent) !important; }
    .focus\\:ring-orange-500\\/30:focus   { --tw-ring-color: color-mix(in srgb, var(--ap-500) 30%, transparent) !important; }
    .section-label {
      background-color: color-mix(in srgb, var(--ap-500) 8%, transparent) !important;
      border-color:     color-mix(in srgb, var(--ap-500) 15%, transparent) !important;
      color: var(--ap-500) !important;
    }
    .glow-dot {
      background-color: var(--ap-500) !important;
      box-shadow: 0 0 8px color-mix(in srgb, var(--ap-500) 80%, transparent) !important;
    }
    .gradient-text {
      background-image: linear-gradient(to right, var(--ap-400), color-mix(in srgb, var(--ap-400) 60%, white)) !important;
    }
    .btn-primary {
      background-color: var(--ap-500) !important;
      box-shadow: 0 0 20px color-mix(in srgb, var(--ap-500) 30%, transparent) !important;
    }
    .btn-primary:hover {
      background-color: var(--ap-400) !important;
      box-shadow: 0 0 28px color-mix(in srgb, var(--ap-500) 45%, transparent) !important;
    }
    ::selection   { background: color-mix(in srgb, var(--ap-500) 25%, transparent) !important; }
    :focus-visible { outline-color: color-mix(in srgb, var(--ap-500) 70%, transparent) !important; }
    ::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ap-500) 40%, transparent) !important; }
    --color-border-hover: color-mix(in srgb, var(--ap-500) 25%, transparent);
  `;
  document.head.appendChild(s);
}

function applyAccent(accent) {
  const { name, c400, c500, c600 } = accent;
  const root = document.documentElement;
  root.style.setProperty("--ap-400", c400);
  root.style.setProperty("--ap-500", c500);
  root.style.setProperty("--ap-600", c600);
  root.style.setProperty("--color-border-hover", `rgba(${hex2rgb(c500)}, 0.25)`);
  root.style.setProperty("--color-shadow-card-hover",
    `0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(${hex2rgb(c500)}, 0.15)`);
  window.dispatchEvent(new CustomEvent("portfolio:accent", {
    detail: { name, heatmap: ACCENT_HEATMAP[name] },
  }));
}

export function AccentPicker() {
  const initIdx = Math.max(0, ACCENTS.findIndex(
    (a) => a.name === (localStorage.getItem(STORAGE_KEY) ?? "orange")
  ));

  const [accentIdx, setAccentIdx] = useState(initIdx);
  const [open, setOpen] = useState(false);
  const idxRef = useRef(initIdx);
  const timerRef = useRef(null);

  /* One-time setup: register typed CSS custom props + transition + base overrides */
  useEffect(() => {
    try {
      CSS.registerProperty({ name: "--ap-400", syntax: "<color>", inherits: true, initialValue: "#fb923c" });
      CSS.registerProperty({ name: "--ap-500", syntax: "<color>", inherits: true, initialValue: "#f97316" });
      CSS.registerProperty({ name: "--ap-600", syntax: "<color>", inherits: true, initialValue: "#ea580c" });
    } catch (_) { /* already registered on HMR reload */ }

    /* Transition lives on <html> so setProperty changes interpolate */
    document.documentElement.style.transition =
      `--ap-400 ${TRANSITION_MS}ms ease, --ap-500 ${TRANSITION_MS}ms ease, --ap-600 ${TRANSITION_MS}ms ease`;

    injectBaseStyle();
    applyAccent(ACCENTS[idxRef.current]);
  }, []);

  /* Auto-cycle */
  const startCycle = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (idxRef.current + 1) % ACCENTS.length;
      idxRef.current = next;
      setAccentIdx(next);
      localStorage.setItem(STORAGE_KEY, ACCENTS[next].name);
      applyAccent(ACCENTS[next]);
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    startCycle();
    return () => clearInterval(timerRef.current);
  }, [startCycle]);

  const pick = useCallback((idx) => {
    idxRef.current = idx;
    setAccentIdx(idx);
    localStorage.setItem(STORAGE_KEY, ACCENTS[idx].name);
    applyAccent(ACCENTS[idx]);
    setOpen(false);
    startCycle(); /* restart timer from this colour */
  }, [startCycle]);

  const current = ACCENTS[accentIdx];

  return null;
  // return (
  //   <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
  //     <AnimatePresence>
  //       {open && (
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.85, y: 8 }}
  //           animate={{ opacity: 1, scale: 1, y: 0 }}
  //           exit={{ opacity: 0, scale: 0.85, y: 8 }}
  //           transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
  //           className="flex flex-col gap-1 p-2 rounded-2xl border border-slate-200 dark:border-white/[0.09]
  //                      bg-white dark:bg-[#0d1117] shadow-xl"
  //         >
  //           <p className="text-[10px] font-mono text-slate-400 dark:text-slate-600 px-2 pt-1 pb-0.5 uppercase tracking-widest">
  //             Accent colour
  //           </p>
  //           {ACCENTS.map((a, i) => (
  //             <button
  //               key={a.name}
  //               onClick={() => pick(i)}
  //               title={a.label}
  //               aria-label={`Set accent to ${a.label}`}
  //               className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium
  //                           transition-all duration-150 text-left
  //                           ${i === accentIdx
  //                             ? "bg-slate-100 dark:bg-white/[0.07] text-slate-800 dark:text-slate-200"
  //                             : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
  //                           }`}
  //             >
  //               <span
  //                 className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-1 ring-black/10"
  //                 style={{ backgroundColor: a.swatch }}
  //               />
  //               {a.label}
  //               {i === accentIdx && (
  //                 <span className="ml-auto text-[9px] font-mono opacity-50">auto</span>
  //               )}
  //             </button>
  //           ))}
  //         </motion.div>
  //       )}
  //     </AnimatePresence>

  //     {/* Toggle button — swatch dot pulses to show current colour */}
  //     <button
  //       onClick={() => setOpen((v) => !v)}
  //       aria-label="Choose accent colour"
  //       title="Accent colour — auto-cycling"
  //       className="relative w-10 h-10 rounded-full border shadow-sm backdrop-blur-sm flex items-center justify-center
  //                  bg-white/80 dark:bg-white/[0.05] border-slate-200 dark:border-white/[0.1]
  //                  text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.2] transition-colors duration-200"
  //     >
  //       <Palette className="w-4 h-4" />
  //       {/* Live swatch dot */}
  //       <span
  //         className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-[#060610]"
  //         style={{
  //           backgroundColor: current.swatch,
  //           transition: `background-color ${TRANSITION_MS}ms ease`,
  //         }}
  //       />
  //     </button>
  //   </div>
  // );
}

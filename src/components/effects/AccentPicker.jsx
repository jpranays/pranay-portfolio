import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

const ACCENTS = {
  orange: {
    label: "Orange",
    swatch: "#f97316",
    vars: null, // default — no override needed
  },
  blue: {
    label: "Blue",
    swatch: "#3b82f6",
    vars: { 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb" },
  },
  violet: {
    label: "Violet",
    swatch: "#8b5cf6",
    vars: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" },
  },
  green: {
    label: "Green",
    swatch: "#22c55e",
    vars: { 400: "#4ade80", 500: "#22c55e", 600: "#16a34a" },
  },
  rose: {
    label: "Rose",
    swatch: "#f43f5e",
    vars: { 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48" },
  },
};

function hex2rgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function injectAccentCSS(vars) {
  document.getElementById("accent-override")?.remove();
  if (!vars) return;
  const { 400: c400, 500: c500, 600: c600 } = vars;
  const rgb500 = hex2rgb(c500);
  const style = document.createElement("style");
  style.id = "accent-override";
  style.textContent = `
    .text-orange-400 { color: ${c400} !important; }
    .text-orange-500 { color: ${c500} !important; }
    .text-orange-600 { color: ${c600} !important; }
    .bg-orange-400 { background-color: ${c400} !important; }
    .bg-orange-500 { background-color: ${c500} !important; }
    .border-orange-400 { border-color: ${c400} !important; }
    .border-orange-500 { border-color: ${c500} !important; }
    .hover\\:text-orange-400:hover { color: ${c400} !important; }
    .hover\\:text-orange-300:hover { color: ${c400} !important; }
    .from-orange-400 { --tw-gradient-from: ${c400} !important; }
    .to-orange-400 { --tw-gradient-to: ${c400} !important; }
    .via-orange-400 { --tw-gradient-via: ${c400} !important; }
    .from-orange-500 { --tw-gradient-from: ${c500} !important; }
    .ring-orange-500\\/30 { --tw-ring-color: ${c500}4d !important; }
    .focus\\:border-orange-500\\/50:focus { border-color: ${c500}80 !important; }
    .focus\\:ring-orange-500\\/30:focus { --tw-ring-color: ${c500}4d !important; }
    :root {
      --accent-400: ${c400};
      --accent-500: ${c500};
      --accent-600: ${c600};
      --accent-rgb: ${rgb500};
      --color-border-hover: rgba(${rgb500}, 0.25);
      --color-shadow-card-hover: 0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(${rgb500}, 0.15);
    }
    .dark {
      --color-border-hover: rgba(${rgb500}, 0.3);
      --color-shadow-card-hover: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(${rgb500}, 0.12);
    }
    ::selection { background: rgba(${rgb500}, 0.25); }
    :focus-visible { outline-color: rgba(${rgb500}, 0.7); }
    .section-label { background-color: rgba(${rgb500}, 0.08) !important; border-color: rgba(${rgb500}, 0.15) !important; color: ${c500} !important; }
    .glow-dot { background-color: ${c500} !important; box-shadow: 0 0 8px rgba(${rgb500}, 0.8) !important; }
    .gradient-text { background-image: linear-gradient(to right, ${c400}, ${c400}cc) !important; }
    .btn-primary { background-color: ${c500} !important; box-shadow: 0 0 20px rgba(${rgb500}, 0.3) !important; }
    .btn-primary:hover { background-color: ${c400} !important; box-shadow: 0 0 28px rgba(${rgb500}, 0.45) !important; }
    ::-webkit-scrollbar-thumb { background: rgba(${rgb500}, 0.4) !important; }
  `;
  document.head.appendChild(style);
}

const STORAGE_KEY = "portfolio-accent";

export function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "orange");

  useEffect(() => {
    injectAccentCSS(ACCENTS[accent]?.vars ?? null);
  }, []);

  const pick = useCallback((name) => {
    setAccent(name);
    localStorage.setItem(STORAGE_KEY, name);
    injectAccentCSS(ACCENTS[name].vars);
    setOpen(false);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1.5 p-2 rounded-2xl border border-slate-200 dark:border-white/[0.09]
                       bg-white dark:bg-[#0d1117] shadow-xl"
          >
            {Object.entries(ACCENTS).map(([name, { label, swatch }]) => (
              <button
                key={name}
                onClick={() => pick(name)}
                title={label}
                aria-label={`Set accent to ${label}`}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150
                  ${accent === name
                    ? "bg-slate-100 dark:bg-white/[0.07] text-slate-800 dark:text-slate-200"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                  }`}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-white dark:ring-offset-[#0d1117] transition-all"
                  style={{
                    backgroundColor: swatch,
                    ringColor: accent === name ? swatch : "transparent",
                  }}
                />
                {label}
                {accent === name && <span className="ml-auto text-[10px] opacity-60">active</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose accent colour"
        title="Choose accent colour"
        className="w-10 h-10 rounded-full border shadow-sm backdrop-blur-sm transition-all duration-200
                   bg-white/80 dark:bg-white/[0.05] border-slate-200 dark:border-white/[0.1]
                   text-slate-400 hover:text-orange-400 hover:border-orange-500/30 flex items-center justify-center"
      >
        <Palette className="w-4 h-4" />
      </button>
    </div>
  );
}

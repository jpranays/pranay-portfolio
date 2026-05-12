import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SHORTCUTS = [
  { keys: ["?"],        desc: "Show / hide this overlay" },
  { keys: ["⌘", "K"],   desc: "Open command palette" },
  { keys: ["↑↑↓↓←→←→BA"], desc: "Unlock easter egg 🎮", mono: true },
];

export function ShortcutsModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape" || e.key === "?") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="shortcuts-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm rounded-2xl border border-slate-200 dark:border-white/[0.09]
                       bg-white dark:bg-[#0d1117] shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Keyboard shortcuts
              </h2>
              <button
                onClick={onClose}
                aria-label="Close shortcuts"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
                           hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="space-y-3">
              {SHORTCUTS.map(({ keys, desc, mono }) => (
                <li key={desc} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{desc}</span>
                  <span className="flex items-center gap-1 flex-shrink-0">
                    {keys.map((k) => (
                      <kbd
                        key={k}
                        className={`px-2 py-0.5 rounded-md text-xs border border-slate-200 dark:border-white/[0.1]
                                   bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300
                                   ${mono ? "font-mono text-[10px]" : ""}`}
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[11px] font-mono text-slate-400 dark:text-slate-600 text-center">
              press <kbd className="px-1.5 py-px rounded text-[10px] border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04]">?</kbd> or <kbd className="px-1.5 py-px rounded text-[10px] border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04]">esc</kbd> to dismiss
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, FileText, Github, Linkedin, Copy, Check } from "lucide-react";

const EMAIL = "pranay1315@gmail.com";

const ITEMS = [
  {
    id: "copy-email",
    label: "Copy email address",
    icon: Copy,
    action: "copy",
  },
  {
    id: "resume",
    label: "View resume",
    icon: FileText,
    href: "/Pranay_Sunil_Jadhav_Resume.pdf",
  },
  {
    id: "email",
    label: "Send email",
    icon: Mail,
    href: `mailto:${EMAIL}`,
  },
  { divider: true },
  {
    id: "github",
    label: "GitHub profile",
    icon: Github,
    href: "https://github.com/jpranays",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn profile",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jpranays",
    external: true,
  },
];

export function ContextMenu() {
  const [state, setState] = useState({ open: false, x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const open = useCallback((e) => {
    e.preventDefault();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const menuW = 220;
    const menuH = 220;
    const x = Math.min(e.clientX, vw - menuW - 8);
    const y = Math.min(e.clientY, vh - menuH - 8);
    setState({ open: true, x, y });
  }, []);

  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    window.addEventListener("contextmenu", open);
    window.addEventListener("click", close);
    window.addEventListener("keydown", (e) => e.key === "Escape" && close());
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("contextmenu", open);
      window.removeEventListener("click", close);
    };
  }, [open, close]);

  const handleAction = (item) => {
    close();
    if (item.action === "copy") {
      navigator.clipboard.writeText(EMAIL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (item.href) {
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        window.open(item.href, "_blank", "noopener");
      }
    }
  };

  return (
    <AnimatePresence>
      {state.open && (
        <motion.div
          ref={menuRef}
          key="ctx-menu"
          initial={{ opacity: 0, scale: 0.9, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -4 }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[9995] w-[220px] rounded-xl border border-slate-200 dark:border-white/[0.09]
                     bg-white dark:bg-[#0d1117] shadow-xl py-1.5"
          style={{ left: state.x, top: state.y }}
          role="menu"
          aria-label="Context menu"
          onClick={(e) => e.stopPropagation()}
        >
          {ITEMS.map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1.5 h-px bg-slate-100 dark:bg-white/[0.06]" aria-hidden="true" />
            ) : (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => handleAction(item)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300
                           hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-slate-100
                           transition-colors duration-100 text-left"
              >
                {item.id === "copy-email" && copied
                  ? <Check className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                  : <item.icon className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />}
                <span>{item.id === "copy-email" && copied ? "Copied!" : item.label}</span>
              </button>
            )
          )}
          <div className="mx-3 mt-1.5 pt-1.5 border-t border-slate-100 dark:border-white/[0.06]">
            <p className="text-[10px] font-mono text-slate-400 dark:text-slate-600 pb-0.5">
              right-click anywhere
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { createContext, useContext, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X, Sparkles } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
  easter:  Sparkles,
};

const STYLES = {
  success: "border-green-500/30  bg-green-500/10  text-green-400",
  error:   "border-red-500/30    bg-red-500/10    text-red-400",
  info:    "border-blue-500/30   bg-blue-500/10   text-blue-400",
  easter:  "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

let _nextId = 0;

function ToastItem({ toast, onDismiss }) {
  const Icon = ICONS[toast.type] ?? Info;
  const style = STYLES[toast.type] ?? STYLES.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 w-80 max-w-[calc(100vw-2rem)] px-4 py-3 rounded-xl
                  border backdrop-blur-xl shadow-lg
                  bg-white/90 dark:bg-[#0d1117]/90
                  border-slate-200/80 dark:border-white/[0.1]`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${style.split(" ")[2]}`} aria-hidden="true" />
      <p className="text-sm text-slate-700 dark:text-slate-200 flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-2 items-end pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((message, type = "success", duration = 3500) => {
    const id = ++_nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={add}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const add = useContext(ToastContext);
  return {
    success: (msg, dur)  => add(msg, "success", dur),
    error:   (msg, dur)  => add(msg, "error",   dur),
    info:    (msg, dur)  => add(msg, "info",     dur),
    easter:  (msg, dur)  => add(msg, "easter",   dur),
  };
}

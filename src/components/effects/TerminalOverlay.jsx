import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { SKILL_GROUPS } from "../../data/skills";
import { PROJECTS } from "../../data/projects";
import { useNpmStats } from "../../hooks/useNpmStats";

const OPEN_URLS = {
  github:    "https://github.com/jpranays",
  linkedin:  "https://www.linkedin.com/in/jpranays",
  npm:       "https://www.npmjs.com/~jpranays",
  twitter:   "https://x.com/jpranays",
  x:         "https://x.com/jpranays",
  portfolio: "https://jpranays.netlify.app",
};

/** Merge live weekly-download figures into project records (same logic as Projects.jsx). */
function buildProjects(npmData) {
  if (!npmData?.packages) return PROJECTS;
  return PROJECTS.map((p) => {
    const dl = npmData.packages.find((pkg) => pkg.name === p.id)?.downloads;
    if (dl == null) return p;
    const k = Math.round(dl / 1000);
    return {
      ...p,
      badge: p.id === "react-fast-hooks" ? `📦 ${k}K+/wk` : `⚡ ${k}K+/wk`,
    };
  });
}

function getOutput(raw, onExit, projects) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return { lines: [] };

  switch (cmd) {
    case "help":
      return { lines: [
        { t: "Available commands", c: "text-orange-400 font-semibold" },
        { t: "" },
        { t: "  whoami          — who I am" },
        { t: "  ls projects     — list all projects" },
        { t: "  ls skills       — show tech stack" },
        { t: "  cat about.json  — about me in JSON" },
        { t: "  neofetch        — system info" },
        { t: "  open <name>     — open: github | linkedin | npm | twitter" },
        { t: "  clear           — clear terminal" },
        { t: "  exit            — close this terminal" },
      ]};

    case "whoami":
      return { lines: [
        { t: "Pranay Jadhav", c: "text-orange-400 font-bold" },
        { t: "────────────────────────────────" },
        { t: "  Role      Senior Software Developer" },
        { t: "  Company   Sears India" },
        { t: "  Exp       3.5+ years" },
        { t: "  npm       25K+ weekly downloads" },
        { t: "  OSS       3.4M+ developers / month" },
        { t: "  Email     pranay1315@gmail.com" },
        { t: "  Status    ✅ Open to opportunities" },
      ]};

    case "ls":
    case "ls projects":
      return { lines: [
        { t: "projects/", c: "text-cyan-400 font-semibold" },
        ...projects.map(p => ({
          t: `  ${p.featured ? "★" : "·"} ${p.id}${p.badge ? `   ${p.badge}` : ""}`,
          c: p.featured ? "text-orange-300" : "text-slate-400",
        })),
      ]};

    case "ls skills":
      return { lines: SKILL_GROUPS.flatMap(g => [
        { t: `[${g.label}]`, c: "text-cyan-400 font-semibold" },
        { t: `  ${g.skills.map(s => s.name).join(", ")}`, c: "text-slate-400" },
      ])};

    case "cat about.json":
      return { lines: [
        { t: "{", c: "text-slate-500" },
        { t: '  "name":       "Pranay Jadhav"',           c: "text-cyan-400" },
        { t: '  "role":       "Senior Software Developer"', c: "text-cyan-400" },
        { t: '  "company":    "Sears India"',               c: "text-cyan-400" },
        { t: '  "experience": "3.5+ years"',                  c: "text-cyan-400" },
        { t: '  "npm":        "25K+ weekly downloads"',     c: "text-green-400" },
        { t: '  "oss":        "3.4M+ devs / month"',        c: "text-green-400" },
        { t: '  "available":  true',                         c: "text-green-400" },
        { t: '  "email":      "pranay1315@gmail.com"',      c: "text-amber-400" },
        { t: '  "location":   "Pune, India"',               c: "text-amber-400" },
        { t: "}", c: "text-slate-500" },
      ]};

    case "neofetch":
      return { lines: [
        { t: "       ██████╗       pranay@portfolio",      c: "text-orange-400" },
        { t: "      ██╔══██╗      ─────────────────",      c: "text-orange-400" },
        { t: "      ██████╔╝      OS: React 18 + Vite 5",  c: "text-orange-400" },
        { t: "      ██╔═══╝       Shell: Node.js 20",       c: "text-orange-400" },
        { t: "      ██║           Editor: VS Code",          c: "text-orange-400" },
        { t: "      ╚═╝           Location: Pune, India 🇮🇳", c: "text-orange-400" },
        { t: "" },
        { t: "  Stack: React · Next.js · TypeScript · Node.js" },
        { t: "  Focus: Security · Accessibility · Performance" },
        { t: "  Coffee: ☕ always on" },
      ]};

    case "clear":
      return { clear: true };

    case "exit":
    case "close":
      onExit?.();
      return { lines: [{ t: "Goodbye 👋", c: "text-slate-500" }] };

    // easter eggs
    case "sudo rm -rf /":
    case "rm -rf /":
      return { lines: [{ t: "Nice try 😄", c: "text-orange-400" }] };

    case "ls -la":
      return { lines: [
        { t: "total 42",                                                          c: "text-slate-500" },
        { t: "drwxr-xr-x  pranay  staff  256  May 2026  .",                      c: "text-slate-500" },
        { t: "drwxr-xr-x  pranay  staff  512  Jan 2022  ..",                     c: "text-slate-500" },
        { t: "-rw-r--r--  pranay  staff  404  May 2026  dreams.txt",             c: "text-green-400" },
        { t: "-rw-r--r--  pranay  staff   42  May 2026  coffee.log",             c: "text-amber-400" },
        { t: "drwxr-xr-x  pranay  staff  128  May 2026  projects/",              c: "text-cyan-400"  },
      ]};

    case "cat dreams.txt":
      return { lines: [
        { t: "1. Ship open source that 1M+ devs rely on daily" },
        { t: "2. Build something that genuinely makes life easier" },
        { t: "3. Ride every mountain range in India 🏔️" },
      ]};

    case "cat coffee.log":
      return { lines: [{ t: "☕☕☕ ... too many entries to display", c: "text-amber-400" }] };

    default:
      if (cmd.startsWith("open ")) {
        const target = cmd.slice(5).trim();
        const url = OPEN_URLS[target];
        if (url) {
          setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 300);
          return { lines: [{ t: `Opening ${target}… ↗`, c: "text-green-400" }] };
        }
        return { lines: [{ t: `Unknown platform: '${target}'. Try: github, linkedin, npm, twitter`, c: "text-red-400" }] };
      }
      return { lines: [{ t: `${raw.trim()}: command not found. Type 'help' for commands.`, c: "text-red-400" }] };
  }
}

const BOOT_LINES = [
  { t: "Welcome to pranay's terminal  🚀", c: "text-orange-400 font-semibold" },
  { t: "Type 'help' for available commands. Press Esc to close.", c: "text-slate-500" },
  { t: "" },
];

function TerminalOverlay({ open, onClose }) {
  const { data: npmData } = useNpmStats();

  // Enrich PROJECTS with live download figures — same cache as everywhere else
  const projects = useMemo(() => buildProjects(npmData), [npmData]);

  const [lines, setLines] = useState(BOOT_LINES);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      setLines(BOOT_LINES);
      setInput("");
      setHistIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, open]);

  const close = useCallback(() => onClose?.(), [onClose]);

  const run = useCallback((e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    const result = getOutput(trimmed, close, projects);

    if (result.clear) {
      setLines(BOOT_LINES);
    } else {
      const inputLine = { t: `❯ ${trimmed}`, c: "text-slate-300 opacity-70" };
      setLines(prev => [...prev, inputLine, ...(result.lines || []), { t: "" }]);
    }

    if (trimmed) {
      setCmdHistory(prev => [trimmed, ...prev.filter(c => c !== trimmed)].slice(0, 50));
    }
    setInput("");
    setHistIdx(-1);
  }, [input, close, projects]);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx(prev => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx(prev => {
        const next = prev - 1;
        if (next < 0) { setInput(""); return -1; }
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    }
  }, [close, cmdHistory]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-10"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden
                       border border-white/[0.1] bg-[#0d1117]
                       shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            style={{ height: "min(560px, 85vh)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/[0.08] flex-shrink-0">
              <button
                onClick={close}
                aria-label="Close terminal"
                className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-400 transition-colors"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-green-500/70"  aria-hidden="true" />
              <Terminal className="w-3.5 h-3.5 text-slate-600 ml-3" aria-hidden="true" />
              <span className="text-xs font-mono text-slate-600 flex-1 select-none">
                pranay@portfolio: ~
              </span>
              <span className="text-[10px] font-mono text-slate-700 hidden sm:block mr-2 select-none">
                press ` to toggle
              </span>
              <button onClick={close} aria-label="Close terminal" className="text-slate-600 hover:text-slate-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-1 font-mono text-xs leading-[1.7]">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={`whitespace-pre-wrap break-all ${line.c ?? "text-slate-300"} ${line.t === "" ? "h-2 block" : ""}`}
                >
                  {line.t}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <form
              onSubmit={run}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.08] flex-shrink-0"
            >
              <span className="text-orange-400 font-mono text-xs select-none" aria-hidden="true">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-slate-200 font-mono text-xs outline-none caret-orange-400 placeholder-slate-700"
                placeholder="type a command…"
                aria-label="Terminal command input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(TerminalOverlay);

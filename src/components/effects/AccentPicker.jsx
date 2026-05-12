import { useState, useEffect, useCallback, useRef } from "react";

const ACCENTS = [
  { name: "orange", c400: "#fb923c", c500: "#f97316", c600: "#ea580c" },
  { name: "blue",   c400: "#60a5fa", c500: "#3b82f6", c600: "#2563eb" },
  { name: "violet", c400: "#a78bfa", c500: "#8b5cf6", c600: "#7c3aed" },
  { name: "green",  c400: "#4ade80", c500: "#22c55e", c600: "#16a34a" },
  { name: "rose",   c400: "#fb7185", c500: "#f43f5e", c600: "#e11d48" },
];

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

const CYCLE_MS      = 6000;
const TRANSITION_MS = 1600;
const STORAGE_KEY   = "portfolio-accent";

/* ── colour math ──────────────────────────────────────────────── */
function parseHex(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
function toHex([r, g, b]) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}
function lerpHex(a, b, t) {
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}
function hex2rgb(hex) {
  return parseHex(hex).join(", ");
}

/* Smooth-step easing — gentle S-curve, slower start/end, brisk middle */
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

/* ── interpolation engine ─────────────────────────────────────── */
/* Module-level so successive cycles continue from mid-transition */
let _cur = { c400: "#fb923c", c500: "#f97316", c600: "#ea580c" };
let _raf = null;

function setVars({ c400, c500, c600 }) {
  const root = document.documentElement;
  root.style.setProperty("--ap-400", c400);
  root.style.setProperty("--ap-500", c500);
  root.style.setProperty("--ap-600", c600);
  root.style.setProperty("--color-border-hover", `rgba(${hex2rgb(c500)}, 0.25)`);
  root.style.setProperty(
    "--color-shadow-card-hover",
    `0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(${hex2rgb(c500)}, 0.15)`
  );
}

function animateTo(target, onDone) {
  if (_raf) cancelAnimationFrame(_raf);
  const from = { ..._cur };
  const start = performance.now();

  function tick(now) {
    const raw    = Math.min((now - start) / TRANSITION_MS, 1);
    const eased  = smoothstep(raw);
    const colors = {
      c400: lerpHex(from.c400, target.c400, eased),
      c500: lerpHex(from.c500, target.c500, eased),
      c600: lerpHex(from.c600, target.c600, eased),
    };
    _cur = colors;
    setVars(colors);

    if (raw < 1) {
      _raf = requestAnimationFrame(tick);
    } else {
      _raf = null;
      onDone?.();
    }
  }

  _raf = requestAnimationFrame(tick);
}

/* ── one-time style injection ─────────────────────────────────── */
function injectStyle() {
  if (document.getElementById("ap-style")) return;
  const s = document.createElement("style");
  s.id = "ap-style";
  s.textContent = `
    .text-orange-400, .hover\\:text-orange-400:hover, .dark\\:text-orange-400 { color: var(--ap-400) !important; }
    .text-orange-500 { color: var(--ap-500) !important; }
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
      background-color: color-mix(in srgb, var(--ap-500) 8%,  transparent) !important;
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
    ::selection    { background: color-mix(in srgb, var(--ap-500) 25%, transparent) !important; }
    :focus-visible { outline-color: color-mix(in srgb, var(--ap-500) 70%, transparent) !important; }
    ::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ap-500) 40%, transparent) !important; }
  `;
  document.head.appendChild(s);
}

/* ── component ────────────────────────────────────────────────── */
export function AccentPicker() {
  const initIdx = Math.max(
    0,
    ACCENTS.findIndex((a) => a.name === (localStorage.getItem(STORAGE_KEY) ?? "orange"))
  );

  const idxRef   = useRef(initIdx);
  const timerRef = useRef(null);

  const advance = useCallback(() => {
    const next   = (idxRef.current + 1) % ACCENTS.length;
    idxRef.current = next;
    const accent = ACCENTS[next];
    localStorage.setItem(STORAGE_KEY, accent.name);
    animateTo(accent, () => {
      window.dispatchEvent(
        new CustomEvent("portfolio:accent", {
          detail: { name: accent.name, heatmap: ACCENT_HEATMAP[accent.name] },
        })
      );
    });
  }, []);

  useEffect(() => {
    injectStyle();
    /* Apply saved accent instantly on mount (no animation on first load) */
    const saved = ACCENTS[initIdx];
    _cur = { c400: saved.c400, c500: saved.c500, c600: saved.c600 };
    setVars(_cur);

    timerRef.current = setInterval(advance, CYCLE_MS);
    return () => {
      clearInterval(timerRef.current);
      if (_raf) cancelAnimationFrame(_raf);
    };
  }, [advance, initIdx]);

  return null;
}

import { useState, useCallback } from "react";

const KEY = "portfolio-available";

export function useAvailability() {
  const [available, setAvailable] = useState(() => {
    try { return localStorage.getItem(KEY) !== "false"; } catch { return true; }
  });

  const toggle = useCallback(() => {
    setAvailable(v => {
      const next = !v;
      try { localStorage.setItem(KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  return { available, toggle };
}

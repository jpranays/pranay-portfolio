import { useEffect, useRef } from "react";

const EVENTS = ["mousemove", "keydown", "scroll", "click", "touchstart"];

export function useIdle(onIdle, delayMs = 30000) {
  const timerRef = useRef(null);

  useEffect(() => {
    const reset = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onIdle, delayMs);
    };

    reset();
    EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      clearTimeout(timerRef.current);
      EVENTS.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [onIdle, delayMs]);
}

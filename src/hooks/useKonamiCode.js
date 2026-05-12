import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
];

export function useKonamiCode(onActivate) {
  const progress = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          // onActivate();
        }
      } else {
        // If the failed key restarts the sequence, don't lose it
        progress.current = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onActivate]);
}

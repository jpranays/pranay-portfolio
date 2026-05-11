import { useState, useEffect, useRef } from "react";

/**
 * Reliable typing animation — uses refs to avoid stale-closure issues.
 * State is mutable via refs; `setDisplayed` only triggers the re-render.
 */
export function useTyping(words, { speed = 90, deleteSpeed = 55, pause = 1800 } = {}) {
  const [displayed, setDisplayed] = useState("");

  // All mutable animation state lives in refs — never stale inside tick()
  const wordsRef = useRef(words);
  const displayedRef = useRef("");
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef(null);

  // Keep wordsRef fresh on every render without restarting the animation
  wordsRef.current = words;

  useEffect(() => {
    if (!wordsRef.current.length) return;

    const tick = () => {
      const wordList = wordsRef.current;
      const current = wordList[wordIndexRef.current % wordList.length];

      if (!isDeletingRef.current) {
        // Type one character
        const next = current.slice(0, displayedRef.current.length + 1);
        displayedRef.current = next;
        setDisplayed(next);

        if (next === current) {
          // Finished typing — pause, then switch to deleting
          timerRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, pause);
        } else {
          timerRef.current = setTimeout(tick, speed);
        }
      } else {
        // Delete one character
        const next = current.slice(0, displayedRef.current.length - 1);
        displayedRef.current = next;
        setDisplayed(next);

        if (next === "") {
          // Finished deleting — advance to next word
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % wordList.length;
          timerRef.current = setTimeout(tick, speed);
        } else {
          timerRef.current = setTimeout(tick, deleteSpeed);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  }, []); // Intentionally empty — animation runs once; refs handle fresh state

  return displayed;
}

import { useState, useRef, useEffect } from "react";

const TRACK_SRC = "/music/background.mp3";
const TARGET_VOL = 0.35;

function fadeTo(audio, target, ms, onDone) {
  const start = audio.volume;
  const diff  = target - start;
  const steps = 40;
  const tick  = ms / steps;
  let step = 0;
  const id = setInterval(() => {
    step++;
    audio.volume = Math.min(1, Math.max(0, start + diff * (step / steps)));
    if (step >= steps) { clearInterval(id); onDone?.(); }
  }, tick);
  return id;
}

export function useMusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef  = useRef(null);
  const fadeIdRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop   = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeIdRef.current) clearInterval(fadeIdRef.current);

    if (!playing) {
      audio.play().catch(() => {});
      fadeIdRef.current = fadeTo(audio, TARGET_VOL, 1800);
      setPlaying(true);
    } else {
      fadeIdRef.current = fadeTo(audio, 0, 1200, () => audio.pause());
      setPlaying(false);
    }
  };

  return { playing, toggle };
}

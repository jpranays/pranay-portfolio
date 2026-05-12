import { useState, useRef } from "react";

function buildAmbient(ctx) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, ctx.currentTime);
  master.connect(ctx.destination);

  [
    { freq: 55,  gain: 0.50, type: "sine"     },
    { freq: 110, gain: 0.25, type: "sine"     },
    { freq: 165, gain: 0.09, type: "sine"     },
    { freq: 220, gain: 0.05, type: "triangle" },
    { freq: 330, gain: 0.02, type: "triangle" },
  ].forEach(({ freq, gain, type }) => {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type            = type;
    osc.frequency.value = freq;
    osc.detune.value    = (Math.random() - 0.5) * 12;
    g.gain.value        = gain;
    osc.connect(g);
    g.connect(master);
    osc.start();
  });

  const lfo  = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoG.gain.value     = 0.07;
  lfo.connect(lfoG);
  lfoG.connect(master.gain);
  lfo.start();

  return master;
}

export function useMusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef    = useRef(null);
  const masterRef = useRef(null);

  const toggle = () => {
    if (!playing) {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        ctxRef.current    = ctx;
        masterRef.current = buildAmbient(ctx);
      } else if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume();
      }
      const now = ctxRef.current.currentTime;
      const g   = masterRef.current.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0.38, now + 1.8);
      setPlaying(true);
    } else {
      const ctx = ctxRef.current;
      const g   = masterRef.current.gain;
      const now = ctx.currentTime;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0.001, now + 1.2);
      setTimeout(() => ctx.suspend(), 1300);
      setPlaying(false);
    }
  };

  return { playing, toggle };
}

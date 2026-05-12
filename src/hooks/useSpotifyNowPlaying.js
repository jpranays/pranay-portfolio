import { useState, useEffect } from "react";

const CACHE_KEY = "spotify-now-playing";
const CACHE_TTL = 60 * 1000; // 1 min

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function writeCache(data) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

export function useSpotifyNowPlaying() {
  const [state, setState] = useState({ loading: true, data: null });

  useEffect(() => {
    const cached = readCache();
    if (cached) { setState({ loading: false, data: cached }); return; }

    fetch("/.netlify/functions/spotify")
      .then((r) => r.json())
      .then((data) => {
        if (data.title) writeCache(data);
        setState({ loading: false, data });
      })
      .catch(() => setState({ loading: false, data: null }));
  }, []);

  return state;
}

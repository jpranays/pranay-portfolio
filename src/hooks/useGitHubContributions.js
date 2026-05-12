import { useState, useEffect } from "react";

const USERNAME = "jpranays";
const CACHE_KEY = `gh-contributions-${USERNAME}`;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

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
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

let _promise = null;

async function fetchContributions() {
  const cached = readCache();
  if (cached) return cached;
  if (_promise) return _promise;

  _promise = fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
  )
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((json) => {
      const contributions = json.contributions ?? [];
      const totalThisYear = contributions.reduce((s, c) => s + c.count, 0);
      const data = { contributions, totalThisYear, fetchedAt: Date.now() };
      writeCache(data);
      _promise = null;
      return data;
    })
    .catch((err) => {
      _promise = null;
      throw err;
    });

  return _promise;
}

export function useGitHubContributions() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let cancelled = false;
    fetchContributions()
      .then((data) => { if (!cancelled) setState({ loading: false, error: null, data }); })
      .catch((err) => { if (!cancelled) setState({ loading: false, error: String(err), data: null }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}

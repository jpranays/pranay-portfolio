import { useState, useEffect } from "react";

const PACKAGES = ["react-fast-hooks", "cli-gh"];
const CACHE_KEY = "npm-stats-jpranays";
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
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

// Module-level promise so parallel hook calls share one fetch
let _promise = null;

async function fetchStats() {
  const cached = readCache();
  if (cached) return cached;
  if (_promise) return _promise;

  _promise = Promise.all(
    PACKAGES.map((pkg) =>
      fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    )
  ).then((results) => {
    const packages = results.map((r, i) => ({ name: PACKAGES[i], downloads: r.downloads ?? 0 }));
    const total = packages.reduce((s, p) => s + p.downloads, 0);
    const data = { total, packages, fetchedAt: Date.now() };
    writeCache(data);
    _promise = null;
    return data;
  }).catch((err) => {
    _promise = null;
    throw err;
  });

  return _promise;
}

export function useNpmStats() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let cancelled = false;
    fetchStats()
      .then((data) => { if (!cancelled) setState({ loading: false, error: null, data }); })
      .catch((err) => { if (!cancelled) setState({ loading: false, error: String(err), data: null }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}

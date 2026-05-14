import { useState, useEffect } from "react";

// Packages whose monthly downloads represent the "developers impacted via OSS" figure
const OSS_PACKAGES = ["@mantine/hooks", "primereact", "rsuite"];

const CACHE_KEY = "oss-impact-jpranays";
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours (monthly numbers change slowly)

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

let _promise = null;

async function fetchImpact() {
  const cached = readCache();
  if (cached) return cached;
  if (_promise) return _promise;

  _promise = Promise.all(
    OSS_PACKAGES.map((pkg) =>
      fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    )
  ).then((results) => {
    const packages = results.map((r, i) => ({ name: OSS_PACKAGES[i], downloads: r.downloads ?? 0 }));
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

export function useOssImpact() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let cancelled = false;
    fetchImpact()
      .then((data) => { if (!cancelled) setState({ loading: false, error: null, data }); })
      .catch((err) => { if (!cancelled) setState({ loading: false, error: String(err), data: null }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}

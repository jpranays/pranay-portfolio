import { useState, useEffect } from "react";

const CACHE_KEY = "npm-pkg-info-jpranays";
const CACHE_TTL = 6 * 60 * 60 * 1000;

const PACKAGES = ["react-fast-hooks", "cli-gh"];

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

async function fetchPackageInfo() {
  const cached = readCache();
  if (cached) return cached;
  if (_promise) return _promise;

  _promise = Promise.all(
    PACKAGES.map(async (pkg) => {
      const [reg, bp] = await Promise.allSettled([
        fetch(`https://registry.npmjs.org/${pkg}/latest`).then(r => r.ok ? r.json() : null),
        fetch(`https://bundlephobia.com/api/size?package=${pkg}`).then(r => r.ok ? r.json() : null),
      ]);
      return {
        name: pkg,
        version: reg.status === "fulfilled" && reg.value ? reg.value.version : null,
        gzip:    bp.status  === "fulfilled" && bp.value  ? bp.value.gzip    : null,
      };
    })
  ).then(data => {
    writeCache(data);
    _promise = null;
    return data;
  }).catch(err => {
    _promise = null;
    throw err;
  });

  return _promise;
}

export function useNpmPackageInfo() {
  const [state, setState] = useState({ loading: true, data: null });

  useEffect(() => {
    let cancelled = false;
    fetchPackageInfo()
      .then(data => { if (!cancelled) setState({ loading: false, data }); })
      .catch(() => { if (!cancelled) setState({ loading: false, data: null }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}

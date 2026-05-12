import { useState, useEffect } from "react";

const USERNAME = "jpranays";
const CACHE_KEY = `gh-stats-${USERNAME}`;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export function useGitHubStats() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setState({ loading: false, error: null, data: cached });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`),
        ]);

        const remaining = parseInt(
          profileRes.headers.get("X-RateLimit-Remaining") ?? "60",
          10
        );

        if (profileRes.status === 403 || remaining === 0) {
          const reset = parseInt(profileRes.headers.get("X-RateLimit-Reset") ?? "0", 10);
          throw new Error(`rate_limited:${reset}`);
        }

        if (!profileRes.ok || !reposRes.ok) throw new Error("fetch_failed");

        const profile = await profileRes.json();
        const allRepos = await reposRes.json();

        if (!Array.isArray(allRepos)) throw new Error("fetch_failed");

        const ownRepos = allRepos.filter((r) => !r.fork);
        const totalStars = ownRepos.reduce((s, r) => s + r.stargazers_count, 0);
        const totalForks = ownRepos.reduce((s, r) => s + r.forks_count, 0);

        const topRepos = [...ownRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((r) => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
          }));

        const langMap = {};
        ownRepos.forEach((r) => {
          if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
        });
        const languages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        const data = {
          publicRepos: profile.public_repos,
          followers: profile.followers,
          totalStars,
          totalForks,
          topRepos,
          languages,
          fetchedAt: Date.now(),
        };

        writeCache(data);
        if (!cancelled) setState({ loading: false, error: null, data });
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err.message, data: null });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
}

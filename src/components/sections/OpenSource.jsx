import { memo, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink, GitPullRequest, Package, Users,
  Star, GitFork, BookOpen, AlertCircle,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { OSS_CONTRIBUTIONS, OSS_STATS } from "../../data/opensource";
import { useGitHubStats } from "../../hooks/useGitHubStats";
import { useNpmStats } from "../../hooks/useNpmStats";
import { useGitHubContributions } from "../../hooks/useGitHubContributions";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit } from "lucide-react";



function CountUp({ to, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView) return;
    const steps = 55, dur = 1400;
    let s = 0;
    const id = setInterval(() => {
      s++;
      const p = 1 - Math.pow(1 - s / steps, 3);
      setCount(parseFloat((to * p).toFixed(decimals)));
      if (s >= steps) { setCount(to); clearInterval(id); }
    }, dur / steps);
    return () => clearInterval(id);
  }, [inView, to, decimals]);
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
}

const COLOR_MAP = {
  blue:   "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  teal:   "bg-teal-500/10 text-teal-500 dark:text-teal-400 border-teal-500/20",
  red:    "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
  orange: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20",
  purple: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
  cyan:   "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20",
  green:  "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  pink:   "bg-pink-500/10 text-pink-500 dark:text-pink-400 border-pink-500/20",
};

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML:       "#e34f26",
  CSS:        "#1572b6",
  Vue:        "#4fc08d",
  Python:     "#3776ab",
  SCSS:       "#c6538c",
  Shell:      "#89e051",
  MDX:        "#fcb32c",
};

const HEADER_STATS = [
  { countTo: OSS_STATS.libraries, suffix: "+",  decimals: 0, label: "Libraries contributed",             icon: GitPullRequest },
  { countTo: 3.4,                 suffix: "M+", decimals: 1, label: "Developers impacted / month",       icon: Users          },
  { countTo: 25,                  suffix: "K+", decimals: 0, label: "Weekly npm downloads (own packages)", icon: Package, liveKey: "npm" },
];

// ── Skeleton helpers ──────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return (
    <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-white/[0.06] ${className}`} />
  );
}

function GHStatsSkeleton() {
  return (
    <div className="glass-card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4 space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28 mb-3" />
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-20" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Live panel ────────────────────────────────────────────────────────────────
function GitHubStatsPanel() {
  const { loading, error, data } = useGitHubStats();

  const GH_PROFILE = "https://github.com/jpranays";

  if (loading) return <GHStatsSkeleton />;

  if (error) {
    const isRateLimit = error.startsWith("rate_limited");
    return (
      <div className="glass-card p-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span>
          {isRateLimit
            ? "GitHub API rate limit reached — stats will reload on next visit."
            : "Couldn't load live stats right now."}
        </span>
        <a
          href={GH_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-orange-400/80 hover:text-orange-400 transition-colors whitespace-nowrap font-mono text-xs"
        >
          View on GitHub <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  const { publicRepos, followers, totalStars, totalForks, topRepos, languages, fetchedAt } = data;

  const minutesAgo = Math.floor((Date.now() - fetchedAt) / 60_000);
  const fetchLabel = minutesAgo < 1 ? "Just now" : `${minutesAgo}m ago`;

  const ghStats = [
    { label: "Public Repos", value: publicRepos, icon: BookOpen,  color: "text-orange-400" },
    { label: "Total Stars",  value: totalStars,  icon: Star,      color: "text-amber-400"  },
    { label: "Total Forks",  value: totalForks,  icon: GitFork,   color: "text-cyan-400"   },
    { label: "Followers",    value: followers,   icon: Users,     color: "text-violet-400" },
  ];

  return (
    <div className="glass-card p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Live from GitHub
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-600">
            Fetched {fetchLabel}
          </span>
          <a
            href={GH_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-orange-400/70 hover:text-orange-400 transition-colors"
          >
            @jpranays <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ghStats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-4"
          >
            <Icon className={`w-4 h-4 ${color} mb-2`} aria-hidden="true" />
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-none tracking-tight">
              {value.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* Top repos + Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Top repos */}
        <div>
          <p className="text-xs font-mono text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">
            Top Repositories
          </p>
          <ul className="space-y-2">
            {topRepos.slice(0, 4).map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2
                             border border-slate-200 dark:border-white/[0.05]
                             bg-slate-50 dark:bg-white/[0.02]
                             hover:border-orange-500/30 hover:bg-orange-500/[0.03]
                             transition-colors duration-200 group"
                >
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 group-hover:text-orange-400 transition-colors truncate">
                    {repo.name}
                  </span>
                  <span className="flex items-center gap-2 flex-shrink-0">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#6b7280" }}
                          aria-hidden="true"
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 text-[10px] font-mono text-amber-500 dark:text-amber-400">
                      <Star className="w-2.5 h-2.5" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <p className="text-xs font-mono text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">
            Most Used Languages
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {languages.map(({ name, count }) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono
                           border border-slate-200 dark:border-white/[0.06]
                           bg-slate-50 dark:bg-white/[0.02]
                           text-slate-500 dark:text-slate-400"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: LANG_COLORS[name] ?? "#6b7280" }}
                  aria-hidden="true"
                />
                {name}
                <span className="text-slate-400 dark:text-slate-600">×{count}</span>
              </span>
            ))}
          </div>

          {/* Language bar */}
          {languages.length > 0 && (() => {
            const total = languages.reduce((s, l) => s + l.count, 0);
            return (
              <div className="flex rounded-full overflow-hidden h-2 gap-px" aria-hidden="true">
                {languages.map(({ name, count }) => (
                  <div
                    key={name}
                    title={name}
                    style={{
                      width: `${(count / total) * 100}%`,
                      backgroundColor: LANG_COLORS[name] ?? "#6b7280",
                    }}
                  />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ── Contribution heatmap ─────────────────────────────────────────────────────
const LEVEL_CLASSES = [
  "bg-slate-200 dark:bg-white/[0.05]",
  "bg-green-200 dark:bg-green-900/70",
  "bg-green-400 dark:bg-green-700",
  "bg-green-500 dark:bg-green-500",
  "bg-emerald-600 dark:bg-green-400",
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildWeekGrid(contributions) {
  if (!contributions?.length) return [];
  // Pad front so the first day lands on its correct weekday column (0=Sun)
  const first = new Date(contributions[0].date + "T00:00:00");
  const padDays = first.getDay(); // 0–6
  const cells = [
    ...Array(padDays).fill(null),
    ...contributions,
  ];
  // Split into weeks of 7
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.find(Boolean);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T00:00:00").getMonth();
    if (m !== lastMonth) {
      labels.push({ week: wi, label: MONTHS[m] });
      lastMonth = m;
    }
  });
  return labels;
}

function HeatmapSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-[112px] w-full rounded-lg" />
    </div>
  );
}

function ContributionHeatmap() {
  const { loading, error, data } = useGitHubContributions();

  if (loading) return <HeatmapSkeleton />;

  if (error) {
    return (
      <div className="glass-card p-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span>Couldn&apos;t load contribution graph right now.</span>
      </div>
    );
  }

  const { contributions, totalThisYear, fetchedAt } = data;
  const weeks = buildWeekGrid(contributions);
  const monthLabels = getMonthLabels(weeks);
  const minutesAgo = Math.floor((Date.now() - fetchedAt) / 60_000);
  const fetchLabel = minutesAgo < 1 ? "Just now" : `${minutesAgo}m ago`;

  return (
    <div className="glass-card p-5 space-y-4">
      {/* Header */}
                {/* GitHub contribution heatmap — full width */}
          <AnimatedSection delay={0.55} className="md:col-span-2 lg:col-span-3">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <GitCommit className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  GitHub Contributions
                </h3>
                <a
                  href="https://github.com/jpranays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[11px] font-mono text-slate-400 hover:text-orange-400 transition-colors"
                >
                  @jpranays →
                </a>
              </div>
              <div className="overflow-x-auto [&_.react-activity-calendar]:!font-mono">
                <GitHubCalendar
                  username="jpranays"
                  colorScheme="light"
                  theme={{
                    light: ["#f1f5f9", "#fed7aa", "#fb923c", "#f97316", "#ea580c"],
                    dark:  ["#1e293b", "#431407", "#9a3412", "#f97316", "#fb923c"],
                  }}
                  style={{ width: "100%" }}
                  fontSize={11}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                  labels={{ totalCount: "{{count}} contributions in the last year" }}
                />
              </div>
            </div>
          </AnimatedSection>
     
    </div>
  );
}

// ── OSS contribution card ──────────────────────────────────────────────────────
function OSSCard({ item }) {
  const colorClass = COLOR_MAP[item.color] ?? COLOR_MAP.orange;
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="glass-card p-5 flex flex-col h-full group"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${colorClass}`}>
              {item.library}
            </span>
          </div>
          <a
            href={item.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View PR ${item.pr} for ${item.library}`}
            className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-orange-400 transition-colors group/pr"
          >
            <GitPullRequest className="w-3 h-3" aria-hidden="true" />
            <span className="group-hover/pr:underline">PR {item.pr}</span>
          </a>
        </div>

        <p className="text-xs font-mono text-slate-500 dark:text-slate-600 mb-2">{item.package}</p>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-white/[0.05]">
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3" aria-hidden="true" />
            {item.impact}
          </span>
          <div className="flex items-center gap-2">
            {item.npm && (
              <a
                href={item.npm}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.library} on npm`}
                className="text-xs font-mono text-slate-500 dark:text-slate-600 hover:text-red-400 transition-colors"
              >
                npm <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" aria-hidden="true" />
              </a>
            )}
            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.library} GitHub repo`}
              className="text-xs font-mono text-slate-500 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              GitHub <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function OpenSource() {
  const { data: npmData } = useNpmStats();

  return (
    <section id="opensource" aria-labelledby="opensource-heading">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            Open Source
          </p>
          <h2 id="opensource-heading" className="section-title">
            Giving back to the{" "}
            <span className="gradient-text">community</span>
          </h2>
          <p className="section-subtitle">
            I actively contribute to widely-used open-source libraries — improving accessibility,
            fixing bugs, and adding features that developers around the world rely on.
          </p>
        </AnimatedSection>

        {/* Impact stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HEADER_STATS.map((stat, i) => {
            const liveCountTo = stat.liveKey === "npm" && npmData
              ? Math.round(npmData.total / 1000)
              : stat.countTo;
            return (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="glass-card p-5 text-center gradient-border">
                  <stat.icon className="w-5 h-5 text-orange-400 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    <CountUp key={liveCountTo} to={liveCountTo} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Live GitHub stats */}
        <AnimatedSection delay={0.15} className="mt-6">
          <GitHubStatsPanel />
        </AnimatedSection>

        {/* Contribution heatmap */}
        <AnimatedSection delay={0.2} className="mt-4">
          <ContributionHeatmap />
        </AnimatedSection>

        {/* Contribution cards */}
        <StaggerContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OSS_CONTRIBUTIONS.map((item) => (
            <OSSCard key={item.id} item={item} />
          ))}
        </StaggerContainer>

        {/* Footer */}
        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-600 font-mono">
            ✨ And more contributions on the way…{" "}
            <a
              href="https://github.com/jpranays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400/70 hover:text-orange-400 underline transition-colors ml-1"
            >
              See all on GitHub
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default memo(OpenSource);

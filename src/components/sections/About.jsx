import { memo, useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Users, Package, Trophy, Heart, Clock, Copy, Check, ExternalLink, Download } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";
import { OdometerCount } from "../ui/OdometerCount";
import { useNpmStats } from "../../hooks/useNpmStats";
import { useOssImpact } from "../../hooks/useOssImpact";
import { useNpmPackageInfo } from "../../hooks/useNpmPackageInfo";
import { experienceLabel, yearsFloorHalf } from "../../utils/experience";

const EXP_YEARS = yearsFloorHalf();

const STATS = [
  {
    countTo: EXP_YEARS, suffix: "+", decimals: Number.isInteger(EXP_YEARS) ? 0 : 1,
    label: "Years professional experience", icon: Code2,
    iconColor: "text-orange-400", iconBg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    countTo: 25, suffix: "K+", decimals: 0, liveKey: "npm",
    label: "Weekly npm downloads", icon: Package,
    iconColor: "text-rose-400", iconBg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    countTo: 3.4, suffix: "M+", decimals: 1, liveKey: "oss",
    label: "Developers impacted via OSS", icon: Users,
    iconColor: "text-violet-400", iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    countTo: 9, suffix: "+", decimals: 0,
    label: "Open source contributions", icon: Trophy,
    iconColor: "text-green-400", iconBg: "bg-green-500/10 border-green-500/20",
  },
];

const INTERESTS = [
  { label: "Security & WCAG", icon: "🔐" },
  { label: "Performance", icon: "⚡" },
  { label: "Testing (90%+ coverage)", icon: "🧪" },
  { label: "UI Animations", icon: "🎨" },
  { label: "Open Source", icon: "🌍" },
  { label: "DX / Tooling", icon: "🛠️" },
  { label: "Boxing & UFC", icon: "🥊" },
  { label: "Road Trips", icon: "🛣️" },
  { label: "Football", icon: "⚽" },
];

function buildTerminalLines(npmData, ossData) {
  const npmVal = npmData ? `${Math.round(npmData.total / 1000).toLocaleString()}K+` : "25K+";
  const ossVal = ossData ? `${(ossData.total / 1_000_000).toFixed(1)}M+ devs` : "3.4M+ devs";
  return [
    { el: <><span className="text-orange-400">❯</span> <span className="text-slate-600 dark:text-slate-300">cat about.json</span></> },
    { el: <span className="text-slate-400 dark:text-slate-500">{"{"}</span> },
    { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;role&quot;: <span className="text-amber-600 dark:text-amber-300">&quot;Senior SWE&quot;</span></span> },
    { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;company&quot;: <span className="text-amber-600 dark:text-amber-300">&quot;Sears India&quot;</span></span> },
    { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;npm_users&quot;: <span className="text-green-500 dark:text-green-400">&quot;{npmVal}&quot;</span></span> },
    { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;oss_impact&quot;: <span className="text-green-500 dark:text-green-400">&quot;{ossVal}&quot;</span></span> },
    { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;available&quot;: <span className="text-green-500 dark:text-green-400">true</span></span> },
    { el: <span className="text-slate-400 dark:text-slate-500">{"}"}</span> },
    { el: <><span className="text-orange-400">❯</span> <span className="text-slate-600 dark:text-slate-300">_<span className="inline-block w-1.5 h-3 ml-0.5 bg-slate-400 animate-blink align-middle" aria-hidden="true" /></span></> },
  ];
}

function TerminalCard({ npmData, ossData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const lines = buildTerminalLines(npmData, ossData);
  return (
    <div ref={ref} className="glass-card p-5 h-full font-mono text-sm">
      <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-slate-400 dark:text-slate-600">~/pranay</span>
      </div>
      <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.11 + 0.05, duration: 0.28, ease: "easeOut" }}
          >
            {line.el}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/* ── Feature 6: Coding time clock ── */
const CAREER_START = new Date("2022-01-15T09:00:00");

function CodingTimeCard() {
  const [hours, setHours] = useState(() => Math.floor((Date.now() - CAREER_START) / 3_600_000));

  useEffect(() => {
    const id = setInterval(() => setHours(Math.floor((Date.now() - CAREER_START) / 3_600_000)), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-card p-5 flex items-center gap-4 h-full">
      <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
        <Clock className="w-4 h-4 text-amber-400" aria-hidden="true" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none tracking-tight">
          <OdometerCount key={hours} to={hours} decimals={0} />
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-snug">Hours coded (career)</p>
      </div>
    </div>
  );
}

/* ── Feature 11: Single npm package card ── */
function NpmPkgCard({ name, version, weeklyDownloads, gzip }) {
  const [copied, setCopied] = useState(false);
  const installCmd = `npm i ${name}`;

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }, [installCmd]);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Package className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{name}</span>
          {version && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/[0.1] flex-shrink-0">
              v{version}
            </span>
          )}
        </div>
        <a
          href={`https://www.npmjs.com/package/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name} on npm`}
          className="text-slate-400 hover:text-orange-400 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        {weeklyDownloads != null && (
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" aria-hidden="true" />
            {weeklyDownloads >= 1000 ? `${Math.round(weeklyDownloads / 1000)}K` : weeklyDownloads}/wk
          </span>
        )}
        {gzip != null && (
          <span className="flex items-center gap-1">
            <span className="font-mono text-[10px]">gz</span>
            {(gzip / 1024).toFixed(1)} kB
          </span>
        )}
      </div>

      <button
        onClick={copy}
        aria-label={`Copy install command: ${installCmd}`}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono
                   bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]
                   text-slate-600 dark:text-slate-400
                   custom-border-color hover:text-slate-800 dark:hover:text-slate-200
                   transition-all duration-200 w-full text-left group"
      >
        <span className="flex-1 truncate">{installCmd}</span>
        <span className={`flex-shrink-0 transition-colors ${copied ? "text-green-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}>
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
}

function About() {
  const { data: npmData } = useNpmStats();
  const { data: ossData } = useOssImpact();
  const { data: pkgInfo } = useNpmPackageInfo();

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            About Me
          </p>
          <h2 id="about-heading" className="section-title">
            Building things that{" "}
            <span className="gradient-text">matter</span>
          </h2>
        </AnimatedSection>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Bio card — 2 cols */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="glass-card p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center custom-border-color"
                  style={{
                    backgroundColor: "rgba(var(--ap-500-rgb), 0.08)",
                    borderColor: "rgba(var(--ap-500-rgb), 0.58)",
                }}>
                  <Code2 className="w-5 h-5 text-orange-500" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Who I am</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    I&apos;m a{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      Senior Software Developer at Sears India
                    </span>{" "}
                    with {experienceLabel()} years of professional experience, specializing in{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Security</span>,{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Accessibility</span>,{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Performance</span>, and{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Testing</span>.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    I&apos;ve created npm packages with{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {npmData ? `${Math.round(npmData.total / 1000).toLocaleString()}K+` : "25,000+"} weekly users
                    </span>{" "}
                    and actively maintain contributions to libraries like Mantine, PrimeReact, and
                    RSuite — collectively impacting{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {ossData ? `${(ossData.total / 1_000_000).toFixed(1)}M+` : "3.4M+"} developers
                    </span> monthly.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    When I&apos;m not shipping production code, I&apos;m reviewing PRs, writing
                    accessible components, or planning the next road trip on the bike.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Terminal card — lines reveal sequentially on scroll */}
          <AnimatedSection delay={0.15}>
            <TerminalCard npmData={npmData} ossData={ossData} />
          </AnimatedSection>

          {/* Stats — 4 cards */}
          {STATS.map((stat, i) => {
            const liveCountTo =
              stat.liveKey === "npm" && npmData ? Math.round(npmData.total / 1000) :
              stat.liveKey === "oss" && ossData  ? parseFloat((ossData.total / 1_000_000).toFixed(1)) :
              stat.countTo;
            return (
              <AnimatedSection key={stat.label} delay={0.1 * (i + 3)}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${stat.iconBg}`} style={{
                    backgroundColor: "rgba(var(--ap-500-rgb), 0.08)",
                    borderColor: "rgba(var(--ap-500-rgb), 0.08)",
                }}>
                    <stat.icon className={`w-4 h-4`} aria-hidden="true" color="var(--ap-500)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none tracking-tight">
                      <OdometerCount key={liveCountTo} to={liveCountTo} suffix={stat.suffix} decimals={stat.decimals} />
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{stat.label}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Coding time clock — 1 col */}
          {/* <AnimatedSection delay={0.42}>
            <CodingTimeCard />
          </AnimatedSection> */}

          {/* npm packages — 2 cols */}
          <AnimatedSection delay={0.44} className="md:col-span-1 lg:col-span-2">
            <div className="glass-card p-5 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">My npm packages</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["react-fast-hooks", "cli-gh"].map((pkg) => {
                  const info = pkgInfo?.find(p => p.name === pkg);
                  const pkgDownloads = npmData?.packages?.find(p => p.name === pkg)?.downloads;
                  return (
                    <NpmPkgCard
                      key={pkg}
                      name={pkg}
                      version={info?.version}
                      weeklyDownloads={pkgDownloads}
                      gzip={info?.gzip}
                    />
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Interests — spans full width */}
          <AnimatedSection delay={0.50} className="md:col-span-2 lg:col-span-3">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  Interests &amp; Passions
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                               bg-slate-100 dark:bg-white/[0.03]
                               text-slate-500 dark:text-slate-400
                               border border-slate-200 dark:border-white/[0.06]
                               hover:bg-orange-500/6 hover:text-slate-700 dark:hover:text-slate-300 hover:border-orange-500/15
                               transition-colors duration-200 cursor-default"
                  >
                    <span aria-hidden="true">{interest.icon}</span>
                    {interest.label}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}

export default memo(About);

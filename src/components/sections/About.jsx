import { memo, useRef, useEffect, useState, Fragment } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Users, Package, Trophy, Heart } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { useNpmStats } from "../../hooks/useNpmStats";

function CountUp({ to, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const steps = 55;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(parseFloat((to * progress).toFixed(decimals)));
      if (step >= steps) { setCount(to); clearInterval(id); }
    }, duration / steps);
    return () => clearInterval(id);
  }, [isInView, to, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
}

const STATS = [
  {
    countTo: 3, suffix: "+", decimals: 0,
    label: "Years professional experience", icon: Code2,
    iconColor: "text-orange-400", iconBg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    countTo: 25, suffix: "K+", decimals: 0, liveKey: "npm",
    label: "Weekly npm downloads", icon: Package,
    iconColor: "text-rose-400", iconBg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    countTo: 3.4, suffix: "M+", decimals: 1,
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
  { label: "Road Trips", icon: "🏍️" },
  { label: "Football", icon: "⚽" },
];

const TERMINAL_LINES = [
  { el: <><span className="text-orange-400">❯</span> <span className="text-slate-600 dark:text-slate-300">cat about.json</span></> },
  { el: <span className="text-slate-400 dark:text-slate-500">{"{"}</span> },
  { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;role&quot;: <span className="text-amber-600 dark:text-amber-300">&quot;Senior SWE&quot;</span></span> },
  { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;company&quot;: <span className="text-amber-600 dark:text-amber-300">&quot;Sears India&quot;</span></span> },
  { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;npm_users&quot;: <span className="text-green-500 dark:text-green-400">25000</span></span> },
  { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;oss_impact&quot;: <span className="text-green-500 dark:text-green-400">&quot;3.4M+ devs&quot;</span></span> },
  { el: <span className="pl-4 text-cyan-500 dark:text-cyan-400">&quot;available&quot;: <span className="text-green-500 dark:text-green-400">true</span></span> },
  { el: <span className="text-slate-400 dark:text-slate-500">{"}"}</span> },
  { el: <><span className="text-orange-400">❯</span> <span className="text-slate-600 dark:text-slate-300">_<span className="inline-block w-1.5 h-3 ml-0.5 bg-slate-400 animate-blink align-middle" aria-hidden="true" /></span></> },
];

function TerminalCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="glass-card p-5 h-full font-mono text-sm">
      <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-slate-400 dark:text-slate-600">~/pranay</span>
      </div>
      <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        {TERMINAL_LINES.map((line, i) => (
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

function About() {
  const { data: npmData } = useNpmStats();

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
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-orange-400" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Who I am</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    I&apos;m a{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      Senior Software Developer at Sears India
                    </span>{" "}
                    with 3+ years of professional experience, specializing in{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Security</span>,{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Accessibility</span>,{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Performance</span>, and{" "}
                    <span className="text-orange-500 dark:text-orange-400 font-mono text-xs">Testing</span>.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    I&apos;ve created npm packages with{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">25,000+ weekly users</span> and
                    actively maintain contributions to libraries like Mantine, PrimeReact, and
                    RSuite — collectively impacting{" "}
                    <span className="text-slate-700 dark:text-slate-200 font-medium">3.4M+ developers</span> monthly.
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
            <TerminalCard />
          </AnimatedSection>

          {/* Stats — 4 cards */}
          {STATS.map((stat, i) => {
            const liveCountTo = stat.liveKey === "npm" && npmData
              ? Math.round(npmData.total / 1000)
              : stat.countTo;
            return (
              <AnimatedSection key={stat.label} delay={0.1 * (i + 3)}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                    <stat.icon className={`w-4 h-4 ${stat.iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none tracking-tight">
                      <CountUp key={liveCountTo} to={liveCountTo} suffix={stat.suffix} decimals={stat.decimals} />
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{stat.label}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Interests — spans full width */}
          <AnimatedSection delay={0.45} className="md:col-span-2 lg:col-span-3">
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

          {/* GitHub contribution heatmap — full width, theme-reactive */}
          {/* <AnimatedSection delay={0.55} className="md:col-span-2 lg:col-span-3">
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
                  colorScheme={colorScheme}
                  theme={heatmapTheme}
                  style={{ width: "100%" }}
                  fontSize={11}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                  labels={{ totalCount: "{{count}} contributions in the last year" }}
                />
              </div>
            </div>
          </AnimatedSection> */}
        </div>
      </div>
    </section>
  );
}

export default memo(About);

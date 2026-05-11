import { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Users, Package, Trophy, Terminal, Heart } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";

const STATS = [
  { value: "3+", label: "Years professional experience", icon: Code2 },
  { value: "25K+", label: "Weekly npm downloads", icon: Package },
  { value: "3.4M+", label: "Developers impacted via OSS", icon: Users },
  { value: "9+", label: "Open source contributions", icon: Trophy },
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

function About() {
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
                  <h3 className="text-base font-semibold text-slate-100">Who I am</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    I&apos;m a{" "}
                    <span className="text-slate-200 font-medium">
                      Senior Software Developer at Sears India
                    </span>{" "}
                    with 3+ years of professional experience, specializing in{" "}
                    <span className="text-orange-400 font-mono text-xs">Security</span>,{" "}
                    <span className="text-orange-400 font-mono text-xs">Accessibility</span>,{" "}
                    <span className="text-orange-400 font-mono text-xs">Performance</span>, and{" "}
                    <span className="text-orange-400 font-mono text-xs">Testing</span>.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    I&apos;ve created npm packages with{" "}
                    <span className="text-slate-200 font-medium">25,000+ weekly users</span> and
                    actively maintain contributions to libraries like Mantine, PrimeReact, and
                    RSuite — collectively impacting{" "}
                    <span className="text-slate-200 font-medium">3.4M+ developers</span> monthly.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    When I&apos;m not shipping production code, I&apos;m reviewing PRs, writing
                    accessible components, or planning the next road trip on the bike.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Terminal card */}
          <AnimatedSection delay={0.15}>
            <div className="glass-card p-5 h-full font-mono text-sm">
              <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-slate-600">~/pranay</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>
                  <span className="text-orange-400">❯</span>{" "}
                  <span className="text-slate-300">cat about.json</span>
                </p>
                <p className="text-slate-500">{"{"}</p>
                <p className="pl-4 text-cyan-400">
                  &quot;role&quot;:{" "}
                  <span className="text-amber-300">&quot;Senior SWE&quot;</span>
                </p>
                <p className="pl-4 text-cyan-400">
                  &quot;company&quot;:{" "}
                  <span className="text-amber-300">&quot;Sears India&quot;</span>
                </p>
                <p className="pl-4 text-cyan-400">
                  &quot;npm_users&quot;:{" "}
                  <span className="text-green-400">25000</span>
                </p>
                <p className="pl-4 text-cyan-400">
                  &quot;oss_impact&quot;:{" "}
                  <span className="text-green-400">&quot;3.4M+ devs&quot;</span>
                </p>
                <p className="pl-4 text-cyan-400">
                  &quot;available&quot;:{" "}
                  <span className="text-green-400">true</span>
                </p>
                <p className="text-slate-500">{"}"}</p>
                <p className="mt-2">
                  <span className="text-orange-400">❯</span>{" "}
                  <span className="text-slate-300">
                    _
                    <span
                      className="inline-block w-1.5 h-3 ml-0.5 bg-slate-400 animate-blink align-middle"
                      aria-hidden="true"
                    />
                  </span>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats — 4 cards */}
          {STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={0.1 * (i + 3)}>
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4 h-4 text-orange-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-100 leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{stat.label}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}

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
                               bg-white/[0.03] text-slate-400 border border-white/[0.06]
                               hover:bg-orange-500/6 hover:text-slate-300 hover:border-orange-500/15
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

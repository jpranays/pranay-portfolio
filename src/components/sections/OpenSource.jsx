import { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitPullRequest, Package, Users } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { OSS_CONTRIBUTIONS, OSS_STATS } from "../../data/opensource";

const COLOR_MAP = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

const HEADER_STATS = [
  {
    value: OSS_STATS.libraries + "+",
    label: "Libraries contributed",
    icon: GitPullRequest,
  },
  {
    value: OSS_STATS.totalImpact,
    label: "Developers impacted / month",
    icon: Users,
  },
  {
    value: "25K+",
    label: "Weekly npm downloads (own packages)",
    icon: Package,
  },
];

function OSSCard({ item, index }) {
  const colorClass = COLOR_MAP[item.color] ?? COLOR_MAP.orange;

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="glass-card p-5 flex flex-col h-full group"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${colorClass}`}
            >
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

        {/* Package name */}
        <p className="text-xs font-mono text-slate-600 mb-2">{item.package}</p>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {/* Impact + links */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.05]">
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
                className="text-xs font-mono text-slate-600 hover:text-red-400 transition-colors"
              >
                npm
                <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" aria-hidden="true" />
              </a>
            )}
            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.library} GitHub repo`}
              className="text-xs font-mono text-slate-600 hover:text-slate-300 transition-colors"
            >
              GitHub
              <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

function OpenSource() {
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
          {HEADER_STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="glass-card p-5 text-center gradient-border">
                <stat.icon className="w-5 h-5 text-orange-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Contribution cards grid */}
        <StaggerContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OSS_CONTRIBUTIONS.map((item, i) => (
            <OSSCard key={item.id} item={item} index={i} />
          ))}
        </StaggerContainer>

        {/* Footer note */}
        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <p className="text-sm text-slate-600 font-mono">
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

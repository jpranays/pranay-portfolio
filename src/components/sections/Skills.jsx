import { memo } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench, ShieldCheck, Layers } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { SKILL_GROUPS } from "../../data/skills";

const ICON_MAP = { Layout, Server, Database, Wrench, ShieldCheck, Layers };

const COLOR_MAP = {
  blue:   { icon: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   label: "text-blue-400" },
  green:  { icon: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  label: "text-green-400" },
  violet: { icon: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", label: "text-violet-400" },
  teal:   { icon: "text-teal-400",   bg: "bg-teal-500/10",   border: "border-teal-500/20",   label: "text-teal-400" },
  orange: { icon: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", label: "text-orange-400" },
  pink:   { icon: "text-pink-400",   bg: "bg-pink-500/10",   border: "border-pink-500/20",   label: "text-pink-400" },
};

function SkillGroup({ group, index }) {
  const Icon = ICON_MAP[group.icon] ?? Layout;
  const c = COLOR_MAP[group.color] ?? COLOR_MAP.orange;

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="glass-card p-5 h-full">
        {/* Group header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${c.bg} ${c.border}`}>
            <Icon className={`w-3.5 h-3.5 ${c.icon}`} aria-hidden="true" />
          </div>
          <h3 className={`text-xs font-semibold uppercase tracking-widest font-mono ${c.label}`}>
            {group.label}
          </h3>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${group.label} skills`}>
          {group.skills.map((skill) => (
            <motion.span
              key={skill.name}
              role="listitem"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15 }}
              className="tech-badge cursor-default select-none"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

const MARQUEE_TECHS = [
  "React", "Next.js", "Vue.js", "TypeScript", "Node.js", "MongoDB",
  "Socket.IO", "Jest", "TailwindCSS", "Framer Motion", "Vite", "Rollup",
  "Redis", "Docker", "Figma", "Git", "SCSS", "Express.js",
];

function TechMarquee() {
  const items = [...MARQUEE_TECHS, ...MARQUEE_TECHS];
  return (
    <div
      className="relative overflow-hidden py-4 border-y border-slate-200 dark:border-white/[0.04] mt-16"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-xs font-mono text-slate-400 dark:text-slate-700 hover:text-slate-600 dark:hover:text-slate-500 transition-colors cursor-default"
          >
            {tech}
            <span className="ml-6 text-orange-500/20">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            Skills
          </p>
          <h2 id="skills-heading" className="section-title">
            My tech{" "}
            <span className="gradient-text">stack</span>
          </h2>
          <p className="section-subtitle">
            Tools and technologies I use daily — from pixel-perfect UIs
            to secure, well-tested backend APIs.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.label} group={group} index={i} />
          ))}
        </div>

        <TechMarquee />
      </div>
    </section>
  );
}

export default memo(Skills);

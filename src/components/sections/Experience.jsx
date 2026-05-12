import { memo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { EXPERIENCE, EDUCATION } from "../../data/experience";

function Dot({ current }) {
  return (
    <div className="relative flex-shrink-0 mt-[22px]">
      <div className={`w-3 h-3 rounded-full border-2 ring-4 ring-offset-0 ${
        current
          ? "bg-orange-500 border-orange-300 ring-orange-500/20"
          : "bg-slate-300 dark:bg-slate-600 border-slate-200 dark:border-white/20 ring-transparent"
      }`} />
      {current && (
        <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50" aria-hidden="true" />
      )}
    </div>
  );
}

function TimelineEntry({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="flex gap-5">
      <div className="flex flex-col items-center">
        <Dot current={item.current} />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.3 }}
            className="w-px flex-1 mt-2 bg-slate-200 dark:bg-white/[0.07]"
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: reduced ? 0 : -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0.15 : 0.5, delay: reduced ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">{item.role}</h3>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-orange-400 font-medium text-sm">{item.company}</span>
              <span className="text-slate-300 dark:text-slate-600 text-xs">·</span>
              <span className="text-slate-500 text-xs font-mono">{item.type}</span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/[0.06] flex-shrink-0">
            {item.period}
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3 mb-3">{item.description}</p>

        {item.highlights && (
          <ul className="space-y-1.5 mb-4">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {item.tech && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
            {item.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function EducationCard({ item }) {
  return (
    <StaggerItem>
      <div className="glass-card p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.degree}</h3>
            <p className="text-orange-400 font-medium text-sm mt-0.5">{item.field}</p>
            <p className="text-slate-500 text-sm mt-0.5">{item.institution}</p>
          </div>
          <span className="flex-shrink-0 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/[0.06]">
            {item.period}
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3">{item.description}</p>
      </div>
    </StaggerItem>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            Experience
          </p>
          <h2 id="experience-heading" className="section-title">
            Where I&apos;ve{" "}
            <span className="gradient-text">worked</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and the work I&apos;ve shipped along the way.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-2 mb-8">
                <Briefcase className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Work</h3>
              </div>
            </AnimatedSection>
            <div>
              {EXPERIENCE.map((exp, i) => (
                <TimelineEntry key={exp.id} item={exp} index={i} isLast={i === EXPERIENCE.length - 1} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-2 mb-8">
                <GraduationCap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">Education</h3>
              </div>
            </AnimatedSection>
            <StaggerContainer className="space-y-4">
              {EDUCATION.map((edu) => <EducationCard key={edu.id} item={edu} />)}
            </StaggerContainer>
            <AnimatedSection delay={0.4} className="mt-4">
              <a
                href="https://leetcode.com/jpranays"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center justify-between group block"
                aria-label="View LeetCode profile"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">LeetCode</p>
                  <p className="text-xs text-slate-500 mt-0.5">Problem solving &amp; DSA</p>
                </div>
                <div className="flex items-center gap-2 text-orange-400 group-hover:gap-3 transition-all duration-200">
                  <span className="text-xs font-mono">@jpranays</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);

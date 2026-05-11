import { memo } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ExternalLink, MapPin } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { EXPERIENCE, EDUCATION } from "../../data/experience";

function TimelineDot({ current = false }) {
  return (
    <div className="relative flex-shrink-0 w-3 h-3 mt-1.5">
      <div
        className={`w-3 h-3 rounded-full border-2 ${
          current
            ? "bg-orange-500 border-orange-400"
            : "bg-surface border-slate-300 dark:border-white/20"
        }`}
      />
      {current && (
        <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-60" aria-hidden="true" />
      )}
    </div>
  );
}

function ExperienceCard({ item }) {
  return (
    <StaggerItem>
      <div className={`glass-card p-6 hover:translate-y-[-2px] transition-transform duration-300 border-l-2 ${item.current ? "border-l-orange-500" : "border-l-slate-300/40 dark:border-l-white/10"}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-orange-400 font-medium text-sm">{item.company}</span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-slate-500 text-xs font-mono">{item.type}</span>
            </div>
          </div>
          <span className="flex-shrink-0 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/[0.06]">
            {item.period}
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {item.highlights && (
          <ul className="space-y-1.5 mb-4" aria-label="Highlights">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {item.tech && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
            {item.tech.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        )}
      </div>
    </StaggerItem>
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

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Work experience — left 3 cols */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">
                  Work
                </h3>
              </div>
            </AnimatedSection>
            <StaggerContainer className="space-y-4">
              {EXPERIENCE.map((exp) => (
                <ExperienceCard key={exp.id} item={exp} />
              ))}
            </StaggerContainer>
          </div>

          {/* Education — right 2 cols */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">
                  Education
                </h3>
              </div>
            </AnimatedSection>
            <StaggerContainer className="space-y-4">
              {EDUCATION.map((edu) => (
                <EducationCard key={edu.id} item={edu} />
              ))}
            </StaggerContainer>

            {/* LeetCode/GitHub CTA */}
            <AnimatedSection delay={0.4} className="mt-4">
              <a
                href="https://leetcode.com/jpranays"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center justify-between group cursor-pointer block"
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

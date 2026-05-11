import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, Zap, Package } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { PROJECTS, CATEGORIES } from "../../data/projects";
import { cn } from "../../utils/cn";

function ProjectCard({ project, featured = false }) {
  const isOrange = project.color !== "cyan";

  return (
    <StaggerItem>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="glass-card relative overflow-hidden flex flex-col h-full group"
        aria-label={`Project: ${project.title}`}
      >
        {/* Accent top bar */}
        <div
          className={`absolute top-0 inset-x-0 h-px ${
            isOrange
              ? "bg-gradient-to-r from-orange-500/60 via-orange-500/20 to-transparent"
              : "bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent"
          }`}
          aria-hidden="true"
        />

        <div className="p-5 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${isOrange ? "bg-orange-400" : "bg-cyan-400"}`}
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {project.badge && (
                <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {project.badge}
                </span>
              )}
              {featured && (
                <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border bg-orange-500/10 text-orange-400 border-orange-500/20">
                  <Star className="w-2.5 h-2.5" aria-hidden="true" />
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Impact tagline */}
          <p className="text-xs font-mono text-slate-500 dark:text-slate-600 mb-2.5 flex items-center gap-1">
            <Zap className="w-3 h-3 text-orange-500/50 flex-shrink-0" aria-hidden="true" />
            {project.impact}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-badge">{tag}</span>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-white/[0.05]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                Source
              </a>
            )}
            {project.npm && (
              <a
                href={project.npm}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on npm`}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-400 transition-colors"
              >
                <Package className="w-3.5 h-3.5" aria-hidden="true" />
                npm
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors ml-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <AnimatedSection>
          <p className="section-label">
            <span className="glow-dot" aria-hidden="true" />
            Projects
          </p>
          <h2 id="projects-heading" className="section-title">
            Things I&apos;ve{" "}
            <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle">
            npm packages, full-stack apps, frontend experiments — each one shipped with
            care for performance and developer experience.
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="mt-10">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeFilter === cat.id
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 border border-slate-200 dark:border-white/[0.06] hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-150 dark:hover:bg-white/[0.06]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {featured.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-mono text-slate-400 dark:text-slate-700 uppercase tracking-widest mb-4">
                  ★ Featured
                </p>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featured.map((p) => (
                    <ProjectCard key={p.id} project={p} featured />
                  ))}
                </StaggerContainer>
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-8">
                {featured.length > 0 && (
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-700 uppercase tracking-widest mb-4">
                    Other projects
                  </p>
                )}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </StaggerContainer>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="mt-16 text-center py-12">
                <p className="text-slate-500 dark:text-slate-600 font-mono text-sm">
                  No projects in this category yet.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <a
            href="https://github.com/jpranays"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors group"
          >
            <Github
              className="w-4 h-4 group-hover:text-orange-400 transition-colors"
              aria-hidden="true"
            />
            More on GitHub
            <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default memo(Projects);

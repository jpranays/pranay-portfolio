import { memo } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero",       label: "Home"        },
  { id: "about",      label: "About"       },
  { id: "experience", label: "Experience"  },
  { id: "skills",     label: "Skills"      },
  { id: "projects",   label: "Projects"    },
  { id: "opensource", label: "Open Source" },
  { id: "contact",    label: "Contact"     },
];

function SectionDots({ activeSection }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {SECTIONS.map(({ id, label }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            className="group relative flex items-center justify-end"
          >
            {/* Tooltip */}
            <span
              className="absolute right-full mr-3 px-2 py-0.5 rounded-md text-[11px] font-mono
                         text-slate-600 dark:text-slate-300 whitespace-nowrap
                         bg-white dark:bg-[#0d1117]
                         border border-slate-200 dark:border-white/[0.08] shadow-sm
                         opacity-0 group-hover:opacity-100 pointer-events-none
                         transition-opacity duration-150"
            >
              {label}
            </span>

            {/* Bar */}
            <motion.span
              aria-hidden="true"
              animate={{ width: active ? 20 : 6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`block h-1.5 rounded-full transition-colors duration-200 ${
                active
                  ? "bg-orange-500"
                  : "bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

export default memo(SectionDots);

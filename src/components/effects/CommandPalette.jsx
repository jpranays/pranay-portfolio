import { memo, useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, Code2, FolderGit2, GitPullRequest, Mail,
  Github, Linkedin, Twitter, Package, Download, Sun, Moon, Monitor,
  Copy, Check, Search, ChevronRight,
} from "lucide-react";

const NAV_COMMANDS = [
  { id: "nav-hero",       label: "Home",        icon: User,         section: "hero"       },
  { id: "nav-about",      label: "About",       icon: User,         section: "about"      },
  { id: "nav-experience", label: "Experience",  icon: Briefcase,    section: "experience" },
  { id: "nav-skills",     label: "Skills",      icon: Code2,        section: "skills"     },
  { id: "nav-projects",   label: "Projects",    icon: FolderGit2,   section: "projects"   },
  { id: "nav-opensource", label: "Open Source", icon: GitPullRequest, section: "opensource" },
  { id: "nav-contact",    label: "Contact",     icon: Mail,         section: "contact"    },
];

const LINK_COMMANDS = [
  { id: "link-github",   label: "GitHub — @jpranays",    icon: Github,   href: "https://github.com/jpranays"                      },
  { id: "link-linkedin", label: "LinkedIn",              icon: Linkedin, href: "https://www.linkedin.com/in/jpranays"             },
  { id: "link-twitter",  label: "Twitter / X — @jpranays", icon: Twitter, href: "https://x.com/jpranays"                         },
  { id: "link-npm",      label: "npm profile",           icon: Package,  href: "https://www.npmjs.com/~jpranays"                  },
  { id: "link-resume",   label: "Download Resume",       icon: Download, href: "/Pranay_Sunil_Jadhav_Resume.pdf", download: true  },
];

const THEME_ICONS = { light: Sun, dark: Moon, system: Monitor };
const THEME_NEXT_LABEL = { light: "Switch to Dark Mode", dark: "Follow System Preference", system: "Switch to Light Mode" };

function CommandPalette({ open, onClose, theme, toggleTheme }) {
  const [copied, setCopied] = useState(false);

  // Handle Escape (close) and Cmd/Ctrl+K (toggle) while palette is open.
  // Runs at capture phase so it fires before cmdk's own input handler.
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler, { capture: true });
    return () => window.removeEventListener("keydown", handler, { capture: true });
  }, [open, onClose]);

  const scrollTo = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  }, [onClose]);

  const openLink = useCallback((href, download) => {
    if (download) { window.open(href, "_blank"); }
    else { window.open(href, "_blank", "noopener,noreferrer"); }
    onClose();
  }, [onClose]);

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("jpranays@gmail.com");
    setCopied(true);
    setTimeout(() => { setCopied(false); onClose(); }, 1200);
  }, [onClose]);

  const ThemeIcon = THEME_ICONS[theme] ?? Sun;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9990] bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="cp-panel"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg px-4"
          >
            <Command
              label="Command palette"
              className="rounded-2xl border border-slate-200 dark:border-white/[0.1]
                         bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl
                         shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                         overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/[0.07]">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <Command.Input
                  placeholder="Search commands…"
                  className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-200
                             placeholder-slate-400 dark:placeholder-slate-600
                             outline-none caret-orange-400"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px]
                               font-mono text-slate-400 border border-slate-200 dark:border-white/[0.08]
                               bg-slate-100 dark:bg-white/[0.04]">
                  esc
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[360px] overflow-y-auto py-2 px-2 space-y-0.5
                                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <Command.Empty className="py-8 text-center text-sm text-slate-400 dark:text-slate-600 font-mono">
                  No results found.
                </Command.Empty>

                {/* Navigate */}
                <Command.Group
                  heading="Navigate"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
                             [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono
                             [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase
                             [&_[cmdk-group-heading]]:tracking-widest
                             [&_[cmdk-group-heading]]:text-slate-400 dark:[&_[cmdk-group-heading]]:text-slate-600"
                >
                  {NAV_COMMANDS.map(({ id, label, icon: Icon, section }) => (
                    <Command.Item
                      key={id}
                      value={`navigate ${label}`}
                      onSelect={() => scrollTo(section)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                                 text-slate-600 dark:text-slate-300 cursor-pointer
                                 aria-selected:bg-orange-500/10 aria-selected:text-orange-500 dark:aria-selected:text-orange-400
                                 transition-colors duration-100 group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 dark:text-slate-600 group-aria-selected:text-orange-400 flex-shrink-0" aria-hidden="true" />
                      <span className="flex-1">{label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-aria-selected:opacity-60 transition-opacity" aria-hidden="true" />
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Links */}
                <Command.Group
                  heading="Links"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
                             [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono
                             [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase
                             [&_[cmdk-group-heading]]:tracking-widest
                             [&_[cmdk-group-heading]]:text-slate-400 dark:[&_[cmdk-group-heading]]:text-slate-600"
                >
                  {LINK_COMMANDS.map(({ id, label, icon: Icon, href, download }) => (
                    <Command.Item
                      key={id}
                      value={label}
                      onSelect={() => openLink(href, download)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                                 text-slate-600 dark:text-slate-300 cursor-pointer
                                 aria-selected:bg-orange-500/10 aria-selected:text-orange-500 dark:aria-selected:text-orange-400
                                 transition-colors duration-100 group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 dark:text-slate-600 group-aria-selected:text-orange-400 flex-shrink-0" aria-hidden="true" />
                      <span className="flex-1">{label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-aria-selected:opacity-60 transition-opacity" aria-hidden="true" />
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Actions */}
                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
                             [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono
                             [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase
                             [&_[cmdk-group-heading]]:tracking-widest
                             [&_[cmdk-group-heading]]:text-slate-400 dark:[&_[cmdk-group-heading]]:text-slate-600"
                >
                  <Command.Item
                    value="toggle theme dark light system appearance"
                    onSelect={() => { toggleTheme(); onClose(); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                               text-slate-600 dark:text-slate-300 cursor-pointer
                               aria-selected:bg-orange-500/10 aria-selected:text-orange-500 dark:aria-selected:text-orange-400
                               transition-colors duration-100 group"
                  >
                    <ThemeIcon className="w-4 h-4 text-slate-400 dark:text-slate-600 group-aria-selected:text-orange-400 flex-shrink-0" aria-hidden="true" />
                    <span className="flex-1">{THEME_NEXT_LABEL[theme]}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-aria-selected:opacity-60 transition-opacity" aria-hidden="true" />
                  </Command.Item>

                  <Command.Item
                    value="copy email contact"
                    onSelect={copyEmail}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                               text-slate-600 dark:text-slate-300 cursor-pointer
                               aria-selected:bg-orange-500/10 aria-selected:text-orange-500 dark:aria-selected:text-orange-400
                               transition-colors duration-100 group"
                  >
                    {copied
                      ? <Check className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                      : <Copy className="w-4 h-4 text-slate-400 dark:text-slate-600 group-aria-selected:text-orange-400 flex-shrink-0" aria-hidden="true" />}
                    <span className="flex-1">{copied ? "Email copied!" : "Copy Email Address"}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-aria-selected:opacity-60 transition-opacity" aria-hidden="true" />
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-t border-slate-200 dark:border-white/[0.07]">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 flex items-center gap-1.5">
                  <kbd className="inline-flex items-center px-1 rounded bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08]">↑↓</kbd>
                  navigate
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 flex items-center gap-1.5">
                  <kbd className="inline-flex items-center px-1 rounded bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08]">↵</kbd>
                  select
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 flex items-center gap-1.5 ml-auto">
                  <kbd className="inline-flex items-center px-1 rounded bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08]">esc</kbd>
                  close
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(CommandPalette);

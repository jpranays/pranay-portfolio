import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#opensource", label: "OSS" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      >
        <nav
          className={cn(
            "w-full max-w-5xl flex items-center justify-between px-4 h-13 rounded-2xl border transition-all duration-300",
            scrolled
              ? "bg-[#0d1117]/85 backdrop-blur-xl border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-transparent"
          )}
          style={{ height: "52px" }}
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            aria-label="Back to top"
          >
            {"<jpranays />"}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive ? "text-orange-400" : "text-slate-500 hover:text-slate-200"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-orange-500/10"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Resume button */}
          <div className="hidden md:flex">
            <a
              href="/Pranay_Sunil_Jadhav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         text-orange-400 border border-orange-500/25
                         hover:bg-orange-500/8 hover:border-orange-400/40 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              Resume
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-base/75 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-surface border-l border-white/[0.06] flex flex-col pt-20 px-5 pb-8"
            >
              <ul className="flex flex-col gap-1 flex-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.08 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                        activeSection === link.href.replace("#", "")
                          ? "bg-orange-500/10 text-orange-400"
                          : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <a
                href="/Pranay_Sunil_Jadhav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center mt-4 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);

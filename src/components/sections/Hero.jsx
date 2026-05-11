import { memo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowDown,
  Download, ExternalLink, Twitter, Package,
} from "lucide-react";
import { useTyping } from "../../hooks/useTyping";

const TYPING_WORDS = [
  "Senior Software Developer",
  "React & Next.js Engineer",
  "npm Package Author",
  "Open Source Contributor",
  "MERN Stack Developer",
];

const SOCIAL_LINKS = [
  { href: "https://github.com/jpranays", icon: Github, label: "GitHub", username: "@jpranays" },
  { href: "https://www.linkedin.com/in/jpranays", icon: Linkedin, label: "LinkedIn", username: "LinkedIn" },
  { href: "https://x.com/jpranays", icon: Twitter, label: "Twitter/X", username: "@jpranays" },
  { href: "https://www.npmjs.com/~jpranays", icon: Package, label: "npm", username: "npm" },
];

const CREDIBILITY_PILLS = [
  { label: "Sears India", note: "Senior SWE" },
  { label: "25K+", note: "weekly npm users" },
  { label: "3.4M+", note: "devs via OSS" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function Hero() {
  const typed = useTyping(TYPING_WORDS);

  /* ── Mouse parallax for background glows ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 38, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 38, damping: 22 });

  const orangeX = useTransform(springX, v => v * 0.045);
  const orangeY = useTransform(springY, v => v * 0.035);
  const violetX = useTransform(springX, v => -v * 0.028);
  const violetY = useTransform(springY, v => -v * 0.028);
  const cyanX   = useTransform(springX, v =>  v * 0.018);
  const cyanY   = useTransform(springY, v => -v * 0.02);
  const pinkX   = useTransform(springX, v => -v * 0.022);
  const pinkY   = useTransform(springY, v =>  v * 0.022);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const handler = (e) => {
      rawX.set(e.clientX - window.innerWidth  / 2);
      rawY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Layered background glows (parallax) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ x: orangeX, y: orangeY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-radial from-orange-500/18 via-orange-500/0 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: violetX, y: violetY }}
          className="absolute top-1/4 left-1/4 w-[550px] h-[450px] bg-gradient-radial from-violet-500/14 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: cyanX, y: cyanY }}
          className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-radial from-cyan-500/11 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: pinkX, y: pinkY }}
          className="absolute top-1/2 right-0 w-[320px] h-[320px] bg-gradient-radial from-pink-500/9 to-transparent rounded-full blur-3xl"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          {/* Availability badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-green-500/10 text-green-500 dark:text-green-400 border border-green-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              Open to new opportunities
            </span>
          </motion.div>

          {/* Name — text-reveal (each word slides up from behind clip) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-slate-500 text-base font-mono tracking-wide"
            >
              Hi, I&apos;m
            </motion.p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
              {/* "Pranay" slides up */}
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent"
                >
                  Pranay
                </motion.span>
              </span>
              {" "}
              {/* "Jadhav" slides up with shimmer */}
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block animate-shimmer bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% auto" }}
                >
                  Jadhav
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div variants={item} className="h-7 flex items-center justify-center">
            <span className="text-lg sm:text-xl font-mono text-slate-600 dark:text-slate-300" aria-live="polite">
              {typed}
              <span
                className="inline-block w-px h-5 ml-0.5 bg-orange-400 animate-blink align-middle"
                aria-hidden="true"
              />
            </span>
          </motion.div>

          {/* Credibility pills */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2">
            {CREDIBILITY_PILLS.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs
                           border border-slate-200 dark:border-white/[0.08]
                           bg-slate-100 dark:bg-white/[0.04]
                           text-slate-500 dark:text-slate-400"
              >
                <span className="font-semibold text-slate-700 dark:text-slate-200">{pill.label}</span>
                <span>{pill.note}</span>
              </span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="max-w-lg text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            Senior Software Developer at{" "}
            <span className="text-slate-700 dark:text-slate-200 font-medium">Sears India</span> with 3+ years
            building production-grade apps. Creator of npm packages with{" "}
            <span className="text-orange-500 dark:text-orange-400 font-medium">25K+ weekly users</span>, and
            open source contributor touching{" "}
            <span className="text-orange-500 dark:text-orange-400 font-medium">3.4M+ developers</span> monthly
            through Mantine, PrimeReact, RSuite, and more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
            >
              View My Work
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href="/Pranay_Sunil_Jadhav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          {/* Social row */}
          <motion.div variants={item} className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label, username }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
              >
                <Icon
                  className="w-4 h-4 group-hover:text-orange-400 transition-colors"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono hidden sm:inline">{username}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-mono text-slate-400 dark:text-slate-700 tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);

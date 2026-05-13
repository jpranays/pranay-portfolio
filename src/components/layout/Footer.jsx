import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const LINKS = [
  { href: "https://github.com/jpranays", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pranay-jadhav-a8897b1b1", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:pranayjadhavcr7@gmail.com", icon: Mail, label: "Email" },
];

const TIME_FMT = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true };

function PuneClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-IN", TIME_FMT));

  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString("en-IN", TIME_FMT)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-xs font-mono text-slate-400" aria-live="off">
      It&apos;s {time} in Pune, India 🇮🇳
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.05]" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <PuneClock />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-mono">
            <span className="ml-3">
              © {year} Pranay Jadhav. Built with{" "}
              <Heart className="w-3 h-3 inline text-orange-500" aria-label="love" />
            </span>
          </p>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-4" role="list">
              {LINKS.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

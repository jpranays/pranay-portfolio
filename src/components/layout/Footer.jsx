import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { FaReddit, FaDiscord, FaWhatsapp ,FaLinkedin} from "react-icons/fa";
import {
  SiX,
  SiNpm,
  SiGithub,
  SiReddit,
  SiDiscord,
  SiWhatsapp,
  SiGmail,
} from "react-icons/si";
export const SOCIAL_LINKS = [
  {
    href: "https://x.com/jpranays",
    icon: SiX,
    label: "Twitter/X",
    fillColor: "#000000",
  },
  {
    href: "https://www.npmjs.com/~jpranays",
    icon: SiNpm,
    label: "NPM",
    fillColor: "#CB3837",
  },
  {
    href: "https://github.com/jpranays",
    icon: SiGithub,
    label: "GitHub",
    fillColor: "#181717",
  },
  {
    href: "https://www.linkedin.com/in/jpranays",
    icon: FaLinkedin,
    label: "LinkedIn",
    fillColor: "#0A66C2",
  },
  {
    href: "https://www.reddit.com/user/jpranays/",
    icon: SiReddit,
    label: "Reddit",
    fillColor: "#FF4500",
  },
  {
    href: "https://discord.com/users/jpranays",
    icon: SiDiscord,
    label: "Discord",
    fillColor: "#5865F2",
  },
  {
    href: "https://wa.me/918888399676",
    icon: SiWhatsapp,
    label: "WhatsApp",
    fillColor: "#25D366",
  },
  {
    href: "mailto:pranay1315@gmail.com",
    icon: SiGmail,
    label: "Email",
    fillColor: "#EA4335",
  },
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
              <Heart className="w-3 h-3 inline text-orange-500" aria-label="love" fill="currentColor" style={{transition:"all 0.3s linear"}}/>
            </span>
          </p>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-4" role="list">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label,fillColor }) => (
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

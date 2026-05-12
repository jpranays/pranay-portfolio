import { Github, Linkedin, Mail, Heart } from "lucide-react";
import SpotifyWidget from "../effects/SpotifyWidget";

const LINKS = [
  { href: "https://github.com/jpranays", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pranay-jadhav-a8897b1b1", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:pranayjadhavcr7@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.05]" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Spotify widget row — only renders when data is available */}
        <div className="flex justify-center mb-5">
          <SpotifyWidget />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-mono">
            <span className="text-orange-400/60">{"<"}</span>
            <span className="text-slate-400">PJ</span>
            <span className="text-orange-400/60">{" />"}</span>
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

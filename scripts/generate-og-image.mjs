/**
 * Generates public/og-image.png (1200×630) — the social-share / link-preview
 * card used by index.html's og:image and twitter:image tags.
 *
 * Run with: npm run og
 * Edit the SVG below and re-run to refresh the card (e.g. after a rebrand).
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200,
  H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b14"/>
      <stop offset="1" stop-color="#0d1117"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="18%" r="60%">
      <stop offset="0" stop-color="#f97316" stop-opacity="0.28"/>
      <stop offset="55%" stop-color="#f97316" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="92%" cy="92%" r="55%">
      <stop offset="0" stop-color="#a855f7" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <rect x="0" y="0" width="10" height="${H}" fill="#f97316"/>

  <text x="96" y="120" font-family="Consolas, 'Courier New', monospace" font-size="30" letter-spacing="2" fill="#f97316">jpranays.site</text>

  <text x="92" y="320" font-family="'Segoe UI', Arial, sans-serif" font-size="118" font-weight="700" fill="#f8fafc" letter-spacing="-2">Pranay Jadhav</text>

  <rect x="96" y="350" width="150" height="6" rx="3" fill="#f97316"/>

  <text x="96" y="430" font-family="'Segoe UI', Arial, sans-serif" font-size="46" font-weight="600" fill="#fb923c">Senior Software Developer</text>

  <text x="96" y="498" font-family="'Segoe UI', Arial, sans-serif" font-size="30" fill="#94a3b8">React  ·  Next.js  ·  Node.js  ·  TypeScript  ·  Open Source</text>

  <text x="96" y="566" font-family="Consolas, 'Courier New', monospace" font-size="25" fill="#64748b">npm package author  ·  open-source contributor  ·  Sears India</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true },
  background: "#0b0b14",
})
  .render()
  .asPng();

const out = resolve(ROOT, "public/og-image.png");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, png);
console.log(`wrote ${out} (${png.length} bytes)`);

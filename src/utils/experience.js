/**
 * Single source of truth for time-based "years of experience" values.
 *
 * Everything on the site that shows a duration (the hero bio, the About stat
 * card, the terminal easter-egg, the Sears checkout-ownership bullet) derives
 * from the anchor dates below — so the numbers age themselves and never need a
 * manual edit again. To correct a value, change ONLY the relevant start date.
 */

// First full-time role (MiniOrange, Jul 2022) — anchors total professional experience.
export const PROFESSIONAL_START = new Date("2022-07-01");

// Joined Sears India — anchors the checkout-ownership tenure.
export const SEARS_START = new Date("2023-03-01");

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

/** Raw fractional years elapsed since `start`. */
export function yearsSince(start = PROFESSIONAL_START) {
  return (Date.now() - new Date(start).getTime()) / YEAR_MS;
}

/**
 * Years floored to the nearest half (3.96 → 3.5, 4.2 → 4.0). Flooring means the
 * figure only ever advances and never overstates the real elapsed time.
 */
export function yearsFloorHalf(start = PROFESSIONAL_START) {
  return Math.floor(yearsSince(start) * 2) / 2;
}

/** Display label like "3.5+" or "4+" (whole numbers drop the trailing .0). */
export function experienceLabel(start = PROFESSIONAL_START) {
  const v = yearsFloorHalf(start);
  return `${Number.isInteger(v) ? v : v.toFixed(1)}+`;
}

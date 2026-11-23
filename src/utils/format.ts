/**
 * FORMAT HELPERS — small functions that turn raw values into display text.
 * Keep them "pure" (same input → same output) so they are easy to reuse and test.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 4860000 → "48,60,000" (Indian grouping) */
export function formatNumber(n: number) {
  return Number(n).toLocaleString("en-IN");
}

/** 3840 → "₹3,840" */
export function formatINR(n: number) {
  return "₹" + formatNumber(n);
}

/** Date → "10 Nov 2026", or "10 Nov 2026 · 10:45 AM" when withTime is true */
export function formatDate(d: Date, withTime = false) {
  let s = `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  if (withTime) {
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    s += ` · ${h % 12 || 12}:${m} ${h < 12 ? "AM" : "PM"}`;
  }
  return s;
}

/** "Sourav Tambe" → "ST" */
export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Whole days between two dates. */
export function daysBetween(from: Date, to: Date) {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / 86_400_000));
}

/** plural(1, "medicine") → "1 medicine", plural(3, "medicine") → "3 medicines" */
export function plural(n: number, word: string) {
  return `${n} ${n === 1 ? word : word + "s"}`;
}

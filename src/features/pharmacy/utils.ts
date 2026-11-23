/**
 * PHARMACY HELPERS — small calculations about requests and dispenses.
 * Keeping them here (not inside components) means the UI stays simple and
 * the same logic is reused on every page.
 */
import { daysBetween } from "@/utils/format";
import { NOW } from "./data/mockData";
import type { Dispense, MedicineRequest } from "./types";

/** Still waiting for (some) items? */
export function isPending(r: MedicineRequest) {
  return r.status === "Requested" || r.status === "Partly shipped";
}

/** How many items have not been shipped yet. */
export function pendingItemCount(r: MedicineRequest) {
  if (r.status === "Requested") return r.items.length;
  if (r.status === "Partly shipped") return Math.max(1, r.items.length - r.shipments[0].itemCount);
  return 0;
}

/** Days since the request was made. */
export function daysWaiting(r: MedicineRequest) {
  return daysBetween(r.date, NOW);
}

/** Total units in a dispense. */
export function totalQuantity(d: Dispense) {
  return d.medicines.reduce((sum, m) => sum + m.quantity, 0);
}

/** Does any of the given text fields contain the search query? */
export function matchesSearch(query: string, fields: string[]) {
  const q = query.trim().toLowerCase();
  return !q || fields.join(" ").toLowerCase().includes(q);
}

/** Next dispense ID after the highest one so far, e.g. DIS580 → DIS581. */
export function nextDispenseId(dispenses: { id: string }[]) {
  const highest = Math.max(0, ...dispenses.map((d) => Number(d.id.replace(/\D/g, ""))));
  return `DIS${highest + 1}`;
}

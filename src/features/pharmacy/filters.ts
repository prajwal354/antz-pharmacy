/**
 * FILTER RULES — decide which requests/dispenses match the header's pharmacy + period.
 * Plain functions (no React), so they're easy to read and reuse.
 */
import { ALL_PHARMACIES, type PharmacyFilters } from "./context/PharmacyFiltersContext";
import { NOW, PHARMACY_SHARE } from "./data/mockData";
import type { Period } from "./constants/status";
import type { Dispense, MedicineRequest } from "./types";
import { daysBetween } from "@/utils/format";

/** Is this date inside the chosen period? */
export function isInPeriod(date: Date, period: Period) {
  if (period === "all") return true;
  if (period === "year") return date.getFullYear() === NOW.getFullYear();
  return daysBetween(date, NOW) <= Number(period); // "30" or "7" days
}

/** A request matches a pharmacy if it was sent TO it or FROM it. */
export function requestMatches(r: MedicineRequest, { pharmacy, period }: PharmacyFilters) {
  const pharmacyOk = pharmacy === ALL_PHARMACIES || r.to === pharmacy || r.from === pharmacy;
  return pharmacyOk && isInPeriod(r.date, period);
}

/** A dispense matches if it was handed out by that pharmacy. */
export function dispenseMatches(d: Dispense, { pharmacy, period }: PharmacyFilters) {
  const pharmacyOk = pharmacy === ALL_PHARMACIES || d.pharmacy === pharmacy;
  return pharmacyOk && isInPeriod(d.date, period);
}

/** Roughly what share of all activity falls in each period (sample data only). */
const PERIOD_SHARE: Record<Period, number> = { all: 1, year: 0.45, "30": 0.1, "7": 0.03 };

/**
 * The overview totals (132 requests, ₹48 lakh...) are for the whole system, not just the
 * 16 sample rows. Until there's a real API, estimate the filtered total from each
 * pharmacy's share of activity and the period.
 *
 * `atLeast` = how many matching rows we can actually see, so the estimate never says
 * fewer than what's on screen (no "Showing 4 of 1"). Never returns less than 1.
 */
export function scaleTotal(total: number, { pharmacy, period }: PharmacyFilters, atLeast = 1) {
  const pharmacyShare = pharmacy === ALL_PHARMACIES ? 1 : (PHARMACY_SHARE[pharmacy] ?? 1);
  return Math.max(1, atLeast, Math.round(total * pharmacyShare * PERIOD_SHARE[period]));
}

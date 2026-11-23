"use client";

/**
 * PHARMACY FILTERS CONTEXT — shares the header's "pharmacy" and "period" choices
 * with every pharmacy page.
 *
 * Why Context? The header and the pages are far apart in the component tree.
 * Without Context you'd have to pass `pharmacy` and `setPharmacy` down through
 * every component in between ("prop drilling"). With Context:
 *
 *   1. <PharmacyFiltersProvider> wraps the pharmacy pages (see PharmacyShell)
 *      and holds the state.
 *   2. Any component inside it calls usePharmacyFilters() to read or change it.
 *
 *   const { pharmacy, setPharmacy, period } = usePharmacyFilters();
 */

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Period } from "../constants/status";

export const ALL_PHARMACIES = "All pharmacies";

export type PharmacyFilters = {
  pharmacy: string;
  period: Period;
};

type PharmacyFiltersValue = PharmacyFilters & {
  setPharmacy: (pharmacy: string) => void;
  setPeriod: (period: Period) => void;
};

const PharmacyFiltersContext = createContext<PharmacyFiltersValue | null>(null);

export function PharmacyFiltersProvider({ children }: { children: ReactNode }) {
  const [pharmacy, setPharmacy] = useState(ALL_PHARMACIES);
  const [period, setPeriod] = useState<Period>("all");

  return (
    <PharmacyFiltersContext.Provider value={{ pharmacy, period, setPharmacy, setPeriod }}>
      {children}
    </PharmacyFiltersContext.Provider>
  );
}

/** Read (and change) the header filters from any pharmacy component. */
export function usePharmacyFilters() {
  const value = useContext(PharmacyFiltersContext);
  if (!value) {
    throw new Error("usePharmacyFilters() must be used inside <PharmacyFiltersProvider>");
  }
  return value;
}

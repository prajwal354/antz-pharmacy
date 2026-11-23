"use client";

import type { ReactNode } from "react";
import { AppHeader, AppShell, SideRail } from "@/components/layout";
import { colors } from "@/theme";
import { PHARMACY_HOME, PHARMACY_NAV } from "../constants/navigation";
import { PharmacyFiltersProvider } from "../context/PharmacyFiltersContext";
import PharmacyFilters from "./PharmacyFilters";

/**
 * Puts the shared AppShell together with pharmacy's header filters and menu.
 * <PharmacyFiltersProvider> wraps everything, so the header AND the pages share the same filters.
 */
export default function PharmacyShell({ children }: { children: ReactNode }) {
  return (
    <PharmacyFiltersProvider>
      <AppShell
        header={
          <AppHeader
            moduleName="Pharmacy"
            moduleIconSrc="/assets/icons/m-pharmacy.svg"
            moduleColor={colors.teal}
            filters={<PharmacyFilters />}
          />
        }
        rail={<SideRail home={PHARMACY_HOME} sections={PHARMACY_NAV} />}
      >
        {children}
      </AppShell>
    </PharmacyFiltersProvider>
  );
}

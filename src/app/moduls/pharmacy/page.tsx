"use client"; // needed because this page reads the header filters (React Context)

import Box from "@mui/material/Box";
import { DispenseIcon, FireIcon, TruckIcon, WarningIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { colors } from "@/theme";
import { OverviewHero, StatWidget, TopMedicines, UrgentRequests, type TopMedicine } from "@/features/pharmacy/components";
import { PERIODS } from "@/features/pharmacy/constants/status";
import { ALL_PHARMACIES, usePharmacyFilters } from "@/features/pharmacy/context/PharmacyFiltersContext";
import { DISPENSES, LOW_STOCK_LIMIT, MEDICINES, REQUESTS, TOTALS } from "@/features/pharmacy/data/mockData";
import { dispenseMatches, requestMatches, scaleTotal } from "@/features/pharmacy/filters";
import type { Dispense } from "@/features/pharmacy/types";

/** Pharmacy overview — the module's home page. */
export default function PharmacyOverviewPage() {
  const filters = usePharmacyFilters();
  // Estimate a filtered total, but never less than what the sample rows show (`atLeast`).
  const scale = (n: number, atLeast = 1) => scaleTotal(n, filters, atLeast);

  // Work out the numbers first, then the JSX below only has to display them.
  const requests = REQUESTS.filter((r) => requestMatches(r, filters));
  const dispenses = DISPENSES.filter((d) => dispenseMatches(d, filters));

  const lowStock = MEDICINES.filter((m) => m.stock < LOW_STOCK_LIMIT).length;
  const urgent = requests.filter((r) => r.priority && r.status !== "Shipped").slice(0, 5);
  const topMedicines = getTopMedicines(dispenses);
  const waiting = requests.filter((r) => r.status === "Requested" || r.status === "Partly shipped");
  const unitsDispensed = dispenses.reduce((sum, d) => sum + d.medicines.reduce((s, m) => s + m.quantity, 0), 0);

  const periodLabel = PERIODS.find((p) => p.value === filters.period)!.label.toLowerCase();
  const pharmacyLabel = filters.pharmacy === ALL_PHARMACIES ? "all pharmacies" : filters.pharmacy;

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 1.75 }}>
        <OverviewHero
          requests={scale(TOTALS.requests, requests.length)}
          value={scale(TOTALS.requestedValue)}
          caption={`Pharmacy · ${periodLabel} · ${pharmacyLabel}`}
        />
        <StatWidget
          variant="coral"
          title="Waiting to ship"
          value={scale(TOTALS.waitingToShip, waiting.length)}
          label="requests not shipped yet"
          icon={<FireIcon />}
          iconColor={colors.coral}
          tag={{ label: `${scale(TOTALS.urgent, urgent.length)} urgent`, tone: "glass" }}
          href={ROUTES.pharmacy.requests}
        />
        <StatWidget
          variant="mint"
          title="Dispensed"
          value={scale(TOTALS.dispensed, dispenses.length)}
          label="times medicine was handed out"
          icon={<DispenseIcon />}
          iconColor={colors.green}
          tag={{ label: `${scale(TOTALS.unitsDispensed, unitsDispensed)} units` }}
          href={ROUTES.pharmacy.dispense}
        />
        <StatWidget
          variant="navy"
          title="Shipments"
          value={scale(TOTALS.shipments)}
          label="delivered from central"
          icon={<TruckIcon />}
          iconColor="#fff"
          href={ROUTES.pharmacy.requests}
        />
        {/* Stock is "right now", so it doesn't change with the period filter. */}
        <StatWidget
          title="Low stock"
          value={lowStock}
          label={`medicines under ${LOW_STOCK_LIMIT} units`}
          icon={<WarningIcon />}
          iconColor={colors.red}
          tag={{ label: "Reorder soon", tone: "warn" }}
          href={ROUTES.pharmacy.requests}
        />
      </Box>

      <Box sx={{ mt: 1.75, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 1.75 }}>
        <UrgentRequests requests={urgent} />
        <TopMedicines items={topMedicines} />
      </Box>
    </>
  );
}

/** Adds up units per medicine across the given dispenses and returns the top 6. */
function getTopMedicines(dispenses: Dispense[]): TopMedicine[] {
  const units = new Map<string, TopMedicine>();
  for (const d of dispenses) {
    for (const { medicine, quantity } of d.medicines) {
      const entry = units.get(medicine.brand) ?? { medicine, units: 0 };
      entry.units += quantity;
      units.set(medicine.brand, entry);
    }
  }
  return [...units.values()].sort((a, b) => b.units - a.units).slice(0, 6);
}

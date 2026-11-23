import Box from "@mui/material/Box";
import { DispenseIcon, FireIcon, TruckIcon, WarningIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { colors } from "@/theme";
import { OverviewHero, StatWidget, TopMedicines, UrgentRequests, type TopMedicine } from "@/features/pharmacy/components";
import { DISPENSES, LOW_STOCK_LIMIT, MEDICINES, REQUESTS, TOTALS } from "@/features/pharmacy/data/mockData";

/** Pharmacy overview — the module's home page. */
export default function PharmacyOverviewPage() {
  // Work out the numbers first, then the JSX below only has to display them.
  const lowStock = MEDICINES.filter((m) => m.stock < LOW_STOCK_LIMIT).length;
  const urgent = REQUESTS.filter((r) => r.priority && r.status !== "Shipped").slice(0, 5);
  const topMedicines = getTopMedicines();

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 1.75 }}>
        <OverviewHero requests={TOTALS.requests} value={TOTALS.requestedValue} />
        <StatWidget
          variant="coral"
          title="Waiting to ship"
          value={TOTALS.waitingToShip}
          label="requests not shipped yet"
          icon={<FireIcon />}
          iconColor={colors.coral}
          tag={{ label: `${TOTALS.urgent} urgent`, tone: "glass" }}
          href={ROUTES.pharmacy.requests}
        />
        <StatWidget
          variant="mint"
          title="Dispensed"
          value={TOTALS.dispensed}
          label="times medicine was handed out"
          icon={<DispenseIcon />}
          iconColor={colors.green}
          tag={{ label: `${TOTALS.unitsDispensed} units` }}
          href={ROUTES.pharmacy.dispense}
        />
        <StatWidget
          variant="navy"
          title="Shipments"
          value={TOTALS.shipments}
          label="delivered from central"
          icon={<TruckIcon />}
          iconColor="#fff"
          href={ROUTES.pharmacy.requests}
        />
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

/** Adds up units per medicine across all dispenses and returns the top 6. */
function getTopMedicines(): TopMedicine[] {
  const units = new Map<string, TopMedicine>();
  for (const d of DISPENSES) {
    for (const { medicine, quantity } of d.medicines) {
      const entry = units.get(medicine.brand) ?? { medicine, units: 0 };
      entry.units += quantity;
      units.set(medicine.brand, entry);
    }
  }
  return [...units.values()].sort((a, b) => b.units - a.units).slice(0, 6);
}

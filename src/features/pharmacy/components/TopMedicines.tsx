import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { EmptyState, SectionCard } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import { colors, gradients } from "@/theme";
import type { Medicine } from "../types";

export type TopMedicine = { medicine: Medicine; units: number };

/** Overview block: the medicines handed out most, with a bar for each. */
export default function TopMedicines({ items }: { items: TopMedicine[] }) {
  const max = items[0]?.units ?? 1;

  return (
    <SectionCard title="Most dispensed medicines" viewAllHref={ROUTES.pharmacy.dispense}>
      {items.length === 0 && <EmptyState title="Nothing dispensed" message="Try another pharmacy or period" />}
      {items.map(({ medicine, units }) => (
        <Box
          key={medicine.brand}
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr) 44px",
            alignItems: "center",
            gap: 1.75,
            p: "10px 12px",
            "& + &": { boxShadow: `0 -1px 0 ${colors.line2}` },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Box component="b" sx={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>
              {medicine.brand}
            </Box>
            <Box component="small" sx={{ fontSize: 11.5, color: colors.mute }}>
              {medicine.generic}
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(units / max) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "#EEF3F0",
              "& .MuiLinearProgress-bar": { borderRadius: 5, background: gradients.tealBar },
            }}
          />
          <Box sx={{ textAlign: "right", fontSize: 13, fontWeight: 600 }}>{units}</Box>
        </Box>
      ))}
    </SectionCard>
  );
}

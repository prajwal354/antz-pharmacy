import Box from "@mui/material/Box";
import { IconTile, PriorityBadge, type Priority } from "@/components/common";
import { VialIcon } from "@/components/icons";
import { colors } from "@/theme";
import type { Medicine } from "../../types";

type MedicineItemProps = {
  medicine: Medicine;
  quantity: number;
  /** Extra text after the generic name, e.g. the pack size or batch number. */
  detail: string;
  priority?: Priority;
};

/** One medicine line in the details panel: icon, name, detail, quantity. */
export default function MedicineItem({ medicine, quantity, detail, priority = null }: MedicineItemProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "44px minmax(0,1fr) auto",
        alignItems: "center",
        gap: 1.5,
        p: "10px 12px",
        borderRadius: "12px",
        boxShadow: `inset 0 0 0 1px ${colors.line}`,
        "& + &": { mt: 1 },
      }}
    >
      <IconTile icon={<VialIcon sx={{ fontSize: 20 }} />} color={colors.navy} size={44} />
      <Box sx={{ minWidth: 0 }}>
        <Box component="b" sx={{ fontSize: 14, fontWeight: 600 }}>
          {medicine.brand}
          <PriorityBadge priority={priority} />
        </Box>
        <Box sx={{ fontSize: 12.5, color: colors.mute }}>
          {medicine.generic} · {detail}
        </Box>
      </Box>
      <Box sx={{ textAlign: "right", fontSize: 12, color: colors.mute }}>
        Qty
        <Box component="b" sx={{ display: "block", fontSize: 16, color: colors.ink }}>
          {quantity}
        </Box>
      </Box>
    </Box>
  );
}

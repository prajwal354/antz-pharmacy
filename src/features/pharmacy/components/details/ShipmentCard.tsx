import Box from "@mui/material/Box";
import { PersonAvatar } from "@/components/common";
import { TruckIcon } from "@/components/icons";
import { colors } from "@/theme";
import { formatDate } from "@/utils/format";
import type { Shipment } from "../../types";

/** One shipment: ID, delivered badge, driver details, and who sent it. */
export default function ShipmentCard({ shipment: s, totalItems }: { shipment: Shipment; totalItems: number }) {
  const facts = [
    { label: "Driver", value: s.driver },
    { label: "Mobile", value: s.mobile },
    { label: "Vehicle", value: s.vehicle },
  ];

  return (
    <Box sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: `inset 0 0 0 1px ${colors.line}`, "& + &": { mt: 1.25 } }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: "12px 14px", bgcolor: "#E8F2EE" }}>
        <Box>
          <Box component="b" sx={{ fontSize: 13.5 }}>
            {s.id}
          </Box>
          <Box sx={{ fontSize: 12, color: colors.mute }}>
            {s.itemCount} of {totalItems} items
          </Box>
        </Box>
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: colors.green, fontSize: 12, fontWeight: 600 }}>
          <TruckIcon sx={{ fontSize: 16 }} />
          Delivered
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, p: "12px 14px", fontSize: 12, color: colors.mute }}>
        {facts.map((f) => (
          <span key={f.label}>
            {f.label}
            <Box component="b" sx={{ display: "block", mt: "2px", fontSize: 13, fontWeight: 600, color: "#0A7C7C" }}>
              {f.value}
            </Box>
          </span>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: "10px 14px", borderTop: `1px solid ${colors.line2}`, fontSize: 12.5 }}>
        <PersonAvatar name={s.shippedBy} size={28} />
        <span>
          {s.shippedBy}
          <Box component="small" sx={{ display: "block", color: colors.mute }}>
            {formatDate(s.date, true)}
          </Box>
        </span>
      </Box>
    </Box>
  );
}

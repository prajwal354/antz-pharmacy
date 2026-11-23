"use client";

import Box from "@mui/material/Box";
import { DataListRow, IconTile, PersonAvatar, StatValue } from "@/components/common";
import { DispenseIcon } from "@/components/icons";
import { colors } from "@/theme";
import { formatDate } from "@/utils/format";
import type { Dispense } from "../types";
import { totalQuantity } from "../utils";

/** Column sizes shared by the header and every row on the Dispense page. */
export const DISPENSE_COLUMNS = "44px minmax(0,1.5fr) minmax(0,1.2fr) minmax(0,.9fr) 150px 20px";
export const DISPENSE_LABELS = ["", "Dispense", "Dispensed to", "Animals · medicines", "Quantity", ""];

/** One dispense in the Dispense list. */
export default function DispenseRow({ dispense: d, onClick }: { dispense: Dispense; onClick?: () => void }) {
  const qty = totalQuantity(d);

  return (
    <DataListRow columns={DISPENSE_COLUMNS} onClick={onClick}>
      <IconTile icon={<DispenseIcon sx={{ fontSize: 20 }} />} color="#0A7C40" size={44} />

      <Box sx={{ minWidth: 0 }}>
        <Box component="b" sx={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>
          {d.id}
        </Box>
        <Box sx={{ mt: "3px", fontSize: 12.5, color: colors.ink2 }}>
          {d.pharmacy} · {formatDate(d.date, true)}
        </Box>
      </Box>

      <Box className="hide-mobile">
        <PersonAvatar name={d.dispensedTo} showName />
      </Box>

      <Box className="hide-mobile">
        <Box sx={{ display: "flex", gap: 1.75 }}>
          <StatValue value={d.animals.length || "—"} label={d.animals.length === 1 ? "animal" : "animals"} />
          <StatValue value={d.medicines.length} label={d.medicines.length === 1 ? "medicine" : "medicines"} />
        </Box>
      </Box>

      <StatValue value={qty} label={qty === 1 ? "unit" : "units"} />
    </DataListRow>
  );
}

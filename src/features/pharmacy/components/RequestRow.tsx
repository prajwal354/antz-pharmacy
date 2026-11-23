"use client";

import Box from "@mui/material/Box";
import { DataListRow, IconTile, PersonAvatar, PriorityBadge, StatValue, StatusChip } from "@/components/common";
import { RequestIcon } from "@/components/icons";
import { colors } from "@/theme";
import { formatDate } from "@/utils/format";
import { REQUEST_STATUS_COLORS } from "../constants/status";
import type { MedicineRequest } from "../types";
import { daysWaiting, isPending, pendingItemCount } from "../utils";

/** Column sizes shared by the header and every row on the Requests page. */
export const REQUEST_COLUMNS = "44px minmax(0,1.5fr) minmax(0,1.2fr) minmax(0,.9fr) 150px 20px";
export const REQUEST_LABELS = ["", "Request", "Requested by", "Waiting · pending items", "Status", ""];

/** One request in the Requests list. */
export default function RequestRow({ request: r, onClick }: { request: MedicineRequest; onClick?: () => void }) {
  const pending = isPending(r);
  const days = daysWaiting(r);

  return (
    <DataListRow columns={REQUEST_COLUMNS} onClick={onClick}>
      <IconTile icon={<RequestIcon sx={{ fontSize: 20 }} />} color="#0A7C7C" size={44} />

      <Box sx={{ minWidth: 0 }}>
        <Box component="b" sx={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>
          {r.id}
          <PriorityBadge priority={r.priority} />
        </Box>
        <Box sx={{ mt: "3px", fontSize: 12.5, color: colors.ink2 }}>
          To <Box component="strong" sx={{ fontWeight: 600, color: colors.ink }}>{r.to}</Box>
        </Box>
      </Box>

      <Box className="hide-mobile">
        <PersonAvatar name={r.requestedBy} showName />
        <Box sx={{ mt: "2px", ml: "38px", fontSize: 12, color: colors.mute }}>{formatDate(r.date)}</Box>
      </Box>

      <Box className="hide-mobile">
        <Box sx={{ display: "flex", gap: 1.75 }}>
          <StatValue value={pending ? `${days} ${days === 1 ? "day" : "days"}` : "—"} label={pending ? "waiting" : "closed"} highlight={pending && days > 180} />
          <StatValue value={`${pendingItemCount(r)} of ${r.items.length}`} label="pending" />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5, minWidth: 0 }}>
        <StatusChip label={r.status} color={REQUEST_STATUS_COLORS[r.status]} />
        <Box component="small" sx={{ fontSize: 11.5, color: colors.mute, whiteSpace: "nowrap" }}>
          {r.shipments.length ? `Last shipment ${formatDate(r.shipments[0].date)}` : "Nothing shipped yet"}
        </Box>
      </Box>
    </DataListRow>
  );
}

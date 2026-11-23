"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { EmptyState, IconTile, PriorityBadge, SectionCard, StatusChip } from "@/components/common";
import { ChevronRightIcon, RequestIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { colors } from "@/theme";
import { formatDate, formatINR, plural } from "@/utils/format";
import { REQUEST_STATUS_COLORS } from "../constants/status";
import type { MedicineRequest } from "../types";

/** Overview block: urgent / high-priority requests that are not shipped yet. */
export default function UrgentRequests({ requests }: { requests: MedicineRequest[] }) {
  return (
    <SectionCard title="Urgent requests" viewAllHref={ROUTES.pharmacy.requests}>
      {requests.length === 0 && <EmptyState title="No urgent requests" message="All caught up" />}
      {requests.map((r) => (
        <ButtonBase
          key={r.id}
          component={NextLink}
          href={ROUTES.pharmacy.requests}
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "44px minmax(0,1fr) auto 20px",
            alignItems: "center",
            justifyItems: "start",
            gap: 1.75,
            p: "10px 12px",
            borderRadius: "12px",
            "& + &": { boxShadow: `0 -1px 0 ${colors.line2}` },
            "&:hover": { bgcolor: colors.surfaceHover },
          }}
        >
          <IconTile icon={<RequestIcon sx={{ fontSize: 20 }} />} color="#0A7C7C" size={44} />
          <Box sx={{ textAlign: "left", minWidth: 0 }}>
            <Box component="b" sx={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>
              {r.id}
              <PriorityBadge priority={r.priority} />
            </Box>
            <Box sx={{ mt: "3px", fontSize: 12.5, color: colors.ink2 }}>
              {plural(r.items.length, "medicine")} · {formatINR(r.value)}
            </Box>
            <Box component="i" sx={{ display: "block", mt: "2px", fontSize: 12.5, color: colors.mute }}>
              {r.requestedBy} · {formatDate(r.date)}
            </Box>
          </Box>
          <StatusChip label={r.status} color={REQUEST_STATUS_COLORS[r.status]} />
          <ChevronRightIcon sx={{ color: "#B3C0BA" }} />
        </ButtonBase>
      ))}
    </SectionCard>
  );
}

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DetailsDrawer, EmptyState, PriorityBadge, SegmentedTabs } from "@/components/common";
import { colors } from "@/theme";
import { formatDate, formatINR } from "@/utils/format";
import type { MedicineRequest } from "../../types";
import MedicineItem from "./MedicineItem";
import ShipmentCard from "./ShipmentCard";
import SummaryCard from "./SummaryCard";

type Tab = "items" | "shipped";

type RequestDetailsProps = {
  /** The request to show (stays set while the panel slides closed). */
  request: MedicineRequest | null;
  open: boolean;
  onClose: () => void;
};

/** Side panel with everything about one medicine request. */
export default function RequestDetails({ request, open, onClose }: RequestDetailsProps) {
  return (
    <DetailsDrawer
      open={open && Boolean(request)}
      onClose={onClose}
      subtitle={request ? `Medicine request · ${formatDate(request.date, true)}` : undefined}
      title={
        request && (
          <>
            {request.id}
            <PriorityBadge priority={request.priority} />
          </>
        )
      }
      footer={
        request &&
        (request.status === "Shipped" ? (
          <Button variant="outlined" color="inherit" sx={{ borderColor: colors.line }}>
            Download summary
          </Button>
        ) : (
          <Button variant="contained">Ship items</Button>
        ))
      }
    >
      {/* key = a new request starts fresh (tabs back to "Requested items") */}
      {request && <RequestBody key={request.id} request={request} />}
    </DetailsDrawer>
  );
}

function RequestBody({ request: r }: { request: MedicineRequest }) {
  const [tab, setTab] = useState<Tab>("items");
  // In the design, a part-shipped request shows 40% of its value as shipped.
  const shippedValue = r.shipments.length ? Math.round(r.value * (r.status === "Shipped" ? 1 : 0.4)) : 0;

  return (
    <>
      <SummaryCard
        label="Requested to"
        place={r.to}
        stats={[
          { value: r.items.length, label: "items" },
          { value: formatINR(r.value), label: "total value" },
        ]}
        person={{ name: r.requestedBy, caption: `from ${r.from}` }}
      />

      <Box sx={{ mx: 2.5, mt: 1.75 }}>
        <SegmentedTabs
          fullWidth
          value={tab}
          onChange={setTab}
          options={[
            { value: "items", label: `Requested items · ${r.items.length}` },
            { value: "shipped", label: `Shipped · ${r.shipments.length}` },
          ]}
        />
      </Box>

      <Box sx={{ px: 2.5, mt: 1.5 }}>
        {tab === "items" &&
          r.items.map((item) => (
            <MedicineItem key={item.medicine.brand} medicine={item.medicine} quantity={item.quantity} detail={item.medicine.pack} priority={item.priority} />
          ))}

        {tab === "shipped" && r.shipments.length === 0 && (
          <EmptyState title="Not shipped yet" message="The central pharmacy has not sent anything" />
        )}

        {tab === "shipped" && r.shipments.length > 0 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, fontSize: 12.5, color: colors.mute }}>
              <span>
                Shipments <b style={{ color: colors.ink }}>{r.shipments.length}</b>
              </span>
              <span>
                Shipped value <b style={{ color: colors.ink }}>{formatINR(shippedValue)}</b>
              </span>
            </Box>
            {r.shipments.map((s) => (
              <ShipmentCard key={s.id} shipment={s} totalItems={r.items.length} />
            ))}
          </>
        )}
      </Box>
    </>
  );
}

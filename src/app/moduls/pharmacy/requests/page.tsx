"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataListFooter, DataListHeader, EmptyState, PageHeader, SearchField, SegmentedTabs, type TabOption } from "@/components/common";
import { PlusIcon } from "@/components/icons";
import { colors } from "@/theme";
import { REQUEST_COLUMNS, REQUEST_LABELS, RequestRow } from "@/features/pharmacy/components";
import type { RequestTab } from "@/features/pharmacy/constants/status";
import { REQUESTS, TOTALS } from "@/features/pharmacy/data/mockData";
import type { MedicineRequest } from "@/features/pharmacy/types";
import { isPending, matchesSearch } from "@/features/pharmacy/utils";

/** Which requests belong in each tab. */
const TAB_FILTERS: Record<RequestTab, (r: MedicineRequest) => boolean> = {
  pending: isPending,
  shipped: (r) => r.status === "Shipped",
  disputed: (r) => r.status === "Disputed",
  cancelled: (r) => r.status === "Cancelled",
  all: () => true,
};

const TABS: TabOption<RequestTab>[] = [
  { value: "pending", label: "Pending", count: REQUESTS.filter(isPending).length },
  { value: "shipped", label: "Shipped" },
  { value: "disputed", label: "Disputes" },
  { value: "cancelled", label: "Cancelled" },
  { value: "all", label: "All" },
];

export default function RequestsPage() {
  const [tab, setTab] = useState<RequestTab>("pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rows = REQUESTS.filter(
    (r) => TAB_FILTERS[tab](r) && matchesSearch(search, [r.id, r.to, r.requestedBy, ...r.items.map((x) => x.medicine.brand)]),
  );

  return (
    <>
      <PageHeader
        title="Requests"
        count={TOTALS.requests}
        description="Medicine requests sent to a central pharmacy, and what has been shipped."
        action={
          <Button variant="outlined" color="inherit" startIcon={<PlusIcon sx={{ fontSize: 15 }} />} sx={{ bgcolor: colors.surface, borderColor: colors.line }}>
            New request
          </Button>
        }
      />

      <Box sx={{ borderRadius: "20px", bgcolor: colors.surface, overflow: "hidden" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.25, p: 2, borderBottom: `1px solid ${colors.line2}` }}>
          <SegmentedTabs options={TABS} value={tab} onChange={setTab} />
          <SearchField value={search} onChange={setSearch} placeholder="Search request ID, medicine or person" />
        </Box>

        <Box sx={{ p: "4px 16px 10px" }}>
          <DataListHeader columns={REQUEST_COLUMNS} labels={REQUEST_LABELS} />
          {rows.map((r) => (
            <RequestRow key={r.id} request={r} />
          ))}
          {rows.length === 0 && <EmptyState title="Nothing matches" message="Try another search or tab" />}
        </Box>

        <DataListFooter showing={rows.length} total={TOTALS.requests} page={page} pageCount={2} onPageChange={setPage} />
      </Box>
    </>
  );
}

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataListFooter, DataListHeader, EmptyState, PageHeader, SearchField, SegmentedTabs, type TabOption } from "@/components/common";
import { PlusIcon } from "@/components/icons";
import { colors } from "@/theme";
import { REQUEST_COLUMNS, REQUEST_LABELS, RequestRow, RequestDetails } from "@/features/pharmacy/components";
import type { RequestTab } from "@/features/pharmacy/constants/status";
import { REQUESTS, TOTALS } from "@/features/pharmacy/data/mockData";
import type { MedicineRequest } from "@/features/pharmacy/types";
import { isPending, matchesSearch } from "@/features/pharmacy/utils";
import { usePharmacyFilters } from "@/features/pharmacy/context/PharmacyFiltersContext";
import { requestMatches, scaleTotal } from "@/features/pharmacy/filters";

/** Which requests belong in each tab. */
const TAB_FILTERS: Record<RequestTab, (r: MedicineRequest) => boolean> = {
  pending: isPending,
  shipped: (r) => r.status === "Shipped",
  disputed: (r) => r.status === "Disputed",
  cancelled: (r) => r.status === "Cancelled",
  all: () => true,
};

export default function RequestsPage() {
  const filters = usePharmacyFilters(); // header's pharmacy + period
  const [tab, setTab] = useState<RequestTab>("pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Details panel: which request was clicked, and whether the panel is open.
  const [selected, setSelected] = useState<MedicineRequest | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const openDetails = (item: MedicineRequest) => {
    setSelected(item);
    setPanelOpen(true);
  };

  // Step 1: keep requests that match the header filters.
  const inScope = REQUESTS.filter((r) => requestMatches(r, filters));
  // Step 2: then apply this page's tab + search box.
  const rows = inScope.filter(
    (r) => TAB_FILTERS[tab](r) && matchesSearch(search, [r.id, r.to, r.requestedBy, ...r.items.map((x) => x.medicine.brand)]),
  );
  const total = scaleTotal(TOTALS.requests, filters, inScope.length);

  const tabs: TabOption<RequestTab>[] = [
    { value: "pending", label: "Pending", count: inScope.filter(isPending).length },
    { value: "shipped", label: "Shipped" },
    { value: "disputed", label: "Disputes" },
    { value: "cancelled", label: "Cancelled" },
    { value: "all", label: "All" },
  ];

  return (
    <>
      <PageHeader
        title="Requests"
        count={total}
        description="Medicine requests sent to a central pharmacy, and what has been shipped."
        action={
          <Button variant="outlined" color="inherit" startIcon={<PlusIcon sx={{ fontSize: 15 }} />} sx={{ bgcolor: colors.surface, borderColor: colors.line }}>
            New request
          </Button>
        }
      />

      <Box sx={{ borderRadius: "20px", bgcolor: colors.surface, overflow: "hidden" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.25, p: 2, borderBottom: `1px solid ${colors.line2}` }}>
          <SegmentedTabs options={tabs} value={tab} onChange={setTab} />
          <SearchField value={search} onChange={setSearch} placeholder="Search request ID, medicine or person" />
        </Box>

        <Box sx={{ p: "4px 16px 10px" }}>
          <DataListHeader columns={REQUEST_COLUMNS} labels={REQUEST_LABELS} />
          {rows.map((r) => (
            <RequestRow key={r.id} request={r} onClick={() => openDetails(r)} />
          ))}
          {rows.length === 0 && <EmptyState title="Nothing matches" message="Try another search, tab, pharmacy or period" />}
        </Box>

        <DataListFooter showing={rows.length} total={total} page={page} pageCount={total > rows.length ? 2 : 1} onPageChange={setPage} />
      </Box>

      <RequestDetails request={selected} open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataListFooter, DataListHeader, EmptyState, PageHeader, SearchField, SegmentedTabs, type TabOption } from "@/components/common";
import { PlusIcon } from "@/components/icons";
import { colors } from "@/theme";
import { DISPENSE_COLUMNS, DISPENSE_LABELS, DispenseRow, DispenseDetails } from "@/features/pharmacy/components";
import type { DispenseTab } from "@/features/pharmacy/constants/status";
import { DISPENSES, TOTALS } from "@/features/pharmacy/data/mockData";
import type { Dispense } from "@/features/pharmacy/types";
import { matchesSearch } from "@/features/pharmacy/utils";
import { usePharmacyFilters } from "@/features/pharmacy/context/PharmacyFiltersContext";
import { dispenseMatches, scaleTotal } from "@/features/pharmacy/filters";

const TAB_FILTERS: Record<DispenseTab, (d: Dispense) => boolean> = {
  all: () => true,
  animals: (d) => d.animals.length > 0,
  none: (d) => d.animals.length === 0,
};

const TABS: TabOption<DispenseTab>[] = [
  { value: "all", label: "All" },
  { value: "animals", label: "For animals" },
  { value: "none", label: "No animal" },
];

export default function DispensePage() {
  const filters = usePharmacyFilters(); // header's pharmacy + period
  const [tab, setTab] = useState<DispenseTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Details panel: which dispense was clicked, and whether the panel is open.
  const [selected, setSelected] = useState<Dispense | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const openDetails = (item: Dispense) => {
    setSelected(item);
    setPanelOpen(true);
  };

  // Step 1: keep dispenses that match the header filters.
  const inScope = DISPENSES.filter((d) => dispenseMatches(d, filters));
  // Step 2: then apply this page's tab + search box.
  const rows = inScope.filter(
    (d) => TAB_FILTERS[tab](d) && matchesSearch(search, [d.id, d.pharmacy, d.dispensedTo, ...d.medicines.map((m) => m.medicine.brand)]),
  );
  const total = scaleTotal(TOTALS.dispensed, filters, inScope.length);

  return (
    <>
      <PageHeader
        title="Dispense"
        count={total}
        description="Medicines handed out from a pharmacy to a keeper or vet, for an animal."
        action={
          <Button variant="outlined" color="inherit" startIcon={<PlusIcon sx={{ fontSize: 15 }} />} sx={{ bgcolor: colors.surface, borderColor: colors.line }}>
            New dispense
          </Button>
        }
      />

      <Box sx={{ borderRadius: "20px", bgcolor: colors.surface, overflow: "hidden" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.25, p: 2, borderBottom: `1px solid ${colors.line2}` }}>
          <SegmentedTabs options={TABS} value={tab} onChange={setTab} />
          <SearchField value={search} onChange={setSearch} placeholder="Search dispense ID, medicine or person" />
        </Box>

        <Box sx={{ p: "4px 16px 10px" }}>
          <DataListHeader columns={DISPENSE_COLUMNS} labels={DISPENSE_LABELS} />
          {rows.map((d) => (
            <DispenseRow key={d.id} dispense={d} onClick={() => openDetails(d)} />
          ))}
          {rows.length === 0 && <EmptyState title="Nothing matches" message="Try another search, tab, pharmacy or period" />}
        </Box>

        <DataListFooter showing={rows.length} total={total} page={page} pageCount={total > rows.length ? 2 : 1} onPageChange={setPage} />
      </Box>

      <DispenseDetails dispense={selected} open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataListFooter, DataListHeader, EmptyState, PageHeader, SearchField, SegmentedTabs, type TabOption } from "@/components/common";
import { PlusIcon } from "@/components/icons";
import { colors } from "@/theme";
import { DISPENSE_COLUMNS, DISPENSE_LABELS, DispenseRow } from "@/features/pharmacy/components";
import type { DispenseTab } from "@/features/pharmacy/constants/status";
import { DISPENSES, TOTALS } from "@/features/pharmacy/data/mockData";
import type { Dispense } from "@/features/pharmacy/types";
import { matchesSearch } from "@/features/pharmacy/utils";

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
  const [tab, setTab] = useState<DispenseTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rows = DISPENSES.filter(
    (d) => TAB_FILTERS[tab](d) && matchesSearch(search, [d.id, d.pharmacy, d.dispensedTo, ...d.medicines.map((m) => m.medicine.brand)]),
  );

  return (
    <>
      <PageHeader
        title="Dispense"
        count={TOTALS.dispensed}
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
            <DispenseRow key={d.id} dispense={d} />
          ))}
          {rows.length === 0 && <EmptyState title="Nothing matches" message="Try another search or tab" />}
        </Box>

        <DataListFooter showing={rows.length} total={TOTALS.dispensed} page={page} pageCount={2} onPageChange={setPage} />
      </Box>
    </>
  );
}

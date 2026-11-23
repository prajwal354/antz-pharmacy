"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { EmptyState, SearchField, SegmentedTabs, type TabOption } from "@/components/common";
import { PlusIcon } from "@/components/icons";
import { colors } from "@/theme";
import { LOW_STOCK_LIMIT, MEDICINES } from "../../data/mockData";
import type { Medicine } from "../../types";
import { matchesSearch } from "../../utils";
import QuantityControl from "./QuantityControl";

/** A medicine the user has added, and how many. */
export type PickedMedicine = { medicine: Medicine; quantity: number };

type SortBy = "brand" | "generic";

const SORT_TABS: TabOption<SortBy>[] = [
  { value: "brand", label: "By brand name" },
  { value: "generic", label: "By generic name" },
];

/** Highest quantity you can ask for when stock doesn't limit it (requests). */
const MAX_REQUEST = 999;

type MedicinePickerProps = {
  picked: PickedMedicine[];
  onChange: (picked: PickedMedicine[]) => void;
  /** true = can't pick more than is in stock (dispensing). false = no stock limit (requesting more). */
  limitToStock?: boolean;
  /** Small grey line under the list. */
  note?: string;
};

/** Search medicines, add them, set how many. Used by New dispense and New request. */
export default function MedicinePicker({ picked, onChange, limitToStock = true, note }: MedicinePickerProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("brand");

  // Search both names, sort by the chosen one, show the first 5.
  const results = MEDICINES.filter((m) => matchesSearch(search, [m.brand, m.generic]))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    .slice(0, 5);

  const quantityOf = (m: Medicine) => picked.find((p) => p.medicine.brand === m.brand)?.quantity ?? 0;

  /** Set a medicine's quantity. 0 removes it from the list. */
  const setQuantity = (medicine: Medicine, quantity: number) => {
    const others = picked.filter((p) => p.medicine.brand !== medicine.brand);
    if (quantity <= 0) return onChange(others);
    if (quantityOf(medicine) === 0) return onChange([...picked, { medicine, quantity }]); // newly added → goes to the end
    onChange(picked.map((p) => (p.medicine.brand === medicine.brand ? { ...p, quantity } : p)));
  };

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <SegmentedTabs options={SORT_TABS} value={sortBy} onChange={setSortBy} />
      </Box>
      <Box sx={{ display: "flex", mb: 0.75 }}>
        <SearchField value={search} onChange={setSearch} placeholder="Search medicine" />
      </Box>

      {results.map((m) => {
        const quantity = quantityOf(m);
        const main = sortBy === "brand" ? m.brand : m.generic;
        const other = sortBy === "brand" ? m.generic : m.brand;
        return (
          <Box key={m.brand} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.25, p: "8px 10px", borderRadius: "10px", "&:hover": { bgcolor: "#F5F8F6" } }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>{main}</Typography>
              <Typography sx={{ fontSize: 12, color: colors.mute }}>
                {other} ·{" "}
                <Box component="span" sx={{ color: m.stock < LOW_STOCK_LIMIT ? colors.red : undefined, fontWeight: m.stock < LOW_STOCK_LIMIT ? 600 : undefined }}>
                  {m.stock} in stock
                </Box>
              </Typography>
            </Box>

            {quantity > 0 ? (
              // Already added → show the counter.
              <QuantityControl value={quantity} max={limitToStock ? m.stock : MAX_REQUEST} label={m.brand} onChange={(q) => setQuantity(m, q)} />
            ) : (
              <IconButton
                aria-label={`Add ${m.brand}`}
                onClick={() => setQuantity(m, 1)}
                sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#EAF7EF", color: colors.limeInk, "&:hover": { bgcolor: colors.limeSoft } }}
              >
                <PlusIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        );
      })}
      {results.length === 0 && <EmptyState title="No medicine found" message="Try the brand or generic name" />}

      {note && <Typography sx={{ mt: 0.75, fontSize: 12, color: colors.mute }}>{note}</Typography>}
    </>
  );
}

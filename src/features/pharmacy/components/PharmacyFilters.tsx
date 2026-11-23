"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CalendarIcon, ChevronDownIcon, MedicalCrossIcon, SearchIcon } from "@/components/icons";
import { colors } from "@/theme";
import { PHARMACIES } from "../data/mockData";
import { PERIODS } from "../constants/status";

const ALL = "All pharmacies";

/**
 * Header controls: pharmacy picker + period dropdown.
 * NOTE: for now these only change what's shown in the header. To make them filter the
 * lists, move this state into a React Context that the pages can read.
 */
export default function PharmacyFilters() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [pharmacy, setPharmacy] = useState(ALL);
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<string>("all");

  const options = [ALL, ...PHARMACIES].filter((p) => p.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="listbox"
        sx={{
          display: { xs: "none", sm: "inline-flex" },
          gap: 1,
          height: 42,
          px: 1.75,
          borderRadius: "12px",
          bgcolor: colors.limeSoft,
          color: colors.limeInk,
          fontWeight: 600,
          fontSize: 13.5,
        }}
      >
        <MedicalCrossIcon />
        {pharmacy}
        <ChevronDownIcon sx={{ fontSize: 16 }} />
      </ButtonBase>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 280, p: 1 } } }}
      >
        <Box sx={{ px: 0.75, pb: 0.75 }} onKeyDown={(e) => e.stopPropagation()}>
          <InputBase
            autoFocus
            fullWidth
            placeholder="Search pharmacies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={<SearchIcon sx={{ color: colors.mute, mr: 1 }} />}
            sx={{ height: 38, px: 1.25, borderRadius: "10px", bgcolor: colors.surfaceMuted, fontSize: 13 }}
          />
        </Box>
        {options.map((p) => (
          <MenuItem
            key={p}
            selected={p === pharmacy}
            onClick={() => {
              setPharmacy(p);
              setAnchor(null);
            }}
            sx={{ "&.Mui-selected": { color: colors.limeInk, fontWeight: 600, bgcolor: colors.mint } }}
          >
            {p}
          </MenuItem>
        ))}
      </Menu>

      <Select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        IconComponent={ChevronDownIcon}
        input={<InputBase />}
        startAdornment={<CalendarIcon sx={{ fontSize: 16, mr: 1 }} />}
        aria-label="Period"
        sx={{
          display: { xs: "none", sm: "inline-flex" },
          height: 42,
          pl: 1.5,
          pr: 1,
          minWidth: 146,
          borderRadius: "12px",
          bgcolor: colors.surfaceMuted,
          color: colors.ink2,
          fontSize: 13.5,
          fontWeight: 600,
          "& .MuiSelect-icon": { fontSize: 16, right: 10, color: colors.ink2 },
        }}
      >
        {PERIODS.map((p) => (
          <MenuItem key={p.value} value={p.value}>
            {p.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

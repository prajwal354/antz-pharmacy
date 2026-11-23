"use client";

import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { colors } from "@/theme";

export type TabOption<T extends string> = {
  value: T;
  label: string;
  /** Optional number badge, e.g. Pending (8). */
  count?: number;
};

type SegmentedTabsProps<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Stretch the tabs to fill the full width. */
  fullWidth?: boolean;
};

/** Pill-style tab switcher: [ Pending 8 | Shipped | All ]. Built on MUI ToggleButtonGroup. */
export default function SegmentedTabs<T extends string>({ options, value, onChange, fullWidth = false }: SegmentedTabsProps<T>) {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth={fullWidth}
      value={value}
      // MUI sends null when the active tab is clicked again — ignore that so one tab stays selected.
      onChange={(_, next: T | null) => next && onChange(next)}
      sx={{ p: "3px", gap: "2px", borderRadius: "10px", bgcolor: "#F0F4F2" }}
    >
      {options.map((opt) => (
        <ToggleButton
          key={opt.value}
          value={opt.value}
          sx={{
            height: 32,
            px: 1.5,
            border: 0,
            borderRadius: "8px !important",
            fontSize: 12.5,
            fontWeight: 600,
            textTransform: "none",
            color: colors.ink2,
            "&.Mui-selected, &.Mui-selected:hover": {
              bgcolor: colors.surface,
              color: colors.ink,
              boxShadow: "0 1px 3px rgba(0,40,20,.12)",
            },
          }}
        >
          {opt.label}
          {opt.count !== undefined && (
            <Box
              component="span"
              sx={{
                display: "inline-grid",
                placeItems: "center",
                minWidth: 20,
                height: 18,
                ml: "6px",
                px: "5px",
                borderRadius: "6px",
                bgcolor: "#00807F",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {opt.count}
            </Box>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

"use client";

import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "@/components/icons";
import { colors } from "@/theme";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/** Grey search box with a magnifier icon. Turns white with a green ring when focused. */
export default function SearchField({ value, onChange, placeholder = "Search" }: SearchFieldProps) {
  return (
    <InputBase
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      startAdornment={<SearchIcon sx={{ color: colors.mute, mr: 1 }} />}
      inputProps={{ "aria-label": placeholder }}
      sx={{
        flex: 1,
        minWidth: 200,
        height: 40,
        px: 1.5,
        borderRadius: "10px",
        bgcolor: colors.surfaceMuted,
        fontSize: 13.5,
        "&.Mui-focused": { bgcolor: colors.surface, boxShadow: `inset 0 0 0 2px ${colors.limeInk}` },
      }}
    />
  );
}

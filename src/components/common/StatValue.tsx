import Box from "@mui/material/Box";
import { colors } from "@/theme";

type StatValueProps = {
  value: string | number;
  label: string;
  /** Highlight the number (e.g. something waiting too long). */
  highlight?: boolean;
};

/** A number with a small label underneath, e.g. "15 days / waiting". */
export default function StatValue({ value, label, highlight = false }: StatValueProps) {
  return (
    <Box component="span" sx={{ fontSize: 12, color: colors.mute }}>
      <Box
        component="b"
        sx={{
          display: "block",
          fontSize: 16,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          color: highlight ? colors.darkOrange : colors.ink,
        }}
      >
        {value}
      </Box>
      {label}
    </Box>
  );
}

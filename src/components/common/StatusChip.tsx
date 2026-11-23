import Box from "@mui/material/Box";
import { tint } from "@/theme";

type StatusChipProps = {
  label: string;
  /** Text + dot colour. The background is a pale version of it. */
  color: string;
};

/** Small coloured label with a dot, e.g. "• Requested", "• Shipped". */
export default function StatusChip({ label, color }: StatusChipProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        height: 26,
        px: "10px",
        borderRadius: "8px",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
        color,
        bgcolor: tint(color),
        "&::before": { content: '""', width: 6, height: 6, borderRadius: "50%", bgcolor: "currentColor" },
      }}
    >
      {label}
    </Box>
  );
}

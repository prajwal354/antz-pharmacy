import Box from "@mui/material/Box";
import { ArrowUpRightIcon } from "@/components/icons";
import { colors } from "@/theme";

/** The small round ↗ shown in the corner of clickable cards. */
export default function CornerArrow({ light = false }: { light?: boolean }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 34,
        height: 34,
        ml: "auto",
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: "50%",
        color: light ? "#fff" : colors.ink,
        bgcolor: light ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.35)",
        boxShadow: light ? "inset 0 0 0 1px rgba(255,255,255,.45)" : "inset 0 0 0 1px rgba(14,21,18,.16)",
      }}
    >
      <ArrowUpRightIcon sx={{ fontSize: 15 }} />
    </Box>
  );
}

import Box from "@mui/material/Box";
import { colors } from "@/theme";

type InfoTagProps = {
  label: string;
  /** "warn" = yellow, "glass" = see-through white (on coloured cards), "neutral" = grey. */
  tone?: "neutral" | "warn" | "glass";
};

const TONES = {
  neutral: { bg: colors.surfaceMuted, color: colors.ink, dot: colors.ink },
  warn: { bg: "#FFF6E3", color: "#8A6A1E", dot: "#E0A100" },
  glass: { bg: "rgba(255,255,255,.6)", color: colors.ink, dot: colors.ink },
};

/** Small pill with a dot at the bottom of overview cards, e.g. "• 5 urgent". */
export default function InfoTag({ label, tone = "neutral" }: InfoTagProps) {
  const t = TONES[tone];
  return (
    <Box
      component="span"
      sx={{
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        height: 28,
        px: "11px",
        borderRadius: "8px",
        fontSize: 12.5,
        fontWeight: 500,
        bgcolor: t.bg,
        color: t.color,
        "&::before": { content: '""', width: 7, height: 7, borderRadius: "50%", bgcolor: t.dot },
      }}
    >
      {label}
    </Box>
  );
}

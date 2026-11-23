import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactActions, PersonAvatar } from "@/components/common";

const THEMES = {
  navy: { background: "linear-gradient(125deg, #173550, #1F415B)", number: "#7FE3E3" },
  green: { background: "linear-gradient(125deg, #04552A, #0A7C40)", number: "#9DF5BE" },
};

type SummaryCardProps = {
  label: string; // e.g. "Requested to"
  place: string; // e.g. "Central pharmacy"
  stats: { value: ReactNode; label: string }[];
  person: { name: string; caption: string };
  theme?: keyof typeof THEMES;
};

/** Coloured card at the top of the details panel: where, two numbers, and who. */
export default function SummaryCard({ label, place, stats, person, theme = "navy" }: SummaryCardProps) {
  const t = THEMES[theme];
  return (
    <Box sx={{ mx: 2.5, p: 2, borderRadius: "16px", color: "#fff", background: t.background }}>
      <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{label}</Typography>
      <Typography sx={{ mt: "2px", fontSize: 17, fontWeight: 600 }}>{place}</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", mt: 1.5, py: 1.25, borderRadius: "10px", bgcolor: "rgba(0,0,0,.2)" }}>
        {stats.map((s, i) => (
          <Box key={s.label} sx={{ textAlign: "center", boxShadow: i ? "-1px 0 0 rgba(255,255,255,.15)" : "none" }}>
            <Box component="b" sx={{ display: "block", fontSize: 20, fontWeight: 600, color: t.number }}>
              {s.value}
            </Box>
            <Box component="small" sx={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>
              {s.label}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 1.5 }}>
        <PersonAvatar name={person.name} size={36} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>{person.name}</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{person.caption}</Typography>
        </Box>
        <ContactActions name={person.name} tone="dark" />
      </Box>
    </Box>
  );
}

import Box from "@mui/material/Box";
import { colors } from "@/theme";

/** Shown when a list has nothing to display. */
export default function EmptyState({ title, message }: { title: string; message?: string }) {
  return (
    <Box sx={{ py: 6, px: 2.5, textAlign: "center", color: colors.mute }}>
      <Box component="b" sx={{ display: "block", mb: 0.5, fontSize: 15, color: colors.ink }}>
        {title}
      </Box>
      {message}
    </Box>
  );
}

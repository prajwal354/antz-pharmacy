import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { colors } from "@/theme";

type OptionButtonProps = {
  /** Highlighted in green when true. */
  selected: boolean;
  onClick: () => void;
  /** Left side: a name, or an avatar + name. */
  children: ReactNode;
  /** Right side: small grey text, e.g. "Keeper". */
  hint?: string;
};

/**
 * A full-width row you click to choose something (a pharmacy, a person, an animal).
 * `aria-pressed` tells screen readers whether it's selected.
 */
export default function OptionButton({ selected, onClick, children, hint }: OptionButtonProps) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-pressed={selected}
      sx={{
        width: "100%",
        minHeight: 42,
        px: 1.5,
        py: 0.5,
        gap: 1.25,
        justifyContent: "space-between",
        borderRadius: "10px",
        fontSize: 13.5,
        textAlign: "left",
        "&:hover": { bgcolor: "#F5F8F6" },
        ...(selected && { bgcolor: colors.mint, color: colors.limeInk, fontWeight: 600, "&:hover": { bgcolor: colors.mint } }),
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{children}</Box>
      {hint && (
        <Box component="small" sx={{ fontSize: 12, fontWeight: 400, color: colors.mute }}>
          {hint}
        </Box>
      )}
    </ButtonBase>
  );
}

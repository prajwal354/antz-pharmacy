import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import { colors } from "@/theme";

type QuantityControlProps = {
  value: number;
  /** Can't go above this (e.g. what's in stock). */
  max: number;
  /** Called with the new number. 0 means "remove it" (only the − button can do that). */
  onChange: (value: number) => void;
  /** Used in labels for screen readers, e.g. "Less Ivermec". */
  label: string;
};

const buttonSx = {
  width: 28,
  height: 28,
  borderRadius: "8px",
  fontSize: 15,
  fontWeight: 700,
  color: colors.limeInk,
  "&:hover": { bgcolor: colors.limeSoft },
  "&.Mui-disabled": { color: colors.mute, opacity: 0.5 },
};

/** Small  [ − 3 + ]  counter. You can also click the number and type. */
export default function QuantityControl({ value, max, onChange, label }: QuantityControlProps) {
  /** Typed text → a number between 1 and max. Letters are ignored; empty becomes 1. */
  const handleTyping = (text: string) => {
    const typed = Number(text.replace(/\D/g, "")) || 1;
    onChange(Math.min(typed, max));
  };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "2px", borderRadius: "8px", bgcolor: colors.surfaceMuted }}>
      <ButtonBase aria-label={`Less ${label}`} onClick={() => onChange(value - 1)} sx={buttonSx}>
        −
      </ButtonBase>
      <InputBase
        value={value}
        onChange={(e) => handleTyping(e.target.value)}
        onFocus={(e) => e.target.select()} // select the number so typing replaces it
        inputProps={{ inputMode: "numeric", "aria-label": `Quantity of ${label}` }}
        sx={{
          // Grow with the number of digits: 1 → narrow, 120 → wider.
          width: `${Math.max(2, String(value).length) + 1}ch`,
          fontSize: 13,
          fontWeight: 700,
          "& input": { p: 0, textAlign: "center" },
        }}
      />
      <ButtonBase aria-label={`More ${label}`} onClick={() => onChange(value + 1)} disabled={value >= max} sx={buttonSx}>
        +
      </ButtonBase>
    </Box>
  );
}

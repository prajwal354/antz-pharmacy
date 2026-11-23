import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { colors } from "@/theme";

type QuantityControlProps = {
  value: number;
  /** Can't go above this (e.g. what's in stock). */
  max: number;
  /** Called with the new number. 0 means "remove it". */
  onChange: (value: number) => void;
  /** Used in the button labels for screen readers, e.g. "Less Ivermec". */
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

/** Small  [ − 3 + ]  counter. */
export default function QuantityControl({ value, max, onChange, label }: QuantityControlProps) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "2px", borderRadius: "8px", bgcolor: colors.surfaceMuted }}>
      <ButtonBase aria-label={`Less ${label}`} onClick={() => onChange(value - 1)} sx={buttonSx}>
        −
      </ButtonBase>
      <Box component="b" sx={{ minWidth: 22, textAlign: "center", fontSize: 13 }}>
        {value}
      </Box>
      <ButtonBase aria-label={`More ${label}`} onClick={() => onChange(value + 1)} disabled={value >= max} sx={buttonSx}>
        +
      </ButtonBase>
    </Box>
  );
}

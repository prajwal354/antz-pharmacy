import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { colors } from "@/theme";

type FormStepProps = {
  /** 1, 2, 3... shown in the little circle. */
  number: number;
  title: string;
  /** Grey text on the right, e.g. "Choose a pharmacy" or "2 added · 5 units". */
  summary: string;
  /** Step is complete → the circle turns green. */
  done: boolean;
  /** Step can't be used yet (an earlier step isn't finished) → faded out. */
  disabled?: boolean;
  /** If given, a "Change" link appears once the step is done. */
  onChange?: () => void;
  /** The step's content. Leave empty to show only the header (collapsed). */
  children?: ReactNode;
};

/** One numbered box in a step-by-step form:  (1) Dispense from ........ Hospital pharmacy */
export default function FormStep({ number, title, summary, done, disabled = false, onChange, children }: FormStepProps) {
  return (
    <Box
      sx={{
        borderRadius: "14px",
        boxShadow: `inset 0 0 0 1px ${colors.line}`,
        overflow: "hidden",
        ...(disabled && { opacity: 0.5, pointerEvents: "none" }),
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, p: "12px 14px", bgcolor: "#F4F9F6", fontSize: 13.5, fontWeight: 600 }}>
        <Box
          component="span"
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            fontSize: 11.5,
            fontWeight: 700,
            bgcolor: done ? colors.limeInk : "#DCE8E2",
            color: done ? "#fff" : colors.ink2,
          }}
        >
          {number}
        </Box>
        {title}
        <Box component="small" sx={{ ml: "auto", fontSize: 12, fontWeight: 500, color: colors.mute, textAlign: "right" }}>
          {summary}
        </Box>
        {done && onChange && (
          <ButtonBase onClick={onChange} sx={{ fontSize: 12, fontWeight: 600, color: colors.limeInk, borderRadius: "6px", px: 0.5 }}>
            Change
          </ButtonBase>
        )}
      </Box>

      {/* Content */}
      {children && <Box sx={{ p: "10px 14px 14px" }}>{children}</Box>}
    </Box>
  );
}

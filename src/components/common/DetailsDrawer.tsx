"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CloseIcon } from "@/components/icons";
import { colors } from "@/theme";

type DetailsDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Small grey line above the title, e.g. "Medicine request · 10 Nov 2026". */
  subtitle?: string;
  title: ReactNode;
  /** Extra buttons next to the close button (e.g. Edit). */
  headerActions?: ReactNode;
  /** Buttons pinned to the bottom of the panel. */
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * Panel that slides in from the right to show the details of one item.
 * Built on MUI <Drawer>, which handles the dark backdrop, closing on Esc / outside click,
 * and keeping keyboard focus inside the panel.
 */
export default function DetailsDrawer({ open, onClose, subtitle, title, headerActions, footer, children }: DetailsDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(8,24,18,.35)" } },
        paper: {
          sx: {
            top: 14,
            right: 14,
            height: "calc(100% - 28px)",
            width: "min(460px, calc(100vw - 28px))",
            borderRadius: "20px",
            boxShadow: "0 30px 70px -20px rgba(0,30,15,.5)",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, p: "20px 20px 14px" }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {subtitle && <Typography sx={{ fontSize: 12.5, color: colors.mute }}>{subtitle}</Typography>}
          <Typography component="div" sx={{ mt: "2px", fontSize: 20, fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        {headerActions}
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: colors.surfaceMuted, "&:hover": { bgcolor: colors.limeSoft } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scrolling content */}
      <Box sx={{ flex: 1, overflowY: "auto", pb: 1.5 }}>{children}</Box>

      {/* Footer buttons */}
      {footer && (
        <Box sx={{ display: "flex", gap: 1, p: "14px 20px", borderTop: `1px solid ${colors.line2}`, "& > *": { flex: 1, height: 42 } }}>
          {footer}
        </Box>
      )}
    </Drawer>
  );
}

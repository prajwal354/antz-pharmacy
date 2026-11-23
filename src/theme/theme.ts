"use client";

/**
 * MUI THEME — tells every MUI component (Button, Avatar, Select...) to use our colours,
 * font and corner radius, so you don't have to style each one by hand.
 */

import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const theme = createTheme({
  cssVariables: true,

  palette: {
    primary: { main: colors.limeInk, dark: colors.deep, light: colors.limeSoft, contrastText: colors.white },
    secondary: { main: colors.navy },
    error: { main: colors.red },
    warning: { main: colors.gold },
    info: { main: colors.sky },
    success: { main: colors.green },
    background: { default: colors.bg, paper: colors.surface },
    text: { primary: colors.ink, secondary: colors.ink2, disabled: colors.mute },
    divider: colors.line2,
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontSize: 14,
    h1: { fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" },
    h2: { fontSize: 15, fontWeight: 600 },
    body1: { fontSize: 14 },
    body2: { fontSize: 13.5 },
    caption: { fontSize: 12.5, color: colors.mute },
    overline: { fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.4 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  // Default look for individual MUI components
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, height: 38, paddingInline: 14 } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: 14, marginTop: 8, boxShadow: "0 30px 60px -24px rgba(0,40,20,.45), 0 0 0 1px #EDF2EF" },
      },
    },
    MuiMenuItem: {
      styleOverrides: { root: { borderRadius: 8, marginInline: 6, fontSize: 13.5 } },
    },
  },
});

export default theme;

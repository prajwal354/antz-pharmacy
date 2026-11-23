import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { colors } from "@/theme";

type AppShellProps = {
  header: ReactNode;
  rail: ReactNode;
  children: ReactNode;
};

/**
 * The page frame used by every module:
 *
 *   ┌──────────── header ────────────┐
 *   │ rail │        main             │
 *   └──────┴─────────────────────────┘
 */
export default function AppShell({ header, rail, children }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 1, md: "18px" },
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gridTemplateRows: "auto 1fr",
        rowGap: "14px",
        bgcolor: colors.bg,
      }}
    >
      {header}
      {rail}
      <Box
        component="main"
        sx={{ gridColumn: { xs: "1 / -1", md: "auto" }, minWidth: 0, p: { xs: 2, md: "22px 24px 28px" }, borderRadius: "22px", bgcolor: colors.canvas }}
      >
        {children}
      </Box>
    </Box>
  );
}

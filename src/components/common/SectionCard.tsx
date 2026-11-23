"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme";

type SectionCardProps = {
  title: string;
  /** Adds a "View all" link in the top-right corner. */
  viewAllHref?: string;
  children: ReactNode;
};

/** White rounded card with a title row — used for the blocks on the overview page. */
export default function SectionCard({ title, viewAllHref, children }: SectionCardProps) {
  return (
    <Box sx={{ p: 2, borderRadius: "18px", bgcolor: colors.surface, minWidth: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="h2">{title}</Typography>
        {viewAllHref && (
          <Link
            component={NextLink}
            href={viewAllHref}
            underline="none"
            sx={{ fontSize: 13, fontWeight: 500, color: colors.mute, "&:hover": { color: colors.ink } }}
          >
            View all
          </Link>
        )}
      </Box>
      {children}
    </Box>
  );
}

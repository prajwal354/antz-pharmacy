"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Pagination from "@mui/material/Pagination";
import { ChevronRightIcon } from "@/components/icons";
import { colors } from "@/theme";

/**
 * DATA LIST — the table-like list used on Requests and Dispense.
 * It is built with CSS grid (not <table>) so each row can be a rounded, clickable card.
 *
 * All three parts take the same `columns` value (a CSS grid-template-columns string),
 * so headers and rows always line up:
 *
 *   const COLS = "44px 1.5fr 1.2fr 150px 20px";
 *   <DataListHeader columns={COLS} labels={["", "Request", ...]} />
 *   <DataListRow columns={COLS}>...</DataListRow>
 */

/* On small screens, cells marked hideOnMobile are hidden and rows become: icon | text | status | arrow */
const MOBILE_COLUMNS = "44px minmax(0, 1fr) auto 20px";

export function DataListHeader({ columns, labels }: { columns: string; labels: string[] }) {
  return (
    <Box
      sx={{
        display: { xs: "none", lg: "grid" },
        gridTemplateColumns: columns,
        gap: 2,
        alignItems: "center",
        height: 40,
        px: 1.5,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: ".04em",
        textTransform: "uppercase",
        color: colors.mute,
      }}
    >
      {labels.map((label, i) => (
        <span key={i}>{label}</span>
      ))}
    </Box>
  );
}

type DataListRowProps = {
  columns: string;
  onClick?: () => void;
  children: ReactNode;
};

export function DataListRow({ columns, onClick, children }: DataListRowProps) {
  return (
    <ButtonBase
      component="div"
      onClick={onClick}
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: { xs: MOBILE_COLUMNS, lg: columns },
        alignItems: "center",
        justifyItems: "start",
        gap: 2,
        p: 1.5,
        borderRadius: "12px",
        textAlign: "left",
        transition: "background .15s",
        "& + &": { boxShadow: `0 -1px 0 ${colors.line2}` },
        "&:hover": { bgcolor: "#F5F8FA" },
        "&:hover .row-arrow": { color: colors.limeInk },
        "& .hide-mobile": { display: { xs: "none", lg: "block" } },
      }}
    >
      {children}
      <ChevronRightIcon className="row-arrow" sx={{ color: "#B3C0BA", justifySelf: "end" }} />
    </ButtonBase>
  );
}

type DataListFooterProps = {
  showing: number;
  total: number;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function DataListFooter({ showing, total, page, pageCount, onPageChange }: DataListFooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.25,
        pt: 1.5,
        pb: 2,
        fontSize: 12.5,
        color: colors.mute,
        borderTop: `1px solid ${colors.line2}`,
      }}
    >
      <span>
        Showing {showing} of {total.toLocaleString("en-IN")}
      </span>
      <Pagination
        page={page}
        count={pageCount}
        onChange={(_, p) => onPageChange(p)}
        shape="rounded"
        size="small"
        sx={{
          "& .MuiPaginationItem-root": { fontWeight: 600, color: colors.ink2, borderRadius: "8px", minWidth: 32, height: 32 },
          "& .Mui-selected": { bgcolor: `${colors.limeInk} !important`, color: "#fff" },
        }}
      />
    </Box>
  );
}

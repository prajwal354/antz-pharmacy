"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { CornerArrow } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import { gradients } from "@/theme";
import { formatINR, formatNumber } from "@/utils/format";

type OverviewHeroProps = { requests: number; value: number };

/** The big dark-blue card at the top of the overview. */
export default function OverviewHero({ requests, value }: OverviewHeroProps) {
  return (
    <ButtonBase
      component={NextLink}
      href={ROUTES.pharmacy.requests}
      sx={{
        gridColumn: { xs: "span 12", lg: "span 8" },
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 2.25,
        minHeight: 236,
        p: "22px 24px",
        borderRadius: "18px",
        color: "#fff",
        background: gradients.hero,
        transition: "box-shadow .3s",
        "&:hover": { boxShadow: "0 26px 44px -26px rgba(10,30,50,.8)" },
        // decorative rings in the bottom-right corner
        "&::after": {
          content: '""',
          position: "absolute",
          right: -40,
          bottom: -60,
          zIndex: -1,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "repeating-radial-gradient(circle, rgba(255,255,255,0) 0 18px, rgba(255,255,255,.05) 18px 19px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="small"
          sx={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}
        >
          <Box
            component="i"
            sx={{
              display: "inline-block",
              width: 7,
              height: 7,
              mr: 1,
              borderRadius: "50%",
              bgcolor: "#7FE3E3",
              boxShadow: "0 0 0 4px rgba(127,227,227,.22)",
              verticalAlign: "1px",
            }}
          />
          Pharmacy · all time · all pharmacies
        </Box>
        <CornerArrow light />
      </Box>

      <Box sx={{ textAlign: "left" }}>
        <Box
          component="b"
          sx={{ display: "block", fontSize: 72, fontWeight: 600, letterSpacing: "-.045em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}
        >
          {formatNumber(requests)}
        </Box>
        <Box component="small" sx={{ display: "block", mt: 1, fontSize: 14, color: "rgba(255,255,255,.72)" }}>
          medicine requests · {formatINR(value)} requested
        </Box>
      </Box>
    </ButtonBase>
  );
}

"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { CornerArrow, IconTile, InfoTag } from "@/components/common";
import { colors, gradients, shadows } from "@/theme";

/** Visual styles of the overview cards. Add a new one here to use it everywhere. */
const VARIANTS = {
  plain: { background: colors.surface, text: colors.ink, sub: colors.mute, number: colors.ink, dark: false },
  coral: { background: gradients.coral, text: colors.ink, sub: "rgba(14,21,18,.62)", number: "#B8341A", dark: false },
  mint: { background: gradients.mint, text: colors.ink, sub: "rgba(14,21,18,.62)", number: colors.ink, dark: false },
  navy: { background: gradients.navy, text: "#fff", sub: "rgba(255,255,255,.8)", number: "#fff", dark: true },
};

type StatWidgetProps = {
  title: string;
  value: number;
  label: string;
  icon: ReactNode;
  iconColor: string;
  href: string;
  variant?: keyof typeof VARIANTS;
  /** Small pill at the bottom, e.g. { label: "5 urgent", tone: "warn" } */
  tag?: { label: string; tone?: "neutral" | "warn" | "glass" };
};

/** A clickable overview card: icon + title, big number, label, optional tag. */
export default function StatWidget({ title, value, label, icon, iconColor, href, variant = "plain", tag }: StatWidgetProps) {
  const v = VARIANTS[variant];
  const onGradient = variant !== "plain";

  return (
    <ButtonBase
      component={NextLink}
      href={href}
      sx={{
        gridColumn: { xs: "span 12", sm: "span 6", lg: "span 4" },
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 2.25,
        minHeight: 196,
        p: 2.25,
        borderRadius: "18px",
        textAlign: "left",
        color: v.text,
        background: v.background,
        boxShadow: shadows.card,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconTile icon={icon} color={iconColor} variant={v.dark ? "glass" : onGradient ? "white" : "tint"} />
        <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{title}</Typography>
        <CornerArrow light={v.dark} />
      </Box>

      <Box>
        <Box
          component="b"
          sx={{ display: "block", fontSize: 44, fontWeight: 400, letterSpacing: "-.045em", lineHeight: 1, color: v.number }}
        >
          {value}
        </Box>
        <Box component="small" sx={{ display: "block", mt: 1, fontSize: 13.5, color: v.sub }}>
          {label}
        </Box>
      </Box>

      {/* Keep the space even with no tag, so cards in a row line up */}
      {tag ? <InfoTag label={tag.label} tone={tag.tone ?? (onGradient ? "glass" : "neutral")} /> : <Box sx={{ height: 28 }} />}
    </ButtonBase>
  );
}

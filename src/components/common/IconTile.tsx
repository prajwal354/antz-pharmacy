import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { tint } from "@/theme";

type IconTileProps = {
  icon: ReactNode;
  /** Icon colour. */
  color: string;
  /** Tile size in px. */
  size?: number;
  /** Background: pale tint of the colour (default), solid colour, or see-through white for dark cards. */
  variant?: "tint" | "solid" | "glass" | "white";
};

/** Rounded square holding an icon — used in menus, cards and list rows. */
export default function IconTile({ icon, color, size = 38, variant = "tint" }: IconTileProps) {
  const background = {
    tint: { bgcolor: tint(color), color },
    solid: { bgcolor: color, color: "#fff" },
    glass: { bgcolor: "rgba(255,255,255,.22)", color: "#fff", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.3)" },
    white: { bgcolor: "rgba(255,255,255,.6)", color },
  }[variant];

  return (
    <Box
      component="span"
      sx={{
        width: size,
        height: size,
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: `${Math.round(size * 0.29)}px`,
        ...background,
      }}
    >
      {icon}
    </Box>
  );
}

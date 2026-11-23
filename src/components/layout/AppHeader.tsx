"use client";

import { useState, type ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { BackIcon, BellIcon, ChevronDownIcon, HomeIcon } from "@/components/icons";
import { IconTile } from "@/components/common";
import { MODULE_GROUPS } from "@/constants/modules";
import { ROUTES } from "@/constants/routes";
import { colors, shadows } from "@/theme";

type AppHeaderProps = {
  /** Current module name, e.g. "Pharmacy". */
  moduleName: string;
  /** Path to the module's icon image in /public. */
  moduleIconSrc: string;
  moduleColor: string;
  /** Module-specific controls shown on the right (pharmacy picker, period...). */
  filters?: ReactNode;
};

/** The white bar at the top: logo, back, module switcher, filters, notifications, profile. */
export default function AppHeader({ moduleName, moduleIconSrc, moduleColor, filters }: AppHeaderProps) {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box
      component="header"
      sx={{
        gridColumn: "1 / -1",
        display: "flex",
        alignItems: "center",
        gap: 1.75,
        px: 2,
        py: 1.5,
        borderRadius: "22px",
        bgcolor: colors.surface,
        boxShadow: shadows.header,
      }}
    >
      {/* Brand */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "center", gap: "5px", px: 0.75 }}>
        <Box
          sx={{
            width: 128,
            height: 21,
            background: "linear-gradient(90deg,#CDAE62,#B48D45 45%,#977030)",
            mask: "url(/assets/images/vantara-wordmark.png) center/contain no-repeat",
          }}
        />
        <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: "#977030" }}>Every Life Matters</Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ my: 1, display: { xs: "none", md: "block" } }} />

      {/* Back */}
      <IconButton
        aria-label="Back"
        onClick={() => router.back()}
        sx={{ width: 40, height: 40, borderRadius: "12px", bgcolor: colors.surfaceMuted, color: colors.ink2 }}
      >
        <BackIcon />
      </IconButton>

      {/* Module switcher */}
      <ButtonBase
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        aria-haspopup="true"
        aria-expanded={Boolean(menuAnchor)}
        sx={{
          gap: 1.25,
          height: 44,
          pl: "5px",
          pr: 1.5,
          borderRadius: "12px",
          boxShadow: "inset 0 0 0 1px #E3EAE6",
          "&:hover": { bgcolor: colors.surfaceHover },
        }}
      >
        <IconTile
          variant="solid"
          color={moduleColor}
          size={34}
          icon={<Box component="img" src={moduleIconSrc} alt="" sx={{ width: 22, height: 22, filter: "brightness(0) invert(1)" }} />}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{moduleName}</Typography>
        <ChevronDownIcon
          sx={{ fontSize: 16, color: colors.mute, transition: "transform .3s", transform: menuAnchor ? "rotate(180deg)" : "none" }}
        />
      </ButtonBase>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        slotProps={{ paper: { sx: { width: 420, p: 1.25 } } }}
      >
        <ButtonBase
          component={NextLink}
          href={ROUTES.home}
          sx={{ width: "100%", justifyContent: "flex-start", gap: 1.5, p: 1.25, borderRadius: "12px", bgcolor: colors.mint }}
        >
          <IconTile variant="solid" color={colors.limeInk} size={36} icon={<HomeIcon />} />
          <Box sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Home</Typography>
            <Typography variant="caption">Back to your board</Typography>
          </Box>
        </ButtonBase>
        {MODULE_GROUPS.map((group) => (
          <Box key={group.title}>
            <Typography variant="overline" component="div" sx={{ m: "12px 6px 6px", color: colors.mute, fontWeight: 700 }}>
              {group.title}
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2px" }}>
              {group.modules.map((m) => {
                const isCurrent = m.name === moduleName;
                return (
                  <ButtonBase
                    key={m.name}
                    disabled={!m.href}
                    onClick={() => {
                      setMenuAnchor(null);
                      if (m.href) router.push(m.href);
                    }}
                    sx={{
                      flexDirection: "column",
                      gap: 0.75,
                      py: 1.25,
                      px: 0.5,
                      borderRadius: "12px",
                      fontSize: 12,
                      fontWeight: 500,
                      opacity: m.href ? 1 : 0.5,
                      bgcolor: isCurrent ? "#FFF6E0" : "transparent",
                      "&:hover": { bgcolor: colors.mint },
                    }}
                  >
                    <IconTile variant="solid" color={m.color} size={38} icon={m.name[0]} />
                    {m.name}
                  </ButtonBase>
                );
              })}
            </Box>
          </Box>
        ))}
      </Menu>

      {/* Right side */}
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1.75 }}>
        {filters}
        <IconButton
          aria-label="Notifications"
          sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: colors.surfaceMuted, color: colors.ink2 }}
        >
          <Badge variant="dot" overlap="circular" sx={{ "& .MuiBadge-badge": { bgcolor: colors.coral } }}>
            <BellIcon />
          </Badge>
        </IconButton>
        <Avatar src="/assets/images/avatar.png" alt="Profile" sx={{ width: 42, height: 42, bgcolor: "#E6E2FA" }} />
      </Box>
    </Box>
  );
}

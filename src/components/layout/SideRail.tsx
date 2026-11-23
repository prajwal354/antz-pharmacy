"use client";

import { useState, type ReactNode } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { ChevronRightIcon, SidebarIcon } from "@/components/icons";
import { colors, tint } from "@/theme";

/* ── Types: the menu is described as data (see features/pharmacy/constants/navigation.tsx) ── */

export type NavChild = { label: string; href?: string };

export type NavItem = {
  label: string;
  icon: ReactNode;
  /** Colour of the icon tile. */
  color: string;
  /** Leave empty for pages that aren't built yet — clicking shows "coming soon". */
  href?: string;
  count?: number;
  children?: NavChild[];
  /** true = children hidden until clicked (like "Reports"). false = always shown. */
  collapsible?: boolean;
};

export type NavSection = { title: string; items: NavItem[] };

export type NavHome = { label: string; subtitle: string; href: string; icon: ReactNode; color: string };

type SideRailProps = { home: NavHome; sections: NavSection[] };

/** Left menu inside a module. Reads the current URL to highlight the active page. */
export default function SideRail({ home, sections }: SideRailProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  const isActive = (href?: string) => href === pathname;
  const homeActive = isActive(home.href);

  return (
    <Box
      component="aside"
      aria-label="Module pages"
      sx={{
        position: "sticky",
        top: 18,
        alignSelf: "start",
        width: collapsed ? 76 : 236,
        transition: "width .3s",
        mr: 1.75,
        px: 1.25,
        py: 1.75,
        borderRadius: "22px",
        bgcolor: colors.surface,
        display: { xs: "none", md: "block" },
      }}
    >
      {/* Collapse toggle */}
      <ButtonBase
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        sx={{ width: "100%", height: 34, mb: 1, justifyContent: collapsed ? "center" : "flex-end", px: 1, borderRadius: "10px", color: colors.mute }}
      >
        <SidebarIcon sx={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
      </ButtonBase>

      {/* Module home */}
      <ButtonBase
        component={NextLink}
        href={home.href}
        title={home.label}
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          gap: 1.25,
          p: 1.25,
          mb: 1.25,
          borderRadius: "12px",
          bgcolor: colors.mint,
          boxShadow: homeActive ? `inset 0 0 0 2px ${tint(home.color, 30)}` : "none",
        }}
      >
        <Box sx={{ width: 34, height: 34, flex: "none", borderRadius: "10px", display: "grid", placeItems: "center", bgcolor: home.color, color: "#fff" }}>
          {home.icon}
        </Box>
        {!collapsed && (
          <Box sx={{ textAlign: "left", minWidth: 0 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{home.label}</Typography>
            <Typography sx={{ fontSize: 12, color: colors.limeInk }}>{home.subtitle}</Typography>
          </Box>
        )}
      </ButtonBase>

      {sections.map((section) => (
        <Box key={section.title} sx={{ mb: 1 }}>
          {!collapsed && (
            <Typography variant="overline" component="div" sx={{ mx: 1.25, my: 0.75, fontWeight: 700, color: colors.mute }}>
              {section.title}
            </Typography>
          )}

          <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {section.items.map((item) => {
              const active = isActive(item.href) || item.children?.some((c) => isActive(c.href));
              const open = item.collapsible ? openItems[item.label] : true;
              const showChildren = !collapsed && item.children && open;

              const handleClick = () => {
                if (item.collapsible) setOpenItems((s) => ({ ...s, [item.label]: !s[item.label] }));
                else if (!item.href) setToast(`${item.label} — coming soon`);
              };

              return (
                <Box key={item.label}>
                  <ButtonBase
                    {...(item.href && !item.collapsible ? { component: NextLink, href: item.href } : { onClick: handleClick })}
                    title={item.label}
                    sx={{
                      width: "100%",
                      justifyContent: collapsed ? "center" : "flex-start",
                      gap: 1.25,
                      height: 40,
                      px: 1.25,
                      borderRadius: "10px",
                      fontSize: 13.5,
                      fontWeight: active ? 600 : 500,
                      color: active ? colors.ink : colors.ink2,
                      bgcolor: active ? colors.mint : "transparent",
                      "&:hover": { bgcolor: active ? colors.mint : "#F5F8F6", color: colors.ink },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ width: 28, height: 28, flex: "none", borderRadius: "8px", display: "grid", placeItems: "center", color: item.color, bgcolor: tint(item.color) }}
                    >
                      {item.icon}
                    </Box>
                    {!collapsed && (
                      <>
                        <Box component="span" sx={{ flex: 1, textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.label}
                        </Box>
                        {item.count !== undefined && (
                          <Box component="span" sx={{ fontSize: 12, fontWeight: 600, color: active ? colors.limeInk : colors.mute }}>
                            {item.count}
                          </Box>
                        )}
                        {item.collapsible && (
                          <ChevronRightIcon sx={{ fontSize: 16, color: colors.mute, transition: "transform .2s", transform: open ? "rotate(90deg)" : "none" }} />
                        )}
                      </>
                    )}
                  </ButtonBase>

                  {showChildren && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1px", m: "2px 0 6px 48px" }}>
                      {item.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <ButtonBase
                            key={child.label}
                            {...(child.href ? { component: NextLink, href: child.href } : { onClick: () => setToast(`${child.label} — coming soon`) })}
                            sx={{
                              position: "relative",
                              justifyContent: "flex-start",
                              height: 32,
                              px: 1.25,
                              borderRadius: "8px",
                              fontSize: 13,
                              fontWeight: childActive ? 600 : 500,
                              color: childActive ? colors.ink : colors.mute,
                              "&:hover": { bgcolor: "#F5F8F6", color: colors.ink },
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                left: -12,
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                bgcolor: childActive ? colors.limeInk : "#C3CEC8",
                              },
                            }}
                          >
                            {child.label}
                          </ButtonBase>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}

      <Snackbar
        open={Boolean(toast)}
        message={toast}
        autoHideDuration={1800}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}

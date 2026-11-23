/**
 * PHARMACY MENU — what appears in the left side menu.
 * To add a page: add an item here with an `href` from ROUTES. No need to touch SideRail.
 */
import type { NavHome, NavSection } from "@/components/layout";
import {
  AdjustIcon,
  DispenseIcon,
  GridIcon,
  IncomingIcon,
  LocationIcon,
  OutgoingIcon,
  RackIcon,
  ReportIcon,
  RequestIcon,
  ReturnIcon,
  SettingsIcon,
  StockIcon,
} from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { colors } from "@/theme";
import { TOTALS } from "../data/mockData";

const ICON = { fontSize: 16 };

export const PHARMACY_HOME: NavHome = {
  label: "Pharmacy overview",
  subtitle: "Module home",
  href: ROUTES.pharmacy.overview,
  icon: <GridIcon />,
  color: colors.navy,
};

export const PHARMACY_NAV: NavSection[] = [
  {
    title: "Daily work",
    items: [
      {
        label: "Requests",
        icon: <RequestIcon sx={ICON} />,
        color: colors.navy,
        href: ROUTES.pharmacy.requests,
        count: TOTALS.requests,
        children: [{ label: "All requests", href: ROUTES.pharmacy.requests }, { label: "By product" }, { label: "New product requests" }],
      },
      { label: "Dispense", icon: <DispenseIcon sx={ICON} />, color: colors.green, href: ROUTES.pharmacy.dispense, count: TOTALS.dispensed },
      { label: "Returns", icon: <ReturnIcon sx={ICON} />, color: colors.red },
    ],
  },
  {
    title: "Shipments",
    items: [
      { label: "Incoming", icon: <IncomingIcon sx={ICON} />, color: colors.sky },
      { label: "Outgoing", icon: <OutgoingIcon sx={ICON} />, color: colors.navy },
      { label: "Direct dispatch (local)", icon: <LocationIcon sx={ICON} />, color: colors.green },
    ],
  },
  {
    title: "Stock",
    items: [
      { label: "Stock report", icon: <StockIcon sx={ICON} />, color: colors.teal },
      { label: "Stock adjustment", icon: <AdjustIcon sx={ICON} />, color: colors.amber },
      { label: "Racks & shelves", icon: <RackIcon sx={ICON} />, color: colors.slate },
    ],
  },
  {
    title: "Reports & setup",
    items: [
      {
        label: "Reports",
        icon: <ReportIcon sx={ICON} />,
        color: colors.purple,
        collapsible: true,
        children: [{ label: "Consumption" }, { label: "Dispense" }, { label: "Dispatch" }, { label: "Return" }, { label: "Reconciliation" }],
      },
      { label: "Master lists", icon: <SettingsIcon sx={ICON} />, color: colors.slate },
    ],
  },
];

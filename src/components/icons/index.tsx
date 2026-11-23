/**
 * ICONS — every icon used in the app, in one place.
 *
 * They are copied from the design (line icons, 24×24) and wrapped in MUI's
 * <SvgIcon>, so they work like any MUI icon:
 *
 *   import { SearchIcon } from "@/components/icons";
 *   <SearchIcon />                      // inherits text colour
 *   <SearchIcon sx={{ fontSize: 16 }} /> // change size
 *
 * To add a new icon: copy the <path> parts of the SVG and call lineIcon(...).
 */

import type { ReactNode } from "react";
import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

export type AppIcon = (props: SvgIconProps) => ReactNode;

function lineIcon(name: string, paths: ReactNode): AppIcon {
  function Icon({ sx, ...props }: SvgIconProps) {
    return (
      <SvgIcon
        viewBox="0 0 24 24"
        {...props}
        sx={[
          {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.9,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fontSize: 18,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {paths}
      </SvgIcon>
    );
  }
  Icon.displayName = name;
  return Icon;
}

/* ── Navigation & general ── */
export const BackIcon = lineIcon("BackIcon", <path d="M19 12H5M11 6l-6 6 6 6" />);
export const ChevronDownIcon = lineIcon("ChevronDownIcon", <path d="m6 9 6 6 6-6" />);
export const ChevronRightIcon = lineIcon("ChevronRightIcon", <path d="m9 18 6-6-6-6" />);
export const ArrowUpRightIcon = lineIcon("ArrowUpRightIcon", <path d="M7 17 17 7M9 7h8v8" />);
export const ArrowRightIcon = lineIcon("ArrowRightIcon", <path d="M5 12h14M13 6l6 6-6 6" />);
export const PlusIcon = lineIcon("PlusIcon", <path d="M12 5v14M5 12h14" />);
export const CloseIcon = lineIcon("CloseIcon", <path d="M6 6l12 12M18 6 6 18" />);
export const SearchIcon = lineIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);
export const HomeIcon = lineIcon("HomeIcon", <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />);
export const GridIcon = lineIcon(
  "GridIcon",
  <>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </>,
);
export const SidebarIcon = lineIcon(
  "SidebarIcon",
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="3" />
    <path d="M9.5 4v16M15 10l-2 2 2 2" />
  </>,
);
export const BellIcon = lineIcon("BellIcon", <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />);
export const CalendarIcon = lineIcon(
  "CalendarIcon",
  <>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </>,
);
export const MedicalCrossIcon = lineIcon("MedicalCrossIcon", <path d="M10 3h4v5h5v4h-5v5h-4v-5H5V8h5z" />);
export const CallIcon = lineIcon(
  "CallIcon",
  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
);
export const ChatIcon = lineIcon(
  "ChatIcon",
  <>
    <path d="M4 5h16v11H8l-4 4z" />
    <path d="M8 9h8M8 12h5" />
  </>,
);

/* ── Pharmacy ── */
export const RequestIcon = lineIcon(
  "RequestIcon",
  <>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </>,
);
export const DispenseIcon = lineIcon(
  "DispenseIcon",
  <>
    <rect x="3" y="7" width="12" height="13" rx="2" />
    <path d="M5 4h8M9 10v7M5.5 13.5h7M17 13h5M19.5 10.5 22 13l-2.5 2.5" />
  </>,
);
export const ReturnIcon = lineIcon(
  "ReturnIcon",
  <>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </>,
);
export const VialIcon = lineIcon(
  "VialIcon",
  <>
    <path d="M9 3h6M10 3v4l-3 4v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8l-3-4V3" />
    <path d="M7 14h10" />
  </>,
);
export const FireIcon = lineIcon("FireIcon", <path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z" />);
export const WarningIcon = lineIcon(
  "WarningIcon",
  <>
    <path d="M12 3 2 20h20z" />
    <path d="M12 10v4M12 17h.01" />
  </>,
);
export const TruckIcon = lineIcon(
  "TruckIcon",
  <>
    <path d="M3 16V7h11v9M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </>,
);
export const IncomingIcon = lineIcon(
  "IncomingIcon",
  <>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M8 3v5M6 6l2 2 2-2" />
  </>,
);
export const OutgoingIcon = lineIcon(
  "OutgoingIcon",
  <>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M8 8V3M6 5l2-2 2 2" />
  </>,
);
export const LocationIcon = lineIcon(
  "LocationIcon",
  <>
    <path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </>,
);
export const StockIcon = lineIcon(
  "StockIcon",
  <>
    <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </>,
);
export const AdjustIcon = lineIcon(
  "AdjustIcon",
  <>
    <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
    <circle cx="15" cy="6" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </>,
);
export const RackIcon = lineIcon("RackIcon", <path d="M5 3v18M19 3v18M5 8h14M5 14h14M5 20h14" />);
export const ReportIcon = lineIcon(
  "ReportIcon",
  <>
    <path d="M8 4h8v3H8z" />
    <path d="M16 5h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2" />
    <path d="M9 17v-3M12 17v-6M15 17v-2" />
  </>,
);
export const SettingsIcon = lineIcon(
  "SettingsIcon",
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </>,
);
export const PawIcon = lineIcon(
  "PawIcon",
  <>
    <circle cx="6" cy="10" r="2" />
    <circle cx="10" cy="5.5" r="2" />
    <circle cx="14" cy="5.5" r="2" />
    <circle cx="18" cy="10" r="2" />
    <path d="M12 11c-3 0-5.5 4-5.5 6.5 0 2 2 2.5 3 2s1.5-.5 2.5-.5 1.5 0 2.5.5 3 0 3-2C17.5 15 15 11 12 11z" />
  </>,
);

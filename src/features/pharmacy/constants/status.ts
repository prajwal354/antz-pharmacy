import { colors } from "@/theme";
import type { RequestStatus } from "../types";

/** Colour for each request status chip. */
export const REQUEST_STATUS_COLORS: Record<RequestStatus, string> = {
  Requested: colors.amber,
  "Partly shipped": colors.sky,
  Shipped: colors.green,
  Disputed: colors.red,
  Cancelled: colors.grey,
};

/** Tabs on the Requests page. */
export type RequestTab = "pending" | "shipped" | "disputed" | "cancelled" | "all";

/** Tabs on the Dispense page. */
export type DispenseTab = "all" | "animals" | "none";

/** Options for the header's period dropdown. */
export const PERIODS = [
  { value: "all", label: "All time" },
  { value: "year", label: "This year" },
  { value: "30", label: "Last 30 days" },
  { value: "7", label: "Last 7 days" },
] as const;

/** "all" | "year" | "30" | "7" — worked out from the list above, so they never get out of sync. */
export type Period = (typeof PERIODS)[number]["value"];

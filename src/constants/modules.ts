/**
 * MODULES — every app module shown in the header's "switch module" menu.
 * Only modules with an `href` are built; the rest show as "coming soon".
 */
import { colors } from "@/theme";
import { ROUTES } from "./routes";

export type AppModule = { name: string; color: string; href?: string };
export type ModuleGroup = { title: string; modules: AppModule[] };

export const MODULE_GROUPS: ModuleGroup[] = [
  {
    title: "Animals & collections",
    modules: [
      { name: "Collections", color: colors.limeInk },
      { name: "Animals", color: colors.sky },
      { name: "Housing", color: colors.green },
      { name: "Mortality", color: colors.coral },
      { name: "Eggs", color: colors.gold },
    ],
  },
  {
    title: "Medical & care",
    modules: [
      { name: "Medical", color: colors.limeInk },
      { name: "Hospital", color: "#1E5257" },
      { name: "Pharmacy", color: colors.teal, href: ROUTES.pharmacy.overview },
      { name: "Lab", color: colors.gold },
      { name: "Diet", color: colors.coral },
    ],
  },
  {
    title: "Operations",
    modules: [
      { name: "Approvals", color: colors.teal },
      { name: "Reports", color: "#262732" },
      { name: "Security", color: colors.navy },
    ],
  },
];

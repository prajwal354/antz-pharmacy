/**
 * ROUTES — every page address in one place.
 * Use ROUTES.pharmacy.requests instead of typing "/moduls/pharmacy/requests",
 * so renaming a folder only means changing this file.
 */
export const ROUTES = {
  home: "/",
  pharmacy: {
    overview: "/moduls/pharmacy",
    requests: "/moduls/pharmacy/requests",
    dispense: "/moduls/pharmacy/dispense",
  },
} as const;

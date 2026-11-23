/**
 * COLOURS — the single source of truth for every colour in the app.
 *
 * Rule: never type a hex code (#...) inside a component.
 * Import from here instead:  import { colors } from "@/theme";
 * If the design changes a colour, you change it once, here.
 */

export const colors = {
  // Page backgrounds
  bg: "#DDEFE4", // outer page background (behind everything)
  canvas: "#EAF5EE", // main content area
  surface: "#FFFFFF", // cards, header, side menu
  surfaceMuted: "#F2F6F4", // search box, icon buttons, inactive tabs
  surfaceHover: "#F7FBF9", // row hover

  // Text
  ink: "#0E1512", // main text
  ink2: "#44544A", // secondary text
  mute: "#7A8684", // hints, labels, captions

  // Borders / dividers
  line: "#DAE7DF",
  line2: "#EDF2EF",

  // Brand greens
  lime: "#52F990",
  limeSoft: "#D9FBE6",
  limeInk: "#006D35", // primary brand colour (buttons, active states)
  deep: "#00512A", // primary hover
  mint: "#EEF7F1",

  // Accent colours
  coral: "#FA6140",
  coralSoft: "#FFEBE5",
  navy: "#1F415B",
  sky: "#00AFD6",
  gold: "#D9A21B",
  teal: "#00ABAB",
  green: "#0A8A47",
  red: "#D9432A",
  amber: "#C98A12",
  grey: "#7A8580",
  purple: "#6B4FA0",
  slate: "#4B5A53",
  darkOrange: "#C2410C",

  white: "#FFFFFF",
} as const;

/** Background gradients used by the overview cards. */
export const gradients = {
  hero:
    "radial-gradient(70% 120% at 100% 0%, rgba(0,171,171,.3), rgba(0,171,171,0) 60%), linear-gradient(125deg, #0F2638, #1F415B 55%, #234B66)",
  mint: "linear-gradient(130deg, #D2FAD8 0%, #A3F3AE 45%, #86F09A 100%)",
  coral: "linear-gradient(130deg, #FFE3D8 0%, #FFC4B0 50%, #FFA98F 100%)",
  navy: "linear-gradient(150deg, #2A5675, #1F415B 55%, #173550)",
  tealBar: "linear-gradient(90deg, #7FE3E3, #00ABAB)",
} as const;

/** Colours picked in turn for people's initials avatars. */
export const avatarColors = [colors.teal, colors.sky, colors.green, colors.navy, colors.gold];

/** Soft shadows. */
export const shadows = {
  card: "0 1px 2px rgba(0, 40, 20, .04)",
  header: "0 10px 26px -22px rgba(0, 40, 20, .35)",
  menu: "0 30px 60px -24px rgba(0, 40, 20, .45)",
} as const;

/**
 * Makes a light tinted background from any colour,
 * e.g. tint(colors.red) → a very pale red. Used for chips and icon tiles.
 */
export function tint(color: string, percent = 12) {
  return `color-mix(in srgb, ${color} ${percent}%, #fff)`;
}

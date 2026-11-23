import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { avatarColors } from "@/theme";
import { initials } from "@/utils/format";

type PersonAvatarProps = {
  name: string;
  /** Circle size in px. */
  size?: number;
  /** Show the name next to the circle. */
  showName?: boolean;
};

/** Coloured circle with a person's initials (and optionally their name). */
export default function PersonAvatar({ name, size = 30, showName = false }: PersonAvatarProps) {
  // Same name → same colour every time.
  const color = avatarColors[name.length % avatarColors.length];

  const avatar = (
    <Avatar sx={{ width: size, height: size, fontSize: size * 0.37, fontWeight: 600, bgcolor: color }}>
      {initials(name)}
    </Avatar>
  );

  if (!showName) return avatar;

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontSize: 13, fontWeight: 500 }}>
      {avatar}
      {name}
    </Box>
  );
}

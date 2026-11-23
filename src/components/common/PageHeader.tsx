import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme";
import { formatNumber } from "@/utils/format";

type PageHeaderProps = {
  title: string;
  /** Grey number after the title, e.g. "Requests 132". */
  count?: number;
  description?: string;
  /** Buttons on the right, e.g. "+ New request". */
  action?: ReactNode;
};

/** Page title row: big title + count + description, with actions on the right. */
export default function PageHeader({ title, count, description, action }: PageHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2.25 }}>
      <Box>
        <Typography variant="h1">
          {title}
          {count !== undefined && (
            <Box component="small" sx={{ ml: 1, fontSize: 15, fontWeight: 500, color: colors.mute }}>
              {formatNumber(count)}
            </Box>
          )}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ mt: 0.5, color: colors.mute }}>
            {description}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>{action}</Box>}
    </Box>
  );
}

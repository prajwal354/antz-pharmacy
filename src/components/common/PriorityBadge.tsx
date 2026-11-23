import Box from "@mui/material/Box";
import { FireIcon } from "@/components/icons";

export type Priority = "urgent" | "high" | null;

const STYLES = {
  urgent: { bg: "#FDE3E6", color: "#D92D45" },
  high: { bg: "#FFE5DD", color: "#D9432A" },
};

/** "🔥 Urgent" or "!!! High" badge shown next to a request ID. Renders nothing for normal priority. */
export default function PriorityBadge({ priority }: { priority: Priority }) {
  if (!priority) return null;
  const style = STYLES[priority];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        height: 22,
        px: "7px",
        ml: "6px",
        borderRadius: "6px",
        fontSize: 11.5,
        fontWeight: 700,
        verticalAlign: "2px",
        bgcolor: style.bg,
        color: style.color,
      }}
    >
      {priority === "urgent" ? (
        <>
          <FireIcon sx={{ fontSize: 12 }} />
          Urgent
        </>
      ) : (
        "!!! High"
      )}
    </Box>
  );
}

"use client";

import IconButton from "@mui/material/IconButton";
import { CallIcon, ChatIcon } from "@/components/icons";

type ContactActionsProps = {
  name: string;
  /** "dark" for use on coloured cards, "light" on pale backgrounds. */
  tone?: "dark" | "light";
};

/** Call + Message buttons for a person. (They don't dial or chat yet — wire them up later.) */
export default function ContactActions({ name, tone = "light" }: ContactActionsProps) {
  const sx =
    tone === "dark"
      ? { bgcolor: "rgba(0,0,0,.28)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,.4)" } }
      : { bgcolor: "#CDF3EF", color: "#0A7C7C", "&:hover": { bgcolor: "#B8EBE5" } };

  const button = { width: 34, height: 34, borderRadius: "8px", ...sx };

  return (
    <>
      <IconButton aria-label={`Call ${name}`} sx={button}>
        <CallIcon sx={{ fontSize: 17 }} />
      </IconButton>
      <IconButton aria-label={`Message ${name}`} sx={button}>
        <ChatIcon sx={{ fontSize: 17 }} />
      </IconButton>
    </>
  );
}

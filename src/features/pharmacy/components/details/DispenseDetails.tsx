"use client";

import type { ReactNode } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ContactActions, DetailsDrawer, IconTile, PersonAvatar } from "@/components/common";
import { PawIcon } from "@/components/icons";
import { colors } from "@/theme";
import { formatDate } from "@/utils/format";
import type { Dispense } from "../../types";
import { totalQuantity } from "../../utils";
import MedicineItem from "./MedicineItem";
import SummaryCard from "./SummaryCard";

type DispenseDetailsProps = {
  /** The dispense to show (stays set while the panel slides closed). */
  dispense: Dispense | null;
  open: boolean;
  onClose: () => void;
};

/** Side panel with everything about one dispense. */
export default function DispenseDetails({ dispense, open, onClose }: DispenseDetailsProps) {
  return (
    <DetailsDrawer
      open={open && Boolean(dispense)}
      onClose={onClose}
      subtitle={dispense ? `Dispense · ${formatDate(dispense.date, true)}` : undefined}
      title={dispense?.id}
      footer={
        <>
          <Button variant="outlined" color="inherit" sx={{ borderColor: colors.line }}>
            Print slip
          </Button>
          <Button variant="contained">Dispense again</Button>
        </>
      }
    >
      {dispense && <DispenseBody dispense={dispense} />}
    </DetailsDrawer>
  );
}

/** Pale rounded row used for "Dispensed to" and "Dispensed for". */
function InfoRow({ children, bgcolor = "#EFFAF3" }: { children: ReactNode; bgcolor?: string }) {
  return <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mx: 2.5, mt: 1.5, p: 1.5, borderRadius: "12px", bgcolor }}>{children}</Box>;
}

function DispenseBody({ dispense: d }: { dispense: Dispense }) {
  return (
    <>
      <SummaryCard
        theme="green"
        label="From"
        place={d.pharmacy}
        stats={[
          { value: d.medicines.length, label: "medicines" },
          { value: totalQuantity(d), label: "total quantity" },
        ]}
        person={{ name: d.dispensedBy, caption: "Dispensed by" }}
      />

      <InfoRow>
        <PersonAvatar name={d.dispensedTo} size={38} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, color: colors.mute }}>Dispensed to</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{d.dispensedTo}</Typography>
        </Box>
        <ContactActions name={d.dispensedTo} />
      </InfoRow>

      <InfoRow bgcolor="#F4F8F6">
        <IconTile icon={<PawIcon />} color="#0A7C40" variant="white" />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, color: colors.mute }}>Dispensed for</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {d.animals.length ? d.animals.map((a) => a.name).join(", ") : "No animal linked"}
          </Typography>
          {d.animals.length > 0 && (
            // AvatarGroup draws right-to-left, so "flex-end" puts the photos on the left.
            <AvatarGroup sx={{ justifyContent: "flex-end", mt: 0.5, "& .MuiAvatar-root": { width: 28, height: 28, border: "2px solid #F4F8F6" } }}>
              {d.animals.map((a) => (
                <Avatar key={a.slug} src={`/assets/images/species/${a.slug}.jpg`} alt={a.name} />
              ))}
            </AvatarGroup>
          )}
        </Box>
      </InfoRow>

      <Typography sx={{ m: "18px 20px 6px", fontSize: 13, fontWeight: 600, color: colors.ink2 }}>Medicines</Typography>
      <Box sx={{ px: 2.5 }}>
        {d.medicines.map((m) => (
          <MedicineItem key={m.medicine.brand} medicine={m.medicine} quantity={m.quantity} detail={`Batch ${m.batch}`} />
        ))}
      </Box>
    </>
  );
}

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DetailsDrawer, type Priority } from "@/components/common";
import { formatINR } from "@/utils/format";
import { CENTRAL_PHARMACIES, CURRENT_USER, LOCAL_PHARMACIES } from "../../data/mockData";
import type { MedicineRequest } from "../../types";
import { FormStep, MedicinePicker, OptionButton, type PickedMedicine } from "../form";

/** Everything about a request except the ID and date — the page adds those when saving. */
export type NewRequest = Omit<MedicineRequest, "id" | "date">;

const PRIORITIES: { value: Priority; label: string; hint: string }[] = [
  { value: null, label: "Normal", hint: "Ship in the usual order" },
  { value: "high", label: "High", hint: "Ship soon" },
  { value: "urgent", label: "Urgent", hint: "Needed today" },
];

type NewRequestDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** The pharmacy chosen in the header (used to pre-fill step 1 or 2). */
  headerPharmacy: string;
  onSubmit: (request: NewRequest) => void;
};

/**
 * NEW REQUEST — ask a central pharmacy to send medicine. 4 steps:
 *   1. Your pharmacy   (who needs it)
 *   2. Request from    (which central pharmacy sends it)
 *   3. Medicines       (search, add, quantity — not limited by stock)
 *   4. Priority        (Normal / High / Urgent — Normal is pre-selected)
 *
 * Same building blocks as New dispense (see ../form).
 */
export default function NewRequestDrawer({ open, onClose, headerPharmacy, onSubmit }: NewRequestDrawerProps) {
  // Pre-fill from the header: a local pharmacy → step 1, a central one → step 2.
  const [from, setFrom] = useState(LOCAL_PHARMACIES.includes(headerPharmacy) ? headerPharmacy : "");
  const [to, setTo] = useState(CENTRAL_PHARMACIES.includes(headerPharmacy) ? headerPharmacy : "");
  const [choosingFrom, setChoosingFrom] = useState(from === "");
  const [medicines, setMedicines] = useState<PickedMedicine[]>([]);
  const [priority, setPriority] = useState<Priority>(null);

  // Which steps are finished? (worked out from the answers)
  const step1Done = from !== "";
  const step2Done = step1Done && to !== "";
  const step3Done = step2Done && medicines.length > 0;
  const canSubmit = step3Done; // priority always has a value

  const units = medicines.reduce((sum, m) => sum + m.quantity, 0);
  const value = medicines.reduce((sum, m) => sum + m.quantity * m.medicine.price, 0);
  const priorityLabel = PRIORITIES.find((p) => p.value === priority)!.label;

  const chooseFrom = (name: string) => {
    setFrom(name);
    setChoosingFrom(false);
  };

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      from,
      to,
      requestedBy: CURRENT_USER,
      items: medicines.map((m) => ({ medicine: m.medicine, quantity: m.quantity, priority })),
      value,
      status: "Requested", // nothing shipped yet
      shipments: [],
      priority,
    });
  };

  return (
    <DetailsDrawer
      open={open}
      onClose={onClose}
      subtitle="Pharmacy"
      title="New request"
      footer={
        <Button variant="contained" disabled={!canSubmit} onClick={submit}>
          Send request{value > 0 && ` · ${formatINR(value)}`}
        </Button>
      }
    >
      <Box sx={{ px: 2.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
        {/* 1 ─ Who needs it */}
        <FormStep
          number={1}
          title="Your pharmacy"
          summary={from || "Who needs the medicine?"}
          done={step1Done}
          onChange={choosingFrom ? undefined : () => setChoosingFrom(true)}
        >
          {choosingFrom &&
            LOCAL_PHARMACIES.map((name) => (
              <OptionButton key={name} selected={from === name} onClick={() => chooseFrom(name)}>
                {name}
              </OptionButton>
            ))}
        </FormStep>

        {/* 2 ─ Who sends it (only 2 choices, so keep them visible) */}
        <FormStep number={2} title="Request from" summary={to || "Choose a central pharmacy"} done={step2Done} disabled={!step1Done}>
          {step1Done &&
            CENTRAL_PHARMACIES.map((name) => (
              <OptionButton key={name} selected={to === name} onClick={() => setTo(name)}>
                {name}
              </OptionButton>
            ))}
        </FormStep>

        {/* 3 ─ Medicines */}
        <FormStep
          number={3}
          title="Medicines"
          summary={medicines.length ? `${medicines.length} added · ${units} units` : "Search and add"}
          done={step3Done}
          disabled={!step2Done}
        >
          {step2Done && (
            <MedicinePicker
              picked={medicines}
              onChange={setMedicines}
              limitToStock={false}
              note="Tip: click a number to type it. Central may ship in parts if stock is short."
            />
          )}
        </FormStep>

        {/* 4 ─ Priority */}
        <FormStep number={4} title="Priority" summary={priorityLabel} done={step3Done} disabled={!step3Done}>
          {step3Done &&
            PRIORITIES.map((p) => (
              <OptionButton key={p.label} selected={priority === p.value} onClick={() => setPriority(p.value)} hint={p.hint}>
                {p.label}
              </OptionButton>
            ))}
        </FormStep>
      </Box>
    </DetailsDrawer>
  );
}

"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DetailsDrawer, PersonAvatar } from "@/components/common";
import { ANIMALS, CURRENT_USER, PHARMACIES, STAFF } from "../../data/mockData";
import type { Animal, Dispense } from "../../types";
import FormStep from "./FormStep";
import MedicinePicker, { type PickedMedicine } from "./MedicinePicker";
import OptionButton from "./OptionButton";

/** Everything about a dispense except the ID and date — the page adds those when saving. */
export type NewDispense = Omit<Dispense, "id" | "date">;

type NewDispenseDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Pre-select this pharmacy (e.g. the one chosen in the header). Empty = let the user pick. */
  defaultPharmacy: string;
  onSubmit: (dispense: NewDispense) => void;
};

/**
 * NEW DISPENSE — a 4-step form in a side panel:
 *   1. Dispense from  (pharmacy)
 *   2. Medicines      (search, add, quantity)
 *   3. Dispense to    (person)
 *   4. For animals    (optional)
 *
 * Each step unlocks when the one before it is done.
 * Tip: the page gives this component a new `key` each time it opens,
 * so React throws away the old answers and the form starts empty.
 */
export default function NewDispenseDrawer({ open, onClose, defaultPharmacy, onSubmit }: NewDispenseDrawerProps) {
  // ── The form's answers ──
  const [pharmacy, setPharmacy] = useState(defaultPharmacy);
  const [choosingPharmacy, setChoosingPharmacy] = useState(!defaultPharmacy); // is step 1's list showing?
  const [medicines, setMedicines] = useState<PickedMedicine[]>([]);
  const [person, setPerson] = useState("");
  const [animals, setAnimals] = useState<Animal[]>([]);

  // ── Which steps are finished? (worked out from the answers, not stored) ──
  const step1Done = pharmacy !== "";
  const step2Done = step1Done && medicines.length > 0;
  const step3Done = step2Done && person !== "";
  const canSubmit = step3Done; // animals are optional

  const units = medicines.reduce((sum, m) => sum + m.quantity, 0);

  const choosePharmacy = (name: string) => {
    setPharmacy(name);
    setChoosingPharmacy(false); // collapse the list once picked
  };

  /** Click an animal to add it; click again to remove it. */
  const toggleAnimal = (animal: Animal) => {
    setAnimals((list) => (list.some((a) => a.slug === animal.slug) ? list.filter((a) => a.slug !== animal.slug) : [...list, animal]));
  };

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      pharmacy,
      dispensedBy: CURRENT_USER,
      dispensedTo: person,
      animals,
      // No expiry dates in the sample data yet, so every item gets the first batch.
      medicines: medicines.map((m) => ({ medicine: m.medicine, quantity: m.quantity, batch: "BA001" })),
    });
  };

  return (
    <DetailsDrawer
      open={open}
      onClose={onClose}
      subtitle="Pharmacy"
      title="New dispense"
      footer={
        <Button variant="contained" disabled={!canSubmit} onClick={submit}>
          Dispense{units > 0 && ` ${units} ${units === 1 ? "unit" : "units"}`}
        </Button>
      }
    >
      <Box sx={{ px: 2.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
        {/* 1 ─ Pharmacy */}
        <FormStep
          number={1}
          title="Dispense from"
          summary={step1Done ? pharmacy : "Choose a pharmacy"}
          done={step1Done}
          onChange={choosingPharmacy ? undefined : () => setChoosingPharmacy(true)}
        >
          {choosingPharmacy &&
            PHARMACIES.map((name) => (
              <OptionButton key={name} selected={pharmacy === name} onClick={() => choosePharmacy(name)}>
                {name}
              </OptionButton>
            ))}
        </FormStep>

        {/* 2 ─ Medicines */}
        <FormStep
          number={2}
          title="Medicines"
          summary={medicines.length ? `${medicines.length} added · ${units} units` : "Search and add"}
          done={step2Done}
          disabled={!step1Done}
        >
          {step1Done && <MedicinePicker picked={medicines} onChange={setMedicines} />}
        </FormStep>

        {/* 3 ─ Person */}
        <FormStep number={3} title="Dispense to" summary={person || "Choose a person"} done={step3Done} disabled={!step2Done}>
          {step2Done &&
            STAFF.map((s) => (
              <OptionButton key={s.name} selected={person === s.name} onClick={() => setPerson(s.name)} hint={s.role}>
                <PersonAvatar name={s.name} size={30} />
                {s.name}
              </OptionButton>
            ))}
        </FormStep>

        {/* 4 ─ Animals (optional, pick any number) */}
        <FormStep
          number={4}
          title="For animals"
          summary={animals.length ? `${animals.length} selected` : "Optional"}
          done={animals.length > 0}
          disabled={!step3Done}
        >
          {step3Done &&
            ANIMALS.map((a) => (
              <OptionButton key={a.slug} selected={animals.some((x) => x.slug === a.slug)} onClick={() => toggleAnimal(a)} hint={a.enclosure}>
                <Avatar variant="rounded" src={`/assets/images/species/${a.slug}.jpg`} alt="" sx={{ width: 30, height: 30, borderRadius: "8px" }} />
                {a.name}
              </OptionButton>
            ))}
        </FormStep>
      </Box>
    </DetailsDrawer>
  );
}

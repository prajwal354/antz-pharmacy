/**
 * MOCK DATA — fake data copied from the design, so the pages have something to show.
 * Later, replace these exports with data from your API / database.
 */
import type { Priority } from "@/components/common";
import type { Animal, Dispense, Medicine, MedicineRequest, RequestStatus } from "../types";

/** "Today" for the sample data — fixed so the server and browser always agree. */
export const NOW = new Date(2026, 10, 11, 10, 45);

export const PHARMACIES = [
  "Adirampattinam central pharmacy",
  "Central pharmacy",
  "Neeta local pharmacy",
  "Mammu local pharmacy",
  "Hospital pharmacy",
  "Raptor ward pharmacy",
  "Srushti site pharmacy",
];

/** Each pharmacy's share of all activity (used to estimate filtered totals on the overview). */
export const PHARMACY_SHARE: Record<string, number> = {
  "Adirampattinam central pharmacy": 0.34,
  "Central pharmacy": 0.18,
  "Neeta local pharmacy": 0.12,
  "Mammu local pharmacy": 0.1,
  "Hospital pharmacy": 0.1,
  "Raptor ward pharmacy": 0.08,
  "Srushti site pharmacy": 0.08,
};

export const MEDICINES: Medicine[] = [
  { brand: "Meloxivet", generic: "Meloxicam 1.5 mg/ml", pack: "Bottle of 100 ml", price: 640, stock: 22 },
  { brand: "Ivermec", generic: "Ivermectin 1%", pack: "Vial of 50 ml", price: 420, stock: 177 },
  { brand: "Amoxiclav", generic: "Amoxicillin + clavulanate 625 mg", pack: "Strip of 10 tablets", price: 210, stock: 340 },
  { brand: "Fenbendazole", generic: "Fenbendazole 150 mg", pack: "Box of 10 tablets", price: 95, stock: 8 },
  { brand: "Enrofloxacin", generic: "Enrofloxacin 50 mg/ml", pack: "Vial of 30 ml", price: 380, stock: 64 },
  { brand: "Ketamine", generic: "Ketamine hydrochloride 50 mg/ml", pack: "Box of 12 ampoules", price: 1820, stock: 14 },
  { brand: "Calcium sandoz", generic: "Calcium gluconate 10%", pack: "Box of 44 ampoules", price: 990, stock: 120 },
  { brand: "Vitamin B complex", generic: "Vitamin B complex injection", pack: "Vial of 30 ml", price: 160, stock: 6 },
  { brand: "Ringer lactate", generic: "Compound sodium lactate", pack: "Bottle of 500 ml", price: 72, stock: 410 },
  { brand: "Metronidazole", generic: "Metronidazole 400 mg", pack: "Strip of 15 tablets", price: 48, stock: 230 },
];

/** People who can receive medicine in the "New dispense" form. */
export const STAFF = [
  { name: "Neeta Rao", role: "Super admin" },
  { name: "Bharathi W", role: "Pharmacist" },
  { name: "Kunal Singh", role: "Veterinarian" },
  { name: "Ovi Wagh", role: "Keeper" },
  { name: "Meera Iyer", role: "Keeper" },
];

/** The logged-in user (shown as "Dispensed by"). */
export const CURRENT_USER = "Neeta Rao";

const PEOPLE = ["Sourav Tambe", "Kunal Singh", "Deelip Kumar", "Neeta Rao", "Meera Iyer", "Bharathi W", "Ovi Wagh", "Ravi Kumar"];

export const ANIMALS: Animal[] = [
  { slug: "bengal-tiger", name: "Bengal tiger", scientificName: "Panthera tigris tigris", enclosure: "Big cat 1" },
  { slug: "chital", name: "Chital", scientificName: "Axis axis", enclosure: "Paddock 4" },
  { slug: "sloth-bear", name: "Sloth bear", scientificName: "Melursus ursinus", enclosure: "Bear den" },
  { slug: "bonnet-macaque", name: "Bonnet macaque", scientificName: "Macaca radiata", enclosure: "Primate 1" },
  { slug: "sarus-crane", name: "Sarus crane", scientificName: "Antigone antigone", enclosure: "Pond 2" },
];

/** Totals shown on the overview (the full system has more records than the sample lists). */
export const TOTALS = {
  requests: 132,
  requestedValue: 4_860_000,
  waitingToShip: 18,
  urgent: 5,
  dispensed: 137,
  unitsDispensed: 310,
  shipments: 96,
};

export const LOW_STOCK_LIMIT = 25;

function priorityFor(i: number): Priority {
  return i % 5 === 0 ? "urgent" : i % 5 === 2 ? "high" : null;
}

function buildRequests(): MedicineRequest[] {
  const list: MedicineRequest[] = [];
  for (let i = 0; i < 16; i++) {
    const date = new Date(NOW);
    date.setDate(date.getDate() - Math.round(i * 14.07 + 1));
    date.setHours(9 + (i % 8), (i * 13) % 60);

    const items = Array.from({ length: 1 + ((i * 3) % 4) }, (_, j) => ({
      medicine: MEDICINES[(i + j * 3) % MEDICINES.length],
      quantity: [6, 99, 12, 20, 4, 30][(i + j) % 6],
      priority: j === 0 ? priorityFor(i) : null,
    }));
    const value = items.reduce((sum, x) => sum + x.medicine.price * x.quantity, 0);

    let status: RequestStatus = i < 4 ? "Requested" : i % 3 === 0 ? "Partly shipped" : "Shipped";
    const shipments =
      status === "Requested"
        ? []
        : [
            {
              id: `SHIP0000${2042 + i * 3}`,
              itemCount: status === "Shipped" ? items.length : 1,
              driver: ["Ramesh P", "Imran S", "Babu K"][i % 3],
              mobile: `98450 ${12340 + i * 77}`,
              vehicle: `KA 04 AB ${8000 + i * 13}`,
              shippedBy: PEOPLE[(i + 3) % 8],
              date: new Date(date.getTime() + 4 * 3_600_000),
            },
          ];
    if (i === 7) status = "Disputed";
    if (i === 11) status = "Cancelled";

    list.push({
      id: `RES00${2839 - i * 4}`,
      to: i % 4 === 2 ? "Central pharmacy" : "Adirampattinam central pharmacy",
      from: PHARMACIES[2 + (i % 5)],
      requestedBy: PEOPLE[i % 8],
      date,
      items,
      value,
      status,
      shipments,
      priority: priorityFor(i),
    });
  }
  return list;
}

function buildDispenses(): Dispense[] {
  const list: Dispense[] = [];
  for (let i = 0; i < 16; i++) {
    const date = new Date(NOW);
    date.setDate(date.getDate() - Math.round(i * 3.6));
    date.setHours(10 + (i % 7), (i * 11) % 60);

    list.push({
      id: `DIS${580 - i * 2}`,
      pharmacy: PHARMACIES[i % 4 === 0 ? 0 : 3 + (i % 2)],
      date,
      dispensedBy: PEOPLE[3],
      dispensedTo: PEOPLE[(i + 5) % 8],
      animals: i % 4 === 1 ? [] : ANIMALS.slice(i % 3, (i % 3) + 1 + (i % 2)),
      medicines: Array.from({ length: 1 + (i % 3) }, (_, j) => ({
        medicine: MEDICINES[(i * 2 + j) % MEDICINES.length],
        batch: `BA00${1 + ((i + j) % 9)}`,
        quantity: 1 + ((i + j) % 5),
      })),
    });
  }
  return list;
}

export const REQUESTS = buildRequests();
export const DISPENSES = buildDispenses();

/**
 * TYPES — the shape of pharmacy data.
 * When you connect a real API later, make sure it returns data in these shapes.
 */
import type { Priority } from "@/components/common";

export type Medicine = {
  brand: string;
  generic: string;
  pack: string;
  price: number;
  stock: number;
};

export type Animal = {
  slug: string;
  name: string;
  scientificName: string;
  enclosure: string;
};

export type RequestStatus = "Requested" | "Partly shipped" | "Shipped" | "Disputed" | "Cancelled";

export type RequestItem = { medicine: Medicine; quantity: number; priority: Priority };

export type Shipment = {
  id: string;
  itemCount: number;
  driver: string;
  mobile: string;
  vehicle: string;
  shippedBy: string;
  date: Date;
};

export type MedicineRequest = {
  id: string;
  to: string;
  from: string;
  requestedBy: string;
  date: Date;
  items: RequestItem[];
  value: number;
  status: RequestStatus;
  shipments: Shipment[];
  priority: Priority;
};

export type DispenseItem = { medicine: Medicine; batch: string; quantity: number };

export type Dispense = {
  id: string;
  pharmacy: string;
  date: Date;
  dispensedBy: string;
  dispensedTo: string;
  animals: Animal[];
  medicines: DispenseItem[];
};

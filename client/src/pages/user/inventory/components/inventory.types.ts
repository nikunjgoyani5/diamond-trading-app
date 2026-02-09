export type InventoryStatus = "available" | "listed" | "in_deal";

export interface InventoryItem {
  id: string;
  name: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  price: number;
  status: InventoryStatus;
  certNumber: string;
  addedDate: string;
}

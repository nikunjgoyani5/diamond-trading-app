import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";

import InventoryHeader from "./components/InventoryHeader";
import InventoryStats from "./components/InventoryStats";
import InventoryFilters from "./components/InventoryFilters";
import InventoryTable from "./components/InventoryTable";
import type { InventoryItem } from "./components/inventory.types";

const inventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "Round Brilliant", carat: 2.5, color: "D", clarity: "VVS1", cut: "Excellent", price: 24500, status: "available", certNumber: "GIA-123456", addedDate: "2024-01-15" },
  { id: "INV-002", name: "Princess Cut", carat: 1.8, color: "E", clarity: "VS1", cut: "Very Good", price: 18200, status: "listed", certNumber: "GIA-234567", addedDate: "2024-01-14" },
  { id: "INV-003", name: "Emerald Cut", carat: 3.1, color: "F", clarity: "VVS2", cut: "Excellent", price: 42800, status: "in_deal", certNumber: "GIA-345678", addedDate: "2024-01-13" },
  { id: "INV-004", name: "Oval Brilliant", carat: 2.0, color: "D", clarity: "IF", cut: "Excellent", price: 32100, status: "available", certNumber: "GIA-456789", addedDate: "2024-01-12" },
  { id: "INV-005", name: "Cushion Cut", carat: 1.5, color: "E", clarity: "VS2", cut: "Very Good", price: 12800, status: "available", certNumber: "GIA-567890", addedDate: "2024-01-11" },
];

const MyInventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <InventoryHeader />

        <InventoryStats />

        <InventoryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <InventoryTable items={inventoryItems} />
      </div>
    </DashboardShell>
  );
};

export default MyInventory;

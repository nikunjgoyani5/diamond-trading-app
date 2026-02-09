import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";

import ListingsHeader from "./components/ListingsHeader";
import ListingsStats from "./components/ListingsStats";
import ListingsFilters from "./components/ListingsFilters";
import ListingsList from "./components/ListingsList";

const myListings = [
  { id: "LST-001", name: "Round Brilliant 2.5ct", specs: "D/VVS1/EX", price: 24500, bids: 4, views: 156, status: "active", expiresAt: "2024-02-15" },
  { id: "LST-002", name: "Princess Cut 1.8ct", specs: "E/VS1/VG", price: 18200, bids: 2, views: 89, status: "active", expiresAt: "2024-02-14" },
  { id: "LST-003", name: "Emerald Cut 3.1ct", specs: "F/VVS2/EX", price: 42800, bids: 7, views: 234, status: "paused", expiresAt: "2024-02-13" },
  { id: "LST-004", name: "Oval Brilliant 2.0ct", specs: "D/IF/EX", price: 32100, bids: 5, views: 178, status: "sold", expiresAt: "2024-02-12" },
  { id: "LST-005", name: "Cushion Cut 1.5ct", specs: "E/VS2/VG", price: 12800, bids: 1, views: 67, status: "expired", expiresAt: "2024-01-31" },
];

const MyListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredListings = myListings.filter(
    (l) =>
      (activeTab === "all" || l.status === activeTab) &&
      l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <ListingsHeader />
        <ListingsStats />
        <ListingsFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ListingsList listings={filteredListings} />
      </div>
    </DashboardShell>
  );
};

export default MyListings;

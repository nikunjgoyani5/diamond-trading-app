import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";

import MarketplaceControls from "./components/MarketplaceControls";
import MarketplaceResults from "./components/MarketplaceResults";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    caratRange: [0, 10],
    shapes: [],
    colors: [],
    clarities: [],
  });

  const mockListings = [
  {
    id: 1,
    name: "Round Brilliant",
    carat: 2.5,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    price: 24500,
    change: "+2.4%",
    trending: true,
    views: 156,
    bids: 4,
    seller: "Diamond Elite Co.",
  },
  {
    id: 2,
    name: "Princess Cut",
    carat: 1.8,
    color: "E",
    clarity: "VS1",
    cut: "Very Good",
    price: 18200,
    change: "+1.8%",
    trending: true,
    views: 89,
    bids: 2,
    seller: "Gem Masters",
  },
  {
    id: 3,
    name: "Emerald Cut",
    carat: 3.1,
    color: "F",
    clarity: "VVS2",
    cut: "Excellent",
    price: 42800,
    change: "-0.5%",
    trending: false,
    views: 234,
    bids: 7,
    seller: "Crown Diamonds",
  },
];


  // 🔜 later replace with API data
  //const listings: any[] = [];

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <MarketplaceControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filters={filters}
          setFilters={setFilters}
        />

        <MarketplaceResults
  listings={mockListings}
  viewMode={viewMode}
/>

      </div>
    </DashboardShell>
  );
};

export default Marketplace;

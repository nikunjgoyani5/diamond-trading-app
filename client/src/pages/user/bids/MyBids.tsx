import DashboardShell from "@/components/layout/DashboardShell";
import BidHeader from "./components/BidHeader";
import BidStats from "./components/BidStats";
import BidFilters from "./components/BidFilters";
import BidList from "./components/BidList";
import { useMyBids } from "./hooks/useMyBids";

const MyBids = () => {
  const {
    bids,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  } = useMyBids();

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <BidHeader />

        <BidStats />

        <BidFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <BidList bids={bids} />
      </div>
    </DashboardShell>
  );
};

export default MyBids;

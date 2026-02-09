import DashboardShell from "@/components/layout/DashboardShell";
import { useBidsOnMyListings } from "./hooks/useBidsReceived";

import BidsHeader from "./components/BidsHeader";
import BidsStats from "./components/BidsStats";
import BidsFilters from "./components/BidsFilters";
import ListingBidsGroup from "./components/ListingBidsGroup";
import AcceptBidDialog from "./components/AcceptBidDialog";
import RejectBidDialog from "./components/RejectBidDialog";

const BidsOnMyListings = () => {
  const state = useBidsOnMyListings();

  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <BidsHeader />
        <BidsStats />
        <BidsFilters {...state} />

        <div className="space-y-6">
          {Object.values(state.groupedByListing).map((listing: any) => (
            <ListingBidsGroup key={listing.listingId} listing={listing} {...state} />
          ))}
        </div>

        <AcceptBidDialog {...state} />
        <RejectBidDialog {...state} />
      </div>
    </DashboardShell>
  );
};

export default BidsOnMyListings;

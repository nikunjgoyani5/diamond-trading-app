import { useMemo, useState } from "react";
import { bidsOnMyListings } from "../mock";

export const useBidsOnMyListings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<"accept" | "reject" | null>(null);

  const filteredBids = useMemo(() => {
    return bidsOnMyListings.filter(
      bid =>
        (activeTab === "all" || bid.status === activeTab) &&
        bid.listingName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  const groupedByListing = useMemo(() => {
    return filteredBids.reduce((acc: any, bid: any) => {
      if (!acc[bid.listingId]) {
        acc[bid.listingId] = {
          listingId: bid.listingId,
          listingName: bid.listingName,
          specs: bid.specs,
          askingPrice: bid.askingPrice,
          bids: [],
        };
      }
      acc[bid.listingId].bids.push(bid);
      return acc;
    }, {});
  }, [filteredBids]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    groupedByListing,
    selectedBid,
    setSelectedBid,
    actionDialog,
    setActionDialog,
  };
};

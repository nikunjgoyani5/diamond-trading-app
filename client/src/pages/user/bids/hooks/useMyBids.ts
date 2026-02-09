import { useMemo, useState } from "react";
import { myBids } from "../mock";

export const useMyBids = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const bids = useMemo(() => {
    return myBids.filter(
      bid =>
        (activeTab === "all" || bid.status === activeTab) &&
        bid.listingName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  return {
    bids,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  };
};

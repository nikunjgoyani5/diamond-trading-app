import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["all", "pending", "accepted", "rejected", "cancelled"];

const BidsFilters = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: any) => (
  <div className="flex flex-col md:flex-row justify-between gap-4">
    
    {/* LEFT: Tabs (simple, same as first component) */}
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="capitalize">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>

    {/* RIGHT: Search + Sort */}
    <div className="flex gap-3">
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          placeholder="Search bids..."
        />
      </div>

      {/* Sort */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[150px]">
          <ArrowUpDown className="h-4 w-4 mr-2" />
            Most Bids
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="highest">Highest Bid</SelectItem>
          <SelectItem value="lowest">Lowest Bid</SelectItem>
        </SelectContent>
      </Select>

    </div>
  </div>
);

export default BidsFilters;

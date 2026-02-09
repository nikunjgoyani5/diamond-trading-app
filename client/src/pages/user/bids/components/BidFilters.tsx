import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const tabs = ["all", "pending", "accepted", "rejected", "cancelled"];

const BidFilters = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: any) => (
  <div className="flex flex-col md:flex-row justify-between gap-4">
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger key={tab} value={tab} className="capitalize">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>

    <div className="flex gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
          placeholder="Search bids..."
        />
      </div>

      <Select defaultValue="newest">
        <SelectTrigger className="w-[150px]">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
      </Select>
    </div>
  </div>
);

export default BidFilters;

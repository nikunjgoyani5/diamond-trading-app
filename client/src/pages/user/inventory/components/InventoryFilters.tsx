import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

const InventoryFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
}: Props) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, certificate number..."
        className="pl-12 h-12 rounded-xl"
      />
    </div>

    <Select value={filterStatus} onValueChange={setFilterStatus}>
      <SelectTrigger className="w-[150px] h-12 rounded-xl">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="available">Available</SelectItem>
        <SelectItem value="listed">Listed</SelectItem>
        <SelectItem value="in_deal">In Deal</SelectItem>
      </SelectContent>
    </Select>

    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px] h-12 rounded-xl">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="carat-high">Carat: High to Low</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default InventoryFilters;

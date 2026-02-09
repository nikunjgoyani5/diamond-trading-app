import { motion } from "framer-motion";
import {
  Search,
  Grid,
  List,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MarketplaceControls = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filters,
  setFilters,
}: any) => {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
         <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Marketplace
          </h1>
          <p className="text-muted-foreground">
            Browse certified diamonds from verified traders worldwide
          </p>
      </motion.div>

      {/* Search + Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search diamonds..."
            className="pl-12 h-12 rounded-xl"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-12 w-[180px] rounded-xl">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low → High</SelectItem>
            <SelectItem value="price-high">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-12 rounded-xl">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Diamonds</SheetTitle>
            </SheetHeader>

            {/* 👉 reuse your existing sliders & badges here */}

            <Button
              className="mt-6 w-full"
              onClick={() => setFilters({ ...filters })}
            >
              Apply Filters
            </Button>
          </SheetContent>
        </Sheet>

        {/* View Toggle */}
        <div className="flex rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-3 ${
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default MarketplaceControls;

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ListingsHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
  >
    <div>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
        My Listings
      </h1>
      <p className="text-muted-foreground">
        Manage and track your diamond listings
      </p>
    </div>

    <Link to="/user/listings/create">
      <Button className="btn-premium text-primary-foreground rounded-xl">
        <Plus className="h-5 w-5 mr-2" />
        Create Listing
      </Button>
    </Link>
  </motion.div>
);

export default ListingsHeader;

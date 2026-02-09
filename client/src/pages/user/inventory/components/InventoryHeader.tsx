import { motion } from "framer-motion";
import { Plus, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InventoryHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
  >
    <div>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
        My Inventory
      </h1>
      <p className="text-muted-foreground">
        Manage your diamond collection and track your assets
      </p>
    </div>

    <div className="flex gap-3">
      <Button variant="outline" className="rounded-xl">
        <QrCode className="h-5 w-5 mr-2" />
        Scan Barcode
      </Button>

      <Link to="/user/inventory/add">
        <Button className="btn-premium rounded-xl">
          <Plus className="h-5 w-5 mr-2" />
          Add Diamond
        </Button>
      </Link>
    </div>
  </motion.div>
);

export default InventoryHeader;

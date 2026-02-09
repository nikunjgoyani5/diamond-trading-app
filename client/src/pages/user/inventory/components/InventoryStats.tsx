import { motion } from "framer-motion";
import { Package, Diamond, Eye, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Total Items", value: "24", icon: Package },
  { label: "Available", value: "18", icon: Diamond },
  { label: "Listed", value: "4", icon: Eye },
  { label: "In Deals", value: "2", icon: Filter },
];


const InventoryStats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
  >
    {stats.map((stat, i) => (
      <Card key={i} className="card-premium">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <stat.icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="font-display text-2xl font-semibold text-primary">
              {stat.value}
            </p>
          </div>
        </CardContent>
      </Card>
    ))}
  </motion.div>
);

export default InventoryStats;

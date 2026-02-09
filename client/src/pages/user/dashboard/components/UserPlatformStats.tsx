import { motion } from "framer-motion";
import { Diamond, Package, Gavel, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
const stats = [
  { label: "My Inventory", value: "24", icon: Package, description: "Total diamonds", route: "/user/inventory"},
  { label: "Active Listings", value: "8", icon: Diamond, description: "On marketplace", route: "/user/listings"},
  { label: "Pending Bids", value: "12", icon: Gavel, description: "Awaiting response", route: "/user/bids" },
  { label: "Profile Views", value: "1,247", icon: Eye, description: "This month", route: "/user/profile" },
];

const MotionCard = motion.create(Card);


const UserPlatformStats = () => {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <MotionCard
          key={stat.label}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="glass border-border hover:shadow-premium group cursor-pointer"
          onClick={() => stat.route && navigate(stat.route)}
        >
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </div>

            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center transition-colors group-hover:bg-accent/20">
              <stat.icon className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </MotionCard>
      ))}
    </motion.div>
  );
};

export default UserPlatformStats;

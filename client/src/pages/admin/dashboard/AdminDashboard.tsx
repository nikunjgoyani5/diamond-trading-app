
import DashboardShell from "@/components/layout/DashboardShell";
import { motion } from "framer-motion";
import { 
  Diamond, 
  TrendingUp, 
  Package, 
  Gavel,
  Eye,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "My Inventory", value: "24", icon: Package, description: "Total diamonds" },
  { label: "Active Listings", value: "8", icon: Diamond, description: "On marketplace" },
  { label: "Pending Bids", value: "12", icon: Gavel, description: "Awaiting response" },
  { label: "Profile Views", value: "1,247", icon: Eye, description: "This month" },
];

const recentDiamonds = [
  { name: "Round Brilliant 2.5ct", price: "$18,500", status: "Listed", quality: "VVS1" },
  { name: "Princess Cut 1.8ct", price: "$12,300", status: "In Inventory", quality: "VS2" },
  { name: "Oval 3.2ct", price: "$24,800", status: "Pending Bid", quality: "IF" },
];

const UserDashboard = () => {
  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-primary">Welcome Admin</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening...</p>
          </div>
          <Button className="btn-premium">
            <Sparkles className="h-4 w-4 mr-2" />
            Add New Diamond
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="glass border-border hover:shadow-premium transition-shadow group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Recent Diamonds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Diamond className="h-5 w-5 text-accent" />
                Recent Diamonds
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiamonds.map((diamond, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <Diamond className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{diamond.name}</p>
                        <p className="text-sm text-muted-foreground">{diamond.quality}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{diamond.price}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        diamond.status === 'Listed' ? 'bg-green-500/10 text-green-500' :
                        diamond.status === 'Pending Bid' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {diamond.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass border-border bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Market is Trending Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Diamond prices increased by 4.2% this week. Great time to list your inventory!
                  </p>
                </div>
                <Button variant="outline" className="hidden md:flex">
                  View Market
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  );
};

export default UserDashboard;

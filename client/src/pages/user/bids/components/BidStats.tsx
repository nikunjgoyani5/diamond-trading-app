import { Card, CardContent } from "@/components/ui/card";
import { Gavel, Clock, CheckCircle2, XCircle } from "lucide-react";

const stats = [
  { label: "Total Bids", value: "12", icon: Gavel },
  { label: "Pending", value: "5", icon: Clock },
  { label: "Accepted", value: "3", icon: CheckCircle2 },
  { label: "Rejected", value: "4", icon: XCircle },
];

const BidStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat, i) => (
      <Card key={i} className="card-premium">
        <CardContent className="p-6 flex items-center gap-4">
          <stat.icon className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold text-primary">{stat.value}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default BidStats;

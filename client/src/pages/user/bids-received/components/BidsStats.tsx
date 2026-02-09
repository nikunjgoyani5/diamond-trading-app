import { Card, CardContent } from "@/components/ui/card";
import { Gavel, Clock, CheckCircle2, XCircle } from "lucide-react";

const stats = [
  { label: "Total Bids", value: "18", icon: Gavel, color: "bg-accent/10 text-accent" },
  { label: "Pending Review", value: "7", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
  { label: "Accepted", value: "5", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Rejected", value: "6", icon: XCircle, color: "bg-rose-500/10 text-rose-500" },
];

const BidsStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((s, i) => {
      const Icon = s.icon;

      return (
        <Card key={i} className="card-premium">
          <CardContent className="p-6 flex items-center gap-4">
            
            {/* Icon container */}
            <div
              className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}
            >
              <Icon className="h-6 w-6" />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>

          </CardContent>
        </Card>
      );
    })}
  </div>
);

export default BidsStats;

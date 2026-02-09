import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PLATFORM_STATS } from "../constants";

const PlatformStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PLATFORM_STATS.map((stat) => (
        <Card
          key={stat.label}
          className="card-premium border-none overflow-hidden group"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-accent/10 transition-colors">
                <stat.icon className="h-5 w-5 text-primary group-hover:text-accent" />
              </div>

              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-semibold border-none",
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </Badge>
            </div>

            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </CardContent>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer transition-opacity" />
        </Card>
      ))}
    </div>
  );
};

export default PlatformStats;

import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const map: any = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-600",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-rose-500/10 text-rose-500",
  },
};

const BidStatusBadge = ({ status }: { status: string }) => {
  const cfg = map[status];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <Badge className={cfg.className}>
      <Icon className="h-3 w-3 mr-1" />
      {cfg.label}
    </Badge>
  );
};

export default BidStatusBadge;

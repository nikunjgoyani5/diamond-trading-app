import {
  MoreVertical,
  Check,
  X,
  MessageSquare,
  ExternalLink,
  User,
  Shield,
} from "lucide-react";
import BidStatusBadge from "./BidStatusBadge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const BidRow = ({ bid, setSelectedBid, setActionDialog }: any) => {
  const status = bid.status;

  return (
    <div className="py-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{bid.bidder.name}</span>
            {bid.bidder.verified && (
              <Shield className="h-4 w-4 text-emerald-500" />
            )}
            <span className="text-xs text-muted-foreground">
              ⭐ {bid.bidder.rating}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            {formatDate(bid.placedAt)}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <p className="font-semibold text-champagne">
          ${bid.bidAmount.toLocaleString()}
        </p>

        <BidStatusBadge status={status} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              View Bidder
            </DropdownMenuItem>

            {status === "pending" && (
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat Buyer
              </DropdownMenuItem>
            )}

            {status === "pending" && (
              <DropdownMenuItem
                className="text-emerald-600"
                onClick={() => {
                  setSelectedBid(bid);
                  setActionDialog("accept");
                }}
              >
                <Check className="h-4 w-4 mr-2" />
                Accept Bid
              </DropdownMenuItem>
            )}

            {status === "pending" && (
              <DropdownMenuItem
                className="text-rose-500"
                onClick={() => {
                  setSelectedBid(bid);
                  setActionDialog("reject");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Bid
              </DropdownMenuItem>
            )}

            {status === "accepted" && (
              <DropdownMenuItem>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Deal
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BidRow;

import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Diamond,
  Clock,
  Shield,
  User,
  Check,
  X,
  MessageSquare,
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ---------------------------------------------------
   MOCK DATA (replace with API later)
--------------------------------------------------- */

const listing = {
  id: "LST-001",
  name: "Round Brilliant 2.5ct",
  specs: "D/VVS1/EX",
  status: "active",
  askingPrice: 24500,
  remaining: "2d 14h",
  attributes: {
    shape: "Round",
    carat: "2.50",
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    cert: "GIA-2234567890",
  },
};

const bids = [
  {
    id: "BID-1",
    bidder: "John Smith",
    rating: 4.8,
    verified: true,
    placedAt: "Jan 20, 02:30 PM",
    amount: 23800,
    status: "pending",
    note: "Willing to complete immediately",
  },
  {
    id: "BID-2",
    bidder: "Maria Garcia",
    rating: 4.9,
    verified: true,
    placedAt: "Jan 19, 04:45 PM",
    amount: 23200,
    status: "pending",
  },
  {
    id: "BID-3",
    bidder: "David Chen",
    rating: 4.7,
    verified: true,
    placedAt: "Jan 18, 11:20 AM",
    amount: 22500,
    status: "pending",
  },
];

const highestBid = Math.max(...bids.map((b) => b.amount));

/* --------------------------------------------------- */

const BidsReceivedDetail = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 space-y-8">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bids Received
        </button>

        {/* LISTING HEADER CARD */}
        <Card className="card-premium">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                  <Diamond className="h-6 w-6 text-accent/70 " />
                </div>
                

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">
                      {listing.name}
                    </h2>
                    <Badge className="bg-emerald-500/10 text-emerald-600">
                      Active
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{listing.specs}</p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {listing.remaining} remaining
                </div>
                <p className="text-sm text-muted-foreground">Asking Price</p>
                <p className="text-2xl font-semibold">
                  ${listing.askingPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <Separator />

            {/* ATTRIBUTES */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
              <Attr label="Shape" value={listing.attributes.shape} />
              <Attr label="Carat" value={listing.attributes.carat} />
              <Attr label="Color" value={listing.attributes.color} />
              <Attr label="Clarity" value={listing.attributes.clarity} />
              <Attr label="Cut" value={listing.attributes.cut} />
              <Attr label="Certification" value={listing.attributes.cert} />
            </div>
          </CardContent>
        </Card>

        {/* BIDS HEADER */}
        <div>
          <h3 className="text-xl font-semibold">
            Bids ({bids.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            {bids.length} pending • Highest: ${highestBid.toLocaleString()}
          </p>
        </div>

        {/* BIDS LIST */}
        <div className="space-y-4">
          {bids.map((bid) => (
            <Card key={bid.id} className="card-premium">
              <CardContent className="p-5 flex justify-between items-center">
                {/* LEFT */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bid.bidder}</p>
                      {bid.verified && (
                        <Shield className="h-4 w-4 text-emerald-500" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        ⭐ {bid.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {bid.placedAt}
                    </p>

                    {bid.note && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MessageSquare className="h-4 w-4" />
                        “{bid.note}”
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xl font-semibold text-accent">
                      ${bid.amount.toLocaleString()}
                    </p>
                  </div>

                  <Badge className="bg-amber-500/10 text-amber-600">
                    Pending
                  </Badge>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-500 border-rose-200 hover:bg-rose-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};

/* --------------------------------------------------- */

const Attr = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default BidsReceivedDetail;

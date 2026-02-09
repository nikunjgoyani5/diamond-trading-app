import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Gavel, Diamond } from "lucide-react";

const ListingItem = ({ listing }: any) => (
  <Card className="card-premium">
    <CardContent className="p-6 flex justify-between items-center">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
          <Diamond />
        </div>

        <div>
          <h3 className="font-semibold">{listing.name}</h3>
          <p className="text-sm text-muted-foreground">{listing.specs}</p>
          <div className="flex gap-4 text-sm mt-1">
            <span className="flex gap-1 items-center">
              <Eye className="h-4 w-4" /> {listing.views}
            </span>
            <span className="flex gap-1 items-center">
              <Gavel className="h-4 w-4" /> {listing.bids}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xl font-semibold">
          ${listing.price.toLocaleString()}
        </p>
        <p className="text-xs capitalize">{listing.status}</p>
      </div>
    </CardContent>
  </Card>
);

export default memo(ListingItem);

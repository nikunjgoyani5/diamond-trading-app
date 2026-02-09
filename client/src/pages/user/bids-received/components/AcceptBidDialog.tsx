import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AcceptBidDialog = ({
  actionDialog,
  setActionDialog,
  selectedBid,
  setSelectedBid,
}: any) => {
  if (!selectedBid) return null;

  return (
    <Dialog open={actionDialog === "accept"} onOpenChange={() => setActionDialog(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Bid</DialogTitle>
        </DialogHeader>

        <p>
          Accept bid of{" "}
          <strong>${selectedBid.bidAmount.toLocaleString()}</strong>?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => setActionDialog(null)}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 text-white">
            <Check className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptBidDialog;

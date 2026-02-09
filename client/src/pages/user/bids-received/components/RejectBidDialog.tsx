import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const RejectBidDialog = ({
  actionDialog,
  setActionDialog,
  selectedBid,
}: any) => {
  if (!selectedBid) return null;

  return (
    <Dialog open={actionDialog === "reject"} onOpenChange={() => setActionDialog(null)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Bid</DialogTitle>
        </DialogHeader>

        <p>
          Reject bid of{" "}
          <strong>${selectedBid.bidAmount.toLocaleString()}</strong>?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => setActionDialog(null)}>
            Cancel
          </Button>
          <Button variant="destructive">
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectBidDialog;

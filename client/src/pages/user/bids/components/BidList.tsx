import BidCard from "./BidCard";

const BidList = ({ bids }: any) => {
  if (!bids.length) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No bids found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid: any) => (
        <BidCard key={bid.id} bid={bid} />
      ))}
    </div>
  );
};

export default BidList;

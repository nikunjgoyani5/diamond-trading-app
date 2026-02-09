import ListingCard from"./ListingCard";

const ListingsList = ({ listings }: any) => (
  <div className="space-y-4">
    {listings.map((listing: any, index: number) => (
      <ListingCard key={listing.id} listing={listing} index={index} />
    ))}
  </div>
);

export default ListingsList;

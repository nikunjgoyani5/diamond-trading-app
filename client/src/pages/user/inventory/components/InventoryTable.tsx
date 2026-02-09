import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import InventoryRow from "./InventoryRow";
import type { InventoryItem } from "./inventory.types";

const InventoryTable = ({ items }: { items: InventoryItem[] }) => (
  <Card className="card-premium overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Diamond</TableHead>
          <TableHead>Specifications</TableHead>
          <TableHead>Certificate</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <InventoryRow key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default InventoryTable;

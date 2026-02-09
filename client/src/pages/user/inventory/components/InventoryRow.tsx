import {
  Diamond,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import {
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { InventoryItem } from "./inventory.types";

const InventoryRow = ({ item }: { item: InventoryItem }) => {
  const badgeClass =
    item.status === "available"
      ? "bg-emerald-500/10 text-emerald-600"
      : item.status === "listed"
      ? "bg-accent/10 text-accent"
      : "bg-blue-500/10 text-blue-600";

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Diamond className="h-6 w-6 text-accent/70" />
          </div>
          <div>
            <p className="font-medium text-primary">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.id}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Badge variant="secondary">{item.carat}ct</Badge>
          <Badge variant="secondary">{item.color}</Badge>
          <Badge variant="secondary">{item.clarity}</Badge>
          <Badge variant="secondary">{item.cut}</Badge>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {item.certNumber}
      </TableCell>

      <TableCell className="font-display font-semibold text-primary">
        ${item.price.toLocaleString()}
      </TableCell>

      <TableCell>
        <Badge className={badgeClass}>
          {item.status.replace("_", " ")}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            {item.status === "available" && (
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" /> Create Listing
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default InventoryRow;

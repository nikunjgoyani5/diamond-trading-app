import { Shield, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KYC_QUEUE } from "../constants";

const KYCQueue = () => {
  return (
    <Card className="card-premium border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" /> KYC Queue
          </CardTitle>
          <CardDescription>Verify incoming trader applications</CardDescription>
        </div>

        <Button variant="ghost" size="sm" className="text-accent">
          View All
        </Button>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {KYC_QUEUE.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.company}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                      item.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    )}
                  >
                    {item.status.replace("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default KYCQueue;

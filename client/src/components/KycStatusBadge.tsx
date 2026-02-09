import { useAppSelector } from "@/hooks/redux";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, XCircle } from "lucide-react";

/**
 * KycStatusBadge - Shows KYC verification status
 * 
 * Display rules:
 * - APPROVED  → Green badge: "KYC Verified"
 * - PENDING   → Yellow badge: "KYC Pending"
 * - skipped   → Yellow badge: "KYC Pending"
 * - REJECTED  → Red badge: "KYC Rejected"
 * - NOT_STARTED → No badge (or gray "Not Started")
 */
export const KycStatusBadge = () => {
  const { status, skipped } = useAppSelector((state) => state.kyc);

  if (status === "NOT_STARTED" && !skipped) {
    return null; // Or show a gray badge if needed
  }

  if (status === "APPROVED") {
    return (
      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
        <ShieldCheck className="h-3 w-3 mr-1" />
        KYC Verified
      </Badge>
    );
  }

  if (status === "PENDING" || skipped) {
    return (
      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">
        <Clock className="h-3 w-3 mr-1" />
        KYC Pending
      </Badge>
    );
  }

  if (status === "REJECTED") {
    return (
      <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">
        <XCircle className="h-3 w-3 mr-1" />
        KYC Rejected
      </Badge>
    );
  }

  return null;
};

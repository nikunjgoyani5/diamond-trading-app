import {
  Users,
  Clock,
  Package,
  DollarSign,
} from "lucide-react";
import type { PlatformStat, KYCItem } from "./types";

export const PLATFORM_STATS: PlatformStat[] = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+124",
    trend: "up",
    icon: Users,
    description: "Active traders",
  },
  {
    label: "KYC Pending",
    value: "38",
    change: "-12",
    trend: "down",
    icon: Clock,
    description: "Awaiting verification",
  },
  {
    label: "Active Listings",
    value: "842",
    change: "+15",
    trend: "up",
    icon: Package,
    description: "On marketplace",
  },
  {
    label: "Total Volume",
    value: "$4.2M",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
];

export const KYC_QUEUE: KYCItem[] = [
  {
    id: 1,
    name: "Priya Sharma",
    company: "Sharma Gems Pvt Ltd",
    submitted: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    name: "Amit Patel",
    company: "Patel Diamonds",
    submitted: "5 hours ago",
    status: "under_review",
  },
  {
    id: 3,
    name: "Neha Singh",
    company: "Singh Jewelers",
    submitted: "1 day ago",
    status: "pending",
  },
];

import type { LucideIcon } from "lucide-react";

export type Trend = "up" | "down";

export interface PlatformStat {
  label: string;
  value: string;
  change: string;
  trend: Trend;
  icon: LucideIcon;
  description: string;
}

export type KYCStatus = "pending" | "under_review";

export interface KYCItem {
  id: number;
  name: string;
  company: string;
  submitted: string;
  status: KYCStatus;
}

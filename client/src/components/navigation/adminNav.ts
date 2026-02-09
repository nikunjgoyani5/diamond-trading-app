import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Package,
  Gavel,
  Settings,
} from "lucide-react";

export const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: ShieldCheck, label: "KYC Reviews", href: "/admin/kyc" },
  { icon: Package, label: "Listings", href: "/admin/listings" },
  { icon: Gavel, label: "Disputes", href: "/admin/disputes" },
];

export const adminBottomNav = [
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

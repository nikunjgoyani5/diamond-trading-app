import {
  LayoutDashboard,
  TrendingUp,
  Heart,
  Package,
  ListPlus,
  Gavel,
  Handshake,
  Wallet,
  MessageCircle,
  Bell,
  Settings,
} from "lucide-react";

export const userNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/user" },
  { icon: TrendingUp, label: "Marketplace", href: "/user/marketplace" },
  { icon: Heart, label: "Preferences", href: "/user/preferences" },
  { icon: Package, label: "Inventory", href: "/user/inventory" },
  { icon: ListPlus, label: "My Listings", href: "/user/listings" },
  { icon: Gavel, label: "My Bids", href: "/user/bids" },
  { icon: Gavel, label: "Bids Received", href: "/user/bids/received" },
  { icon: Handshake, label: "Deals", href: "/user/deals" },
  { icon: Wallet, label: "Payments", href: "/user/payments" },
  { icon: MessageCircle, label: "Messages", href: "/user/messages" },
  { icon: Bell, label: "Notifications", href: "/user/notifications" },
];

export const userBottomNav = [
  { icon: Settings, label: "Settings", href: "/user/settings" },
];

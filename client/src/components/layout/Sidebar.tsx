import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Diamond,
  User,
  LogOut,
  ChevronDown,
  Shield,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { userNav, userBottomNav } from "@/components/navigation/userNav";
import { adminNav, adminBottomNav } from "@/components/navigation/adminNav";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/slices/authSlice";
import { KycStatusBadge } from "@/components/KycStatusBadge";


interface SidebarProps {
  role: "user" | "admin";
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}


const Sidebar = ({
  role,
  isOpen = true,
  onClose,
  isMobile = false,
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleLogout = () => {
    dispatch(authActions.logout());  
    navigate("/login", { replace: true }); 
  };

  // ✅ ROLE-BASED NAV (FIXED)
  const navItems = role === "admin" ? adminNav : userNav;
  const bottomNavItems = role === "admin" ? adminBottomNav : userBottomNav;

  const NON_NESTING_ROUTES = [
  "/user",
  "/admin",
  "/user/bids",
];

const isActive = (href: string) => {
  // Exact match always wins
  if (location.pathname === href) return true;

  // Non-nesting routes should NOT stay active for subpaths
  if (NON_NESTING_ROUTES.includes(href)) {
    return false;
  }

  // Allow nesting for others
  if (location.pathname.startsWith(href + "/")) {
    return true;
  }

  return false;
};
  const handleNavClick = () => {
    if (isMobile && onClose) onClose();
  };

  const homeLink = role === "admin" ? "/admin" : "/user";

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to={homeLink} className="flex items-center gap-3">
          <Diamond className="h-8 w-8 text-accent" />
          <span className="font-display text-xl font-semibold text-primary">
            Reyu Diamond
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-premium">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border">
        <ul className="space-y-1 mb-4">
          {bottomNavItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Menu */}
        {!isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium text-primary text-sm">
                    John Doe
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    {role === "admin" ? "Administrator" : "Verified Trader"}
                  </div>
                  <div className="mt-1">
                    <KycStatusBadge />
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/kyc/start")}>
                <Shield className="h-4 w-4 mr-2" />
                KYC Verification
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-primary text-sm">John Doe</div>
              <div className="text-xs text-muted-foreground">
                {role === "admin" ? "Administrator" : "Verified Trader"}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Desktop
  if (!isMobile) {
    return (
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 flex-col bg-card border-r border-border z-40">
        <SidebarContent />
      </aside>
    );
  }

  // Mobile
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

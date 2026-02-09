import { Link } from "react-router-dom";
import { Diamond, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KycStatusBadge } from "@/components/KycStatusBadge";

interface NavbarProps {
  role: "user" | "admin";
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar = ({ role, sidebarOpen, onToggleSidebar }: NavbarProps) => {
  // ✅ Role-based home link
  const homeLink = role === "admin" ? "/admin" : "/user";

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={homeLink} className="flex items-center gap-2">
          <Diamond className="h-6 w-6 text-accent" />
          <span className="font-display text-lg font-semibold text-primary">
            Reyu Diamond
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <KycStatusBadge />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          <button
            onClick={onToggleSidebar}
            className="p-2 text-primary hover:text-accent transition-colors"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

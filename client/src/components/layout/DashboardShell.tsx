import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/hooks/redux";

interface DashboardShellProps {
  children: React.ReactNode;
}
const DashboardShell = ({ children }: DashboardShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = useAppSelector((state: any) => state.auth.user?.role);


  return (
    <div className="min-h-screen bg-background">
      <Navbar
        role={role}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;

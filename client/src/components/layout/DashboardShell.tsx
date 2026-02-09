import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role: "user" = "user"; // 👈 USER SHELL

  return (
    <div className="min-h-screen bg-background ">
      {/* Mobile Header */}
      <Navbar
        role={role}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Desktop Sidebar */}
      <Sidebar role={role} />

      {/* Mobile Sidebar */}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen navupr">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;

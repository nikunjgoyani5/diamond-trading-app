import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import DashboardShell from "@/components/layout/DashboardShell";

const AdminRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role !== "admin") {
    return <Navigate to="/user" replace />;
  }
  return (
    <div className="min-h-screen bg-muted">
      {/* Admin Navbar / Sidebar later */}
      <main className="p-6">
        <DashboardShell>
        <Outlet />
        </DashboardShell>

      </main>
    </div>
  );
};

export default AdminRoutes;

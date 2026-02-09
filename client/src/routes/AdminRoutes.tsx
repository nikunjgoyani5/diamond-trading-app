import { Outlet } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <div className="min-h-screen bg-muted">
      {/* Admin Navbar / Sidebar later */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoutes;

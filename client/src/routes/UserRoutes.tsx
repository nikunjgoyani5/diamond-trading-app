import { Outlet } from "react-router-dom";

const UserRoutes = () => {
  return (
    <div className="min-h-screen flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        {/* <Navbar /> */}
        <main className="p-6">

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserRoutes;

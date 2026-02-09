import DashboardShell from "@/components/layout/DashboardShell";

import Header from "./components/Header";
import UserPlatformStats from "./components/UserPlatformStats";
import UserListings from "./components/UserListings";
import UserBids from "./components/UserBids";
import UserNotifications from "./components/UserNotifications";

const UserDashboard = () => {
  return (
    <DashboardShell>
      <div className="p-3 lg:p-2 space-y-8">
        <Header />
        <UserPlatformStats />
        <UserListings />
        <UserBids />
        <UserNotifications />
      </div>
    </DashboardShell>
  );
};

export default UserDashboard;

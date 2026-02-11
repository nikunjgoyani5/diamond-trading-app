import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";

interface KycRouteProps {
  children: ReactNode;
}

const KycRoute = ({ children }: KycRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { status } = useAppSelector((state) => state.kyc);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (status === "APPROVED") {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
};

export default KycRoute;

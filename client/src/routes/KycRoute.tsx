import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "@/store/rootReducer";

interface KycRouteProps {
  children: ReactNode;
}

/**
 * KycRoute - Guards KYC pages
 * Routes: /kyc/*
 * 
 * Rules:
 * - If isAuthenticated === false → redirect to /login
 * - If otpVerified === false → redirect to /verify-otp
 * - Does NOT check kyc.status (to avoid redirect loops)
 * - KYC status logic is handled inside KYC pages
 */
const KycRoute = ({ children }: KycRouteProps) => {
  const { isAuthenticated, otpVerified, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  return <>{children}</>;
};

export default KycRoute;

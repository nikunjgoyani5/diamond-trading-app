import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "@/store/rootReducer";

interface ProtectedRouteProps {
  children: ReactNode;
  allowUnverified?: boolean; // login + verify-otp routes
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  allowUnverified = false,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, otpVerified, user, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const { status: kycStatus } = useSelector(
    (state: RootState) => state.kyc
  );

  /* ---------------- LOADING ---------------- */
  if (loading) return null;

  /* ---------------- AUTH REQUIRED ---------------- */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ---------------- LOGIN + OTP ROUTES ---------------- */
  if (allowUnverified) {
    // IMPORTANT:
    // Never redirect from here
    // Login must be accessible after OTP verification
    return <>{children}</>;
  }

  /* ---------------- APP ROUTES ---------------- */
  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  if (kycStatus === "REJECTED") {
    return <Navigate to="/kyc/status" replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

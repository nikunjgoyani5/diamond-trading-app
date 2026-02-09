import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";

/**
 * PublicRoute
 * Used for: /login, /signup
 *
 * Flow supported:
 * Signup → Verify OTP → Login → KYC
 */
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAppSelector((state) => state.auth);

  const isAuthenticated = auth.isAuthenticated;
  const otpVerified = auth.otpVerified;
  const token = auth.token;

  // Fully logged-in users should not access login/signup
  if (isAuthenticated && otpVerified && token) {
    return <Navigate to="/kyc/start" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authActions } from "@/store/slices/authSlice";

type VerifyOtpMode = "VERIFY_EMAIL" | "FORGOT_PASSWORD";

interface LocationState {
  email: string;
  mode: VerifyOtpMode;
}

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const state = location.state as LocationState | undefined;

  /* ================= Validate Navigation State ================= */

  if (!state?.email || !state?.mode) {
    return <Navigate to="/forgot-password" replace />;
  }

  const { email, mode } = state;

  const { otpVerified, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);

  /* ================= Countdown ================= */

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  /* ================= Reset States On Mount ================= */

  useEffect(() => {
    dispatch(authActions.resetAuthError());
    dispatch(authActions.resetOtpState());
  }, [dispatch]);

  /* ================= Handle Errors ================= */

  useEffect(() => {
    if (!error) return;

    toast({
      title: "OTP verification failed",
      description: error,
      variant: "destructive",
    });

    dispatch(authActions.resetAuthError());
  }, [error, dispatch, toast]);

  /* ================= Handle Success ================= */

  useEffect(() => {
    if (!otpVerified) return;

    toast({
      title: "OTP Verified Successfully",
      description:
        mode === "VERIFY_EMAIL"
          ? "You can now login."
          : "You can now reset your password.",
    });

    if (mode === "VERIFY_EMAIL") {
      navigate("/login", { replace: true });
    } else {
      // For FORGOT_PASSWORD mode, navigate to reset password
      // Email and OTP are already stored in Redux state
      navigate("/reset-password", { replace: true });
    }

    dispatch(authActions.resetOtpState());
  }, [otpVerified, mode, navigate, dispatch, toast]);

  /* ================= Handlers ================= */

  const handleVerify = () => {
    if (otp.length !== 6) return;

    dispatch(
      authActions.verifyOtpRequest({
        email,
        otp,
        mode,
      })
    );
  };

  const handleResend = () => {
    setOtp("");
    setCountdown(60);

    dispatch(authActions.resendOtpRequest({ email }));
  };

  /* ================= UI ================= */

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-background
      bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-3 mb-10 justify-center">
          <Diamond className="h-8 w-8 text-accent" />
          <span className="font-display text-2xl font-semibold">
            Reyu Diamond
          </span>
        </Link>

        <div className="card-premium p-8">
          <div className="text-center mb-6">
            <ShieldCheck className="h-10 w-10 mx-auto text-accent mb-4" />
            <h1 className="text-2xl font-semibold">
              {mode === "VERIFY_EMAIL"
                ? "Verify Your Email"
                : "Verify Reset Code"}
            </h1>
            <p className="text-muted-foreground mt-1">{email}</p>
          </div>

          <div className="flex justify-center mb-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
              <InputOTPGroup>
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="btn-premium w-full mt-4"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center mt-4">
            {countdown === 0 ? (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-accent text-sm hover:underline disabled:opacity-50"
              >
                Resend code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in {countdown}s
              </p>
            )}
          </div>

          <Link
            to="/forgot-password"
            className="flex justify-center items-center gap-2 mt-6 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Try different email
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;

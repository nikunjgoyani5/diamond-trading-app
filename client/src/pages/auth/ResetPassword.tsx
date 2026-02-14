import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authActions } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

import {
  Diamond,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state as { email: string; otp: string } | undefined;

  const { loading, error, flow } = useAppSelector((state) => state.auth);

  /* ================= Validate Page Access ================= */

useEffect(() => {
  if (!state?.email || !state?.otp) {
    navigate("/forgot-password", { replace: true });
  }
}, [state, navigate]);


  /* ================= Handle Success ================= */

  useEffect(() => {
    if (flow.type === "RESET_PASSWORD" && flow.status === "SUCCESS") {
      toast({
        title: "Password Reset Successful",
        description: "You can now sign in with your new password.",
      });

      dispatch(authActions.resetFlow());
      navigate("/login", { replace: true });
    }
  }, [flow.type, flow.status, dispatch, navigate, toast]);

  /* ================= Handle Errors ================= */

  useEffect(() => {
    if (!error) return;

    toast({
      title: "Reset failed",
      description: error,
      variant: "destructive",
    });

    dispatch(authActions.resetFlow());
  }, [error, dispatch, toast]);

  /* ================= Local UI State ================= */

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordsMatch = formData.password === formData.confirmPassword;

  const passwordValid = formData.password.length >= 8;

  /* ================= Submit Handler ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValid || !passwordsMatch) return;
if (!state?.email || !state?.otp) return;

dispatch(
  authActions.resetPasswordRequest({
    email: state.email,
    otp: state.otp,
    newPassword: formData.password,
  })
);
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
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-12 justify-center">
          <Diamond className="h-8 w-8 text-accent" />
          <span className="font-display text-2xl font-semibold text-primary">
            Reyu Diamond
          </span>
        </Link>

        <div className="card-premium p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-3">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Create a new secure password for your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="pl-12 pr-12 h-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {formData.password && !passwordValid && (
                <p className="text-xs text-destructive">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-12 h-12 rounded-xl"
                  required
                />
              </div>

              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm font-medium text-primary mb-3">
                Password Requirements:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  {
                    label: "At least 8 characters",
                    valid: formData.password.length >= 8,
                  },
                  {
                    label: "Contains a number",
                    valid: /\d/.test(formData.password),
                  },
                  {
                    label: "Contains uppercase letter",
                    valid: /[A-Z]/.test(formData.password),
                  },
                  {
                    label: "Contains special character",
                    valid: /[!@#$%^&*]/.test(formData.password),
                  },
                ].map((req, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 ${
                      req.valid ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.valid ? "bg-emerald-500/20" : "bg-muted"
                      }`}
                    >
                      {req.valid && <CheckCircle className="h-3 w-3" />}
                    </div>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              disabled={loading || !passwordValid || !passwordsMatch}
              className="btn-premium text-primary-foreground w-full h-12 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ◇
                  </motion.span>
                  Resetting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Reset Password
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authActions } from "@/store/slices/authSlice";

const ResendOTP = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  // Pre-fill email from Redux if available
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to send OTP",
        description: error,
        variant: "destructive",
      });
      dispatch(authActions.resetAuthError());
    }
  }, [error, dispatch, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    dispatch(authActions.resendOtpRequest({ email }));

    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your email.",
    });

    // Navigate to verify-otp after a short delay
    setTimeout(() => {
      navigate("/verify-otp", { replace: true });
    }, 800);
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center p-8 bg-background
        bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%)]
      "
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
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-3">
              Use Different Email
            </h1>
            <p className="text-muted-foreground">
              Enter a new email address to receive your verification code
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">New Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
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
                  Sending code...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Verification Code
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Back Link */}
          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to signup
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground mt-8">
          Already verified?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResendOTP;

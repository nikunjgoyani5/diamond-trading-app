import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Required check
    if (!VALIDATION_PATTERNS.EMAIL.value.test(email)) {
      setError(VALIDATION_PATTERNS.EMAIL.message);
      return;
    }

    // Format check
    if (!VALIDATION_PATTERNS.EMAIL.value.test(email)) {
      setError(VALIDATION_PATTERNS.EMAIL.message);
      return;
    }

    // ✅ Validation passed
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

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
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-accent" />
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-3">
                  Forgot Password?
                </h1>

                <p className="text-muted-foreground">
                  No worries! Enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className={`pl-12 h-12 rounded-xl ${
                        error ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-premium text-primary-foreground w-full h-12 text-base"
                >
                  {isLoading ? (
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
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-500" />
                </motion.div>

                <h2 className="font-display text-2xl font-semibold text-primary mb-3">
                  Check Your Email
                </h2>

                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-primary">{email}</span>
                </p>

                <p className="text-sm text-muted-foreground mb-8">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent hover:text-accent/80 hover:underline transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Back to Login */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

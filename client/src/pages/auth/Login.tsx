import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { authActions } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { Diamond, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/* ----------------------------- schema ----------------------------- */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(VALIDATION_PATTERNS.EMAIL.value, VALIDATION_PATTERNS.EMAIL.message),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      VALIDATION_PATTERNS.PASSWORD.value,
      VALIDATION_PATTERNS.PASSWORD.message,
    ),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const dispatch = useAppDispatch();
 const { loading, error, isAuthenticated, token } = useAppSelector(
  (state) => state.auth
);

useEffect(() => {
  if (isAuthenticated && token) {
    navigate("/kyc/start", { replace: true });
  }
}, [isAuthenticated, token, navigate]);


  useEffect(() => {
    if (!error) return;

    toast({
      title: "Login failed",
      description: error,
      variant: "destructive",
    });

    dispatch(authActions.resetAuthError());
  }, [error, dispatch, toast]);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

const onSubmit = (data: LoginForm) => {
  dispatch(
    authActions.loginRequest({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    })
  );
};


  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Diamond className="h-8 w-8 text-accent" />
            <span className="font-display text-2xl font-semibold text-primary">
              Reyu Diamond
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-3">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your diamond trading dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`pl-12 h-12 rounded-xl ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`pl-12 pr-12 h-12 rounded-xl ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
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
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(v) => setValue("rememberMe", Boolean(v))}
                />
                <Label className="text-sm cursor-pointer">Remember me</Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-accent hover:text-accent/80 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isValid || loading}
              className="btn-premium w-full h-12"
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
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl">
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl">
              GitHub
            </Button>
          </div>

          {/* Sign Up */}
          <p className="text-center text-muted-foreground mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-accent hover:underline font-medium"
            >
              Create account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual (UNCHANGED) */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-accent/20 flex items-center justify-center"
          >
            <Diamond className="h-16 w-16 text-accent" />
          </motion.div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
            Secure Trading Platform
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto text-lg">
            Access the world&apos;s most trusted diamond trading marketplace
            with verified traders and secure transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

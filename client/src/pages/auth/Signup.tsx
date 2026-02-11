import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authActions } from "@/store/slices/authSlice";
import { signupSchema, type SignupForm } from "@/schemas/auth/signup.schema";

import { Diamond, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { loading, error, signupSuccess, pendingVerificationEmail  } = useAppSelector(
    (state) => state.auth
  );

  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const fullState = useAppSelector((state) => state);
console.log("FULL STATE:", fullState);
  const agreeTerms = watch("agreeTerms");

useEffect(() => {
  console.log("signupSuccess:", signupSuccess);
  console.log("pendingVerificationEmail:", pendingVerificationEmail);

  if (signupSuccess && pendingVerificationEmail) {

    toast({
      title: "Account created successfully 🎉",
      description: "Please verify OTP to continue",
    });

    navigate("/verify-otp", {
  replace: true,
  state: {
    email: pendingVerificationEmail,
    mode: "VERIFY_EMAIL",
  },
});

  }
}, [signupSuccess, pendingVerificationEmail, navigate]);




  // Handle signup errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Signup failed",
        description: error,
        variant: "destructive",
      });
      dispatch(authActions.resetAuthError());
    }
  }, [error, dispatch, toast]);

  const onSubmit = (data: SignupForm) => {
    dispatch(
      authActions.signupRequest({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  };

  


  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-champagne/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
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
            Join the Elite Network
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto text-lg">
            Become part of the world's most exclusive diamond trading community
            with verified professionals.
          </p>

          <div className="mt-12 space-y-4 text-left max-w-sm mx-auto">
            {[
              "Verified trader community",
              "Secure escrow transactions",
              "Real-time market insights",
              "24/7 dedicated support",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-primary-foreground/80"
              >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">✓</span>
                </div>
                {benefit}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Diamond className="h-8 w-8 text-accent" />
            <span className="font-display text-2xl font-semibold text-primary">
              Reyu Diamond
            </span>
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary">
            Personal Information
          </h1>
          <p className="text-muted-foreground mb-5">Tell us about yourself</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register("name")}
                  className="pl-12 h-12 rounded-xl"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register("email")}
                  className="pl-12 h-12 rounded-xl"
                  placeholder="john@example.com"
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
                  {...register("password")}
                  className="pl-12 pr-12 h-12 rounded-xl"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="pl-12 pr-12 h-12 rounded-xl"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            {/* Terms */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={agreeTerms === true}
                onCheckedChange={(v) =>
                  setValue("agreeTerms", Boolean(v), {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
              <Label className="text-sm">
                I agree to the Terms & Privacy Policy
              </Label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-red-500">
                {errors.agreeTerms.message}
              </p>
            )}

            {errors.agreeTerms && (
              <p className="text-sm text-red-500">
                {errors.agreeTerms.message}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => navigate("/login")}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid || loading}
                className="btn-premium flex-1 h-12"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

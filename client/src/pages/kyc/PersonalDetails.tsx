import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycActions } from "@/store/slices/kycSlice";
import { useAppDispatch } from "@/hooks/redux";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";

const CURRENT_YEAR = new Date().getFullYear();

const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "Required")
    .regex(
      VALIDATION_PATTERNS.NAME_PART.value,
      VALIDATION_PATTERNS.NAME_PART.message
    ),

  middleName: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || VALIDATION_PATTERNS.NAME_PART.value.test(val),
      {
        message: VALIDATION_PATTERNS.NAME_PART.message,
      }
    ),

  lastName: z
    .string()
    .min(1, "Required")
    .regex(
      VALIDATION_PATTERNS.NAME_PART.value,
      VALIDATION_PATTERNS.NAME_PART.message
    ),

  dob: z
    .string()
    .min(1, "Required")
    .refine((date) => {
      const dob = new Date(date);
      const age =
        (Date.now() - dob.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);

      return (
        dob.getFullYear() < CURRENT_YEAR &&
        dob < new Date() &&
        age >= 18
      );
    }, "Must be 18+ years old"),

  phone: z.string().regex(
    VALIDATION_PATTERNS.PHONE_10_DIGITS.value,
    VALIDATION_PATTERNS.PHONE_10_DIGITS.message
  ),

  address: z
    .string()
    .min(1, "Required")
    .regex(
      VALIDATION_PATTERNS.NO_EDGE_SPACES.value,
      VALIDATION_PATTERNS.NO_EDGE_SPACES.message
    ),

  city: z
    .string()
    .min(1, "Required")
    .regex(
      VALIDATION_PATTERNS.NO_EDGE_SPACES.value,
      VALIDATION_PATTERNS.NO_EDGE_SPACES.message
    ),

  state: z
    .string()
    .min(1, "Required")
    .regex(
      VALIDATION_PATTERNS.NO_EDGE_SPACES.value,
      VALIDATION_PATTERNS.NO_EDGE_SPACES.message
    ),

  pincode: z.string().regex(
    VALIDATION_PATTERNS.PINCODE.value,
    VALIDATION_PATTERNS.PINCODE.message
  ),

  country: z.string().min(1, "Country is required"),
});

type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;


const PersonalDetails = () => {
  const navigate = useNavigate();
    const dispatch = useAppDispatch();

  const handleSkipKyc = () => {
    dispatch(kycActions.skipKyc());
    navigate("/user", { replace: true });
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    mode: "onChange",
  });

const onSubmit = (data: PersonalDetailsForm) => {
  dispatch(kycActions.goToStep("DOCUMENT_UPLOAD"));
  navigate("/kyc/document-upload");
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.2),_transparent_65%)]
    bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.38),_transparent_65%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card className="card-premium glass p-8 md:p-10 border-white/10 shadow-2xl">
          {/* ================= Header ================= */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                bg-accent text-accent-foreground
                shadow-sm mb-2">
              Step 1 of 3 · Identity
            </span>
            <h1 className="text-3xl font-semibold mb-2">
              Personal Information
            </h1>
            <p className="text-muted-foreground">
              Ensure details match your government-issued ID.
            </p>
          </div>

          {/* ================= Form ================= */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field
                label="First Name"
                icon={<User className="h-4 w-4 text-primary" />}
                error={errors.firstName?.message}
              >
                <Input {...register("firstName")} placeholder="John" />
              </Field>

              <Field
                label="Middle Name"
                error={errors.middleName?.message}
              >
                <Input {...register("middleName")} placeholder="Optional" />
              </Field>

              <Field
                label="Last Name"
                error={errors.lastName?.message}
              >
                <Input {...register("lastName")} placeholder="Doe" />
              </Field>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Date of Birth"
                icon={<Calendar className="h-4 w-4 text-primary" />}
                error={errors.dob?.message}
              >
                <Input type="date" {...register("dob")} />
              </Field>

              <Field
                label="Phone Number"
                icon={<Phone className="h-4 w-4 text-primary" />}
                error={errors.phone?.message}
              >
                <Input {...register("phone")} placeholder="+91-987654321" />
              </Field>
            </div>

            {/* Address Section */}
            <Field
              label="Residential Address"
              icon={<MapPin className="h-4 w-4 text-primary" />}
              error={errors.address?.message}
            >
              <Input {...register("address")} />
            </Field>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="City" error={errors.city?.message}>
                <Input {...register("city")} />
              </Field>

              <Field label="State" error={errors.state?.message}>
                <Input {...register("state")} />
              </Field>

              <Field label="Pincode" error={errors.pincode?.message}>
                <Input {...register("pincode")} />
              </Field>

              <Field
                label="Country"
                icon={<Globe className="h-4 w-4 text-primary" />}
                error={errors.country?.message}
              >
                <select
                  {...register("country")}
                  className="h-11 w-full rounded-lg border bg-background px-3"
                >
                  <option value="">Select</option>
                  <option value="India">India</option>
                  <option value="United States">USA</option>
                  <option value="Belgium">Belgium</option>
                </select>
              </Field>
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-between border-t pt-8">
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
              variant="ghost"
              className="flex justify-center text-muted-foreground"
              onClick={handleSkipKyc}
            >
             Skip for now
            </Button> 

              <Button
                size="lg"
                type="submit"
                disabled={!isValid}
                className="btn-premium px-12 h-12 rounded-xl"
              >
                Continue to Upload
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonalDetails;

/* ======================================================
   Reusable Field Wrapper
====================================================== */
const Field = ({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      {icon}
      {label}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

import { z } from "zod";
import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";

/* ===============================
   PERSONAL DETAILS SCHEMA
=============================== */

export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
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
    .min(1, "Last name is required")
    .regex(
      VALIDATION_PATTERNS.NAME_PART.value,
      VALIDATION_PATTERNS.NAME_PART.message
    ),

  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const dob = new Date(date);
      const age =
        (Date.now() - dob.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);

      return dob < new Date() && age >= 18;
    }, "Must be 18+"),

  phone: z.string().regex(
    VALIDATION_PATTERNS.PHONE_10_DIGITS.value,
    VALIDATION_PATTERNS.PHONE_10_DIGITS.message
  ),

  address: z.string().min(1, "Address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),

  pincode: z.string().regex(
    VALIDATION_PATTERNS.PINCODE.value,
    VALIDATION_PATTERNS.PINCODE.message
  ),

  country: z.string().min(1, "Country required"),
});

/* ===============================
   DOCUMENT UPLOAD SCHEMA
=============================== */

export const documentSchema = z.object({
  aadhaar: z
    .any()
    .refine((file) => file instanceof File, "Aadhaar required"),

  pan: z
    .any()
    .refine((file) => file instanceof File, "PAN required"),

  selfie: z
    .any()
    .refine((file) => file instanceof File, "Selfie required"),
});

/* ===============================
   FINAL KYC SUBMIT SCHEMA
=============================== */

export const fullKycSchema = personalDetailsSchema.merge(
  documentSchema
);

/* ===============================
   TYPES
=============================== */

export type PersonalDetailsType = z.infer<
  typeof personalDetailsSchema
>;

export type DocumentType = z.infer<typeof documentSchema>;

export type FullKycType = z.infer<typeof fullKycSchema>;

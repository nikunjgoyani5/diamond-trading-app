// src/utils/schemas/inventory.schema.ts

import { z } from "zod";
import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";

export const inventorySchema = z.object({
  shape: z.string().min(1, "Shape is required"),

  carat: z
    .string()
    .regex(
      VALIDATION_PATTERNS.POSITIVE_DECIMAL.value,
      VALIDATION_PATTERNS.POSITIVE_DECIMAL.message
    )
    .refine((val) => Number(val) > 0, {
      message: "Carat must be greater than 0",
    }),

  color: z.string().min(1, "Color is required"),

  clarity: z.string().min(1, "Clarity is required"),

  cut: z.string().min(1, "Cut is required"),

  polish: z.string().min(1, "Polish is required"),

  symmetry: z.string().min(1, "Symmetry is required"),

  fluorescence: z.string().min(1, "Fluorescence is required"),

  lab: z.string().min(1, "Certification lab is required"),

  certNumber: z.string().regex(
    VALIDATION_PATTERNS.CERTIFICATE_NUMBER.value,
    VALIDATION_PATTERNS.CERTIFICATE_NUMBER.message
  ),

  price: z
    .string()
    .regex(
      VALIDATION_PATTERNS.POSITIVE_DECIMAL.value,
      VALIDATION_PATTERNS.POSITIVE_DECIMAL.message
    )
    .refine((val) => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),

  description: z
    .string()
    .regex(
      VALIDATION_PATTERNS.DESCRIPTION.value,
      VALIDATION_PATTERNS.DESCRIPTION.message
    )
    .optional(),
});

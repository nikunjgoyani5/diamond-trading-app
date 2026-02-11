import { z } from "zod";
import { VALIDATION_PATTERNS } from "@/utils/validationHelpers";

export const nameField = z
  .string()
  .min(1, "Name is required")
  .regex(
    VALIDATION_PATTERNS.FULL_NAME.value,
    VALIDATION_PATTERNS.FULL_NAME.message
  );

export const emailField = z
  .string()
  .min(1, "Email is required")
  .regex(
    VALIDATION_PATTERNS.EMAIL.value,
    VALIDATION_PATTERNS.EMAIL.message
  );

export const passwordField = z
  .string()
  .min(1, "Password is required")
  .regex(
    VALIDATION_PATTERNS.PASSWORD.value,
    VALIDATION_PATTERNS.PASSWORD.message
  );
